import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Container, Flex, Heading } from '@chakra-ui/layout'
import { NextPage } from 'next'

const Chat: NextPage = () => {
  return (
    <Container>
      <Heading>Chat Page</Heading>
      <Flex as="form">
        <FormControl id="room-id">
          <FormLabel>Room number</FormLabel>
          <Input type="number" />
        </FormControl>
      </Flex>
    </Container>
  )
}

export default Chat
