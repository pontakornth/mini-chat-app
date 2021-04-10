import { Button } from '@chakra-ui/button'
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Container, Flex, Heading } from '@chakra-ui/layout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { loginWithEmail } from '../helpers/auth'

export default function Home(): JSX.Element {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [emailErrorMsg, setEmailErrorMsg] = useState('')
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('')
  const [password, setPassword] = useState('')
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value)
  }
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value)
  }
  const login = (): void => {
    loginWithEmail(email, password)
      .then(() => {
        router.push('/chat')
      })
      .catch((e) => {
        setEmailErrorMsg('')
        setPasswordErrorMsg('')
        switch (e.code) {
          case 'auth/invalid-email':
            setEmailErrorMsg('Invalid E-mail address')
            break
          case 'auth/user-not-found':
            setEmailErrorMsg('User not found')
            break
          case 'auth/wrong-password':
            setPasswordErrorMsg('Wrong password')
            break
        }
      })
  }
  return (
    <Container>
      <Head>
        <title>Mini Chat App: Login</title>
      </Head>
      <Flex flexFlow="column" as="form" p={4}>
        <Heading mb={4}>Login</Heading>
        <FormControl id="email">
          <FormLabel>E-mail</FormLabel>
          <Input value={email} onChange={handleChangeEmail} type="email" />
          <FormErrorMessage>{emailErrorMsg}</FormErrorMessage>
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input value={password} onChange={handleChangePassword} type="password" />
          <FormErrorMessage>{passwordErrorMsg}</FormErrorMessage>
        </FormControl>
        <Button onClick={login} alignSelf="flex-end" mt={4} colorScheme="green">
          Login
        </Button>
      </Flex>
    </Container>
  )
}
