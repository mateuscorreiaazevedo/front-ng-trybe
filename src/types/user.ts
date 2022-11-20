export type UserRequest = {
  name: string
  email: string
  password: string
}

export type UserLogin = {
  email: string
  password: string
}

export type UserResponse = {
  id: string
  name: string
  email: string
  account: {
    id: string
    balance: number
  }
}
