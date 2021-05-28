import Image from 'next/image'
import Link from 'next/link'
import { MdEdit } from 'react-icons/md'
import { useCompanyContext } from '@/hooks'
import { numUtils } from '@/utils'
import styles from './styles.module.scss'

function ListLayout() {
  const { companiesList } = useCompanyContext()

  return (
    <ul className={styles.layoutWrapper}>
      {companiesList.map((company) => (
        <li key={company.id}>
          <Image
            src={company.image}
            alt="logo da empresa"
            objectFit="cover"
            height="125"
            width="200"
          />

          <div className={styles.companyData}>
            <h4><Link href={`/companies/${company.id}`}><a>
              {company.name}
            </a></Link></h4>
            <span>CNPJ {company.cnpj}</span>
          </div>

          <div className={styles.financialDemand}>
            Demanda: <span>{numUtils.displayAsBrazilian(company.demand)}</span>
          </div>

          <Link href={`/companies/${company.id}/edit`}>
            <a className={styles.actions}>
              <MdEdit />
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default ListLayout
