import type { Request, Response } from 'express'
import type { DeepPartial } from 'typeorm'
import { getRepository, ILike } from 'typeorm'
import { StatusCodes } from 'http-status-codes'
import { companyResource } from '../resources'
import { Company } from '../models'

/**
 * Return a list of companies records.
 */
async function index(request: Request, response: Response) {
  const DEFAULT_ITEMS_PER_PAGE = 12
  const DEFAULT_PAGE = 0 // show all items (no pagination)

  const withDeleted = Boolean(request.query.trash)
  const search = request.query.query?.toString() ?? ''
  const page = Number(request.query.page) || DEFAULT_PAGE
  const limit = Number(request.query.limit) || DEFAULT_ITEMS_PER_PAGE
  const pagination = !page ? {} : {
    skip: page * limit - limit,
    take: limit,
  }

  const companiesRepository = getRepository(Company)
  const itemsCount = await companiesRepository.count()
  const companies = await companiesRepository.find({
    withDeleted,
    order: {
      name: 'ASC',
    },
    where: [
      { name: ILike(`%${search}%`) },
      { about: ILike(`%${search}%`) },
    ],
    ...pagination,
  })
  const resource = page
    ? companyResource.paginate(companies, page, limit, itemsCount)
    : companyResource.renderMany(companies)

  response
    .status(StatusCodes.OK)
    .json(resource)
}

/**
 * Return a single company record.
 */
async function show(request: Request, response: Response) {
  const companyId = Number(request.params.id)
  const companiesRepository = getRepository(Company)
  const company = await companiesRepository.findOneOrFail(companyId)
  const resource = companyResource.render(company)

  response
    .status(StatusCodes.OK)
    .json(resource)
}

/**
 * Process data to save a new company record.
 */
async function store(request: Request, response: Response) {
  const companiesRepository = getRepository(Company)
  const companyData = companiesRepository.create(request.body as DeepPartial<Company>)
  const company = await companiesRepository.save(companyData)
  const resource = companyResource.render(company)

  response
    .status(StatusCodes.CREATED)
    .json(resource)
}

/**
 * Process data to update an existing company record.
 */
async function update(request: Request, response: Response) {
  const companyId = Number(request.params.id)
  const companiesRepository = getRepository(Company)
  const company = await companiesRepository.findOneOrFail(companyId)

  Object.assign(company, request.body)
  await companiesRepository.save(company)
  const resource = companyResource.render(company)

  response
    .status(StatusCodes.OK)
    .json(resource)
}

/**
 * Softly delete an existing company record.
 */
async function destroy(request: Request, response: Response) {
  const companyId = Number(request.params.id)
  const companiesRepository = getRepository(Company)
  await companiesRepository.softDelete(companyId)
  const company = await companiesRepository.findOneOrFail(companyId, { withDeleted: true })
  const resource = companyResource.render(company)

  response
    .status(StatusCodes.OK)
    .json(resource)
}

export default {
  index,
  show,
  store,
  update,
  destroy,
}
