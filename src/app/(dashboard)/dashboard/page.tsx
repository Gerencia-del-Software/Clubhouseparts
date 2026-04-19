import { DollarSign, Package, Wrench, Users, ArrowUpRight, ArrowDownRight, FileText } from "lucide-react"
import { prisma } from "@/lib/prisma"

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    // 1. Real Stats from MySQL
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const salesToday = await prisma.sale.aggregate({
        where: { createdAt: { gte: today } },
        _sum: { total: true }
    });

    const activeOrdersCount = await prisma.workOrder.count({
        where: { status: { notIn: ['ENTREGADO'] } }
    });

    const totalCustomers = await prisma.customer.count();

    const lowStockCount = await prisma.inventory.count({
        where: { stock: { lt: 5 } } // Assume 5 is critical min stock for quick KPI
    });

    const kpis = [
        { title: "Ventas del Día", value: new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(salesToday._sum.total || 0), trend: "+0%", isPositive: true, icon: DollarSign, info: "Hoy" },
        { title: "Órdenes Activas", value: activeOrdersCount.toString(), trend: "En taller", isPositive: true, icon: Wrench, info: "Pendientes por entregar" },
        { title: "Total Clientes", value: totalCustomers.toString(), trend: "Registrados", isPositive: true, icon: Users, info: "Directorio base" },
        { title: "Stock Crítico", value: lowStockCount.toString(), trend: "Alerta", isPositive: false, icon: Package, info: "Menos de 5 unidades", color: "text-red-600" }
    ]

    // 2. Fetch Recent Work Orders
    const dbRecentOrders = await prisma.workOrder.findMany({
        take: 5,
        include: { customer: true, vehicle: true },
        orderBy: { createdAt: 'desc' }
    });

    const recentOrders = dbRecentOrders.map(o => ({
        id: o.orderNumber,
        client: `${o.customer.firstName} ${o.customer.lastName}`,
        vehicle: `${o.vehicle.brand} ${o.vehicle.model}`,
        status: o.status.replace(/_/g, ' '),
        total: o.totalEstimate > 0 ? new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(o.totalEstimate) : "-"
    }));

    // 3. Low Stock Alerts (Detail)
    const dbLowStock = await prisma.inventory.findMany({
        where: { stock: { lt: 10 } },
        include: { product: true },
        take: 4,
        orderBy: { stock: 'asc' }
    });

    const lowStockAlerts = dbLowStock.map(inv => ({
        id: inv.product.sku,
        name: inv.product.name,
        stock: inv.stock,
        min: inv.product.minStock
    }));

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard Administrativo</h1>
                    <p className="text-slate-500 mt-1">Gestión integral basada en datos reales de sucursales.</p>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {kpis.map((kpi, idx) => (
                    <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-slate-500">{kpi.title}</span>
                            <div className="p-2 bg-slate-50 rounded-md">
                                <kpi.icon className={`w-5 h-5 ${kpi.color || 'text-slate-700'}`} />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-slate-900">{kpi.value}</span>
                        </div>

                        <div className="mt-4 flex items-center text-sm">
                            <span className={`flex items-center font-medium ${kpi.isPositive ? 'text-green-600' : 'text-rose-600'}`}>
                                {kpi.isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                                {kpi.trend}
                            </span>
                            <span className="ml-2 text-slate-400">{kpi.info}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Recent Work Orders */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200">
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                        <h2 className="text-lg font-bold text-slate-800">Órdenes de Trabajo Recientes</h2>
                        <button className="text-sm text-blue-600 font-medium hover:underline">Ver todas</button>
                    </div>
                    <div className="p-0 overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100 uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-3">Orden</th>
                                    <th className="px-6 py-3">Cliente / Vehículo</th>
                                    <th className="px-6 py-3">Estado</th>
                                    <th className="px-6 py-3 text-right">Total Est.</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {recentOrders.length > 0 ? recentOrders.map((order, i) => (
                                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-2">
                                            <FileText className="h-4 w-4 text-slate-400" />
                                            {order.id}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-slate-900 font-medium">{order.client}</div>
                                            <div className="text-slate-500 text-xs">{order.vehicle}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium border capitalize
                        ${order.status === 'LISTO PARA ENTREGA' ? 'bg-green-50 text-green-700 border-green-200' :
                                                        order.status === 'EN REPARACION' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                                            'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
                                                {order.status.toLowerCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right font-medium text-slate-900">{order.total}</td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-500 italic">No hay órdenes recientes</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Low Stock Alerts */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                    <div className="p-6 border-b border-slate-100">
                        <h2 className="text-lg font-bold text-slate-800">Alertas de Inventario</h2>
                    </div>
                    <div className="p-6 space-y-4">
                        {lowStockAlerts.length > 0 ? lowStockAlerts.map((prod, i) => (
                            <div key={i} className="flex items-center justify-between border-b border-slate-50 pb-4 last:border-0 last:pb-0">
                                <div>
                                    <h4 className="font-semibold text-slate-800 text-sm mb-0.5">{prod.name}</h4>
                                    <p className="text-xs text-slate-500">Ref: {prod.id}</p>
                                </div>
                                <div className="text-right">
                                    <div className={`text-sm font-bold ${prod.stock === 0 ? 'text-red-600' : 'text-orange-500'}`}>
                                        {prod.stock === 0 ? 'Agotado' : `${prod.stock} un.`}
                                    </div>
                                    <div className="text-xs text-slate-400 font-medium mt-0.5">Min: {prod.min}</div>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center text-green-600 text-sm font-medium py-4">Stock saludable en todas las sedes.</div>
                        )}
                        <button className="w-full py-2 mt-4 text-sm font-semibold text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
                            Ver Reporte de Stock
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}
