# Guía Completa del Proyecto - Carpyen Front

## 🎯 ¿Qué es este proyecto?

Este es un **frontend (interfaz de usuario)** para una aplicación web de diseño de interiores. Es decir, es la parte visual y la lógica que ves en el navegador.

---

## 🛠️ Tecnologías Principales

### 1. **React** 
- **Qué es**: Una librería de JavaScript para crear interfaces interactivas
- **Para qué sirve**: Permite crear componentes reutilizables (botones, formularios, tablas, etc.)
- **Versión**: 19.2.0

### 2. **TypeScript**
- **Qué es**: Es JavaScript pero con "superpoderes" - añade tipos de datos
- **Para qué sirve**: Evita errores detectándolos antes de que ocurran
- **Ejemplo**: 
  ```typescript
  // Sin TypeScript (puede fallar)
  function sumar(a, b) {
    return a + b;
  }
  sumar("5", 3); // Resultado inesperado: "53"

  // Con TypeScript (protegido)
  function sumar(a: number, b: number): number {
    return a + b;
  }
  sumar("5", 3); // ❌ Error detectado antes de ejecutar
  ```

### 3. **Vite**
- **Qué es**: Una herramienta moderna para desarrollar y construir aplicaciones web rápidamente
- **Para qué sirve**: 
  - Proporciona un servidor de desarrollo ultra-rápido
  - Compila el código optimizado para producción
  - Soporte para módulos ES importados automáticamente
- **Versión**: 7.2.4

### 4. **TailwindCSS**
- **Qué es**: Framework de estilos CSS
- **Para qué sirve**: Facilita diseñar interfaces bonitas sin escribir CSS tradicional
- **Cómo funciona**: Usas clases predefinidas en HTML
  ```tsx
  <button className="bg-blue-500 text-white px-4 py-2 rounded">
    Mi Botón
  </button>
  ```

### 5. **Shadcn/ui**
- **Qué es**: Librería de componentes visuales profesionales basados en Radix UI
- **Para qué sirve**: Proporciona componentes listos para usar (botones, diálogos, tablas, etc.)
- **Configuración**: Se define en `components.json`

---

## 📁 Estructura del Proyecto

```
carpyen-front/
├── src/                          # Código fuente de la aplicación
│   ├── components/               # Componentes reutilizables
│   │   ├── ui/                  # Componentes básicos (Button, Input, etc.)
│   │   ├── sidebar/             # Componentes de la barra lateral
│   │   ├── users/               # Componentes relacionados con usuarios
│   │   ├── table/               # Componentes de tablas
│   │   ├── theme/               # Tema visual (modo claro/oscuro)
│   │   └── core/                # Componentes principales
│   ├── routes/                   # Rutas de la aplicación (navegación)
│   ├── hooks/                    # Hooks personalizados de React
│   ├── services/                 # Llamadas a la API del backend
│   ├── store/                    # Estado global (Zustand)
│   ├── lib/                      # Utilidades y funciones auxiliares
│   ├── constants/                # Constantes usadas en la app
│   ├── types/                    # Definiciones de tipos TypeScript
│   ├── main.tsx                  # Archivo de entrada principal
│   └── index.css                 # Estilos globales
├── vite.config.ts               # Configuración de Vite
├── tsconfig.json                # Configuración de TypeScript
├── tailwind.config.js            # Configuración de TailwindCSS
├── eslint.config.js             # Reglas de calidad de código
└── package.json                 # Dependencias del proyecto
```

---

## ⚙️ El Archivo `vite.config.ts`

Este archivo configura cómo funciona Vite en tu proyecto:

```typescript
export default defineConfig({
  plugins: [
    // ✅ TanStack Router: Maneja la navegación entre páginas
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,  // Divide el código en partes más pequeñas
    }),
    // ✅ React: Permite usar JSX (HTML en JavaScript)
    react(),
    // ✅ TailwindCSS: Integra los estilos
    tailwindcss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),  // "@" es un atajo a carpeta src/
    },
  },
})
```

---

## 🔄 Flujo de la Aplicación

### 1. **Inicio**
- El navegador carga `index.html`
- Que ejecuta `src/main.tsx`

### 2. **Ruteo (Navegación)**
- **TanStack Router** maneja las diferentes páginas
- Rutas definidas en `src/routes/`
- Ejemplo:
  - `/` → Página de inicio
  - `/dashboard` → Panel de control
  - `/users` → Gestión de usuarios
  - `/suppliers` → Gestión de proveedores
  - `/clients` → Gestión de clientes

### 3. **Componentes**
- Cada página está formada por componentes reutilizables
- Los componentes vienen de `src/components/`

