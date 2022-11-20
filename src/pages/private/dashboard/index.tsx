// Components
import { Box, Divider, Flex, Heading, Skeleton, Spacer, Spinner, VStack } from '@chakra-ui/react'
import { TransactionStack } from '../../../components/transaction-stack'
import { BoxContacts } from '../../../components/box-contacts'
import { Header } from '../../../components/header'
import React from 'react'

// Utils
import { maskUtil } from '../../../utils/masks'
import { useApi } from '../../../hooks/use-api'

// Types
import { UserService } from '../../../services/user'
import { UserResponse } from '../../../types/user'

export const Dasboard = () => {
  const { dispatch, data: user, loading } = useApi<UserResponse>({ service: UserService.getCurrentUser })
  const balance = maskUtil.currency(user?.account.balance!)

  React.useEffect(() => {
    dispatch()
  }, [])

  return (
    <Box w="full" h="full" py={4}>
      <Header />
      <Flex mt={8} gap={8} flexDirection={{ md: 'row', base: 'column' }}>
        <VStack h="80vh" spacing={8}>
          <Skeleton isLoaded={!loading} borderRadius="xl">
            <Flex flexDirection="column" w={96} h="25vh" p={4} borderRadius="xl" shadow="xl" bg="teal.50">
              <Heading fontWeight="normal">Balance</Heading>
              <Spacer />
              <Heading
                fontWeight="light"
                as="h3"
                my={4}
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                fontSize={balance.length > 15 ? '4xl' : '5xl'}
              >
                {user?.account.balance ? balance : <Spinner />}
              </Heading>
            </Flex>
          </Skeleton>
          <Skeleton isLoaded={!loading} borderRadius="xl">
            <Box w={96} h="50.5vh" p={4} borderRadius="xl" shadow="xl" bg="teal.50">
              <Heading fontWeight="normal">Contatos</Heading>
              <Divider />
              <BoxContacts />
            </Box>
          </Skeleton>
        </VStack>
        <Skeleton isLoaded={!loading} borderRadius="xl">
          <Box w={96} h="80vh" bg="teal.50" p={4} shadow="xl" borderRadius="xl">
            <Heading fontWeight="normal">Transações</Heading>
            <Divider my={2} />
            <TransactionStack />
          </Box>
        </Skeleton>
      </Flex>
    </Box>
  )
}
