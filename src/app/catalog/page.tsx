import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, Filter, Box } from "lucide-react"
import { prisma } from "@/lib/prisma"

export const dynamic = 'force-dynamic';

export default async function CatalogPage() {
    // Fetch real products from MySQL DB including related branches inventory
    const dbProducts = await prisma.product.findMany({
        include: {
            inventories: {
                include: {
                    branch: true
                }
            }
        },
        where: {
            isPublic: true,
            isActive: true
        }
    });

    const products = dbProducts.length > 0 ? dbProducts.map(p => {
        const totalStock = p.inventories.reduce((acc, inv) => acc + inv.stock, 0);
        return {
            name: p.name,
            sku: p.sku,
            brand: p.brand || "Estándar",
            price: new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(p.salePrice),
            status: totalStock === 0 ? "Agotado" : totalStock < p.minStock ? "Bajo stock" : "En stock",
            statusColor: totalStock === 0 ? "bg-red-100 text-red-800" : totalStock < p.minStock ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800",
            image: p.imageUrl || "https://images.unsplash.com/photo-1542240582-7e045ab5d606?q=80&w=600&auto=format&fit=crop"
        }
    }) : [
        {
            name: "Pastillas de Freno Mock",
            sku: "BOS-Cer-001",
            brand: "Bosch",
            price: "$145.000",
            status: "En stock",
            statusColor: "bg-green-100 text-green-800",
            image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=600&auto=format&fit=crop"
        }
    ];

    return (
        <div className="min-h-screen flex flex-col pt-16 bg-slate-50">
            <div className="bg-slate-900 text-white py-16">
                <div className="container relative z-10">
                    <h1 className="text-3xl font-extrabold tracking-tight mb-4">Catálogo de Repuestos</h1>
                    <p className="text-slate-300 max-w-2xl mb-8">
                        Encuentra repuestos originales y homologados de la más alta calidad para tu vehículo (Datos Reales desde MySQL).
                    </p>

                    <div className="flex gap-2 max-w-2xl">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Buscar por nombre, marca o SKU..."
                                className="w-full h-11 pl-10 pr-4 rounded-md border-slate-700 bg-slate-800 text-white placeholder-slate-400 focus:ring-primary focus:border-primary focus:outline-none"
                            />
                        </div>
                        <Button className="h-11 px-8">Buscar</Button>
                    </div>
                </div>
            </div>

            <div className="container py-8 flex-1">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl border shadow-sm">
                            <h3 className="font-semibold text-lg flex items-center mb-4"><Filter className="h-4 w-4 mr-2" /> Filtros</h3>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-medium text-sm text-slate-900 mb-2">Sedes</h4>
                                    <div className="space-y-2 text-sm text-slate-600">
                                        <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="rounded border-slate-300 text-primary" defaultChecked /> Amalfi</label>
                                        <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="rounded border-slate-300 text-primary" defaultChecked /> Medellín</label>
                                        <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="rounded border-slate-300 text-primary" defaultChecked /> Bogotá</label>
                                    </div>
                                </div>

                                <hr className="border-slate-100" />

                                <div>
                                    <h4 className="font-medium text-sm text-slate-900 mb-2">Categoría</h4>
                                    <div className="space-y-2 text-sm text-slate-600">
                                        <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="rounded border-slate-300 text-primary" /> Fricción y Frenos</label>
                                        <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="rounded border-slate-300 text-primary" /> Suspensión</label>
                                        <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="rounded border-slate-300 text-primary" /> Motor y Eléctrico</label>
                                        <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="rounded border-slate-300 text-primary" /> Filtros y Fluidos</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Catalog grid */}
                    <div className="lg:col-span-3">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-slate-600 font-medium">Mostrando {products.length} productos reales de DB</span>
                            <select className="border rounded-md px-3 py-1.5 text-sm bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary">
                                <option>Más relevantes</option>
                                <option>Menor a mayor precio</option>
                                <option>Mayor a menor precio</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {products.map((p, idx) => (
                                <div key={idx} className="bg-white rounded-xl overflow-hidden border shadow-sm group hover:shadow-md transition-shadow flex flex-col">
                                    <div className="h-48 bg-slate-100 relative overflow-hidden">
                                        <div className="absolute inset-0 flex items-center justify-center text-slate-300 group-hover:scale-105 transition-transform duration-300">
                                            <img src={p.image} alt={p.name} className="object-cover w-full h-full" />
                                        </div>
                                    </div>
                                    <div className="p-5 flex-1 flex flex-col">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{p.brand}</span>
                                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${p.statusColor}`}>
                                                {p.status}
                                            </span>
                                        </div>

                                        <h4 className="font-bold text-slate-800 mb-1 line-clamp-2">{p.name}</h4>
                                        <p className="text-xs text-slate-500 mb-4">SKU: {p.sku}</p>

                                        <div className="mt-auto flex items-center justify-between">
                                            <span className="text-xl font-bold text-slate-900">{p.price}</span>
                                            <Button variant="outline" size="sm" className="font-semibold text-blue-600 border-blue-200 hover:bg-blue-50">Ver detalles</Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
