import { Button } from "@/components/ui/button"

export default function ContactPage() {
    return (
        <div className="min-h-screen pt-16 bg-slate-50 flex flex-col">
            <div className="bg-slate-900 text-white py-16">
                <div className="container">
                    <h1 className="text-4xl font-extrabold tracking-tight mb-4">Contacto y Agendamiento</h1>
                    <p className="text-lg text-slate-300 max-w-2xl">
                        Cuéntanos qué necesita tu vehículo. Un asesor especializado confirmará tu cita en la sede de tu preferencia.
                    </p>
                </div>
            </div>

            <div className="container py-16 flex-1 max-w-4xl">
                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 md:p-10">
                    <form className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-800">Nombre completo</label>
                                <input type="text" className="w-full flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" placeholder="Ej. Carlos Martínez" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-800">Teléfono / WhatsApp</label>
                                <input type="tel" className="w-full flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" placeholder="Ej. 300 123 4567" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-800">Correo electrónico</label>
                                <input type="email" className="w-full flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" placeholder="correo@ejemplo.com" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-800">Ciudad de residencia</label>
                                <input type="text" className="w-full flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" placeholder="Ej. Medellín" />
                            </div>

                            <div className="col-span-full border-t border-slate-100 my-4" />

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-800">Placa del vehículo</label>
                                <input type="text" className="w-full flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm uppercase ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" placeholder="ABC-123" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-800">Vehículo (Marca y Modelo)</label>
                                <input type="text" className="w-full flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" placeholder="Ej. Chevrolet Spark 2018" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-800">Sede preferida</label>
                                <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                                    <option value="" disabled selected>Seleccione una sede...</option>
                                    <option value="amalfi">Amalfi</option>
                                    <option value="medellin">Medellín</option>
                                    <option value="bogota">Bogotá</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-800">Fecha propuesta</label>
                                <input type="date" className="w-full flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
                            </div>

                            <div className="space-y-2 col-span-full">
                                <label className="text-sm font-semibold text-slate-800">¿Qué servicio requiere o qué repuesto busca?</label>
                                <textarea
                                    rows={4}
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    placeholder="Por favor describa el fallo de su vehículo o el repuesto que necesita cotizar..."
                                />
                            </div>
                        </div>

                        <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-base py-6">
                            Enviar Solicitud
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
