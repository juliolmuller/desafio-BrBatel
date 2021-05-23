import { FiSearch } from 'react-icons/fi'
import styles from './styles.module.scss'

function SearchInput() {
  return (
    <div className={styles.inputWrapper}>
      <input
        type="search"
        placeholder="Pesquisar empresas..."
      />

      <FiSearch />
    </div>
  )
}

export default SearchInput
