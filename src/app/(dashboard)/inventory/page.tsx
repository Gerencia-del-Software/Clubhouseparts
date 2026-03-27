import { Button } from "@/components/ui/button"
import { Search, Filter, Plus, FileDown, Edit, Trash } from "lucide-react"
import { prisma } from "@/lib/prisma"

export const dynamic = 'force-dynamic';

export default async function InventoryPage() {
    // Fetch real inventory from MySQL
    const dbInventory = await prisma.inventory.findMany({
        include: {
            product: {
                include: { supplier: true }
            },
            branch: true
        },
        orderBy: { product: { name: 'asc' } }
    });

    const products = dbInventory.length > 0 ? dbInventory.map(inv => ({
        id: inv.product.sku,
        name: inv.product.name,
        category: inv.product.category,
        brand: inv.product.brand || "Generico",
        stock: inv.stock,
        branch: inv.branch.name.replace("Sede ", ""),
        price: new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(inv.product.salePrice),
        status: inv.stock === 0 ? "Agotado" : inv.stock < inv.product.minStock ? "Bajo" : "Óptimo",
        minStock: inv.product.minStock
    })) : [
        { id: "BOS-001", name: "Alerta", category: "Sistema", brand: "Aviso", stock: 0, branch: "Todas", price: "$0", status: "Agotado", minStock: 0 }
    ];

    return (
        <div className="flex flex-col h-full space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">Inventario de Repuestos</h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Gestiona el stock centralizado o por sucursal (Datos Reales de MySQL).
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="hidden sm:flex">
                        <FileDown className="mr-2 h-4 w-4" /> Exportar
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="mr-2 h-4 w-4" /> Nuevo Producto
                    </Button>
                </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Buscar por SKU o Nombre..."
                        className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                <div className="flex gap-2">
                    <select className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500">
                        <option>Todas las Sedes</option>
                        <option>Amalfi</option>
                        <option>Medellín</option>
                        <option>Bogotá</option>
                    </select>
                    <select className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500">
                        <option>Categoría</option>
                        <option>Fricción</option>
                        <option>Fluidos</option>
                        <option>Eléctrico</option>
                    </select>
                    <Button variant="outline" size="icon" className="hidden sm:flex">
                        <Filter className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex-1 overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left whitespace-nowrap">
                        <thead className="bg-slate-50 text-slate-500 font-medium uppercase text-xs border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4">SKU</th>
                                <th className="px-6 py-4">Producto</th>
                                <th className="px-6 py-4">Categoría / Marca</th>
                                <th className="px-6 py-4">Sede</th>
                                <th className="px-6 py-4">Stock</th>
                                <th className="px-6 py-4 text-right">Precio Venta</th>
                                <th className="px-6 py-4 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {products.map((p, i) => (
                                <tr key={i} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-700">{p.id}</td>
                                    <td className="px-6 py-4 font-semibold text-slate-900">{p.name}</td>
                                    <td className="px-6 py-4">
                                        <div className="text-slate-800">{p.category}</div>
                                        <div className="text-slate-500 text-xs">{p.brand}</div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-700">{p.branch}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className={`w-2 h-2 rounded-full ${p.stock === 0 ? 'bg-red-500' : p.stock < p.minStock ? 'bg-orange-500' : 'bg-green-500'}`}></span>
                                            <span className={`font-bold ${p.stock === 0 ? 'text-red-600' : p.stock < p.minStock ? 'text-orange-600' : 'text-slate-700'}`}>{p.stock} un.</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right font-medium text-slate-900">{p.price}</td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center gap-2">
                                            <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Editar">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Eliminar">
                                                <Trash className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
