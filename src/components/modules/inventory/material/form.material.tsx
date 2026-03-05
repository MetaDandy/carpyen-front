import { useMutationCreateMaterial, useUpdateMaterialrMutation } from "@/hooks/modules/inventory/material/useMutation.material";
import { CreateMaterialSchema, type Material } from "@/services/inventory/material/material.schema";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
            }}
            className="space-y-4"
        >
            {/* Nombre del Material */}
            <form.Field
                name="name"
                children={(field) => (
                    <div>
                        <label htmlFor={field.name} className="text-sm font-medium">
                            Nombre del Material
                        </label>
                        <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="Ej: Madera de pino"
                            disabled={mutation.isPending}
                        />
                        {field.state.meta.errors?.length > 0 && (
                            <p className="text-sm text-destructive mt-1">{field.state.meta.errors[0]?.message}</p>
                        )}
                    </div>
                )}
            />

            {/* Tipo de Material */}
            <form.Field
                name="type"
                children={(field) => (
                    <div>
                        <label htmlFor={field.name} className="text-sm font-medium">
                            Tipo de Material
                        </label>
                        <Select
                            value={field.state.value}
                            onValueChange={field.handleChange}
                            disabled={mutation.isPending}
                        >
                            <SelectTrigger id={field.name}>
                                <SelectValue placeholder="Selecciona un tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="MADERA">Madera</SelectItem>
                                <SelectItem value="METAL">Metal</SelectItem>
                                <SelectItem value="PLASTICO">Plástico</SelectItem>
                                <SelectItem value="VIDRIO">Vidrio</SelectItem>
                                <SelectItem value="TEXTIL">Textil</SelectItem>
                                <SelectItem value="OTRO">Otro</SelectItem>
                            </SelectContent>
                        </Select>
                        {field.state.meta.errors?.length > 0 && (
                            <p className="text-sm text-destructive mt-1">{field.state.meta.errors[0]?.message}</p>
                        )}
                    </div>
                )}
            />

            {/* Unidad de Medida */}
            <form.Field
                name="unit_measure"
                children={(field) => (
                    <div>
                        <label htmlFor={field.name} className="text-sm font-medium">
                            Unidad de Medida
                        </label>
                        <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="Ej: m, cm, kg"
                            disabled={mutation.isPending}
                        />
                        {field.state.meta.errors?.length > 0 && (
                            <p className="text-sm text-destructive mt-1">{field.state.meta.errors[0]?.message}</p>
                        )}
                    </div>
                )}
            />

            {/* Precio Unitario (Decimal) */}
            <form.Field
                name="unit_price"
                children={(field) => (
                    <div>
                        <label htmlFor={field.name} className="text-sm font-medium">
                            Precio Unitario
                        </label>
                        <Input
                            id={field.name}
                            name={field.name}
                            type="number"
                            step="0.01"
                            min="0"
                            max="1000000"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => {
                                field.handleChange(e.target.value)
                            }}
                            placeholder="0.00"
                            disabled={mutation.isPending}
                        />
                        {field.state.meta.errors?.length > 0 && (
                            <p className="text-sm text-destructive mt-1">{field.state.meta.errors[0]?.message}</p>
                        )}
                    </div>
                )}
            />

            <Button type="submit" disabled={mutation.isPending} className="w-full">
                {isEditing ? 'Actualizar Material' : 'Crear Material'}
            </Button>
        </form>
    )
}
