# 📋 Resumen: Archivos Modificados/Creados para Usuarios

## 🎯 Vista Rápida

```
✅ = Ya existe / Reutilizable
🆕 = Nuevo / Específico del módulo
⚙️ = Modificación en existente
```

---

## 📁 Archivos Creados/Modificados por Users

### 1️⃣ **Carpeta: `src/services/user/`** 🆕

#### `user.schema.ts`
```
✅ ¿Es exclusivo de Users? SÍ
🔄 ¿Reutilizable para Materials? NO
📝 Acción para Materials: Crear `src/services/material/material.schema.ts` idéntico en estructura
```

**Contenido:**
- `LoginSchema` - para login
- `UserSchema` - estructura de usuario
- `CreateUserSchema` - validación para crear
- `UpdateUserSchema` - validación para editar
- `UpdateUserProfileSchema` - validación de perfil
- `UserListSchema` - para listar

**Estructura Recomendada:**
```
src/services/
├── user/
│   ├── user.schema.ts      🆕 Creas esto
│   └── user.service.ts     🆕 Creas esto
├── material/               🆕 CREAR para Materials
│   ├── material.schema.ts  🆕 Creas esto (diferente contenido)
│   └── material.service.ts 🆕 Creas esto (diferente contenido)
├── pagination.schema.ts    ✅ YA EXISTE (compartido)
```

---

#### `user.service.ts`
```
✅ ¿Es exclusivo de Users? SÍ
🔄 ¿Reutilizable para Materials? NO
📝 Acción para Materials: Crear `src/services/material/material.service.ts` con la misma estructura
```

**Contenido:**
- `login()`
- `get()`
- `getProfile()`
- `getAll()` - con QueryParams
- `create()`
- `update()`
- `updateProfile()`

**Patrón a seguir:**
```typescript
// SÍ NECESITAS CREAR uno nuevo para Materials
class MaterialService {
  async getAll(options: QueryParams): Promise<Paginated<Material>> { ... }
  async get(id: string): Promise<Material> { ... }
  async create(data: CreateMaterial): Promise<void> { ... }
  async update(id: string, data: UpdateMaterial): Promise<void> { ... }
  async delete(id: string): Promise<void> { ... }
}
```

---

### 2️⃣ **Carpeta: `src/hooks/users/`** 🆕

#### `useQuery.user.tsx`
```
✅ ¿Es exclusivo de Users? SÍ
🔄 ¿Reutilizable para Materials? NO
📝 Acción para Materials: Crear `src/hooks/materials/useQuery.material.tsx`
```

**Contenido:**
```typescript
export function useQueryUser(query: QueryParams) { ... }
export function useGetUser(userId: string) { ... }
```

**Para Materials debes crear:**
```typescript
export function useQueryMaterial(query: QueryParams) { ... }
export function useGetMaterial(materialId: string) { ... }
```

---

#### `useMutation.user.tsx`
```
✅ ¿Es exclusivo de Users? SÍ
🔄 ¿Reutilizable para Materials? NO
📝 Acción para Materials: Crear `src/hooks/materials/useMutation.material.tsx`
```

**Contenido:**
```typescript
export function useCreateUserMutation(options?: QueryMutationOptions) { ... }
export function useUpdateUserMutation(userId: string, options?: QueryMutationOptions) { ... }
```

**Para Materials debes crear:**
```typescript
export function useCreateMaterialMutation(options?: QueryMutationOptions) { ... }
export function useUpdateMaterialMutation(materialId: string, options?: QueryMutationOptions) { ... }
export function useDeleteMaterialMutation(options?: QueryMutationOptions) { ... }
```

---

### 3️⃣ **Carpeta: `src/components/users/`** 🆕

#### `user.form.tsx`
```
✅ ¿Es exclusivo de Users? SÍ
🔄 ¿Reutilizable para Materials? NO
📝 Acción para Materials: Crear `src/components/modules/inventory/material/form.material.tsx`
```

**Nota:** YA EXISTE `src/components/modules/inventory/material/form.material.tsx` pero está vacío

---

### 4️⃣ **Carpeta: `src/routes/_protected/users/`** 🆕

#### `index.tsx`
```
✅ ¿Es exclusivo de Users? SÍ
🔄 ¿Reutilizable para Materials? NO
📝 Acción para Materials: Crear `src/routes/_protected/inventory/index.tsx`
```

**Nota:** Ya existe esta carpeta pero está vacía. Debes crear la ruta completa.

---

## ✅ Archivos Compartidos (Ya Existen)

Estos NO necesitas modificar para cada módulo:

### `src/constants/querykey.ts`
```
🔄 ¿Necesita modificación para Materials?
SÍ, pero SÓ LO PARA AGREGAR nuevas keys
```

**Contenido actual:**
```typescript
export const querykey = {
    user: 'user',
    users: 'users',
}
```

**Para Materials debes AGREGAR:**
```typescript
export const querykey = {
    user: 'user',
    users: 'users',
    material: 'material',      // 👈 AGREGAR
    materials: 'materials',    // 👈 AGREGAR
}
```

