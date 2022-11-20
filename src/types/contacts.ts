export type ContactDocsResponse = {
  id: string
  name: string
  email: string
  accountId: string
}

export type ContactResponse = {
  docs: ContactDocsResponse[]
  page: number
  hasPrevPage: boolean
  hasNextPage: boolean
}

export type ContactRequest = {
  page?: number
  search?: string
}
