import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

interface UseTableFiltersOptions {
  initialPage?: number
  initialLimit?: number
  initialSearchQuery?: string
  initialSearchField?: string
}

export function useTableFilters(options: UseTableFiltersOptions = {}) {
  const [page, setPage] = useState(options.initialPage ?? 1)
  const [limit, setLimit] = useState(options.initialLimit ?? 10)
  const [searchQuery, setSearchQuery] = useState(options.initialSearchQuery ?? '')
  const [searchField, setSearchField] = useState(options.initialSearchField ?? '')
  const queryClient = useQueryClient()

  const resetFilters = () => {
    setPage(1)
    setLimit(options.initialLimit ?? 10)
    setSearchQuery('')
    setSearchField(options.initialSearchField ?? '')
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit)
    setPage(1) // Reset a página 1 cuando cambias el límite
  }

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query)
    setPage(1) // Reset a página 1 cuando cambias la búsqueda
  }

  const handleSearchFieldChange = (field: string) => {
    setSearchField(field)
    setPage(1) // Reset a página 1 cuando cambias el campo
  }

  const invalidateQueries = (queryKey: string[]) => {
    queryClient.invalidateQueries({ queryKey })
  }

  return {
    page,
    limit,
    searchQuery,
    searchField,
    setPage: handlePageChange,
    setLimit: handleLimitChange,
    setSearchQuery: handleSearchQueryChange,
    setSearchField: handleSearchFieldChange,
    resetFilters,
    invalidateQueries,
  }
}