### 4. **Datos**
- **Consultas**: Se hacen al backend usando `TanStack Query` (en `hooks/useQuery.user.tsx`)
- **Mutaciones**: Se envían datos al backend usando `TanStack Query` (en `hooks/useMutation.user.tsx`)
- **API**: Configurada en `src/lib/api.ts`

### 5. **Estado Global**
- **Zustand** (en `src/store/`) guarda información global:
  - Autenticación (usuario logueado)
  - Tema (modo claro/oscuro)
  - Datos de la aplicación

---

## 📦 Librerías Clave

| Librería | Para Qué | Versión |
|----------|----------|---------|
| **@tanstack/react-router** | Navegación entre páginas | 1.143.4 |
| **@tanstack/react-query** | Gestión de datos del servidor | 5.90.12 |
| **@tanstack/react-form** | Gestión de formularios | 1.27.6 |
| **axios** | Realizar llamadas HTTP | 1.13.2 |
| **zustand** | Estado global de la app | 5.0.9 |
| **zod** | Validación de datos | 4.2.1 |
| **lucide-react** | Iconos | 0.562.0 |
| **@radix-ui/** | Componentes base accesibles | Variada |
| **sonner** | Notificaciones (toasts) | 2.0.7 |

---

## 🚀 Comandos Principales

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo (con hot reload)
npm run dev

# Compilar código para producción
npm run build

# Revisar errores de código
npm run lint

# Ver la versión compilada
npm run preview
```

---

## 🔗 Flujo de Datos Ejemplo: Listar Usuarios

1. **Componente** (ej: `src/routes/_protected/users/index.tsx`)
   - Renderiza la página de usuarios

2. **Hook de Consulta** (`src/hooks/users/useQuery.user.tsx`)
   - Usa `axios` para llamar `GET /api/v1/users`
   - Backend retorna lista de usuarios

3. **Tabla** (`src/components/table/data-table.tsx`)
   - Recibe los usuarios y los muestra en una tabla

4. **Acciones** (Editar/Eliminar)
   - Hook de Mutación (`src/hooks/users/useMutation.user.tsx`)
   - Envía datos al backend: `PUT /api/v1/users/{id}`
   - Actualiza la tabla automáticamente

---

## 🎨 Ejemplo: Crear un Componente

```tsx
// src/components/cards/user-card.tsx
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface UserCardProps {
  name: string;
  email: string;
  onEdit: () => void;
}

export function UserCard({ name, email, onEdit }: UserCardProps) {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-sm text-gray-600">{email}</p>
      <Button onClick={onEdit} className="mt-4">
        Editar
      </Button>
    </Card>
  );
}
```

---

## 🔧 Configuraciones Importantes

### `tsconfig.app.json`
- Configuración de TypeScript para la aplicación
- Define que `@` apunta a `src/`

### `components.json`
- Configuración de Shadcn/ui
- Define qué componentes UI usar
- Dónde guardar componentes nuevos

### `.env.example`
- Variables de entorno que necesita la app
- Debe renombrarse a `.env` y configurarse localmente
- Contiene: URL del servidor backend

---

## ✨ Tips Útiles

1. **Usar el alias `@`** para importar:
   ```tsx
   // ✅ Bueno
   import { Button } from "@/components/ui/button";
   
   // ❌ Malo (rutas relativas confusas)
   import { Button } from "../../../components/ui/button";
   ```

2. **Tipos TypeScript** - Siempre define tipos:
   ```tsx
   interface Props {
     title: string;
     count: number;
   }
   ```

3. **Componentes pequeños y reutilizables** - Mejor que componentes grandes

4. **Estado global (Zustand)** para datos que muchos componentes necesitan

5. **React Query** para sincronizar datos con el servidor

---

## 📞 Contacto con Backend

**URL Base**: Definida en `.env` como `VITE_API_URL`

**Ejemplo**: `http://localhost:8000/api/v1`

**Endpoints típicos**:
- `GET /users` - Listar usuarios
- `POST /users` - Crear usuario
- `PUT /users/{id}` - Actualizar usuario
- `DELETE /users/{id}` - Eliminar usuario

---

## 🐛 Solucionar Errores Comunes

| Error | Causa | Solución |
|-------|-------|----------|
| `Cannot find module '@/...'` | Alias no reconocido | Revisar `tsconfig.json` |
| `Port 5173 already in use` | Otro proceso usa el puerto | Cambiar puerto o matar proceso |
| `undefined is not a function` | Componente no importado correctamente | Revisar import y nombre |
| `API call failing` | Backend no accesible | Verificar `.env` y servidor backend |

---

**¡Listo! Ahora entiendes cómo funciona tu proyecto.** 🎉

Si tienes preguntas específicas sobre alguna parte, ¡pregunta sin problemas!
