/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import axios from 'axios'

import type { AxiosTransformer } from 'axios'

/**
 * Função transformer NÃO USADA, pois na geração de páginas
 * estáticas não é possível passar instâncias de objetos, como "Date".
 */
const parseDateProps: AxiosTransformer = (data: any) => {
  if (Array.isArray(data.data)) {
    data.data.forEach((item) => parseDateProps(item))
  } else if (Array.isArray(data)) {
    data.forEach((item) => parseDateProps(item))
  } else if (data.created_at || data.updated_at || data.deleted_at) {
    data.created_at &&= new Date(data.created_at)
    data.updated_at &&= new Date(data.updated_at)
    data.deleted_at &&= new Date(data.deleted_at)
  }

  return data
}

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // transformResponse: [
  //   ...axios.defaults.transformResponse as [],
  //   parseDateProps,
  // ],
})

export default http
