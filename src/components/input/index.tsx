import { Input as ChakraInput, InputProps } from '@chakra-ui/react'
import React from 'react'

export const Input: React.FC<InputProps> = ({ ...props }) => {
  return <ChakraInput bg="teal.200" {...props} />
}
