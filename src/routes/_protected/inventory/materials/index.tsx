import { DataTable } from '@/components/table/data-table'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { breadcrumb } from '@/constants/breadcrumb'
import { useGetAllMaterials } from '@/hooks/modules/inventory/material/useQuery.material'
import { useTableFilters } from '@/hooks/use-table-filters'
import type { Material } from '@/services/inventory/material/material.schema'
import { useBreadcrumbStore } from '@/store/breadcrumb'
import { useDialogStore } from '@/store/dialog.store'
import { createFileRoute } from '@tanstack/react-router'
import { MoreHorizontal } from 'lucide-react'
import type { ColumnDef } from 'node_modules/@tanstack/table-core/build/lib/types'
import { useEffect } from 'react'

export const Route = createFileRoute('/_protected/inventory/materials/')({
  component: RouteComponent,
})

function RouteComponent() {
    const { 
        offset, 
        limit, 
        searchQuery, 
        searchField, 
        setOffset, 
        setLimit,
        setSearchQuery, 
        setSearchField 
      } = useTableFilters({ initialSearchField: 'name' })
  const setBreadcrumbs = useBreadcrumbStore((state) => state.setBreadcrumbs)
  const { openDialog } = useDialogStore()
   const { data, isLoading } = useGetAllMaterials({
      offset,
      limit,
      search: searchQuery,
      search_field: searchField,
    })
    
  const columns: ColumnDef<Material>[] = [
    {
      accessorKey: 'name',
      header: 'Nombre',
    },
    {
      accessorKey: 'type',
      header: 'Tipo',
    },
    {
      accessorKey: 'unit_measure',
      header: 'Unidad de medida',
    },
     {
      accessorKey: 'unit_price',
      header: 'Precio unitario',
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
                  console.log("Ver detalles material", user.id)
                }}
              >
                Ver detalles
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  console.log("Editar material", user.id)
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
  ];

  const handleCreateMaterial = () => {
    const dialogId = "create-material-dialog"
    openDialog({
      id: dialogId,
      title: "Crear nuevo material",
      description: "Completa el formulario para crear un nuevo material",
      content: "contenido del diálogo de creación de material",
    })
  }

  useEffect(() => {
    setBreadcrumbs([
      { label: breadcrumb.inventory.materials.label, 
        path: breadcrumb.inventory.materials.path }
    ])
  }, [setBreadcrumbs])
  
  
    return (
      <div className="flex flex-col gap-8 p-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Materiales</h1>
              <p className="text-muted-foreground mt-1">Gestiona los materiales del sistema</p>
            </div>
            <Button onClick={handleCreateMaterial}>Nuevo Material</Button>
          </div>
    
          <DataTable
            columns={columns}
            data={data?.data || []}
            total={data?.total || 0}
            offset={data?.offset || 0}
            limit={limit}
            onOffsetChange={setOffset}
            onLimitChange={setLimit}
            loading={isLoading}
            search={{
              query: searchQuery,
              field: searchField,
              onQueryChange: setSearchQuery,
              onFieldChange: setSearchField,
              columns: [
                { key: 'name', label: 'Nombre' },
                { key: 'type', label: 'Tipo' },
                { key: 'unit_measure', label: 'Unidad de medida' },
                { key: 'unit_price', label: 'Precio unitario' },
              ]
            }}
          />
        </div>
      )
}
