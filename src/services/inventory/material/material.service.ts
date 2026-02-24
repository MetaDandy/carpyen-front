import api from "@/lib/api";
import type { CreateMaterial, Material, UpdateMaterial } from "./material.schema";
import axios from 'axios'
import type { Paginated, QueryParams } from "@/services/pagination.schema";



class MaterialService {

    baseUrl = "/materials";

    async create(data: CreateMaterial): Promise<void>{
        try{
            await api.post(this.baseUrl , data); 
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || "Error al crear el material");
        }
        throw new Error("Error al crear el material");
        }
    }

    async get(id: string): Promise<Material>{
        try {
            const response = await api.get(`${this.baseUrl}/${id}`);
            return response.data;
        }catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || "Error al obtener el material");
            }
            throw new Error("Error al obtener el material");
        }
    }

    async getAll(options: QueryParams): Promise<Paginated<Material>>{
         try {
            const response = await api.get(`${this.baseUrl}`, {
                params: options,
            })
            return response.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Error al obtener los materiales')
            }
            throw new Error('Error al obtener los materiales')
        }
    }

    async update(id: string, data: UpdateMaterial): Promise<void>{
        try {
            await api.patch(`${this.baseUrl}/${id}`, data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || "Error al actualizar el material");
            }
            throw new Error("Error al actualizar el material");
        }
    }

}

const materialService = new MaterialService();
export default materialService;