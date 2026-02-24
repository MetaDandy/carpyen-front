import { useMutationCreateProduct, useMutationUpdateProduct } from "@/hooks/modules/inventory/product/useMutation.product";
import { CreateProductSchema, type Product } from "@/services/inventory/product/product.schema";
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

interface ProductFormProps {
    product?: Product;
    id?: string;
}

export default function ProductForm({ product, id }: ProductFormProps) {
    const isEditing = !!product;
    const mutation = isEditing
        ? useMutationUpdateProduct(product.id!, { dialogId: id })
        : useMutationCreateProduct({ dialogId: id });
    // Siempre usar CreateProductSchema para validar (los campos siempre son requeridos en el formulario)
    const schema = CreateProductSchema;
    let prueba: string | undefined;
    prueba = product!.name
    const value = prueba || "hola"
    // const value = prueba ? prueba : "hola"
    console.log(value);

    const defaultValues = isEditing
        ? {
            name: product.name,
            type: product.type,
            unit_price: product.unit_price,
        }
        : {
            name: "",
            type: "",
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


            mutation.mutateAsync(isEditing ? { id: product.id!, data: dataToSubmit } : dataToSubmit)
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
            {/* Nombre del Producto */}
            <form.Field
                name="name"
                children={(field) => (
                    <div>
                        <label htmlFor={field.name} className="text-sm font-medium">
                            Nombre del Producto
                        </label>
                        <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="Ej: Puerta de aluminio"
                            disabled={mutation.isPending}
                        />
                        {field.state.meta.errors?.length > 0 && (
                            <p className="text-sm text-destructive mt-1">{field.state.meta.errors[0]?.message}</p>
                        )}
                    </div>
                )}
            />

            {/* Tipo de Producto */}
            <form.Field
                name="type"
                children={(field) => (
                    <div>
                        <label htmlFor={field.name} className="text-sm font-medium">
                            Tipo de Producto
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
                                <SelectItem value="SILLA">Silla</SelectItem>
                                <SelectItem value="MESA">Mesa</SelectItem>
                                <SelectItem value="SOFA">Sofá</SelectItem>
                                <SelectItem value="CAMA">Cama</SelectItem>
                                <SelectItem value="GABINETE">Gabinete</SelectItem>
                                <SelectItem value="ESCRITORIO">Escritorio</SelectItem>
                                <SelectItem value="ESTANTE">Estante</SelectItem>
                                <SelectItem value="LAMPARA">Lámpara</SelectItem>
                                <SelectItem value="ALFOMBRA">Alfombra</SelectItem>
                                <SelectItem value="CORTINA">Cortina</SelectItem>
                                <SelectItem value="OTRO">Otro</SelectItem>
                            </SelectContent>
                        </Select>
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
                                // Convertir el valor numérico a string para almacenar
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
                {isEditing ? 'Actualizar Producto' : 'Crear Producto'}
            </Button>
        </form>
    )
}