import { FaPlus, FaThLarge, FaThList } from 'react-icons/fa'
import DocumentHead from 'next/head'
import Link from 'next/link'
import styles from './styles.module.scss'

function CompaniesPage() {
  return (
    <section className={styles.pageWrapper}>
      <DocumentHead>
        <title>BrBate | Empresas</title>
      </DocumentHead>

      <header>
        <h1>Empresas</h1>

        <div className={styles.indexControls}>
          <div className={styles.displayOptions}>
            <button type="button"><FaThLarge /></button>
            <button type="button"><FaThList /></button>
          </div>

          <Link href="/companies/new"><a>
            <FaPlus />
            <span>Nova Empresa</span>
          </a></Link>
        </div>
      </header>

      <main></main>
    </section>
  )
}

export default CompaniesPage
