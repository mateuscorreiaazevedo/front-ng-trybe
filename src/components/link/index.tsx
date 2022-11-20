import { Link, Text } from '@chakra-ui/react'
import React from 'react'

type Props = {
  children: React.ReactNode
}

export const ALink: React.FC<Props> = ({ children }) => {
  return (
    <Text
      color="teal.500"
      ml="5px"
      fontWeight="medium"
      transitionDuration="400ms"
      _hover={{
        color: 'teal.400'
      }}
    >
      {children}
    </Text>
  )
}
