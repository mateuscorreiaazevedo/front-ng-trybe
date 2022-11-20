// Components
import {
  Button,
  Center,
  FormControl,
  Heading,
  VStack,
  Box,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner
} from '@chakra-ui/react'
import { Input } from '../../../components/input'
import { ALink } from '../../../components/link'
import { Label } from '../../../components/label'
import React from 'react'

// Icons
import { BsEye, BsEyeSlash, BsKeyFill, BsFillEnvelopeFill, BsFillPersonFill } from 'react-icons/bs'

// Navigations
import { Link } from 'react-router-dom'

// Contexts
import { useAuth } from '../../../contexts/auth-context'

// Types
import { UserRequest } from '../../../types/user'

const initialValue: UserRequest = {
  email: '',
  name: '',
  password: ''
}

export const Register = () => {
  const [data, setData] = React.useState<UserRequest>(initialValue)
  const [showKey, setShowKey] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const { register } = useAuth()

  const setValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setLoading(true)
      await register({
        email: data.email,
        name: data.name,
        password: data.password
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <VStack justify="space-evenly" minH="80vh" w={96} bg="gray.200" borderRadius="md" shadow="lg">
      <Center flexDirection="column" mt="14">
        <Heading>Registrar-se NG</Heading>
        <Heading>{'< >'} TRYBE</Heading>
      </Center>

      <Box w={80}>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl>
              <Label text="Nome Completo" />
              <InputGroup>
                <InputLeftElement color="teal.600" fontSize="xl" children={<BsFillPersonFill />} />
                <Input pl="10" placeholder="John Smith" name="name" onChange={setValue} />
              </InputGroup>
            </FormControl>

            <FormControl>
              <Label text="E-mail" />
              <InputGroup>
                <InputLeftElement color="teal.600" fontSize="xl" children={<BsFillEnvelopeFill />} />
                <Input pl="10" placeholder="example@email.com" name="email" onChange={setValue} />
              </InputGroup>
            </FormControl>

            <FormControl>
              <Label text="Senha" />
              <InputGroup>
                <InputLeftElement color="teal.600" fontSize="xl" children={<BsKeyFill />} />
                <Input
                  type={showKey ? 'text' : 'password'}
                  pl={10}
                  placeholder="********"
                  name="password"
                  onChange={setValue}
                />
                <InputRightElement
                  color="teal.600"
                  cursor="pointer"
                  onClick={() => setShowKey((p) => !p)}
                  children={showKey ? <BsEye /> : <BsEyeSlash />}
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <Button type="submit" w="full" colorScheme="teal">
                {!loading ? 'Registrar' : <Spinner />}
              </Button>
            </FormControl>
          </VStack>
        </form>

        <Center pt={6}>
          Já possui uma conta?{' '}
          <Link to="/">
            <ALink>Acesse aqui</ALink>
          </Link>
        </Center>
      </Box>
      <Center pb={6}>&copy; Mateus Azevedo - 2022</Center>
    </VStack>
  )
}
