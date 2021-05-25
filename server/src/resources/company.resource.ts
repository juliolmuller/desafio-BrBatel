import * as cnpj from 'cnpj'
import { Company } from '../models'
import { routes } from '../routes/company.routes'

interface CompanyResource extends Company {
  links: unknown
}

interface CompanyResourcePage {
  current_page: number
  items_per_page: number
  total_items: number
  total_pages: number
  first_page: string
  previous_page: string | null
  next_page: string | null
  last_page: string
  data: CompanyResource[]
}

function render(data: Company): CompanyResource {
  return {
    ...data,
    cnpj: cnpj.format(data.cnpj),
    links: {
      show: {
        method: 'get',
        url: process.env.API_ROOT + routes.show.replace(':id', String(data.id)),
      },
      update: {
        method: 'patch',
        url: process.env.API_ROOT + routes.update.replace(':id', String(data.id)),
      },
      destroy: {
        method: 'delete',
        url: process.env.API_ROOT + routes.destroy.replace(':id', String(data.id)),
      },
    },
  }
}

function renderMany(data: Company[]) {
  return data.map(render)
}

function paginate(
  data: Company[],
  currPage: number,
  itemsPerPage: number,
  totalItems: number,
): CompanyResourcePage {
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const hasNextPage = currPage < totalPages
  const hasPreviousPage = currPage > 1

  return {
    current_page: currPage,
    items_per_page: itemsPerPage,
    total_items: totalItems,
    total_pages: totalPages,
    first_page: `${process.env.API_ROOT + routes.index}?page=1&limit=${itemsPerPage}`,
    previous_page: hasPreviousPage
      ? `${process.env.API_ROOT + routes.index}?page=1&limit=${itemsPerPage}`
      : null,
    next_page: hasNextPage
      ? `${process.env.API_ROOT + routes.index}?page=1&limit=${itemsPerPage}`
      : null,
    last_page: `${process.env.API_ROOT + routes.index}?page=1&limit=${totalPages}`,
    data: renderMany(data),
  }
}

export default {
  renderMany,
  render,
  paginate,
}
