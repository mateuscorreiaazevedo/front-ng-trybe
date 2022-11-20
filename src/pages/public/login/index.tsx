// Components
import {
  Button,
  Center,
  Heading,
  VStack,
  Spinner,
  Box,
  InputLeftElement,
  InputGroup,
  FormControl,
  InputRightElement
} from '@chakra-ui/react'
import { Input } from '../../../components/input'
import { ALink } from '../../../components/link'
import React from 'react'

// Icons
import { BsFillEnvelopeFill, BsKeyFill, BsEye, BsEyeSlash } from 'react-icons/bs'

// Navigations
import { Link } from 'react-router-dom'
import { useAuth } from '../../../contexts/auth-context'
import { Label } from '../../../components/label'
import { UserLogin } from '../../../types/user'
import { UserService } from '../../../services/user'
import { TokenUtil } from '../../../utils/token'

const initialValue: UserLogin = {
  email: '',
  password: ''
}

export const Login = () => {
  const [data, setData] = React.useState<UserLogin>(initialValue)
  const [loading, setLoading] = React.useState(false)
  const [showKey, setShowKey] = React.useState(false)
  const { signIn } = useAuth()

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
      await signIn({ email: data.email, password: data.password })
    } finally {
      setLoading(false)
    }
  }

  return (
    <VStack justify="space-evenly" bg="gray.200" minH="80vh" w={96} borderRadius="md" shadow="lg">
      <Box mt={14}>
        <Heading>Login NG </Heading>
        <Heading>{'< >'} TRYBE</Heading>
      </Box>

      <Box w={80}>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl>
              <Label text="E-mail" />
              <InputGroup>
                <InputLeftElement color="teal.600" fontSize="xl" children={<BsFillEnvelopeFill />} />
                <Input name="email" onChange={setValue} pl="10" placeholder="example@email.com" />
              </InputGroup>
            </FormControl>

            <FormControl>
              <Label text="Senha" />
              <InputGroup>
                <InputLeftElement color="teal.600" fontSize="xl" children={<BsKeyFill />} />
                <Input
                  name="password"
                  onChange={setValue}
                  type={showKey ? 'text' : 'password'}
                  pl={10}
                  placeholder="********"
                />
                <InputRightElement
                  cursor="pointer"
                  color="teal.600"
                  onClick={() => setShowKey((p) => !p)}
                  children={showKey ? <BsEye /> : <BsEyeSlash />}
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <Button type="submit" w="full" colorScheme="teal">
                {!loading ? 'Acessar' : <Spinner />}
              </Button>
            </FormControl>
          </VStack>
        </form>

        <Center pt={6}>
          Ainda não é cadastrado?{' '}
          <Link to="/register">
            <ALink>Cadastre-se</ALink>
          </Link>
        </Center>
      </Box>
      <Center pb={4}>&copy; Mateus Azevedo - 2022</Center>
    </VStack>
  )
}
