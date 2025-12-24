import { z } from 'zod'

// Schema para los parámetros de query
const QueryParamsSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
  order_by: z.string().optional(),
  sort_direction: z.enum(['asc', 'desc']).optional(),
  search: z.string().optional(),
  search_field: z.string().optional(),
})

type QueryParams = z.infer<typeof QueryParamsSchema>

// Schema genérico para respuestas paginadas
const createPaginatedSchema = <T extends z.ZodTypeAny>(itemSchema: T) => {
  return z.object({
    data: z.array(itemSchema),
    total: z.number().int(),
    pages: z.number().int(),
    limit: z.number().int(),
    offset: z.number().int(),
  })
}

type Paginated<T> = {
  data: T[]
  total: number
  pages: number
  limit: number
  offset: number
}

// Helper para crear opciones de paginación
const createQueryParams = (
  page: number = 1,
  limit: number = 10,
  options?: Partial<QueryParams>
): QueryParams => {
  return QueryParamsSchema.parse({
    page,
    limit,
    ...options,
  })
}

// Helper para construir query string
const buildQueryString = (params: Partial<QueryParams>): string => {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value))
    }
  })

  return searchParams.toString()
}

export {
    QueryParamsSchema,
    createPaginatedSchema,
    createQueryParams,
    buildQueryString,
}

export type {
    QueryParams,
    Paginated,
}
