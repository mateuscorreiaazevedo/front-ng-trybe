import { tokenUtil } from '../utils/token'
import { apiService } from './api'

type TransactionProps = {
  date?: string
  type?: string
}

const token = tokenUtil.get()

export namespace TransactionService {
  export async function getAll({ date, type }: TransactionProps) {
    const response = await apiService.request({
      url: '/transactions',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      params: { date: date || '', type: type || '' }
    })

    switch (response.statusCode) {
      case 200:
        return response.body
      case 401:
        throw new Error(response.body.errors[0])
      default:
        throw new Error('Erro no servidor. Por favor, tente mais tarde.')
    }
  }
}
