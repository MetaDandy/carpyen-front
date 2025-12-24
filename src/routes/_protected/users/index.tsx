import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { type ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/table/data-table'
import userService from '@/services/user/user.service'
import { createQueryParams } from '@/services/pagination.schema'
import type { User } from '@/services/user/user.schema'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
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
  const [page, setPage] = useState(1)
  const [limit] = useState(10)

  const { data, isLoading } = useQuery({
    queryKey: ['users', page, limit],
    queryFn: () => userService.getAll(createQueryParams(page, limit)),
  })

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
              <DropdownMenuItem>Editar</DropdownMenuItem>
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
        <Button>Nuevo Usuario</Button>
      </div>

      <DataTable
        columns={columns}
        data={data?.data || []}
        pageCount={data?.pages || 1}
        currentPage={page}
        onPageChange={setPage}
        loading={isLoading}
      />
    </div>
  )
}
