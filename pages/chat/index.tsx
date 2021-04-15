import { Button } from '@chakra-ui/button'
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Container, Flex, Heading } from '@chakra-ui/layout'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useUser } from '../../components/UserProvider'
import { joinChatRoom } from '../../helpers/chat'

const Chat: NextPage = () => {
  const [roomNumber, setRoomNumber] = useState('000000')
  const user = useUser()
  const router = useRouter()
  const isRoomNumberValid = (): boolean => {
    return /^[0-9]{6}$/.test(roomNumber)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setRoomNumber(e.target.value)
  }
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    joinChatRoom(roomNumber, user.uid).then(() => router.push(`/chat/${roomNumber}`))
  }
  return (
    <Container p={4}>
      <Heading>Chat Page</Heading>
      <Flex as="form" flexFlow="column" alignContent="center">
        <FormControl isInvalid={!isRoomNumberValid} id="room-id">
          <FormLabel>Room number</FormLabel>
          <Input type="number" value={roomNumber} onChange={handleChange} />
          <FormErrorMessage>
            {!isRoomNumberValid && 'Room number must be 6 number digits'}
          </FormErrorMessage>
        </FormControl>
        <Button
          onClick={handleClick}
          disabled={!isRoomNumberValid}
          alignSelf="flex-end"
          mt={4}
          colorScheme="blue"
        >
          Join
        </Button>
      </Flex>
    </Container>
  )
}

export default Chat
