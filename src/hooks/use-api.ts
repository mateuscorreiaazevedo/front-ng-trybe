import React from 'react'

type Props = {
  service: any
}

type Response<T, S = any> = {
  dispatch: (params?: S) => Promise<void>
  data: T | null
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  error: string
}

export function useApi<T, S = any>({ service }: Props): Response<T, S> {
  const [data, setData] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  const dispatch = React.useCallback(async (params?: S) => {
    try {
      setLoading(true)
      const response = await service(params)
      setData(response)
    } catch (error) {
      setError((error as any).message)
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    dispatch,
    data,
    loading,
    setLoading,
    error
  }
}
