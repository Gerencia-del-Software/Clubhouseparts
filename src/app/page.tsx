import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Wrench, Settings, MapPin, Phone, Car } from "lucide-react"

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Navigation */}
            <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
                <div className="container flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Wrench className="h-6 w-6 text-primary" />
                        <span className="text-xl font-bold text-primary">Clubhouse parts</span>
                    </div>
                    <nav className="hidden md:flex gap-6">
                        <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Inicio</Link>
                        <Link href="/services" className="text-sm font-medium hover:text-primary transition-colors">Servicios</Link>
                        <Link href="/catalog" className="text-sm font-medium hover:text-primary transition-colors">Repuestos</Link>
                        <Link href="/branches" className="text-sm font-medium hover:text-primary transition-colors">Sedes</Link>
                        <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">Contacto</Link>
                        <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">Nosotros</Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        <Link href="/login">
                            <Button variant="outline" className="hidden md:flex">Ingresar</Button>
                        </Link>
                        <Link href="/register">
                            <Button>Registrarse</Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative overflow-hidden bg-slate-900 text-white pb-32 pt-24">
                    <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
                    <div className="container relative z-10 flex flex-col items-center text-center">
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 mt-12 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                            Taller Automotriz y Venta de Repuestos
                        </h1>
                        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-10">
                            Servicio técnico garantizado, repuestos originales y la atención que tú y tu vehículo merecen. Rapidez, confianza y calidad en cada detalle.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Link href="/contact" className="w-full sm:w-auto">
                                <Button size="lg" className="w-full text-base bg-blue-600 hover:bg-blue-700">
                                    <Settings className="mr-2 h-5 w-5" /> Agendar Servicio
                                </Button>
                            </Link>
                            <Link href="/catalog" className="w-full sm:w-auto">
                                <Button size="lg" variant="outline" className="w-full text-base border-white text-slate-800 hover:bg-white hover:text-primary">
                                    <Car className="mr-2 h-5 w-5" /> Ver Repuestos
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Featured Services */}
                <section className="py-20 bg-slate-50">
                    <div className="container">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">Nuestros Servicios Destacados</h2>
                            <p className="text-slate-600 max-w-2xl mx-auto">Soluciones integrales para el mantenimiento y reparación de tu vehículo en nuestras 3 sedes ubicadas en Amalfi, Medellín y Bogotá.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: "Mantenimiento Preventivo", desc: "Revisión completa, cambio de aceite, filtros y diagnóstico por escáner." },
                                { title: "Reparación de Suspensión", desc: "Amortiguadores, tijeras, bujes y sistema de dirección con repuestos originales." },
                                { title: "Sistema Eléctrico", desc: "Escaneo computarizado, reparación de alternadores, baterías y cableado general." }
                            ].map((service, i) => (
                                <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                                        <Settings className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-slate-800">{service.title}</h3>
                                    <p className="text-slate-600 mb-6">{service.desc}</p>
                                    <Link href="/services" className="text-primary font-medium hover:underline flex items-center">
                                        Saber más <div className="ml-1">→</div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-slate-900 py-12 text-slate-400">
                <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Wrench className="h-6 w-6 text-blue-500" />
                            <span className="text-xl font-bold text-white">Clubhouse parts</span>
                        </div>
                        <p className="text-sm">Tu socio confiable para el mantenimiento de vehículos y repuestos de alta calidad en Colombia.</p>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Enlaces</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/" className="hover:text-white transition-colors">Inicio</Link></li>
                            <li><Link href="/services" className="hover:text-white transition-colors">Servicios</Link></li>
                            <li><Link href="/catalog" className="hover:text-white transition-colors">Catálogo</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Nuestras Sedes</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Amalfi</li>
                            <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Medellín</li>
                            <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Bogotá</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Contacto</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> (604) 555-0123</li>
                            <li className="flex items-center gap-2">contacto@clubhouseparts.com</li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    )
}
