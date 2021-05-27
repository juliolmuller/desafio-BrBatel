import { Router } from 'express'
import { CompanyController } from '@/app/http/controllers'
import { CompanyFormRequest } from '@/app/http/requests'

const router = Router()
const controller = new CompanyController()
const formRequest = new CompanyFormRequest()
const baseURI = '/api/companies'

export const routes = {
  index: baseURI,
  show: `${baseURI}/:id`,
  store: baseURI,
  update: `${baseURI}/:id`,
  destroy: `${baseURI}/:id`,
}

router.get(routes.index, controller.index)
router.get(routes.show, controller.show)
router.post(routes.store, formRequest.on('create'), controller.store)
router.patch(routes.update, formRequest.on('update'), controller.update)
router.delete(routes.destroy, controller.destroy)

export default router
