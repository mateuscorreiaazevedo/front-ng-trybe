// Components
import { Box, Button, Center, InputGroup, InputLeftElement, Spinner } from '@chakra-ui/react'
import { CardContacts } from './card-contacts'
import { Input } from '../input'
import React from 'react'

// Icons
import { BsSearch, BsArrowLeft, BsArrowRight } from 'react-icons/bs'
// Types

import { ContactDocsResponse, ContactRequest, ContactResponse } from '../../types/contacts'

// Service
import { ContactService } from '../../services/contacts'
import { useApi } from '../../hooks/use-api'

export const BoxContacts = () => {
  const [page, setPage] = React.useState(1)
  const [search, setSearch] = React.useState('')
  const {
    dispatch,
    data: contacts,
    loading
  } = useApi<ContactResponse, ContactRequest>({ service: ContactService.getContacts })

  React.useEffect(() => {
    dispatch({ page, search })
  }, [search])

  return (
    <>
      <>
        <Center mt={3} gap={2}>
          <InputGroup>
            <InputLeftElement fontSize="xl" w={10} children={<BsSearch />} />
            <Input placeholder="Pesquisar contatos" pl={10} onChange={(e) => setSearch(e.target.value)} />
          </InputGroup>
        </Center>
      </>
      {!loading ? (
        <>
          <Box
            overflowX="hidden"
            overflowY="auto"
            w="full"
            h="72"
            py={4}
            mt={4}
            css={`
              &::-webkit-scrollbar {
                width: 4px;
                background: none;
              }
              &::-webkit-scrollbar-thumb {
                border-radius: 5px;
                background-color: #eee;
              }
            `}
          >
            {contacts?.docs.map((contact: ContactDocsResponse, key: React.Key) => (
              <CardContacts contact={contact} key={key} />
            ))}
          </Box>
          <Center gap={2}>
            {contacts?.hasPrevPage && (
              <Button gap={2} onClick={() => setPage((prev) => prev - 1)}>
                <BsArrowLeft /> Anterior
              </Button>
            )}
            {contacts?.hasNextPage && (
              <Button gap={2} onClick={() => setPage((prev) => prev + 1)}>
                Próximo <BsArrowRight />
              </Button>
            )}
          </Center>
        </>
      ) : (
        <Center h={72}>
          <Spinner size="xl" color="teal.400" thickness="4px" />
        </Center>
      )}
    </>
  )
}
