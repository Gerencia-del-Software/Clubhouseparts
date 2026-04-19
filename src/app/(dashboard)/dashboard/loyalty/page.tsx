import { Heart } from "lucide-react"

export default function LoyaltyPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900">Programa de Fidelización</h1>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-2xl text-white">
                <Heart className="h-10 w-10 mb-4" />
                <h2 className="text-2xl font-bold">Gestión de Puntos</h2>
                <p className="opacity-90 mt-2">Configura cuántos puntos ganan los clientes por cada compra de servicios o repuestos.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border">
                <h3 className="font-bold mb-4">Niveles de Cliente</h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <span className="font-bold">Bronce</span>
                        <span className="text-slate-500 text-sm">0 - 500 pts</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <span className="font-bold text-slate-700">Plata</span>
                        <span className="text-slate-500 text-sm">501 - 2000 pts</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
