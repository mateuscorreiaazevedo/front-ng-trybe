import { Center } from '@chakra-ui/react'
import React from 'react'

type LayoutProps = {
  children: React.ReactNode
}

export const PublicLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Center as="main" w="full" h="100vh">
      {children}
    </Center>
  )
}
