import { Bell, Search, MapPin, ChevronDown } from "lucide-react"

export function Topbar() {
    return (
        <header className="h-16 border-b bg-white flex items-center justify-between px-6 shadow-sm z-10 sticky top-0">

            {/* Search Bar */}
            <div className="flex-1 max-w-md hidden md:flex">
                <div className="relative w-full">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Buscar productos, clientes u órdenes (Ctrl+K)..."
                        className="w-full h-9 pl-9 pr-4 rounded-md border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4 ml-auto">
                {/* Branch Selector */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-md border border-slate-200 cursor-pointer hover:bg-slate-200 transition-colors">
                    <MapPin className="h-4 w-4 text-slate-500" />
                    <span className="text-sm font-medium text-slate-700">Sede Medellín</span>
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                </div>

                {/* Notifications */}
                <div className="relative cursor-pointer p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <Bell className="h-5 w-5 text-slate-600" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white"></span>
                </div>

                {/* User Mobile Toggle */}
                <div className="md:hidden w-8 h-8 rounded-full bg-blue-500 flex flex-shrink-0 items-center justify-center text-white font-bold text-sm cursor-pointer">
                    A
                </div>
            </div>
        </header>
    )
}
