// Copmponents
import { Box, Divider, Flex, Heading, Spacer } from '@chakra-ui/react'
import { ModalTransfer } from '../../modal-transfer'
import React from 'react'

// Types
import { ContactDocsResponse } from '../../../types/contacts'

type Props = {
  contact: ContactDocsResponse
}

export const CardContacts = ({ contact }: Props) => {
  const { email, name, id } = contact
  return (
    <Box w="100%" cursor="pointer" p={1} mx="auto" borderRadius="lg" transitionDuration="300ms">
      <Flex>
        <Box>
          <Heading fontSize="lg" fontWeight="semibold" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
            {name}
          </Heading>
          <Box color="gray.500" fontSize="md">
            {email}
          </Box>
        </Box>
        <Spacer />

        <ModalTransfer id={id} email={email} />
      </Flex>
      <Divider />
    </Box>
  )
}
