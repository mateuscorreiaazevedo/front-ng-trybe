// Axios
import axios, { AxiosResponse, AxiosInstance } from 'axios'

// Types
type HttpRequest = {
  url: string
  method?: 'get' | 'post' | 'put' | 'delete'
  headers?: any
  body?: any
  params?: any
}

type HttpResponse<T = any> = {
  statusCode: number
  body: T
}

const BASE_URL = import.meta.env.VITE_BASE_URL || 'https://mateus-mg-trybe-backend.herokuapp.com'

class ApiService {
  private api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: BASE_URL
    })
  }

  async request<T = any>(props: HttpRequest): Promise<HttpResponse> {
    let response: AxiosResponse<T>

    try {
      response = await this.api.request<T>({
        url: props.url,
        method: props.method || 'get',
        headers: props.headers || {},
        data: props.body || {},
        params: props.params || {}
      })
    } catch (error) {
      response = (error as any)?.response
    }
    return {
      statusCode: response.status,
      body: response.data
    }
  }
}

export const apiService = new ApiService()
