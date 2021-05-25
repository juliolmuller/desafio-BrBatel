import '../../config'
import faker from 'faker'
import { createConnection } from 'typeorm'
import generateCompany from './company.seeder'

/**
 * COnfigure Faker.js to use "pt_BR" localization preferentially.
 */
faker.locale = 'pt_BR'

/**
 * Execute all entities seeders
 */
async function runSeeds() {
  /* eslint-disable no-magic-numbers */
  await generateCompany(50)
  /* eslint-enable */
}

createConnection().then((connection) => {
  runSeeds().then(() => {
    console.log('    Finished seeding database.')
  }).finally(() => connection.close())
})
