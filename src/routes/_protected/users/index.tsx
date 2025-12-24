import { useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { type ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/table/data-table'
import { useBreadcrumbStore } from '@/store/breadcrumb'
import { useTableFilters } from '@/hooks/use-table-filters'
import { useAppStore } from '@/store/app'
import userService from '@/services/user/user.service'
import { createQueryParams } from '@/services/pagination.schema'
import type { User, Create, Update } from '@/services/user/user.schema'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { toast } from 'sonner'
import UserForm from '@/components/users/user.form'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const Route = createFileRoute('/_protected/users/')({
  component: Users,
})

function Users() {
  const queryClient = useQueryClient()
  const { 
    page, 
    limit, 
    searchQuery, 
    searchField, 
    setPage, 
    setLimit,
    setSearchQuery, 
    setSearchField 
  } = useTableFilters({ initialSearchField: 'name' })
  const { setBreadcrumbs } = useBreadcrumbStore()
  const { openDialog } = useAppStore()

  useEffect(() => {
    setBreadcrumbs([
      { label: 'Usuarios', path: '/users' }
    ])
  }, [setBreadcrumbs])

  const { data, isLoading } = useQuery({
    queryKey: ['users', page, limit, searchQuery, searchField],
    queryFn: () => userService.getAll(createQueryParams(page, limit, {
      search: searchQuery,
      search_field: searchField,
    })),
  })

  // Mutación para crear usuario
  const createMutation = useMutation({
    mutationFn: (data: Create) => userService.create(data),
    onSuccess: () => {
      toast.success('Usuario creado exitosamente')
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Error al crear usuario')
    },
  })

  // Mutación para actualizar usuario
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Update }) =>
      userService.update(id, data),
    onSuccess: () => {
      toast.success('Usuario actualizado exitosamente')
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Error al actualizar usuario')
    },
  })

  // Función para abrir el diálogo de crear usuario
  const handleOpenCreateDialog = () => {
    openDialog({
      title: 'Crear Nuevo Usuario',
      content: (
        <UserForm
          onSubmit={async (formData) => {
            await createMutation.mutateAsync(formData as Create)
          }}
          isLoading={createMutation.isPending}
        />
      ),
      confirmText: undefined,
      cancelText: 'Cerrar',
    })
  }

  // Función para abrir el diálogo de editar usuario
  const handleOpenEditDialog = (user: User) => {
    openDialog({
      title: 'Editar Usuario',
      content: (
        <UserForm
          user={user}
          onSubmit={async (formData) => {
            await updateMutation.mutateAsync({
              id: user.id,
              data: formData as Update,
            })
          }}
          isLoading={updateMutation.isPending}
        />
      ),
      confirmText: undefined,
      cancelText: 'Cerrar',
    })
  }

  // Definir columnas
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'phone',
      header: 'Teléfono',
    },
    {
      accessorKey: 'role',
      header: 'Rol',
    },
    {
      id: 'actions',
      header: 'Acciones',
      cell: ({ row }) => {
        const user = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  window.location.href = `/users/${user.id}`
                }}
              >
                Ver detalles
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  handleOpenEditDialog(user)
                }}
              >
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Eliminar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Usuarios</h1>
          <p className="text-muted-foreground mt-1">Gestiona los usuarios del sistema</p>
        </div>
        <Button onClick={handleOpenCreateDialog}>Nuevo Usuario</Button>
      </div>

      <DataTable
        columns={columns}
        data={data?.data || []}
        pageCount={data?.pages || 1}
        currentPage={page}
        onPageChange={setPage}
        loading={isLoading}
        total={data?.total || 0}
        offset={data?.offset || 0}
        limit={limit}
        onLimitChange={setLimit}
        search={{
          query: searchQuery,
          field: searchField,
          onQueryChange: setSearchQuery,
          onFieldChange: setSearchField,
          columns: [
            { key: 'name', label: 'Nombre' },
            { key: 'email', label: 'Email' },
            { key: 'phone', label: 'Teléfono' },
            { key: 'role', label: 'Rol' },
          ]
        }}
      />
    </div>
  )
}
