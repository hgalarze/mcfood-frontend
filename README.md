# McFood – Frontend en Next.js + Shadcn UI

Aplicación moderna construida con **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4** y **shadcn/ui**. Incluye un sitio público (Home, About, Contact, Menú y detalle de categoría) y un **panel de administración** para gestionar **Categorías, Productos y Usuarios**, consumiendo una API de backend.

---

## ✨ Características principales

✅ **Next.js App Router** bajo `/src/app`  
✅ **Tailwind CSS v4** + componentes **shadcn/ui (Radix)**  
✅ **TypeScript 100%**  
✅ **React Hook Form + Zod** para validación de formularios  
✅ CRUD completo (crear, editar, eliminar, ver detalles) para Categorías, Productos y Usuarios  
✅ Autenticación con cookies usando `credentials: "include"`  
✅ Optimización de imágenes con dominios remotos permitidos  
✅ Componentes reutilizables y helpers comunes

---

## 🧱 Tecnologías usadas

| Categoría | Tecnología |
|----------|-----------|
| Framework | Next.js 16 – App Router |
| Lenguaje | TypeScript |
| UI | shadcn/ui + Radix + Lucide Icons |
| Estilos | Tailwind CSS v4 (`@tailwindcss/postcss`) |
| Formularios | React Hook Form + Zod |
| Validación | @hookform/resolvers |
| Linting | ESLint 9 |
| Empaquetado | Compatible con npm / yarn / pnpm |

---

## 📁 Estructura del proyecto

```
src/
├─ app/
│  ├─ (public)/
│  │  ├─ page.tsx
│  │  ├─ about/
│  │  ├─ contact/
│  │  └─ menu/
│  │     └─ [slug]/
│  └─ admin/
│     ├─ page.tsx
│     ├─ categories/
│     ├─ products/
│     ├─ users/
│     └─ profile/
├─ components/
│  ├─ ui/                  # shadcn/ui
│  ├─ admin/
│  ├─ category-card.tsx
│  ├─ product-card.tsx
│  ├─ site-header.tsx
│  ├─ site-footer.tsx
│  └─ page-hero.tsx
├─ lib/
│  ├─ category-api.ts
│  ├─ product-api.ts
│  ├─ user-api.ts
│  ├─ data.ts
│  └─ utils.ts
└─ types/
   ├─ category.ts
   ├─ product.ts
   └─ user.ts
```

---

## 🔧 Configuración

### Variables de entorno

Debes definir tu backend:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Se usa en todos los archivos `*-api.ts`.

⚠️ Todos los `fetch` usan `credentials: "include"`, así que el backend debe:
- enviar cookies (ej. `authtoken`)
- permitir CORS con credenciales si está en otro dominio

---

## ▶️ Cómo ejecutar

### Requerimientos
- Node 20+
- Backend funcionando

### Instalar dependencias
```bash
npm install
# o yarn
# o pnpm install
```

### Desarrollo
```bash
npm run dev
```
Disponible en `http://localhost:3000`

### Producción
```bash
npm run build
npm run start
```

---

## 🔐 Autenticación (Panel Admin)

Login en:  
`src/components/admin/admin-login-form.tsx` (***http://localhost:3000/login***)

Llama a:
```
POST {NEXT_PUBLIC_API_URL}/api/users/login
```

- Envia `{ email, password }`
   - (ej: user: `admin@mcfood.com` | pass: `Admin1234`)
- Usa `credentials: "include"`
- El backend debe devolver cookie de authenticación

---

## 🔗 Endpoints usados

### Usuarios
- `POST /api/users/login`
- `GET /api/users`
- `GET /api/users/{id}`
- `GET /api/users/search?...`

### Categorías
- `GET /api/categories`
- `POST /api/categories`
- `PUT /api/categories/{id}`
- `PATCH /api/categories/{id}`
- `DELETE /api/categories/{id}`
- `GET /api/categories/search?...`

### Productos
- `GET /api/products`
- `POST /api/products`
- `PUT /api/products/{id}`
- `PATCH /api/products/{id}`
- `DELETE /api/products/{id}`
- `GET /api/products/{id}`
- `GET /api/products/search?...`
- `GET /api/products/by-category/{categoryId}`
- `GET /api/products/highlighted/{maxItems}`

---

## 🧭 Rutas

Públicas:
- `/`
- `/login`
- `/about`
- `/contact`
- `/menu`
- `/menu/[slug]`

Admin:
- `/admin` ***(en construcción)***
- `/admin/categories`
- `/admin/products`
- `/admin/users`
- `/admin/profile` ***(en construcción)***

---

## 🧪 Formularios y validación

- React Hook Form
- Zod
- Modales CRUD para cada módulo

---

## 🧰 Utils

En `src/lib/utils.ts`:
- `cn()`
- `formatDate()`
- `getPlaceholderImageUrl()`

---

## 🛠 Scripts

```
npm run dev
npm run build
npm run start
npm run lint
```

---

## 🚀 Deploy

- Compatible con Vercel
- Agregar dominios de imagen a `next.config.ts`
- Definir `NEXT_PUBLIC_API_URL` en prod

---

## 📄 Licencia

[MIT License](LICENSE)
