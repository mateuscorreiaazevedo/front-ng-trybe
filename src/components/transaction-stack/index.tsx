import { Button, Center, Flex, Input, Select, Spinner, VStack } from '@chakra-ui/react'
import { format } from 'date-fns'
import React from 'react'
import { BsSearch } from 'react-icons/bs'
import { useApi } from '../../hooks/use-api'
import { TransactionService } from '../../services/transactions'
import { TransactionResponse } from '../../types/transactions'
import { TransactionCard } from './transaction-card'

export const TransactionStack = () => {
  const [type, setType] = React.useState('')
  const [date, setDate] = React.useState('')

  const {
    dispatch,
    loading,
    data: transactions
  } = useApi<TransactionResponse[]>({ service: TransactionService.getAll })

  React.useEffect(() => {
    dispatch({ date, type })
  }, [date, type])

  return (
    <>
      <Flex gap={1} w="full">
        <Input type="date" bg="teal.100" onChange={(e) => setDate(e.target.value)} />
        <Select fontSize="xs" bg="teal.100" onChange={(e) => setType(e.target.value)}>
          <option value="" selected>
            Todas
          </option>
          <option value="in">Cash-in</option>
          <option value="out">Cash-out</option>
        </Select>
      </Flex>
      {loading ? (
        <Center h="60vh">
          <Spinner color="teal.400" size="xl" thickness="4px" />
        </Center>
      ) : (
        <VStack
          mt={8}
          spacing={2}
          h="60vh"
          overflowY="auto"
          overflowX="hidden"
          w="full"
          css={`
            &::-webkit-scrollbar {
              width: 4px;
              background: none;
            }
            &::-webkit-scrollbar-thumb {
              border-radius: 5px;
              background: #eee;
            }
          `}
        >
          {transactions?.map((transaction: TransactionResponse, key: React.Key) => (
            <TransactionCard key={key} {...transaction} />
          ))}
        </VStack>
      )}
    </>
  )
}
