type UserInTransaction = {
  id: string
  name: string
  email: string
}

export type TransactionResponse = {
  id: string
  createdAt: string
  value: number
  debited: UserInTransaction
  credited: UserInTransaction
  transferred: boolean
}
