import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ArrowRight } from "lucide-react"

export default function ServicesPage() {
    const servicios = [
        {
            title: "Mantenimiento Preventivo",
            desc: "Servicio completo para extender la vida útil del vehículo. Incluye cambio de aceite, filtros, fluidos y revisión de puntos críticos.",
            time: "2 - 4 horas",
            price: "150.000 - 350.000 COP"
        },
        {
            title: "Cambio de Aceite",
            desc: "Lubricantes sintéticos, semi-sintéticos y minerales de las mejores marcas. Filtro de aceite original.",
            time: "30 - 45 min",
            price: "80.000 - 250.000 COP"
        },
        {
            title: "Frenos",
            desc: "Revisión y cambio de pastillas, bandas, discos y líquido de frenos con purgación del sistema.",
            time: "2 - 3 horas",
            price: "120.000 - 450.000 COP"
        },
        {
            title: "Suspensión",
            desc: "Amortiguadores, rotulas, terminales, tijeras y bujes. Aseguramos el máximo confort y seguridad en la vía.",
            time: "4 - 6 horas",
            price: "200.000 - 800.000 COP"
        },
        {
            title: "Diagnóstico Computarizado",
            desc: "Escaneo de todos los módulos del vehículo (ECU, ABS, Airbag, Transmisión, etc).",
            time: "1 hora",
            price: "60.000 - 120.000 COP"
        },
        {
            title: "Electricidad Automotriz",
            desc: "Revisión y reparación de cableado, alternadores, baterías, luces y sensores.",
            time: "Depende del daño",
            price: "100.000+ COP"
        },
        {
            title: "Alineación y Balanceo",
            desc: "Alineación láser 3D para autos y camionetas. Balanceo dinámico para llantas.",
            time: "1 - 2 horas",
            price: "80.000 - 150.000 COP"
        }
    ]

    return (
        <div className="min-h-screen flex flex-col pt-16">
            <div className="bg-slate-900 text-white py-20">
                <div className="container relative z-10 flex flex-col items-center text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Nuestros Servicios</h1>
                    <p className="text-lg text-slate-300 max-w-2xl">
                        Soluciones automotrices completas para que tu vehículo siempre esté en las mejores condiciones.
                        Calidad garantizada en cualquiera de nuestras sedes.
                    </p>
                </div>
            </div>

            <div className="flex-1 bg-slate-50 py-16">
                <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {servicios.map((s, idx) => (
                        <div key={idx} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 flex flex-col h-full hover:shadow-md transition-shadow">
                            <h3 className="text-2xl font-bold mb-3 text-slate-800">{s.title}</h3>
                            <p className="text-slate-600 mb-6 flex-1">{s.desc}</p>

                            <div className="space-y-3 mb-8">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500 font-medium">Tiempo est:</span>
                                    <span className="text-slate-900 font-semibold">{s.time}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500 font-medium">Precio aprox:</span>
                                    <span className="text-blue-600 font-bold">{s.price}</span>
                                </div>
                            </div>

                            <Link href="/contact" className="mt-auto">
                                <Button className="w-full justify-between group">
                                    Agendar Cita
                                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
