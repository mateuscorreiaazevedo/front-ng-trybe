// Components
import { Box, Divider, Flex, Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react'
import React from 'react'

// Types
import { TransactionResponse } from '../../../types/transactions'

// Utils
import { maskUtil } from '../../../utils/masks'

export const TransactionCard = (props: TransactionResponse) => {
  const { transferred, value, debited, credited, createdAt } = props
  const isCashIn = !transferred

  return (
    <Box
      w={72}
      py={1}
      px={2}
      transitionDuration="300ms"
      borderRadius="md"
      _hover={{
        bg: 'gray.50'
      }}
    >
      <Flex position="relative">
        <StatGroup>
          <Stat>
            <StatNumber color={isCashIn ? 'green' : 'red'}>
              <StatArrow type={isCashIn ? 'increase' : 'decrease'} />
              {maskUtil.currency(value)}
            </StatNumber>
            <StatLabel display="flex" fontWeight="normal" color="gray.500">
              {isCashIn ? 'Transferido por ' : 'Transferido para '}
              <Box fontWeight="semibold" ml={1} color="gray.800">
                {isCashIn ? debited.name : credited.name}
              </Box>
            </StatLabel>
          </Stat>
        </StatGroup>
        <Box fontSize="xs" position="absolute" right={0} color="gray.500">
          {maskUtil.date(createdAt)}
        </Box>
      </Flex>
      <Divider my={1} />
    </Box>
  )
}
