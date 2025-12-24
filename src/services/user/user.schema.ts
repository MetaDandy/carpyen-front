import z from 'zod';

const LoginSchema = z.object({
    email: z.email({ message: "El email no es válido" }),
    password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

type Login = z.infer<typeof LoginSchema>;

export {
    LoginSchema,
}

export type {
    Login,
}