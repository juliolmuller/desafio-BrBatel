/* eslint-disable @typescript-eslint/no-explicit-any */
import { getRepository, Not } from 'typeorm'
import BaseFormRequest from './FormRequest'
import { validator, cnpjUtils } from '@/utils'
import { Company } from '@/app/models'

import type { Request, RequestHandler } from 'express'
import type { DeepPartial } from 'typeorm'

type CompanyFormAction = 'create' | 'update'

class CompanyFormRequest extends BaseFormRequest {

  /**
   * Retornar middleware conforme tipo de ação/requisição (criar ou atualizar registro).
   */
  public on = (action: CompanyFormAction): RequestHandler => {
    return async (request, _response, next) => {
      await this.sanitize(action, request)
      await this.validate(action, request)
      next()
    }
  }

  /**
   * Converter dados e eliminar campos gerenciados pelo ORM.
   */
  private sanitize = (_action: CompanyFormAction, request: Request) => {
    const companyDataRaw = request.body as DeepPartial<Company>

    // Assegurar que dados numéricos não possuam pontuação
    companyDataRaw.cnpj &&= companyDataRaw.cnpj.replace(/\D/g, '')

    // Assegurar que campos automáticos não seja processados
    delete (companyDataRaw as any).created_at
    delete (companyDataRaw as any).updated_at
    delete (companyDataRaw as any).deleted_at
    delete (companyDataRaw as any).id
  }

  /**
   * Validar dados de formulário.
   */
  private validate = async (action: CompanyFormAction, request: Request) => {
    const companyDataRaw = request.body as DeepPartial<Company>
    const companyId = Number(request.params.id)
    const companyRepository = getRepository(Company)

    await validator.object().shape({
    /* eslint-disable no-magic-numbers */
      annual_income: validator.string().required().oneOf([...Company.ANNUAL_INCOME_OPTIONS]),
      name: validator.string().required().min(3).max(120),
      demand: validator.number().positive().required(),
      about: validator.string().max(1200),
      cnpj: validator.string().length(14).required()
        .test('valid-cnpj', 'Provided CNPJ is not valid', (value) => {
          return cnpjUtils.validate(String(value))
        })
        .test('unique-cnpj', 'CNPJ is already in use', async (value) => {
          if (action === 'create') {
            return await companyRepository.count({
              cnpj: value,
            }) === 0
          }

          return await companyRepository.count({
            id: Not(companyId),
            cnpj: value,
          }) === 0
        }),
    /* eslint-enable */
    }).validate(companyDataRaw, { abortEarly: false })
  }
}

export default CompanyFormRequest
