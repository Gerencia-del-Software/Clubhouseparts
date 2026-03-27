import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-6 bg-white p-10 rounded-2xl shadow-xl border border-slate-200">
                <div>
                    <h2 className="text-center text-3xl font-extrabold text-slate-900">
                        Registro de Cliente
                    </h2>
                    <p className="mt-2 text-center text-sm text-slate-600">
                        Únete a Clubhouse parts
                    </p>
                </div>
                <form className="mt-8 space-y-6" action="#" method="POST">
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label className="text-sm font-semibold text-slate-800">Nombre completo</label>
                            <input name="name" type="text" required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" placeholder="Ej. Carlos Martínez" />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-slate-800">Teléfono</label>
                            <input name="phone" type="tel" required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" placeholder="Ej. 300 123 4567" />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-slate-800">Correo electrónico</label>
                            <input name="email" type="email" required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" placeholder="correo@ejemplo.com" />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-slate-800">Ciudad</label>
                            <input name="city" type="text" className="appearance-none rounded-md relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" placeholder="Ej. Medellín" />
                        </div>
                        <div className="border-t pt-4">
                            <label className="text-sm font-semibold text-slate-800">Contraseña</label>
                            <input name="password" type="password" required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" placeholder="Contraseña" />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-slate-800">Confirmar Contraseña</label>
                            <input name="confirm_password" type="password" required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" placeholder="Confirmar Contraseña" />
                        </div>
                    </div>

                    <div>
                        <Button className="w-full py-6 text-base font-semibold shadow-md mx-auto relative flex justify-center bg-blue-600 hover:bg-blue-700">
                            Crear Cuenta
                        </Button>
                    </div>
                </form>

                <div className="text-center text-sm">
                    <span className="text-slate-600">¿Ya tienes cuenta? </span>
                    <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">Iniciar Sesión</Link>
                </div>
            </div>
        </div>
    )
}
