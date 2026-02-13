import { querykey } from "@/constants/querykey";
import productService from "@/services/inventory/product/product.service";
import { createQueryParams, type QueryParams } from "@/services/pagination.schema";
import { useQuery } from "@tanstack/react-query";

export function useGetAllProducts(query: QueryParams) {
    return useQuery({
        queryKey: [querykey.inventory.products, query.offset, query.limit, query.search, query.search_field],
        queryFn: () => productService.getAll(createQueryParams(query.offset, query.limit, {
            search: query.search,
            search_field: query.search_field,
        })),
    })
}

export function useGetProduct(id: string) {
  return useQuery({
    queryKey: [querykey.inventory.product, id],
    queryFn: () => productService.get(id),
    enabled: !!id,
  })
}