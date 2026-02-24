import ProductForm from '@/components/modules/inventory/product/form.product'
import { DataTable } from '@/components/table/data-table'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { breadcrumb } from '@/constants/breadcrumb'
import { useGetAllProducts } from '@/hooks/modules/inventory/product/useQuery.product'
import { useTableFilters } from '@/hooks/use-table-filters'
import type { Product } from '@/services/inventory/product/product.schema'
import { useBreadcrumbStore } from '@/store/breadcrumb'
import { useDialogStore } from '@/store/dialog.store'
import { createFileRoute } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { useEffect } from 'react'

export const Route = createFileRoute('/_protected/inventory/products/')({
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
  const { openDialog } = useDialogStore();

  useEffect(() => {
    setBreadcrumbs([
      {
        label: breadcrumb.inventory.products.label,
        path: breadcrumb.inventory.products.path
      }
    ]);
  }, [setBreadcrumbs])

  const { data, isLoading } = useGetAllProducts({
    offset,
    limit,
    search: searchQuery,
    search_field: searchField,
  });

  console.log('Productos:', data)

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: 'name',
      header: 'Nombre',
    },
    {
      accessorKey: 'type',
      header: 'Tipo',
    },
    {
      accessorKey: 'unit_price',
      header: 'Precio Unitario',
    },
    // {
    //   accessorKey: 'user.name',
    //   header: 'Usuario',
    // },
    {
      id: 'actions',
      header: 'Acciones',
      cell: ({ row }) => {
        const product = row.original

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
                  console.log('Ver detalles del producto', product.id)
                }}
              >
                Ver detalles
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleUpdate(product)}
              >
                Editar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ];

  const handleCreate = () => {
    const dialogId = "create-product-dialog";
    openDialog({
      id: dialogId,
      title: "Crear Producto",
      description: "Completa los detalles del nuevo producto.",
      content: <ProductForm id={dialogId} />,
    })
  }

  const handleUpdate = (product: Product) => {
    const dialogId = `update-product-dialog-${product.id}`;
    openDialog({
      id: dialogId,
      title: "Editar Producto",
      description: "Actualiza los detalles del producto.",
      content: <ProductForm id={dialogId} product={product} />,
    })
  }

  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Productos</h1>
          <p className="text-muted-foreground mt-1">Gestiona los productos del sistema</p>
        </div>
        <Button onClick={handleCreate}>Nuevo Producto</Button>
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
            { key: 'unitPrice', label: 'Precio' },
          ]
        }}
      />
    </div>
  )
}
