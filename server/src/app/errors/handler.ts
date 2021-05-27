import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { EntityNotFoundError } from 'typeorm'
import { ValidationError } from 'yup'

import type { ErrorRequestHandler } from 'express'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handler: ErrorRequestHandler = (error, _request, response, _next) => {

  /**
   * Formatar erros de validação.
   */
  if (error instanceof ValidationError) {
    const errors: { [key: string]: string } = {}

    error.inner.forEach((err) => {
      if (err.path) {
        [errors[err.path]] = err.errors
      }
    })

    return response
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ message: ReasonPhrases.UNPROCESSABLE_ENTITY, errors })
  }

  /**
   * Formatar erros de ID's inexistentes buscados.
   */
  if (error instanceof EntityNotFoundError) {
    return response
      .status(StatusCodes.NOT_FOUND)
      .json({
        error: ReasonPhrases.NOT_FOUND,
        message: error.message,
      })
  }

  /**
   * Formatar outros erros do cliente.
   */
  if (error.status >= 400 && error.status < 500) { // eslint-disable-line no-magic-numbers
    return response
      .status(error.status)
      .json({
        error: ReasonPhrases.BAD_REQUEST,
        message: error.message,
      })
  }

  /**
   * Logar demais erros.
   */
  console.error(error)

  return response
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
      message: error.message,
    })
}

export default handler
