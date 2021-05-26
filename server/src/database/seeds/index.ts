import '../../config'
import { createConnection } from 'typeorm'
import generateCompany from './companySeeder'

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
