import { Settings } from "lucide-react"

export default function SettingsPage() {
    return (
        <div className="max-w-2xl space-y-6">
            <h1 className="text-2xl font-bold text-slate-900">Configuración del Sistema</h1>
            <div className="bg-white rounded-xl border shadow-sm divide-y">
                <div className="p-6">
                    <h3 className="font-bold text-slate-800">Parámetros de Empresa</h3>
                    <p className="text-sm text-slate-500 mt-1">Nombre legal, NIT y datos de facturación.</p>
                </div>
                <div className="p-6">
                    <h3 className="font-bold text-slate-800">Sedes y Sucursales</h3>
                    <p className="text-sm text-slate-500 mt-1">Activar o desactivar ubicaciones de servicio.</p>
                </div>
                <div className="p-6">
                    <h3 className="font-bold text-slate-800">Notificaciones</h3>
                    <p className="text-sm text-slate-500 mt-1">Alertas de stock bajo y correos de fidelización.</p>
                </div>
            </div>
        </div>
    )
}
