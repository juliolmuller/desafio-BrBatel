import { Router } from 'express'
import { companyController } from '../controllers'

const router = Router()

router.get('/api/companies', companyController.index)

export default router
