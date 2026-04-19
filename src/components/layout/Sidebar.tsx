import { cn } from "@/lib/utils"
import Link from "next/link"
import {
    LayoutDashboard, Package, ShoppingCart, Users, Wrench,
    Settings, Receipt, TrendingUp, Heart, Bot, FileText,
    Truck
} from "lucide-react"

export function Sidebar() {
    const routes = [
        { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
        { name: "Inventario", icon: Package, href: "/inventory" },
        { name: "Ventas", icon: ShoppingCart, href: "/sales" },
        { name: "Órdenes de Trabajo", icon: Wrench, href: "/work-orders" },
        { name: "Clientes", icon: Users, href: "/customers" },
        { name: "Facturación", icon: Receipt, href: "/invoices" },
        { name: "Reportes", icon: TrendingUp, href: "/reports" },
        { name: "Fidelización", icon: Heart, href: "/loyalty" },
        { name: "Configuración", icon: Settings, href: "/settings" },
    ]

    return (
        <div className="hidden border-r bg-slate-900 text-slate-300 md:block w-64 h-full flex-shrink-0 relative overflow-y-auto">
            <div className="p-6">
                <div className="flex items-center gap-2 mb-8 text-white">
                    <Wrench className="h-6 w-6 text-blue-500" />
                    <span className="text-xl font-bold">Clubhouse parts</span>
                </div>

                <nav className="space-y-1 mt-6">
                    {routes.map((route, i) => (
                        <Link
                            key={i}
                            href={route.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                i === 0 ? "bg-blue-600 text-white" : "hover:bg-slate-800 hover:text-white"
                            )}
                        >
                            <route.icon className="h-5 w-5 shrink-0" />
                            {route.name}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Mini user profile at bottom */}
            <div className="absolute w-full bottom-0 p-4 border-t border-slate-800 bg-slate-900">
                <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
                        AD
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-white">Administrador</p>
                        <p className="text-xs text-slate-400">admin@clubhouseparts.com</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
