import { AuthProvider } from '../../contexts/auth-context'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from '../../routes/router'
import React from 'react'

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  )
}
