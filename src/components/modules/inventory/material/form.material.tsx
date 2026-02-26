import { useMutationCreateMaterial, useUpdateMaterialrMutation } from "@/hooks/modules/inventory/material/useMutation.material";
import { CreateMaterialSchema, type Material } from "@/services/inventory/material/material.schema";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

interface MaterialFormProps {
  material?: Material;
  id?: string;
}
export default function MaterialForm({ material, id }: MaterialFormProps) {
const isEditing = !!material
const mutation = isEditing
  ? useUpdateMaterialrMutation(material.id, { dialogId: id })
  : useMutationCreateMaterial({ dialogId: id })

   const schema = CreateMaterialSchema;

    const defaultValues = isEditing
        ? {
            name: material.name,
            type: material.type,
            unit_measure: material.unit_measure,
            unit_price: material.unit_price,
            
        }
        : {
            name: "",
            type: "",
            unit_measure: "",
            unit_price: "",
        };
          const form = useForm({
        defaultValues,
        validators: {
            onChange: schema,
        },
        onSubmit: async (values) => {
            let dataToSubmit: any = values.value;

            if (isEditing) {
                const dirtyFields: Record<string, any> = {}
                let hasDirtyFields = false

                Object.entries(dataToSubmit).forEach(([key, value]) => {
                    if (value !== defaultValues[key as keyof typeof defaultValues]) {
                        dirtyFields[key] = value
                        hasDirtyFields = true
                    }
                })

                // Si no hay cambios, no enviar
                if (!hasDirtyFields) {
                    toast.error('No hay cambios para guardar')
                    return
                }

                dataToSubmit = dirtyFields
            }


            mutation.mutateAsync(isEditing ? { id: material.id!, data: dataToSubmit } : dataToSubmit)
        }
    });


}