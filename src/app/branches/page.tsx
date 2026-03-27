import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BranchesPage() {
    const branches = [
        {
            name: "Sede Amalfi",
            city: "Amalfi, Antioquia",
            address: "Carrera 20 # 19-45, Barrio Centro",
            phone: "+57 (604) 830-1234",
            whatsapp: "+57 320 123 4567",
            email: "amalfi@clubhouseparts.com",
            hours: "Lun - Sáb: 8:00 AM a 6:00 PM",
            desc: "Nuestra sede principal en Amalfi ofrece servicio técnico integral y el mayor surtido de repuestos en el norte de Antioquia."
        },
        {
            name: "Sede Medellín",
            city: "Medellín, Antioquia",
            address: "Calle 33 # 45-21, Barrio Perpetuo Socorro",
            phone: "+57 (604) 444-1234",
            whatsapp: "+57 310 987 6543",
            email: "medellin@clubhouseparts.com",
            hours: "Lun - Sáb: 7:30 AM a 7:00 PM",
            desc: "Ubicados en el sector automotriz, contamos con tecnología de punta para diagnóstico y mecánica rápida."
        },
        {
            name: "Sede Bogotá",
            city: "Bogotá, D.C.",
            address: "Av. Boyacá # 68-90, Sector 7 de Agosto",
            phone: "+57 (601) 321-4321",
            whatsapp: "+57 300 456 7890",
            email: "bogota@clubhouseparts.com",
            hours: "Lun - Sáb: 7:00 AM a 6:30 PM",
            desc: "Especialistas en vehículos híbridos y de alta gama. Centro principal de recepción de pedidos especiales."
        }
    ]

    return (
        <div className="min-h-screen pt-16 bg-slate-50 flex flex-col">
            <div className="bg-slate-900 text-white py-16">
                <div className="container">
                    <h1 className="text-4xl font-extrabold tracking-tight mb-4">Nuestras Sedes</h1>
                    <p className="text-lg text-slate-300 max-w-2xl">
                        Conoce nuestra red de talleres y almacenes. Estamos presentes en tres ubicaciones
                        estratégicas para brindarte la mejor cobertura.
                    </p>
                </div>
            </div>

            <div className="container py-16 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {branches.map((b, i) => (
                        <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
                            <div className="h-48 bg-slate-200 flex items-center justify-center text-slate-400">
                                [Imagen de sede: {b.name}]
                            </div>
                            <div className="p-8 flex flex-col flex-1">
                                <h2 className="text-2xl font-bold text-slate-900 mb-1">{b.name}</h2>
                                <span className="text-sm font-semibold text-primary/80 uppercase tracking-wider mb-5">{b.city}</span>

                                <p className="text-slate-600 text-sm mb-6 flex-1">{b.desc}</p>

                                <ul className="space-y-4 text-sm text-slate-700 mb-8">
                                    <li className="flex items-start">
                                        <MapPin className="h-5 w-5 text-slate-400 mr-3 shrink-0" />
                                        <span>{b.address}</span>
                                    </li>
                                    <li className="flex items-center">
                                        <Phone className="h-5 w-5 text-slate-400 mr-3 shrink-0" />
                                        <span>{b.phone}</span>
                                    </li>
                                    <li className="flex items-center">
                                        <Clock className="h-5 w-5 text-slate-400 mr-3 shrink-0" />
                                        <span>{b.hours}</span>
                                    </li>
                                    <li className="flex items-center">
                                        <Mail className="h-5 w-5 text-slate-400 mr-3 shrink-0" />
                                        <span>{b.email}</span>
                                    </li>
                                </ul>

                                <div className="flex flex-col gap-3 mt-auto">
                                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                                        Contactar por WhatsApp
                                    </Button>
                                    <Button variant="outline" className="w-full">
                                        Agendar en esta sede
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
