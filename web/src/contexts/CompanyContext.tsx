import { createContext, useEffect, useState } from 'react'
import { http } from '@/services'

import type { Company, Pagination } from '@/types'

interface CompaniesContextInterface {
  isLoading: boolean
  companiesList: Company[]
  goToPage: (page: number) => void
  searchCompanies: (search: string) => void
}

export const CompanyContext = createContext({} as CompaniesContextInterface)

export function CompanyProvider({ children }) {
  const [isLoading, setLoading] = useState(true)
  const [searchText, setSearchText] = useState('')
  const [paginationMeta, setPaginationMeta] = useState<Pagination>(null)

  const companiesList = paginationMeta?.data ?? []

  async function goToPage(page: number) {
    setLoading(true)

    const params = { query: searchText, page }
    const response = await http.get<Pagination>('/companies', { params })

    setPaginationMeta(response.data)
    setLoading(false)
  }

  async function searchCompanies(query: string) {
    setLoading(true)

    const params = { query, page: 1 }
    const response = await http.get<Pagination>('/companies', { params })

    setPaginationMeta(response.data)
    setSearchText(query)
    setLoading(false)
  }

  useEffect(() => {
    goToPage(1)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <CompanyContext.Provider
      value={{
        companiesList,
        isLoading,
        searchCompanies,
        goToPage,
      }}
    >{children}</CompanyContext.Provider>
  )
}
