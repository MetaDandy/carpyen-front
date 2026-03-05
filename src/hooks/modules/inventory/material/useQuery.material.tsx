import { useQuery } from '@tanstack/react-query';
import { querykey } from '@/constants/querykey';
import { createQueryParams, type QueryParams } from '@/services/pagination.schema';
import materialService from '@/services/inventory/material/material.service';

export function useGetAllMaterials(query: QueryParams) {
  return useQuery({
     queryKey: [querykey.inventory.materials, query.offset, query.limit, query.search, query.search_field],
     queryFn : () => materialService.getAll(createQueryParams(query.offset, query.limit, {
        search: query.search,
        search_field: query.search_field,
        })),
    })
};

 export function useGetMaterials(Id: string) {
  return useQuery({
    queryKey: [querykey.inventory.material, Id],
    queryFn: () => materialService.get(Id),
    enabled: !!Id,
  })
}