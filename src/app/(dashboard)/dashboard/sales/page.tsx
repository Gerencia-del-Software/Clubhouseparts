import { Button } from "@/components/ui/button"
import { Search, Plus, Printer, TrendingUp, CreditCard } from "lucide-react"
import { prisma } from "@/lib/prisma"

export const dynamic = 'force-dynamic';

export default async function SalesPage() {
    // Fetch real sales from DB
    const dbSales = await prisma.sale.findMany({
        include: {
            customer: true,
            branch: true,
            items: {
                include: { product: true }
            }
        },
        orderBy: { createdAt: 'desc' }
    });

    const sales = dbSales.length > 0 ? dbSales.map(s => ({
        id: s.saleNumber,
        customer: s.customer ? `${s.customer.firstName} ${s.customer.lastName}` : "Cliente Mostrador",
        date: new Date(s.createdAt).toLocaleString('es-CO', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        branch: s.branch.name.replace("Sede ", ""),
        total: new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(s.total),
        method: s.paymentMethod,
        status: "Pagada" // Assuming all registered sales are paid for now
    })) : [
        { id: "VEN-8201", customer: "Sin ventas", date: "-", branch: "-", total: "$0", method: "-", status: "-" },
    ];

    // Stats for sidebar (Global - All Branches)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todaySales = await prisma.sale.findMany({
        where: {
            createdAt: { gte: today }
        }
    });

    const totalToday = todaySales.reduce((acc, s) => acc + s.total, 0);
    const cashTotal = todaySales.filter(s => s.paymentMethod === 'EFECTIVO').reduce((acc, s) => acc + s.total, 0);
    const cardTotal = todaySales.filter(s => s.paymentMethod === 'TARJETA').reduce((acc, s) => acc + s.total, 0);
    const transTotal = todaySales.filter(s => s.paymentMethod === 'TRANSFERENCIA').reduce((acc, s) => acc + s.total, 0);

    return (
        <div className="flex flex-col h-full space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">Punto de Venta e Historial</h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Control de caja y ventas de repuestos centralizado (Todas las Sedes).
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button className="bg-green-600 hover:bg-green-700 shadow-sm">
                        <TrendingUp className="mr-2 h-4 w-4" /> Cierre de Caja
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm">
                        <Plus className="mr-2 h-4 w-4" /> Nueva Venta (POS)
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                {/* Sales List Config */}
                <div className="lg:col-span-3 space-y-6 flex flex-col">
                    {/* Filters Bar */}
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Buscar por # Factura o Cliente..."
                                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex gap-2">
                            <input type="date" className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                            <select className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 hidden sm:block">
                                <option>Sede: Todas</option>
                                <option>Amalfi</option>
                                <option>Medellín</option>
                                <option>Bogotá</option>
                            </select>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex-1 overflow-hidden flex flex-col">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left whitespace-nowrap">
                                <thead className="bg-slate-50 text-slate-500 font-medium uppercase text-xs border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-4">Fac. #</th>
                                        <th className="px-6 py-4">Cliente / Fecha</th>
                                        <th className="px-6 py-4">Sede</th>
                                        <th className="px-6 py-4">Met. Pago</th>
                                        <th className="px-6 py-4">Estado</th>
                                        <th className="px-6 py-4 text-right">Total</th>
                                        <th className="px-6 py-4 text-center">Ticket</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {sales.map((s, i) => (
                                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 font-bold text-slate-800">{s.id}</td>
                                            <td className="px-6 py-4">
                                                <div className="text-slate-900 font-medium">{s.customer}</div>
                                                <div className="text-slate-500 text-xs">{s.date}</div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-600 font-medium">{s.branch}</td>
                                            <td className="px-6 py-4">
                                                <span className="flex items-center text-slate-700 text-xs font-medium bg-slate-100 px-2 py-1 rounded w-fit capitalize">
                                                    <CreditCard className="w-3 h-3 mr-1" /> {s.method.toLowerCase()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium border
                          ${s.status === 'Pagada' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
                                                    {s.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right font-bold text-slate-900">{s.total}</td>
                                            <td className="px-6 py-4 text-center">
                                                <button className="p-1.5 text-slate-400 hover:text-blue-600 rounded-md transition-colors" title="Imprimir Recibo">
                                                    <Printer className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* Pagination mock */}
                        <div className="border-t border-slate-200 bg-slate-50 px-6 py-3 flex items-center justify-between text-sm text-slate-500 mt-auto">
                            <span>Mostrando {sales.length} ventas</span>
                            <div className="flex gap-1">
                                <button className="px-3 py-1 border border-slate-200 rounded-md bg-white hover:bg-slate-100 disabled:opacity-50">Anterior</button>
                                <button className="px-3 py-1 border border-slate-200 rounded-md bg-white hover:bg-slate-100">Siguiente</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Mini Summary */}
                <div className="space-y-6">
                    <div className="bg-slate-900 text-white rounded-xl shadow-sm border border-slate-800 p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                        <h3 className="font-semibold text-slate-300 mb-1">Ventas Hoy (Empresa)</h3>
                        <div className="text-3xl font-bold mb-4">{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(totalToday)}</div>

                        <div className="space-y-3 pt-4 border-t border-slate-800/50">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Efectivo</span>
                                <span className="font-medium">{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(cashTotal)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Tarjetas</span>
                                <span className="font-medium">{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(cardTotal)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Transferencias</span>
                                <span className="font-medium">{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(transTotal)}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
