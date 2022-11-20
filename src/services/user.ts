import { UserLogin, UserRequest } from '../types/user'
import { tokenUtil } from '../utils/token'
import { apiService } from './api'

const token = tokenUtil.get()

export namespace UserService {
  // Register
  export async function register({ email, name, password }: UserRequest) {
    const response = await apiService.request({
      url: '/register',
      method: 'post',
      body: {
        name: name || null,
        email: email || null,
        password: password || null
      }
    })

    switch (response.statusCode) {
      case 201:
        return response.body
      case 422:
        throw new Error(response.body.errors[0])
      default:
        throw new Error('Erro inesperado no servidor.Por favor, tente mais tarde.')
    }
  }

  // Login
  export async function signIn({ email, password }: UserLogin) {
    const response = await apiService.request({
      url: '/login',
      method: 'post',
      body: {
        email: email || null,
        password: password || null
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

  // getCurrentUser
  export async function getCurrentUser() {
    const response = await apiService.request({
      url: '/me',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token!}`
      }
    })

    switch (response.statusCode) {
      case 200:
        return response.body
      case 401:
        throw new Error(response.body.errors[0])
      default:
        throw new Error('Erro inesperado no servidor. Por favor, tente mais tarde.')
    }
  }
}
