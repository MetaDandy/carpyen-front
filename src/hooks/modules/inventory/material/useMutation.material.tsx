import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDialogStore } from "@/store/dialog.store";
import type { QueryMutationOptions } from "@/types/mutation-options";
import { querykey } from "@/constants/querykey";
import type { CreateMaterial, UpdateMaterial } from "@/services/inventory/material/material.schema";
import materialService from "@/services/inventory/material/material.service";

export function useMutationCreateMaterial(options?: QueryMutationOptions) {
    const queryClient = useQueryClient();
    const closeDialog = useDialogStore((state) => state.closeDialog);

    return useMutation({
        mutationFn: (data: CreateMaterial) => materialService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [querykey.inventory.materials] });
            if (options?.dialogId) {
                closeDialog(options.dialogId);
            }
        },
        
    });
}

export function useUpdateMaterialrMutation(materialId: string, options?: QueryMutationOptions) {
    const queryClient = useQueryClient()
    const closeDialog = useDialogStore((state) => state.closeDialog)

    return useMutation({
        mutationFn: ({id, data}: {id: string,data: UpdateMaterial}) => materialService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [querykey.inventory.materials] })
            queryClient.invalidateQueries({ queryKey: [querykey.inventory.material, materialId] })
            if (options?.dialogId) {
                closeDialog(options.dialogId)
            }
        },
        onError: (error) => {
            console.error("Error updating material:", error);
        }
    })
}

    