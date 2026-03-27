import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        // 1. Crear Sucursales
        const branchAmalfi = await prisma.branch.upsert({
            where: { id: "branch-amalfi" },
            update: {},
            create: {
                id: "branch-amalfi",
                name: "Sede Amalfi",
                city: "Amalfi, Antioquia",
                address: "Carrera 20 # 19-45, Barrio Centro",
                phone: "+57 (604) 830-1234",
                email: "amalfi@colautoerp.com",
                hours: "Lun - Sáb: 8:00 AM a 6:00 PM",
                description: "Sede principal en Amalfi con servicio técnico integral."
            }
        });

        const branchMedellin = await prisma.branch.upsert({
            where: { id: "branch-medellin" },
            update: {},
            create: {
                id: "branch-medellin",
                name: "Sede Medellín",
                city: "Medellín, Antioquia",
                address: "Calle 33 # 45-21, Barrio Perpetuo Socorro",
                phone: "+57 (604) 444-1234",
                email: "medellin@colautoerp.com",
                hours: "Lun - Sáb: 7:30 AM a 7:00 PM",
                description: "Diagnóstico computarizado y mecánica rápida en Medellín."
            }
        });

        const branchBogota = await prisma.branch.upsert({
            where: { id: "branch-bogota" },
            update: {},
            create: {
                id: "branch-bogota",
                name: "Sede Bogotá",
                city: "Bogotá, D.C.",
                address: "Av. Boyacá # 68-90, Sector 7 de Agosto",
                phone: "+57 (601) 321-4321",
                email: "bogota@colautoerp.com",
                hours: "Lun - Sáb: 7:00 AM a 6:30 PM",
                description: "Especialistas en vehículos de alta gama y central de pedidos."
            }
        });

        // 2. Crear Usuarios Base (Admin y Empleado)
        const hashedPassword = await bcrypt.hash("admin123", 10);

        await prisma.user.upsert({
            where: { email: "admin@colauto.com" },
            update: {},
            create: {
                name: "Administrador General",
                email: "admin@colauto.com",
                password: hashedPassword,
                role: "ADMIN",
                branchId: branchMedellin.id
            }
        });

        const techUser = await prisma.user.upsert({
            where: { email: "mario.tech@colauto.com" },
            update: {},
            create: {
                name: "Mario Rojas",
                email: "mario.tech@colauto.com",
                password: hashedPassword,
                role: "EMPLEADO",
                branchId: branchMedellin.id
            }
        });

        // 3. Crear Clientes de ejemplo
        const client1 = await prisma.customer.create({
            data: {
                firstName: "Roberto",
                lastName: "Sánchez",
                email: "roberto@ejemplo.com",
                phone: "3001234567",
                city: "Medellín",
                loyaltyLevel: "Oro",
                preferredBranchId: branchMedellin.id,
                vehicles: {
                    create: {
                        brand: "Nissan",
                        model: "Frontier",
                        year: 2020,
                        plate: "JKL-456",
                        mileage: 45000
                    }
                }
            }
        });

        // 4. Crear Proveedor
        const supplier1 = await prisma.supplier.create({
            data: {
                companyName: "AutoPartes Colombia S.A.S",
                contactPerson: "Carlos Gómez",
                phone: "3509876543",
                city: "Bogotá",
                email: "ventas@autopartescol.com"
            }
        });

        // 5. Crear Productos e Inventario
        const p1 = await prisma.product.create({
            data: {
                name: "Pastillas de Freno Cerámicas - Delanteras",
                sku: "BOS-Cer-001",
                category: "Fricción",
                brand: "Bosch",
                purchasePrice: 90000,
                salePrice: 145000,
                supplierId: supplier1.id,
                imageUrl: "/images/brake.png",
                inventories: {
                    create: [
                        { branchId: branchAmalfi.id, stock: 12 },
                        { branchId: branchMedellin.id, stock: 45 },
                        { branchId: branchBogota.id, stock: 30 }
                    ]
                }
            }
        });

        // 6. Crear Servicios de Taller
        const s1 = await prisma.service.create({
            data: {
                name: "Cambio de Aceite Sintético",
                category: "Mantenimiento Preventivo",
                estDuration: 45,
                laborCost: 40000
            }
        });

        const s2 = await prisma.service.create({
            data: {
                name: "Alineación y Balanceo",
                category: "Suspensión",
                estDuration: 60,
                laborCost: 80000
            }
        });

        return NextResponse.json({ message: "Seed ejecutado con éxito! Modelos de negocio inyectados en MySQL." });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
