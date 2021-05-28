import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import DocumentHead from 'next/head'
import { MdArrowBack, MdDelete, MdEdit } from 'react-icons/md'
import { http } from '@/services'
import { numUtils } from '@/utils'
import styles from './styles.module.scss'

import type { GetStaticPaths, GetStaticProps } from 'next'
import type { Company } from '@/types'

type CompanyDetailsPageProps = {
  company: Company
}

function CompanyDetailsPage({ company }: CompanyDetailsPageProps) {
  const router = useRouter()

  async function handleCompanyDelete() {
    if (confirm(`Tem certeza de que quer excluir os registros de ${company.name}?`)) {
      await http.delete(`/companies/${company.id}`)
      router.replace('/companies')
    }
  }

  return (
    <section className={styles.pageWrapper}>
      <DocumentHead>
        <title>BrBate | Empresa :: {company.name}</title>
      </DocumentHead>

      <header>
        <h2>
          <button type="button" onClick={() => router.back()}>
            <MdArrowBack />
          </button>
          {company.name}
        </h2>


        <Link href={`/companies/${company.id}/edit`}>
          <a><MdEdit /></a>
        </Link>
        <button type="button" onClick={handleCompanyDelete}>
          <MdDelete />
        </button>
      </header>

      <main>
        <figure>
          <Image
            src={company.image}
            alt="logo da empresa"
            objectFit="cover"
            height="180"
            width="350"
          />
        </figure>

        <div>
          <h5>Identificação de Registro:</h5>
          <p>#{`${company.id}`.padStart(6, '0')}</p>
        </div>
        <div>
          <h5>Razão Social:</h5>
          <p>{company.name}</p>
        </div>
        <div>
          <h5>Cadastro Nacional de Pessoa Jurídica (CNPJ):</h5>
          <p>{company.cnpj}</p>
        </div>
        <div>
          <h5>Faturamento anual:</h5>
          <p>{company.annual_income}</p>
        </div>
        <div>
          <h5>Demanda:</h5>
          <p>R$ {numUtils.displayAsBrazilian(company.demand, 2)}</p>
        </div>
        <div>
          <h5>Sobre:</h5>
          {company.about.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </main>
    </section>
  )
}

/**
 * Gerar todas as possibilidades possíveis para a página.
 */
const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await http.get<Company[]>('/companies')
  const paths = data.map((company) => ({
    params: { id: String(company.id) } }))

  return {
    fallback: 'blocking',
    paths,
  }
}

/**
 * Gerar páginas estáticas com base nos parâmetros fornecidos.
 */
const getStaticProps: GetStaticProps<CompanyDetailsPageProps> = async ({ params }) => {
  const SECONDS_TO_REVALIDATE = 300 // 5 minuos
  const { data } = await http.get<Company>(`/companies/${params.id}`)

  return {
    revalidate: SECONDS_TO_REVALIDATE,
    props: {
      company: data,
    },
  }
}

export {
  CompanyDetailsPage as default,
  getStaticPaths,
  getStaticProps,
}
