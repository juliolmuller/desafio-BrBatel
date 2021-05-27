import type { RequestHandler } from 'express'

abstract class FormRequest {
  public abstract on(type: string): RequestHandler
}

export default FormRequest
