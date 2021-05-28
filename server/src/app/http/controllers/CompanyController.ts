import { getRepository, ILike } from 'typeorm'
import { StatusCodes } from 'http-status-codes'
import { CompanyResource } from '@/app/http/resources'
import { Company } from '@/app/models'

import type { Request, Response } from 'express'
import type { DeepPartial } from 'typeorm'

class CompanyController {
  private readonly DEFAULT_ITEMS_PER_PAGE = 12 // eslint-disable-line no-magic-numbers
  private readonly DEFAULT_INITIAL_PAGE = 0 // show all items (no pagination)

  /**
   * Formatar dados expostos à API e adicionar metadados.
   */
  private readonly companyResource = new CompanyResource()

  /**
   * Retornar uma lista de empresas, com suporte à paginação e busca.
   */
  public index = async (request: Request, response: Response) => {
    const withDeleted = Boolean(request.query.trash)
    const search = request.query.query?.toString() ?? ''
    const page = Number(request.query.page) || this.DEFAULT_INITIAL_PAGE
    const limit = Number(request.query.limit) || this.DEFAULT_ITEMS_PER_PAGE
    const pagination = !page ? {} : {
      skip: page * limit - limit,
      take: limit,
    }
    const query = {
      withDeleted,
      where: [
        { name: ILike(`%${search}%`) },
        { cnpj: ILike(`%${search}%`) },
        { about: ILike(`%${search}%`) },
      ],
      ...pagination,
    }

    const companyRepository = getRepository(Company)
    const itemsCount = await companyRepository.count(query)
    const companies = await companyRepository.find(query)

    response
      .status(StatusCodes.OK)
      .json(page
        ? this.companyResource.paginate(companies, { currPage: page, itemsPerPage: limit, itemsCount })
        : this.companyResource.renderMany(companies))
  }

  /**
   * Retornar um único registro de empresa a partir de um ID:
   * => esperado parâmetro "/:id" no endpoint.
   */
  public show = async (request: Request, response: Response) => {
    const companyId = Number(request.params.id)
    const companyRepository = getRepository(Company)
    const company = await companyRepository.findOneOrFail(companyId)

    response
      .status(StatusCodes.OK)
      .json(this.companyResource.render(company))
  }

  /**
   * Processar dados de requisição e salvar um novo registro.
   */
  public store = async (request: Request, response: Response) => {
    const companyDataRaw = request.body as DeepPartial<Company>
    const companyRepository = getRepository(Company)
    const companyData = companyRepository.create(companyDataRaw)
    const company = await companyRepository.save(companyData)

    response
      .status(StatusCodes.CREATED)
      .json(this.companyResource.render(company))
  }

  /**
   * Processar dados de requisição para atualizar usuário a partir de um ID:
   * => esperado parâmetro "/:id" no endpoint
   */
  public update = async (request: Request, response: Response) => {
    const companyDataRaw = request.body as DeepPartial<Company>
    const companyId = Number(request.params.id)
    const companyRepository = getRepository(Company)
    const company = await companyRepository.findOneOrFail(companyId)

    Object.assign(company, companyDataRaw)
    await companyRepository.save(company)

    response
      .status(StatusCodes.OK)
      .json(this.companyResource.render(company))
  }

  /**
   * Tornar um registro de empresa invisível (soft delete) a partir de um ID:
   * => esperado parâmetro "/:id" no endpoint
   */
  public destroy = async (request: Request, response: Response) => {
    const companyId = Number(request.params.id)
    const companyRepository = getRepository(Company)
    await companyRepository.softDelete(companyId)
    const company = await companyRepository.findOneOrFail(companyId, { withDeleted: true })

    response
      .status(StatusCodes.OK)
      .json(this.companyResource.render(company))
  }
}

export default CompanyController
