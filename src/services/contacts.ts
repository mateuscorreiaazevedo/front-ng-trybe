import { tokenUtil } from '../utils/token'
import { apiService } from './api'

const token = tokenUtil.get()

// GET /contacts
type ContactsProps = {
  page?: number
  search?: string
}

// POST /transfer
type TransferProps = {
  to: string
  value: number
}

export namespace ContactService {
  // Contacts
  export async function getContacts({ page, search }: ContactsProps) {
    const response = await apiService.request({
      url: '/contacts',
      method: 'get',
      params: {
        page: page || 1,
        search: search || ''
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Beaerer ${token}`
      }
    })

    switch (response.statusCode) {
      case 200:
        return response.body
      case 422:
        throw new Error(response.body.errors[0])
      default:
        throw new Error('Erro inesperado no servidor. Por favor, tente mais tarde.')
    }
  }

  // Transfer
  export async function transferCash({ to, value }: TransferProps) {
    const response = await apiService.request({
      url: '/transfer',
      method: 'post',
      body: { to, value },
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    switch (response.statusCode) {
      case 201:
        return response.body
      case 404:
        throw new Error(response.body.errors[0])
      case 422:
        throw new Error(response.body.errors[0])
      default:
        throw new Error('Erro inesperado no servidor. Por favor, tente mais tarde.')
    }
  }
}
