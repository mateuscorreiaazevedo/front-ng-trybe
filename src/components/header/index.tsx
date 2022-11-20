import { Box, Button, Center, Flex, Heading, Spacer, Spinner, Tooltip } from '@chakra-ui/react'
import React from 'react'
import { BsDoorOpen } from 'react-icons/bs'
import { useAuth } from '../../contexts/auth-context'
import { maskUtil } from '../../utils/masks'

export const Header = () => {
  const { user, signOut } = useAuth()
  return (
    <Box w="full">
      <Flex>
        <Center>
          <Heading>{user ? `Olá ${maskUtil.name(user.name)}!` : <Spinner />}</Heading>
        </Center>
        <Spacer />
        <Center>
          <Tooltip bg="teal.500" label="Clique para sair da aplicação" hasArrow color="white">
            <Button fontSize="xl" gap={2} colorScheme="teal" onClick={signOut}>
              <BsDoorOpen /> Sair
            </Button>
          </Tooltip>
        </Center>
      </Flex>
    </Box>
  )
}
