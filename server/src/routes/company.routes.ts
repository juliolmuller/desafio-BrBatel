import { Router } from 'express'
import { companyController } from '../controllers'

const router = Router()
const baseURI = '/api/companies'
const routes = {
  index: baseURI,
  show: `${baseURI}/:id`,
  store: baseURI,
  update: `${baseURI}/:id`,
  destroy: `${baseURI}/:id`,
}

router.get(routes.index, companyController.index)
router.get(routes.show, companyController.show)
router.post(routes.store, companyController.store)
router.patch(routes.update, companyController.update)
router.delete(routes.destroy, companyController.destroy)

export {
  router as default,
  routes,
}
