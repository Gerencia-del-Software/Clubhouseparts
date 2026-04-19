import { TrendingUp } from "lucide-react"

export default function ReportsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900">Reportes y Estadísticas</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border shadow-sm">
                    <h3 className="font-bold flex items-center gap-2"><TrendingUp className="text-blue-600" /> Rendimiento por Sede</h3>
                    <div className="h-48 bg-slate-50 rounded mt-4 animate-pulse"></div>
                </div>
                <div className="bg-white p-6 rounded-xl border shadow-sm">
                    <h3 className="font-bold flex items-center gap-2"><TrendingUp className="text-green-600" /> Productos más vendidos</h3>
                    <div className="h-48 bg-slate-50 rounded mt-4 animate-pulse"></div>
                </div>
            </div>
        </div>
    )
}
