import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Clubhouse parts - Taller Automotriz y Venta de Repuestos',
    description: 'Sistema integral de gestión de taller, repuestos y servicios automotrices.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="es" suppressHydrationWarning>
            <body className={`${inter.className} min-h-screen antialiased`}>
                {children}
            </body>
        </html>
    )
}
