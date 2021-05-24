import { StatusCodes } from 'http-status-codes'
import { Request, Response } from 'express'

function index(request: Request, response: Response) {
  const target = request.params.target ?? 'there'

  response
    .status(StatusCodes.OK)
    .json({ message: `Hello, ${target}!` })
}

export default {
  index,
}
