import { Button } from "@/components/ui/button"
import { Search, Plus, Car, Edit, Mail, Phone, ExternalLink } from "lucide-react"
import { prisma } from "@/lib/prisma"

export default async function CustomersPage() {
    // Fetch from real MySQL Database
    const dbCustomers = await prisma.customer.findMany({
        include: {
            vehicles: true,
            _count: {
                select: { sales: true }
            }
        },
        orderBy: { createdAt: 'desc' }
    });

    // If DB is empty, provide a fallback, but we seeded it.
    const customers = dbCustomers.length > 0 ? dbCustomers.map(c => ({
        id: c.id,
        name: `${c.firstName} ${c.lastName}`,
        phone: c.phone || "Sin teléfono",
        email: c.email || "Sin email",
        city: c.city || "Sin ciudad",
        vehicles: c.vehicles.length,
        purchases: c._count.sales + " Compras",
        loyalty: c.loyaltyLevel,
        branch: "Sede Medellín" // Defaulting to simple display for demo
    })) : [
        { id: "CLI-991", name: "Roberto Sánchez", phone: "300 123 4567", email: "roberto@ejemplo.com", city: "Medellín", vehicles: 2, purchases: "$4.5M", loyalty: "Oro", branch: "Medellín" }
    ];

    return (
        <div className="flex flex-col h-full space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">Directorio de Clientes</h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Administra clientes, vehículos asociados e historial de servicios (Datos Reales desde MySQL).
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm">
                        <Plus className="mr-2 h-4 w-4" /> Nuevo Cliente
                    </Button>
                </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Buscar por Nombre, Teléfono o Placa..."
                        className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                <div className="flex gap-2">
                    <select className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500">
                        <option>Sede Principal: Todas</option>
                        <option>Amalfi</option>
                        <option>Medellín</option>
                        <option>Bogotá</option>
                    </select>
                    <select className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 hidden sm:block">
                        <option>Nivel: Todos</option>
                        <option>Bronce</option>
                        <option>Plata</option>
                        <option>Oro</option>
                        <option>Platino</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex-1 overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left whitespace-nowrap">
                        <thead className="bg-slate-50 text-slate-500 font-medium uppercase text-xs border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4">Cliente y Contacto</th>
                                <th className="px-6 py-4 text-center">Vehículos</th>
                                <th className="px-6 py-4">Total Compras</th>
                                <th className="px-6 py-4">Nivel Fidelidad</th>
                                <th className="px-6 py-4">Sede Preferida</th>
                                <th className="px-6 py-4 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {customers.map((c, i) => (
                                <tr key={i} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-slate-900 border-b border-transparent hover:border-blue-600 inline-block cursor-pointer">{c.name}</div>
                                        <div className="text-slate-500 text-xs mt-1 flex items-center gap-3">
                                            <span className="flex items-center"><Phone className="h-3 w-3 mr-1" /> {c.phone}</span>
                                            <span className="flex items-center"><Mail className="h-3 w-3 mr-1" /> {c.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-flex items-center justify-center bg-blue-50 text-blue-700 font-bold px-2.5 py-1 rounded w-10">
                                            <Car className="h-3.5 w-3.5 mr-1" /> {c.vehicles}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-slate-700">{c.purchases}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border
                      ${c.loyalty === 'Platino' ? 'bg-slate-800 text-white border-slate-900' :
                                                c.loyalty === 'Oro' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                                                    c.loyalty === 'Plata' ? 'bg-slate-100 text-slate-700 border-slate-300' :
                                                        'bg-orange-50 text-orange-800 border-orange-200'}`}>
                                            {c.loyalty}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">{c.branch}</td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center gap-2">
                                            <button className="p-1.5 text-slate-400 hover:text-blue-600 rounded-md bg-slate-50 hover:bg-blue-50 border border-slate-200 transition-colors flex items-center" title="Editar">
                                                Visualizar <ExternalLink className="w-3.5 h-3.5 ml-1" />
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
