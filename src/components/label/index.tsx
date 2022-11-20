import { FormLabel } from '@chakra-ui/react'
import React from 'react'

type Props = {
  text: string
}

export const Label: React.FC<Props> = ({ text }) => {
  return (
    <FormLabel cursor="pointer" fontSize="lg">
      {text}
    </FormLabel>
  )
}
