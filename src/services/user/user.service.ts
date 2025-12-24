import axios from 'axios'
import api from "@/lib/api";
import type { Login } from "./user.schema";

class UserService {
    async login(login: Login): Promise<string> {
        try {
            const response = await api.post('/users/login', login)
            return response.data.token
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Email o contraseña incorrectos')
            }
            throw new Error('Error al iniciar sesión')
        }
    }
};

const userService = new UserService();
export default userService;