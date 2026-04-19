'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { PaymentMethod } from '@prisma/client';

export async function createSale(formData: {
    customerId?: string;
    branchId: string;
    items: { productId: string; quantity: number; price: number }[];
    paymentMethod: PaymentMethod;
    discount?: number;
}) {
    try {
        const { customerId, branchId, items, paymentMethod, discount = 0 } = formData;

        // 1. Calculate totals
        const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        const tax = (subtotal - discount) * 0.19; // 19% IVA Colombia
        const total = subtotal - discount + tax;

        // 2. Transaction to ensure data integrity
        const result = await prisma.$transaction(async (tx) => {
            // Generate Sale Number
            const count = await tx.sale.count();
            const saleNumber = `VEN-${(count + 1).toString().padStart(5, '0')}`;

            // Create Sale
            const sale = await tx.sale.create({
                data: {
                    saleNumber,
                    customerId,
                    branchId,
                    subtotal,
                    discount,
                    tax,
                    total,
                    paymentMethod,
                    items: {
                        create: items.map(item => ({
                            productId: item.productId,
                            quantity: item.quantity,
                            price: item.price,
                            total: item.price * item.quantity
                        }))
                    }
                }
            });

            // Update Inventory and record movements
            for (const item of items) {
                const inventory = await tx.inventory.findUnique({
                    where: {
                        productId_branchId: {
                            productId: item.productId,
                            branchId: branchId
                        }
                    }
                });

                if (!inventory || inventory.stock < item.quantity) {
                    throw new Error(`Stock insuficiente para el producto ${item.productId}`);
                }

                await tx.inventory.update({
                    where: { id: inventory.id },
                    data: {
                        stock: { decrement: item.quantity }
                    }
                });

                await tx.stockMovement.create({
                    data: {
                        inventoryId: inventory.id,
                        quantity: item.quantity,
                        type: 'OUT',
                        reason: `Venta ${saleNumber}`
                    }
                });
            }

            // Create Invoice
            const invCount = await tx.invoice.count();
            await tx.invoice.create({
                data: {
                    invoiceNumber: `FAC-${(invCount + 1).toString().padStart(5, '0')}`,
                    saleId: sale.id,
                    customerId: customerId || "mostrador", // Simplified
                    branchId,
                    subtotal,
                    discount,
                    tax,
                    total,
                    paymentMethod,
                    status: 'PAGADA'
                }
            });

            return sale;
        });

        revalidatePath('/sales');
        revalidatePath('/inventory');
        return { success: true, sale: result };
    } catch (error: any) {
        console.error('Error creating sale:', error);
        return { success: false, error: error.message };
    }
}
