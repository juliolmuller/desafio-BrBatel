import DocumentHead from 'next/head'
import { MdArrowBack } from 'react-icons/md'
import CompanyForm from '@/components/CompanyForm'
import { useRouter } from 'next/router'
import styles from './styles.module.scss'

import type { Company } from '@/types'

type EditCompanyDetailsPageProps = {
  company: Company
}

function EditCompanyDetailsPage({ company }: EditCompanyDetailsPageProps) {
  const router = useRouter()

  function handleCancelForm() {
    if (confirm('Tem certeza de que quer sair do formulário? Todas as alterações serão perdidas.')) {
      router.back()
    }
  }

  return (
    <div className={styles.pageWrapper}>
      <DocumentHead>
        <title>BrBate | Atualizar Dados de {company.name}</title>
      </DocumentHead>

      <header>
        <h2>
          <button type="button" onClick={handleCancelForm}>
            <MdArrowBack />
          </button>
          {company.name}
        </h2>
      </header>

      <main>
        <CompanyForm initialState={company} />
      </main>
    </div>
  )
}

export default EditCompanyDetailsPage

/**
 * Repete o processo de geração de páginas estáticas do
 * componente de visualização dos dados da empresa.
 */
export { getStaticPaths, getStaticProps } from '..'
