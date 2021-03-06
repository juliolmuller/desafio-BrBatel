
export const ANNUAL_INCOME_OPTIONS = [
  'Até R$10 milhões',
  'De R$10 a R$50 milhões',
  'De R$50 a R$200 milhões',
  'De R$200 a R$500 milhões',
  'Acima de R$500 milhões',
] as const

export declare type Company = {
  readonly id?: number
  name: string
  cnpj: string
  demand: number
  annual_income: typeof ANNUAL_INCOME_OPTIONS[number]
  about?: string
  image?: string
  // readonly created_at?: Date
  // readonly updated_at?: Date
  // readonly deleted_at?: Date
}

export declare type CompanyFormData = {
  annual_income: '' | typeof ANNUAL_INCOME_OPTIONS[number]
  demand: string
  about: string
  name: string
  cnpj: string
}

export declare type Pagination = {
  current_page: number
  total_items: number
  total_pages: number
  first_page: string
  previous_page: string | null
  next_page: string | null
  last_page: string
  data: Company[]
}