---

### `src/store/dialog.store.ts` ✅
```
🔄 ¿Necesita modificación? NO
📝 Se usa tal cual para todos los módulos
```

**Por qué:** Es genérico, no depende del tipo de dato

---

### `src/store/breadcrumb.ts` ✅
```
🔄 ¿Necesita modificación? NO
📝 Se usa igual en Users y se usará igual en Materials
```

---

### `src/hooks/use-table-filters.ts` ✅
```
🔄 ¿Necesita modificación? NO
📝 Hook genérico, reutilizable para todas las tablas
```

---

### `src/components/table/data-table.tsx` ✅
```
🔄 ¿Necesita modificación? NO
📝 Componente genérico, reutilizable para todas las tablas
```

---

### `src/components/core/dialog.core.tsx` ✅
```
🔄 ¿Necesita modificación? NO
📝 Renderiza cualquier diálogo sin importar el módulo
```

---

### `src/lib/api.ts` ✅
```
🔄 ¿Necesita modificación? NO
📝 Cliente HTTP compartido
```

---

### `src/services/pagination.schema.ts` ✅
```
🔄 ¿Necesita modificación? NO
📝 QueryParams y Paginated<T> son genéricos
```

---

## 📊 Tabla Resumen de Archivos

| Archivo | Tipo | Exclusivo Users | ¿Qué hacer para Materials? |
|---------|------|-----------------|---------------------------|
| `src/services/user/user.schema.ts` | 🆕 | ✅ SÍ | Crear `material.schema.ts` |
| `src/services/user/user.service.ts` | 🆕 | ✅ SÍ | Crear `material.service.ts` |
| `src/hooks/users/useQuery.user.tsx` | 🆕 | ✅ SÍ | Crear `useQuery.material.tsx` |
| `src/hooks/users/useMutation.user.tsx` | 🆕 | ✅ SÍ | Crear `useMutation.material.tsx` |
| `src/components/users/user.form.tsx` | 🆕 | ✅ SÍ | Usar `form.material.tsx` existente |
| `src/routes/_protected/users/index.tsx` | 🆕 | ✅ SÍ | Crear ruta inventory |
| `src/constants/querykey.ts` | ⚙️ | ❌ NO | **AGREGAR 2 KEYS** |
| `src/store/dialog.store.ts` | ✅ | ❌ NO | No modificar |
| `src/store/breadcrumb.ts` | ✅ | ❌ NO | No modificar |
| `src/hooks/use-table-filters.ts` | ✅ | ❌ NO | No modificar |
| `src/components/table/data-table.tsx` | ✅ | ❌ NO | No modificar |
| `src/components/core/dialog.core.tsx` | ✅ | ❌ NO | No modificar |
| `src/lib/api.ts` | ✅ | ❌ NO | No modificar |
| `src/services/pagination.schema.ts` | ✅ | ❌ NO | No modificar |

---

## 🔄 Flujo que Debes Seguir para Materials

### PASO 1: Crear Schema
```
src/services/material/material.schema.ts
Copiar estructura de user.schema.ts pero con campos de Material
```

### PASO 2: Crear Service
```
src/services/material/material.service.ts
Copiar estructura de user.service.ts pero apuntando a /materials
```

### PASO 3: Crear Hooks Query
```
src/hooks/materials/useQuery.material.tsx
- useQueryMaterial(query: QueryParams)
- useGetMaterial(materialId: string)
```

### PASO 4: Crear Hooks Mutation
```
src/hooks/materials/useMutation.material.tsx
- useCreateMaterialMutation()
- useUpdateMaterialMutation()
- useDeleteMaterialMutation()
```

### PASO 5: Completar Formulario
```
src/components/modules/inventory/material/form.material.tsx
Ya existe pero está vacío. Completar con validación de Material
```

### PASO 6: Crear Ruta
```
src/routes/_protected/inventory/index.tsx
Copiar estructura de users/index.tsx pero para Materials
```

### PASO 7: Actualizar QueryKeys
```
src/constants/querykey.ts
Agregar:
  material: 'material',
  materials: 'materials',
```

### PASO 8: (OPCIONAL) Crear Dialog para Detalles
```
Si necesitas modal de detalles, similar al de users
Crear componente que use useGetMaterial()
```

---

## 🗂️ Estructura Final para Materials

```
src/
├── services/
│   └── material/                       ← Carpeta nueva
│       ├── material.schema.ts         🆕
│       └── material.service.ts        🆕
├── hooks/
│   └── materials/                      ← Carpeta nueva
│       ├── useQuery.material.tsx      🆕
│       └── useMutation.material.tsx   🆕
├── components/
│   └── modules/
│       └── inventory/
│           └── material/
│               └── form.material.tsx  ⚙️ (completar)
├── routes/
│   └── _protected/
│       ├── inventory/                  ← Carpeta nueva
│       │   └── index.tsx              🆕 (ruta)
│       └── users/
│           └── index.tsx              ✅ (ya existe)
├── constants/
│   └── querykey.ts                    ⚙️ (agregar keys)
├── store/                              ✅ (no tocar)
├── lib/                                ✅ (no tocar)
└── components/
    ├── table/                          ✅ (no tocar)
    ├── core/                           ✅ (no tocar)
    └── users/                          ✅ (no tocar)
```

