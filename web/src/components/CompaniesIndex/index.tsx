import { VscTriangleLeft, VscTriangleRight } from 'react-icons/vsc'
import CardsLayout from './CardsLayout'
import ListLayout from './ListLayout'
import { useCompanyContext } from '@/hooks'
import styles from './styles.module.scss'

function CompaniesIndex() {
  const { isLoading, activeLayout, paginationMeta, goToPage } = useCompanyContext()

  if (isLoading) {
    return null
  }

  return (
    <div className={styles.componentWrapper}>
      {activeLayout === 'cards' && (
        <CardsLayout />
      )}
      {activeLayout === 'list' && (
        <ListLayout />
      )}

      <div className={styles.pagination}>
        <button
          type="button"
          onClick={() => goToPage(paginationMeta.current_page - 1)}
          style={{ visibility: paginationMeta.current_page === 1
            ? 'hidden'
            : 'visible',
          }}
        ><VscTriangleLeft /> Anterior</button>

        <div className={styles.spacer}>
          página {paginationMeta.current_page} de {paginationMeta.total_pages}
        </div>

        <button
          type="button"
          onClick={() => goToPage(paginationMeta.current_page + 1)}
          style={{ visibility: paginationMeta.current_page === paginationMeta.total_pages
            ? 'hidden'
            : 'visible',
          }}
        >Próximo <VscTriangleRight /></button>
      </div>
    </div>
  )
}

export default CompaniesIndex
