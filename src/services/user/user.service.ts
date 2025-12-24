import api from "@/lib/api";
import type { Login } from "./user.schema";

class UserService {
    async login(login: Login): Promise<string> {
        const response = await api.post('/users/login', login)
        return response.data.token
    }
};

const userService = new UserService();
export default userService;