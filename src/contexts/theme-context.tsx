import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import { ColorModeScript } from '@chakra-ui/color-mode'
import React from 'react'

const Context = React.createContext({})

type ProviderTheme = {
  children: React.ReactNode
}

export const ThemeProvider: React.FC<ProviderTheme> = ({ children }) => {
  return (
    <Context.Provider value={{}}>
      <ChakraProvider>
        <ColorModeScript initialColorMode="dark" />
        <CSSReset />
        {children}
      </ChakraProvider>
    </Context.Provider>
  )
}
