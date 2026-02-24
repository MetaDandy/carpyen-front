import { querykey } from "@/constants/querykey";
import type { CreateProduct, UpdateProduct } from "@/services/inventory/product/product.schema";
import productService from "@/services/inventory/product/product.service";
import { useDialogStore } from "@/store/dialog.store";
import type { QueryMutationOptions } from "@/types/mutation-options";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useMutationCreateProduct(options?: QueryMutationOptions) {
    const queryClient = useQueryClient();
    const closeDialog = useDialogStore((state) => state.closeDialog);
    
    return useMutation({
        mutationFn: (data: CreateProduct) => productService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [querykey.inventory.products] })
            toast.dismiss();
            toast.success('Producto creado exitosamente')
            if (options?.dialogId) {
                closeDialog(options.dialogId)
            }
        },
        onError: (error) => {
            toast.dismiss();
            console.error('Error creating product:', error)
            toast.error('Error creando producto')
        },
        onMutate: () => {
            toast.loading('Creando producto...')
        }
    })

}

export function useMutationUpdateProduct(productId: string, options?: QueryMutationOptions) {
    const queryClient = useQueryClient()
    const closeDialog = useDialogStore((state) => state.closeDialog)

    return useMutation({
        mutationFn: ({id, data}: {id: string, data: UpdateProduct}) => productService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [querykey.inventory.products] })
            queryClient.invalidateQueries({ queryKey: [querykey.inventory.product, productId] })
            toast.dismiss();
            toast.success('Producto actualizado exitosamente')
            if (options?.dialogId) {
                closeDialog(options.dialogId)
            }
        },
        onError: (error) => {
            toast.dismiss();
            console.error('Error updating product:', error)
            toast.error('Error actualizando producto')
        },
        onMutate: () => {
            toast.loading('Actualizando producto...')
        }
    })
}