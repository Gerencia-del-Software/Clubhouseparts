import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-slate-200">
                <div>
                    <h2 className="mt-2 text-center text-3xl font-extrabold text-slate-900">
                        Ingreso al Sistema
                    </h2>
                    <p className="mt-2 text-center text-sm text-slate-600">
                        Clubhouse parts
                    </p>
                </div>
                <form className="mt-8 space-y-6" action="#" method="POST">
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Correo electrónico</label>
                            <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" placeholder="Correo electrónico" />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Contraseña</label>
                            <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" placeholder="Contraseña" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded" />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-900">
                                Recordar mis datos
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                ¿Olvidó su contraseña?
                            </a>
                        </div>
                    </div>

                    <div>
                        {/* The user would eventually use next-auth properly, linking to admin dashboard for demo */}
                        <Link href="/dashboard" className="w-full flex">
                            <Button className="w-full py-6 text-base font-semibold shadow-md mx-auto relative flex justify-center">
                                Iniciar Sesión
                            </Button>
                        </Link>
                    </div>
                </form>

                <div className="text-center text-sm">
                    <span className="text-slate-600">¿No tienes cuenta? </span>
                    <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">Registrarse</Link>
                </div>
            </div>
        </div>
    )
}
