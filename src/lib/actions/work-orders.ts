'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { WorkOrderStatus } from '@prisma/client';

export async function createWorkOrder(formData: {
    customerId: string;
    vehicleId: string;
    branchId: string;
    issueDesc: string;
    technicianId?: string;
}) {
    try {
        const { customerId, vehicleId, branchId, issueDesc, technicianId } = formData;

        const count = await prisma.workOrder.count();
        const orderNumber = `OT-${(count + 1).toString().padStart(5, '0')}`;

        const workOrder = await prisma.workOrder.create({
            data: {
                orderNumber,
                customerId,
                vehicleId,
                branchId,
                issueDesc,
                technicianId,
                status: 'RECIBIDO'
            }
        });

        revalidatePath('/work-orders');
        return { success: true, workOrder };
    } catch (error: any) {
        console.error('Error creating work order:', error);
        return { success: false, error: error.message };
    }
}

export async function updateWorkOrderStatus(orderId: string, status: WorkOrderStatus, notes?: string) {
    try {
        const workOrder = await prisma.workOrder.update({
            where: { id: orderId },
            data: { 
                status,
                techNotes: notes ? { set: notes } : undefined
            }
        });

        revalidatePath('/work-orders');
        return { success: true, workOrder };
    } catch (error: any) {
        console.error('Error updating status:', error);
        return { success: false, error: error.message };
    }
}
