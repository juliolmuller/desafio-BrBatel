import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { ErrorRequestHandler } from 'express'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handler: ErrorRequestHandler = (error, _request, response, _next) => {
  console.error(error)

  response
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
      message: error.message,
    })
}

export default handler
