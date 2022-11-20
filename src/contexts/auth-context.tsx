// Provider
import { ThemeProvider } from './theme-context'

// Components
import { useToast } from '@chakra-ui/react'
import React from 'react'

// Utils
import { tokenUtil } from '../utils/token'
import { UserLogin, UserRequest, UserResponse } from '../types/user'
import { UserService } from '../services/user'

type ContextProps = {
  user: UserResponse | null
  auth: boolean
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  setLoad: React.Dispatch<React.SetStateAction<boolean>>
  load: boolean
  signOut: () => void
  signIn: ({ email, password }: UserLogin) => Promise<void>
  register: ({ email, name, password }: UserRequest) => Promise<void>
}

const Context = React.createContext({} as ContextProps)

type ProviderProps = {
  children: React.ReactNode
}

export const AuthProvider: React.FC<ProviderProps> = ({ children }) => {
  const [auth, setAuth] = React.useState(false)
  const [user, setUser] = React.useState<UserResponse | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [load, setLoad] = React.useState(false)
  const token = tokenUtil.get()
  const toast = useToast()

  const getMe = async () => {
    try {
      setLoad(true)
      const data = await UserService.getCurrentUser()
      setUser(data)
    } catch (error) {
      console.log((error as any).message)
    } finally {
      setLoad(false)
    }
  }

  React.useEffect(() => {
    if (token) {
      setAuth(true)
      getMe()
    }

    setLoading(false)
  }, [loading])

  const signIn = async ({ email, password }: UserLogin) => {
    try {
      const { token } = await UserService.signIn({
        email,
        password
      })
      tokenUtil.set(token)
      window.location.href = '/dashboard'
    } catch (error) {
      toast({
        status: 'error',
        position: 'top',
        duration: 1200,
        title: 'Erro',
        description: (error as any).message
      })
    }
  }

  const register = async ({ email, name, password }: UserRequest) => {
    try {
      await UserService.register({ email, name, password })
      window.location.href = '/'
    } catch (error) {
      toast({
        status: 'error',
        position: 'top',
        duration: 1200,
        title: 'Erro',
        description: (error as any).message
      })
    }
  }

  const signOut = () => {
    tokenUtil.clear()
    setUser(null)
    window.location.href = '/'
  }

  return (
    <Context.Provider value={{ auth, user, loading, setLoading, setLoad, load, signIn, signOut, register }}>
      <ThemeProvider>{children}</ThemeProvider>
    </Context.Provider>
  )
}

export const useAuth = () => {
  const context = React.useContext(Context)

  if (!context) throw new Error('Erro no Auth Provider')

  return { ...context }
}
