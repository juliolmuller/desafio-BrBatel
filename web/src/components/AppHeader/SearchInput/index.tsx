import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { useCompanyContext } from '@/hooks'
import styles from './styles.module.scss'

import type { FormEvent } from 'react'

function SearchInput() {
  const { searchCompanies } = useCompanyContext()
  const [timeoutIndex, setTimeoutIndex] = useState<NodeJS.Timeout>(null)

  function handleSearch(event: FormEvent<HTMLInputElement>) {
    const DEBOUNCE_SEARCH_TIME = 600 // ms
    const search = event.currentTarget.value

    clearTimeout(timeoutIndex)
    setTimeoutIndex(setTimeout(() => {
      searchCompanies(search)
      console.log(search)
    }, DEBOUNCE_SEARCH_TIME))
  }

  return (
    <div className={styles.inputWrapper}>
      <input
        type="search"
        placeholder="Pesquisar empresas..."
        onInput={handleSearch}
      />

      <FiSearch />
    </div>
  )
}

export default SearchInput
