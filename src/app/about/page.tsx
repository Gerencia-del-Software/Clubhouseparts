import { Button } from "@/components/ui/button"
import { ShieldCheck } from "lucide-react"

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-24 pb-12 bg-white">
            <div className="container px-4 mx-auto">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-6">Sobre Clubhouse parts</h1>
                    <p className="text-lg text-slate-600 mb-8">
                        Somos una red de talleres líderes en Colombia, dedicados a ofrecer soluciones integrales de mecánica y repuestos con los más altos estándares de calidad y confianza.
                    </p>
                    <div className="aspect-video bg-slate-100 rounded-2xl mb-12 flex items-center justify-center text-slate-400">
                        [Imagen de nuestras sedes]
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                        <div>
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><ShieldCheck className="text-blue-600" /> Nuestra Misión</h3>
                            <p className="text-slate-600">Proveer un servicio técnico excepcional y repuestos garantizados que aseguren la longevidad y seguridad de cada vehículo que atendemos.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><ShieldCheck className="text-blue-600" /> Nuestra Visión</h3>
                            <p className="text-slate-600">Convertirnos en el referente nacional de gestión automotriz, uniendo tecnología y experticia humana en un solo lugar.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
