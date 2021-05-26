import { getRepository } from 'typeorm'
import { Company } from '../../app/models'
import { cnpjUtils, faker } from '../../utils'

async function generateCompany(count = 1) {
  if (count < 1) {
    throw new Error('Impossible to generate less than 1 company.')
  }

  const companyRepository = getRepository(Company)
  const iterations = new Array(count).fill(null)
  const companies: Company[] = []

  iterations.forEach(() => {
    companies.push(companyRepository.create({
      about: faker.lorem.text().replace(/[\n\r][ ][[\n\r]/g, '\n'),
      demand: faker.datatype.number(1000) * 1000,
      cnpj: cnpjUtils.generate().replace(/\D/g, ''),
      name: faker.company.companyName(0),
      annual_income: Company.ANNUAL_INCOME_OPTIONS[faker.datatype.number(4)], // aleatoriamente selecionar um item do array
    }))
  })

  await companyRepository.save(companies)
  console.log(`    ${count} records inserted into table "${Company.TABLE_NAME}".`)
}

export default generateCompany
