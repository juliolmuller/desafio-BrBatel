import { StatusCodes } from 'http-status-codes'
import { Router } from 'express'

const routes = Router()

routes.get('/api/hello/:target?', (request, response) => {
  const target = request.params.target ?? 'there'

  response
    .status(StatusCodes.OK)
    .json({ message: `Hello, ${target}!` })
})

export default routes
