import { BrowserRouter } from 'react-router-dom'
import { PrivateRoutes } from './private'
import { PublicRoutes } from './public'

import { useAuth } from '../contexts/auth-context'
import { Center, Spinner } from '@chakra-ui/react'
import React from 'react'

export const AppRouter = () => {
  const { auth, loading } = useAuth()

  if (loading) {
    return (
      <Center w="full" h="100vh" bg="gray.200">
        <Spinner size="xl" color="teal.400" thickness="4px" />
      </Center>
    )
  }

  return <React.Suspense fallback={<p>carregando...</p>}>{auth ? <PrivateRoutes /> : <PublicRoutes />}</React.Suspense>
}
