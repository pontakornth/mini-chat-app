import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Container, Flex, Heading } from '@chakra-ui/layout'
import { NextPage } from 'next'

const Chat: NextPage = () => {
  return (
    <Container p={4}>
      <Heading>Chat Page</Heading>
      <Flex as="form" flexFlow="column" alignContent="center">
        <FormControl id="room-id">
          <FormLabel>Room number</FormLabel>
          <Input type="number" />
        </FormControl>
        <Button alignSelf="flex-end" mt={4} colorScheme="blue">
          Join
        </Button>
      </Flex>
    </Container>
  )
}

export default Chat
