import { UserSchema } from "@/services/user/user.schema";
import z from "zod";

const ProductSchema = z.object({
    id: z.string(),
	name: z.string().min(1, 'El nombre es requerido'),
	type: z.string().min(1, 'El tipo es requerido'),
	unit_price: z.string().min(1, 'El precio unitario es requerido').refine(
		(val) => !isNaN(parseFloat(val)),
		'El precio debe ser un número válido'
	),
	user: UserSchema,
})

type Product = z.infer<typeof ProductSchema>;

const CreateProductSchema = ProductSchema.omit({ 
    id: true, 
    user: true 
});

type CreateProduct = z.infer<typeof CreateProductSchema>;

const UpdateProductSchema = CreateProductSchema.partial();

type UpdateProduct = z.infer<typeof UpdateProductSchema>;

export {
    ProductSchema,
    CreateProductSchema,
    UpdateProductSchema,
}

export type {
    Product,
    CreateProduct,
    UpdateProduct,
}