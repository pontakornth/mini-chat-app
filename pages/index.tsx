import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Container, Flex, Heading } from '@chakra-ui/layout'
import Head from 'next/head'

export default function Home(): JSX.Element {
  return (
    <Container>
      <Head>
        <title>Mini Chat App: Login</title>
      </Head>
      <Flex flexFlow="column" as="form" p={4}>
        <Heading mb={4}>Login</Heading>
        <FormControl id="email">
          <FormLabel>E-mail</FormLabel>
          <Input type="email" />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input type="password" />
        </FormControl>
        <Button alignSelf="flex-end" mt={4} colorScheme="green">
          Login
        </Button>
      </Flex>
    </Container>
  )
}
