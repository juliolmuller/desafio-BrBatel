import BaseResource from './Resource'
import { companyRoutes } from '@/router'
import { cnpjUtils } from '@/utils'

import type { PaginationMeta } from './Resource'
import type { Company } from '@/app/models'

export type CompanyJsonResource = Company & {
  links: unknown
}

export type CompanyJsonResourcePage = {
  current_page: number
  total_items: number
  total_pages: number
  first_page: string
  previous_page: string | null
  next_page: string | null
  last_page: string
  data: CompanyJsonResource[]
}

class CompanyResource extends BaseResource<Company> {

  /**
   * Expor atributos da entidade "Company" formatados e com HATEOAS.
   */
  public render = (entity: Company): CompanyJsonResource => {
    return {
      ...entity,
      cnpj: cnpjUtils.format(entity.cnpj),
      image: `${process.env.SERVER_ROOT}/images/${entity.image}`,
      links: {
        show: {
          method: 'get',
          url: process.env.SERVER_ROOT + companyRoutes.show.replace(':id', String(entity.id)),
        },
        update: {
          method: 'patch',
          url: process.env.SERVER_ROOT + companyRoutes.update.replace(':id', String(entity.id)),
        },
        destroy: {
          method: 'delete',
          url: process.env.SERVER_ROOT + companyRoutes.destroy.replace(':id', String(entity.id)),
        },
      },
    }
  }

  /**
   * Expor lista de entidades "Company".
   */
  public renderMany = (entities: Company[]) => {
    return entities.map(this.render)
  }

  /**
   * Expor lista de entidades "Company" com dados de paginação.
   */
  public paginate = (
    entities: Company[],
    { currPage, itemsPerPage, itemsCount }: PaginationMeta,
  ): CompanyJsonResourcePage => {
    const totalPages = Math.ceil(itemsCount / itemsPerPage) || 1
    const hasNextPage = currPage < totalPages
    const hasPreviousPage = currPage > 1

    console.log(currPage, itemsPerPage, itemsCount)

    return {
      current_page: currPage,
      total_items: itemsCount,
      total_pages: totalPages,
      first_page: `${process.env.SERVER_ROOT + companyRoutes.index}?page=1&limit=${itemsPerPage}`,
      previous_page: hasPreviousPage
        ? `${process.env.SERVER_ROOT + companyRoutes.index}?page=1&limit=${itemsPerPage}`
        : null,
      next_page: hasNextPage
        ? `${process.env.SERVER_ROOT + companyRoutes.index}?page=1&limit=${itemsPerPage}`
        : null,
      last_page: `${process.env.SERVER_ROOT + companyRoutes.index}?page=${totalPages}&limit=${itemsPerPage}`,
      data: this.renderMany(entities),
    }
  }
}

export default CompanyResource
