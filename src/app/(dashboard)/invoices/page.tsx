import { Receipt } from "lucide-react"

export default function InvoicesPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900">Facturación</h1>
            <div className="bg-white p-12 rounded-xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <Receipt className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Módulo de Facturación Electrónica</h3>
                <p className="text-slate-500 max-w-sm mt-2">Este módulo está siendo configurado con los estándares de la DIAN para Colombia. Pronto disponible.</p>
            </div>
        </div>
    )
}
