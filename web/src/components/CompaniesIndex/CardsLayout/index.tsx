import Image from 'next/image'
import Link from 'next/link'
import { MdEdit } from 'react-icons/md'
import { useCompanyContext } from '@/hooks'
import { numUtils } from '@/utils'
import styles from './styles.module.scss'

function CardsLayout() {
  const { companiesList } = useCompanyContext()

  return (
    <ul className={styles.layoutWrapper}>
      {companiesList.map((company) => (
        <li key={company.id}>
          <Image
            src={company.image}
            alt="logo da empresa"
            objectFit="cover"
            height="180"
            width="350"
          />

          <div className={styles.companyData}>
            <h4><Link href={`/companies/${company.id}`}><a>
              {company.name}
            </a></Link></h4>
            <span>CNPJ {company.cnpj}</span>
          </div>

          <div className={styles.footer}>
            <div className={styles.financialDemand}>
              Demanda: <span>{numUtils.displayAsBrazilian(company.demand)}</span>
            </div>

            <Link href={`/companies/${company.id}/edit`}>
              <a className={styles.actions}>
                <MdEdit />
              </a>
            </Link>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default CardsLayout
