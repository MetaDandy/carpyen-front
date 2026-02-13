import { querykey } from "@/constants/querykey";
import type { CreateProduct, UpdateProduct } from "@/services/inventory/product/product.schema";
import productService from "@/services/inventory/product/product.service";
import { useDialogStore } from "@/store/dialog.store";
import type { QueryMutationOptions } from "@/types/mutation-options";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useMutationCreateProduct(options?: QueryMutationOptions) {
    const queryClient = useQueryClient();
    const closeDialog = useDialogStore((state) => state.closeDialog);
    
    return useMutation({
        mutationFn: (data: CreateProduct) => productService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [querykey.inventory.products] })
            if (options?.dialogId) {
                closeDialog(options.dialogId)
            }
        },
    })

}

export function useMutationUpdateProduct(id: string, options?: QueryMutationOptions) {
    const queryClient = useQueryClient()
    const closeDialog = useDialogStore((state) => state.closeDialog)

    return useMutation({
        mutationFn: (data: UpdateProduct) => productService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [querykey.inventory.products] })
            queryClient.invalidateQueries({ queryKey: [querykey.inventory.product, id] })
            if (options?.dialogId) {
                closeDialog(options.dialogId)
            }
        },
        onError: (error) => {
            console.error('Error updating product:', error)
        }
    })
}