import { Truck } from "lucide-react"

export default function SpecialOrdersPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900">Pedidos Especiales</h1>
            <div className="bg-white p-12 rounded-xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                    <Truck className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Pedidos de Repuestos fuera de Stock</h3>
                <p className="text-slate-500 max-w-sm mt-2">Gestiona solicitudes especiales de clientes para repuestos que no se encuentran en inventario local.</p>
            </div>
        </div>
    )
}
