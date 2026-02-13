import axios from 'axios'
import api from "@/lib/api";
import type { Login, User, CreateUser, UpdateUser, UpdateUserProfile } from "./user.schema";
import type { Paginated, QueryParams } from '../pagination.schema';

class UserService {
    async login(login: Login): Promise<User> {
        try {
            const response = await api.post('/users/login', login)
            return response.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Email o contraseña incorrectos')
            }
            throw new Error('Error al iniciar sesión')
        }
    }

    async get(id: string): Promise<User> {
        try {
            const response = await api.get(`/users/${id}`)
            return response.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Error al obtener el usuario')
            }
            throw new Error('Error al obtener el usuario')
        }
    }

    async getProfile(): Promise<User> {
        try {
            const response = await api.get('/users/me')
            return response.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Error al obtener el perfil')
            }
            throw new Error('Error al obtener el perfil')
        }
    }

    async getAll(options: QueryParams): Promise<Paginated<User>> {
        try {
            const response = await api.get('/users', {
                params: options,
            })
            return response.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Error al obtener los usuarios')
            }
            throw new Error('Error al obtener los usuarios')
        }
    }

    async create(data: CreateUser): Promise<void> {
        try {
            await api.post('/users', data)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Error al crear el usuario')
            }
            throw new Error('Error al crear el usuario')
        }
    }

    async update(id: string, data: UpdateUser): Promise<void> {
        try {
            await api.patch(`/users/${id}`, data)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Error al actualizar el usuario')
            }
            throw new Error(`Error al actualizar el usuario ${error}`)
        }
    }

    async updateProfile(data: UpdateUserProfile): Promise<void> {
        try {
            await api.patch('/users/me', data)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Error al actualizar el perfil')
            }
            throw new Error('Error al actualizar el perfil')
        }
    }

    async logout(): Promise<void> {
        try {
            await api.post('/users/logout')
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Error al cerrar sesión')
            }
            throw new Error('Error al cerrar sesión')
        }
    }

    async refreshToken(): Promise<void> {
        try {
            await api.post('/users/refresh')
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Error al renovar token')
            }
            throw new Error('Error al renovar token')
        }
    }
};

const userService = new UserService();
export default userService;