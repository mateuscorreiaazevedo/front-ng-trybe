import { Center, Stack } from '@chakra-ui/react'
import React from 'react'
import { Footer } from '../../footer'

type Props = {
  children: React.ReactNode
}

export const PrivateLayout: React.FC<Props> = ({ children }) => {
  return (
    <Stack w="full" minH="100vh" bg="gray.200">
      <Center maxW="1240px" mx="auto">
        {children}
      </Center>
      <Footer />
    </Stack>
  )
}
