import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Highlight,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Tooltip,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import React from 'react'
import { MdAttachMoney } from 'react-icons/md'
import { useAuth } from '../../contexts/auth-context'
import { ContactService } from '../../services/contacts'

type Props = {
  id: string
  email: string
}

export const ModalTransfer: React.FC<Props> = ({ id, email }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [value, setValue] = React.useState('')
  const { setLoading } = useAuth()
  const toast = useToast()

  const handleTransfer = async () => {
    try {
      const response = await ContactService.transferCash({ value: Number(value), to: id })
      toast({
        status: 'success',
        position: 'top',
        title: response.message,
        duration: 2000
      })
      onClose()
      setLoading((prev) => !prev)
    } catch (error) {
      toast({
        status: 'error',
        position: 'top',
        title: (error as any).message,
        duration: 1200
      })
    }
  }

  const handleClosed = () => {
    onClose()
    setValue('')
  }

  return (
    <>
      <Tooltip label="Transferir" bg="teal" color="white" hasArrow>
        <Button
          onClick={onOpen}
          bg="transparent"
          fontSize="3xl"
          color="gray.500"
          _hover={{ color: 'white', bg: 'teal.600' }}
        >
          <MdAttachMoney />
        </Button>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="gray.100">
          <ModalHeader fontSize="3xl">Transferência</ModalHeader>
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Valores em Reais*</FormLabel>
              <NumberInput min={0} step={0.01} precision={2} onChange={(stringValue) => setValue(stringValue)}>
                <NumberInputField bg="teal.50" fontSize="xl" placeholder="R$ 0,00" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <Box fontSize="sm">
              <Highlight
                query={email}
                children={`Transferindo para a conta: ${email}`}
                styles={{ color: 'teal.800', fontWeight: 'bold' }}
              />
            </Box>
            <Box mt={8} color="gray.400">
              <i>Antes de efetuar a transferência, por favor verifique a conta que receberá o valor*</i>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleTransfer}>
              Transferir
            </Button>
            <Button variant="ghost" ml={3} onClick={handleClosed}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
