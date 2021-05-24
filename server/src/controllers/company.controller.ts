import { StatusCodes } from 'http-status-codes'
import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { Company } from '../models'

/**
 * Return a list of companies records.
 */
async function index(request: Request, response: Response) {
  const companiesRepository = getRepository(Company)
  const companies = await companiesRepository.find()

  response
    .status(StatusCodes.OK)
    .json(companies)
}

/**
 * Return a single company record.
 */
async function show(request: Request, response: Response) {
  const companyId = Number(request.params.id)
  const companiesRepository = getRepository(Company)
  const company = await companiesRepository.findOneOrFail(companyId)

  response
    .status(StatusCodes.OK)
    .json(company)
}

/**
 * Process data to save a new company record.
 */
async function store(request: Request, response: Response) {
  const companiesRepository = getRepository(Company)
  const companyData = companiesRepository.create(request.body)
  const company = await companiesRepository.save(companyData)

  response
    .status(StatusCodes.CREATED)
    .json(company)
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

  response
    .status(StatusCodes.OK)
    .json(company)
}

/**
 * Softly delete an existing company record.
 */
async function destroy(request: Request, response: Response) {
  const companyId = Number(request.params.id)
  const companiesRepository = getRepository(Company)
  await companiesRepository.softDelete(companyId)
  const company = await companiesRepository.findOneOrFail(companyId, { withDeleted: true })

  response
    .status(StatusCodes.OK)
    .json(company)
}

export default {
  index,
  show,
  store,
  update,
  destroy,
}
