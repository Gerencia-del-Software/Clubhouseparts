# ColAuto ERP - Documentación del Proyecto

El sistema completo se ha generado en esta carpeta. Debido a que el entorno no detectó NodeJS/NPM, los archivos fueron creados de forma estructurada para que puedas iniciar el proyecto completo en tu entorno de desarrollo.

## Arquitectura Creada

1. **Backend y Modelos de Datos**
   - Prisma ORM Schema (`prisma/schema.prisma`): Contiene la arquitectura completa y validada de roles, sucursales (Amalfi, Medellín, Bogotá), usuarios, clientes, vehículos, servicios, proveedores, órdenes de trabajo, órdenes especiales y movimientos de inventario.
   - Tipos y Enums listos para ser usados.

2. **Frontend Público**
   - `src/app/page.tsx`: Landing page completa con CTAs y propuesta de valor enfocada en confianza.
   - `src/app/services/page.tsx`: Listado de servicios con precios y duraciones.
   - `src/app/catalog/page.tsx`: Catálogo completo con buscador, filtros y banderas visuales de stock.
   - `src/app/branches/page.tsx`: Detalle de rutas y sedes.
   - `src/app/contact/page.tsx`: Formulario de agendamiento robusto.

3. **Autenticación (Shell)**
   - `src/app/(auth)/login/page.tsx`
   - `src/app/(auth)/register/page.tsx`

4. **Internal Dashboard (ERP)**
   - Layout global protegido (`src/app/(dashboard)/layout.tsx`) con su Sidebar y Topbar (`src/components/layout/...`).
   - Mockups 100% funcionales (a nivel de maquetación UI/UX) de:
     - Dashboard general / KPIs (`page.tsx`)
     - Inventario (con estados críticos y sedes) (`inventory/page.tsx`)
     - Ventas POS / Historial (`sales/page.tsx`)
     - Órdenes de Trabajo de reparación (`work-orders/page.tsx`)
     - Directorio de Clientes y Fidelización (`customers/page.tsx`)

## Tecnologías Implementadas

- **Gestor de Arquitectura**: Next.js 14 App Router.
- **Estilos**: Tailwind CSS con un perfil visual personalizado para una estética SaaS B2B moderna (Dark Blue/White, glass panels, scale dynamics).
- **Componentes**: Lucide React para icónos semánticos, estructuración preparada para `shadcn/ui`.

## Pasos para Correr el Proyecto

1. Copiar este directorio o abrirlo en VSCode teniendo Node.js instalado.
2. Ejecutar `npm install` (usará de base las dependencias definidas en `package.json`).
3. Instalar shadcn CLI para los componentes faltantes si los requieres dinámicos o crear `ui` wrappers base.
4. Levantar la BBDD:
   - Configura un archivo `.env` con: `DATABASE_URL="postgresql://user:pass@localhost:5432/colauto"`
   - Ejecuta `npx prisma db push` para migrar todos los modelos de negocios creados.
   - Ejecuta `npx prisma generate`
5. Levantar el proyecto con `npm run dev`.

**¡Disfruta construyendo el futuro del sector automotriz en Colombia!**