---

## 📋 Checklist Completo para Implementar Materials

```markdown
PASO 1: Crear Schema
- [ ] Crear: src/services/material/material.schema.ts
- [ ] Definir schemas: MaterialSchema, CreateMaterialSchema, UpdateMaterialSchema

PASO 2: Crear Service
- [ ] Crear: src/services/material/material.service.ts
- [ ] Métodos: getAll(), get(), create(), update(), delete()
- [ ] Manejo de errores igual a user.service.ts

PASO 3: Crear Hooks
- [ ] Crear: src/hooks/materials/useQuery.material.tsx
- [ ] Crear: src/hooks/materials/useMutation.material.tsx
- [ ] Implementar dialogId en mutations

PASO 4: Completar Formulario
- [ ] Completar: src/components/modules/inventory/material/form.material.tsx
- [ ] Usar patron de user.form.tsx

PASO 5: Crear Ruta
- [ ] Crear: src/routes/_protected/inventory/index.tsx
- [ ] Copiar estructura de users pero con Material
- [ ] Definir columnas para DataTable

PASO 6: Actualizar Query Keys
- [ ] Editar: src/constants/querykey.ts
- [ ] Agregar: material, materials

PASO 7: Testing
- [ ] Verificar que la ruta se carga
- [ ] Verificar que DataTable funciona
- [ ] Verificar que el modal se abre
- [ ] Verificar que se crea un material
- [ ] Verificar que se edita un material
- [ ] Verificar que se puede ver detalle
```

---

## 🎯 Lo Importante a Entender

### Archivos Específicos del Módulo (Schema, Service, Hooks, Componentes)

```
Cada módulo (users, materials, suppliers, etc.) necesita:

1. Schema propio - Define la estructura de datos
2. Service propio - Habla con la API
3. Hooks propios - Maneja estado de React Query
4. Componentes propios - UI específica del módulo

❌ NO se comparten entre módulos
❌ NO se reutilizan
```

### Archivos Genéricos/Compartidos

```
Estos NO tienes que tocar para cada módulo:

1. Dialog Store - Gestiona diálogos genéricamente
2. Breadcrumb Store - Gestiona breadcrumbs
3. useTableFilters - Hook para filtros de tabla
4. DataTable - Componente genérico de tabla
5. DialogCore - Renderiza los diálogos
6. API client - Cliente HTTP
7. Pagination schema - Estructura genérica

✅ Se usan iguales para todos los módulos
✅ No necesitan cambios
```

---

## 💡 Analogía

Piensa que cada módulo es una **"factoría"**:

```
┌─────────────────────────────────────────┐
│         USUARIOS (Factoría)             │
├─────────────────────────────────────────┤
│  Schema → Service → Hooks → Componentes │
│ (Específico de Usuarios)                │
└────────┬────────────────────────────────┘
         │
         └──→ Usa ───→ Dialog Store (Compartido)
         └──→ Usa ───→ DataTable (Compartido)
         └──→ Usa ───→ useTableFilters (Compartido)

┌─────────────────────────────────────────┐
│      MATERIALES (Factoría)              │
├─────────────────────────────────────────┤
│  Schema → Service → Hooks → Componentes │
│ (Específico de Materiales)              │
└────────┬────────────────────────────────┘
         │
         └──→ Usa ───→ Dialog Store (Compartido)
         └──→ Usa ───→ DataTable (Compartido)
         └──→ Usa ───→ useTableFilters (Compartido)
```

Cada módulo tiene su propia "maquinaria" pero comparten herramientas comunes.

---

## ✅ Ahora Entiendes

1. **¿Qué archivos crearon para Users?** → Schema, Service, Hooks, Formulario, Ruta
2. **¿Son exclusivos de Users?** → SÍ (excepto querykey que solo necesita 2 líneas)
3. **¿Qué cambios para Materials?** → Crear los mismos tipos de archivos pero para material
4. **¿Flujo a seguir?** → Schema → Service → Hooks → Form → Route
5. **¿Qué NO tocar?** → Dialog Store, DataTable, useTableFilters, API client, Pagination schema

---

## 🚀 Próximo Paso

Cuando hagas Materials, simplemente:

1. Abre `user.schema.ts` → Copia estructura → Adapta campos
2. Abre `user.service.ts` → Copia estructura → Cambia `/users` por `/materials`
3. Abre `useQuery.user.tsx` → Copia → Adapta nombres
4. Abre `useMutation.user.tsx` → Copia → Adapta nombres
5. Completa `form.material.tsx` siguiendo el patrón de `user.form.tsx`
6. Copia `users/index.tsx` → Adapta para materiales
7. Agrega 2 keys a `querykey.ts`

**¡Y listo!** 🎉
