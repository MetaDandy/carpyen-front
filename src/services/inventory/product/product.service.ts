import api from "@/lib/api";
import type { CreateProduct, Product, UpdateProduct } from "./product.schema";
import axios from "axios";
import type { Paginated, QueryParams } from "@/services/pagination.schema";

class ProductService {

    baseUrl = '/products';

    async create(data: CreateProduct): Promise<void> {
        try {
            await api.post(`${this.baseUrl}`, data)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Error al crear el producto')
            }
            throw new Error('Error al crear el producto')
        }
    }

    async get(id: string): Promise<Product> {
        try {
            const response = await api.get(`${this.baseUrl}/${id}`)
            return response.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Error al obtener el producto')
            }
            throw new Error('Error al obtener el producto')
        }
    }

    async getAll(options: QueryParams): Promise<Paginated<Product>> {
        try {
            const response = await api.get(`${this.baseUrl}`, {
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

    async update(id: string, data: UpdateProduct): Promise<void> {
        try {
            await api.patch(`${this.baseUrl}/${id}`, data)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Error al actualizar el producto')
            }
            throw new Error('Error al actualizar el producto')
        }
    }
}

const productService = new ProductService();
export default productService;