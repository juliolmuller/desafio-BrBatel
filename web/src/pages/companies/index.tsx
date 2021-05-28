import Link from 'next/link'
import DocumentHead from 'next/head'
import { FaPlus, FaThLarge, FaThList } from 'react-icons/fa'
import CompaniesIndex from '@/components/CompaniesIndex'
import { useCompanyContext } from '@/hooks'
import styles from './styles.module.scss'

function CompaniesPage() {
  const { activeLayout, setLayout } = useCompanyContext()

  return (
    <section className={styles.pageWrapper}>
      <DocumentHead>
        <title>BrBate | Empresas</title>
      </DocumentHead>

      <header>
        <h1>Empresas</h1>

        <div className={styles.indexControls}>
          <div className={styles.displayOptions}>
            <button
              type="button"
              className={activeLayout === 'cards' ? styles.active : null}
              onClick={() => setLayout('cards')}
            ><FaThLarge /></button>
            <button
              type="button"
              className={activeLayout === 'list' ? styles.active : null}
              onClick={() => setLayout('list')}
            ><FaThList /></button>
          </div>

          <Link href="/companies/new"><a>
            <FaPlus />
            <span>Nova Empresa</span>
          </a></Link>
        </div>
      </header>

      <main>
        <CompaniesIndex />
      </main>
    </section>
  )
}

export default CompaniesPage
