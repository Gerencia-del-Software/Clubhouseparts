import { Button } from "@/components/ui/button"
import { Search, Plus, Wrench, ShieldAlert, CheckCircle2, Clock, Calendar } from "lucide-react"

export default function WorkOrdersPage() {
    const orders = [
        {
            id: "OT-9901",
            customer: "Fernando Vallejo",
            vehicle: "Nissan Frontier (2020) - JKL-456",
            date: "Hoy, 08:30",
            technician: "Mario Rojas",
            status: "En reparación",
            statusIcon: Wrench,
            statusColor: "text-blue-600 bg-blue-50 border-blue-200",
            progress: 65,
            branch: "Medellín"
        },
        {
            id: "OT-9902",
            customer: "Diana Martínez",
            vehicle: "Ford Fiesta (2015) - MNP-789",
            date: "Hoy, 10:15",
            technician: "Sin asignar",
            status: "Recibido",
            statusIcon: Clock,
            statusColor: "text-slate-600 bg-slate-50 border-slate-200",
            progress: 5,
            branch: "Amalfi"
        },
        {
            id: "OT-9903",
            customer: "Luis Castaño",
            vehicle: "Toyota Fortuner (2022) - XYZ-123",
            date: "Ayer, 16:00",
            technician: "Carlos Giraldo",
            status: "Diagnóstico",
            statusIcon: Search,
            statusColor: "text-purple-600 bg-purple-50 border-purple-200",
            progress: 25,
            branch: "Medellín"
        },
        {
            id: "OT-9890",
            customer: "Empresa Logistics S.A.",
            vehicle: "Chevrolet NQR (2018) - TBK-001",
            date: "Lun 12 Oct",
            technician: "Mario Rojas",
            status: "Pendiente Aprobación",
            statusIcon: ShieldAlert,
            statusColor: "text-orange-600 bg-orange-50 border-orange-200",
            progress: 35,
            branch: "Bogotá"
        },
        {
            id: "OT-9885",
            customer: "Ana Puerta",
            vehicle: "Renault Logan (2019) - RRS-555",
            date: "Lun 12 Oct",
            technician: "Andrés Silva",
            status: "Listo para entrega",
            statusIcon: CheckCircle2,
            statusColor: "text-green-600 bg-green-50 border-green-200",
            progress: 100,
            branch: "Amalfi"
        },
    ]

    return (
        <div className="flex flex-col h-full space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">Órdenes de Trabajo (Taller)</h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Gestión y seguimiento del ciclo de vida de los servicios de mecánica.
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
                {['Recibidos (4)', 'Diagnóstico (6)', 'Aprobación (2)', 'Reparación (8)', 'Listos (3)'].map((stat, i) => (
                    <div key={i} className="bg-white border border-slate-200 rounded-lg p-3 text-center shadow-sm cursor-pointer hover:border-blue-300 transition-colors">
                        <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider block">{stat.split(' ')[0]}</span>
                        <span className="text-xl font-bold text-slate-900 block mt-1">{stat.split(' ')[1].replace(/[()]/g, '')}</span>
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
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
