import { Bot, Sparkles } from "lucide-react"

export default function AiAssistantPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900">Asistente Virtual IA</h1>
            <div className="bg-white p-12 rounded-xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                    <Bot className="h-8 w-8 text-purple-500" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">IA de Clubhouse Parts</h3>
                <p className="text-slate-500 max-w-sm mt-2">Analiza tendencias de ventas, recomienda stock y optimiza la programación del taller con inteligencia artificial.</p>
                <div className="mt-6 flex items-center gap-2 text-purple-600 font-medium bg-purple-50 px-4 py-2 rounded-full text-sm">
                    <Sparkles className="h-4 w-4" /> Próximamente en Beta
                </div>
            </div>
        </div>
    )
}
