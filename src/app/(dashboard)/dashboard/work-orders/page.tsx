import { Button } from "@/components/ui/button"
import { Search, Plus, Wrench, ShieldAlert, CheckCircle2, Clock, Calendar } from "lucide-react"
import { prisma } from "@/lib/prisma"

export const dynamic = 'force-dynamic';

export default async function WorkOrdersPage() {
    // Fetch real work orders from DB
    const dbOrders = await prisma.workOrder.findMany({
        include: {
            customer: true,
            vehicle: true,
            technician: true,
            branch: true
        },
        orderBy: { createdAt: 'desc' }
    });

    const statusConfig: any = {
        'RECIBIDO': { icon: Clock, color: "text-slate-600 bg-slate-50 border-slate-200", label: "Recibido", progress: 5 },
        'EN_DIAGNOSTICO': { icon: Search, color: "text-purple-600 bg-purple-50 border-purple-200", label: "Diagnóstico", progress: 25 },
        'PENDIENTE_APROBACION': { icon: ShieldAlert, color: "text-orange-600 bg-orange-50 border-orange-200", label: "Pte. Aprobación", progress: 35 },
        'EN_REPARACION': { icon: Wrench, color: "text-blue-600 bg-blue-50 border-blue-200", label: "En Reparación", progress: 65 },
        'LISTO_PARA_ENTREGA': { icon: CheckCircle2, color: "text-green-600 bg-green-50 border-green-200", label: "Listo para Entrega", progress: 100 },
        'ENTREGADO': { icon: CheckCircle2, color: "text-slate-500 bg-slate-100 border-slate-200", label: "Entregado", progress: 100 },
    };

    const orders = dbOrders.length > 0 ? dbOrders.map(o => {
        const config = statusConfig[o.status] || statusConfig['RECIBIDO'];
        return {
            id: o.orderNumber,
            customer: `${o.customer.firstName} ${o.customer.lastName}`,
            vehicle: `${o.vehicle.brand} ${o.vehicle.model} (${o.vehicle.year}) - ${o.vehicle.plate}`,
            date: new Date(o.createdAt).toLocaleDateString('es-CO', { day: '2-digit', month: 'short' }),
            technician: o.technician ? o.technician.name : "Sin asignar",
            status: config.label,
            statusIcon: config.icon,
            statusColor: config.color,
            progress: config.progress,
            branch: o.branch.name.replace("Sede ", "")
        };
    }) : [];

    // Stats for the top row
    const stats = [
        { label: 'Recibidos', count: dbOrders.filter(o => o.status === 'RECIBIDO').length },
        { label: 'Diagnóstico', count: dbOrders.filter(o => o.status === 'EN_DIAGNOSTICO').length },
        { label: 'Aprobación', count: dbOrders.filter(o => o.status === 'PENDIENTE_APROBACION').length },
        { label: 'Reparación', count: dbOrders.filter(o => o.status === 'EN_REPARACION').length },
        { label: 'Listos', count: dbOrders.filter(o => o.status === 'LISTO_PARA_ENTREGA').length },
    ];

    return (
        <div className="flex flex-col h-full space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">Órdenes de Trabajo (Taller)</h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Gestión y seguimiento del ciclo de vida de los servicios de mecánica (Datos Reales MySQL).
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="hidden sm:flex border-slate-300">
                        <Calendar className="mr-2 h-4 w-4 text-slate-500" /> Calendario de Citas
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm">
                        <Plus className="mr-2 h-4 w-4" /> Crear Orden
                    </Button>
                </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white border border-slate-200 rounded-lg p-3 text-center shadow-sm cursor-pointer hover:border-blue-300 transition-colors">
                        <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider block">{stat.label}</span>
                        <span className="text-xl font-bold text-slate-900 block mt-1">{stat.count}</span>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex-1 overflow-hidden flex flex-col">
                {/* Actions bar */}
                <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Buscar por cliente, placa o ID..."
                            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex gap-2">
                        <select className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500">
                            <option>Estado: Todos</option>
                        </select>
                        <select className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500">
                            <option>Sede: Todas</option>
                        </select>
                    </div>
                </div>

                {/* List Data */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left whitespace-nowrap">
                        <thead className="bg-slate-50 text-slate-500 font-medium uppercase text-xs border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4">ID Orden</th>
                                <th className="px-6 py-4">Cliente y Vehículo</th>
                                <th className="px-6 py-4">Ingreso</th>
                                <th className="px-6 py-4">Estado / Progreso</th>
                                <th className="px-6 py-4">Asignado a</th>
                                <th className="px-6 py-4">Sede</th>
                                <th className="px-6 py-4 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {orders.map((o, i) => (
                                <tr key={i} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-slate-900">{o.id}</td>
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-slate-800">{o.customer}</div>
                                        <div className="text-slate-500 text-xs mt-0.5">{o.vehicle}</div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 text-sm">{o.date}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-2 w-full max-w-[150px]">
                                            <span className={`flex items-center w-fit text-xs font-semibold px-2 py-1 rounded-full border ${o.statusColor}`}>
                                                <o.statusIcon className="w-3 h-3 mr-1" /> {o.status}
                                            </span>
                                            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                                                <div className={`h-1.5 rounded-full ${o.progress === 100 ? 'bg-green-500' : 'bg-blue-500'}`} style={{ width: `${o.progress}%` }}></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {o.technician === "Sin asignar" ? (
                                            <span className="text-slate-400 italic text-sm">{o.technician}</span>
                                        ) : (
                                            <span className="font-medium text-slate-700">{o.technician}</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">{o.branch}</td>
                                    <td className="px-6 py-4 text-center">
                                        <Button variant="outline" size="sm" className="font-semibold text-blue-600 border-blue-200 hover:bg-blue-50">Gestionar</Button>
                                    </td>
                                </tr>
                            ))}
                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-slate-500 italic">
                                        No hay órdenes de trabajo registradas.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
