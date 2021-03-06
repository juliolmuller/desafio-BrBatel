import DocumentHead from 'next/head'
import { MdArrowBack } from 'react-icons/md'
import CompanyForm from '@/components/CompanyForm'
import { useRouter } from 'next/router'
import styles from './styles.module.scss'

function NewCompanyPage() {
  const router = useRouter()

  function handleCancelForm() {
    if (confirm('Tem certeza de que quer sair do formulário? Todas as alterações serão perdidas.')) {
      router.back()
    }
  }

  return (
    <div className={styles.pageWrapper}>
      <DocumentHead>
        <title>BrBate | Cadastrar Nova Empresa</title>
      </DocumentHead>

      <header>
        <h2>
          <button type="button" onClick={handleCancelForm}>
            <MdArrowBack />
          </button>
          Cadastrar Nova Empresa
        </h2>
      </header>

      <main>
        <CompanyForm />
      </main>
    </div>
  )
}

export default NewCompanyPage
