import { UserSchema } from "@/services/user/user.schema";
import { z } from 'zod';


const MaterialSchema = z.object({
    id: z.string(),
    name: z.string(),
    type: z.string(),
    unit_measure: z.string(),
    unit_price: z.string(),
    User: UserSchema,
})

type Material = z.infer<typeof MaterialSchema>;

const CreateMaterialSchema = MaterialSchema.omit({
    id : true, 
    User: true
});

type CreateMaterial = z.infer<typeof CreateMaterialSchema>;

const UpdateMaterialSchema = CreateMaterialSchema.partial();

type UpdateMaterial = z.infer<typeof UpdateMaterialSchema>;

export { 
    MaterialSchema,
    CreateMaterialSchema,
    UpdateMaterialSchema, 
};
export type{
    Material,
    CreateMaterial,
    UpdateMaterial, 
}
 