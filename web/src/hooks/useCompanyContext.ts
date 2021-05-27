import { useContext } from 'react'
import { CompanyContext } from '@/contexts'

function useCompanyContext() {
  return useContext(CompanyContext)
}

export default useCompanyContext
