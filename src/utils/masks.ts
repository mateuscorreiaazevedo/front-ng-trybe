import { format } from 'date-fns'

export const maskUtil = {
  currency: (value: number) => {
    const formatted = Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
    return formatted.format(value)
  },
  name: (value: string | undefined) => {
    const formatted = value?.split(' ')[0]

    return formatted
  },
  date: (value: string) => {
    const formatted = format(new Date(value), 'dd/MM/yyyy')
    return formatted
  },
  setDate: (value: string) => {
    const formatted = format(new Date(value), 'yyy-MM-dd')
    return formatted
  }
}
