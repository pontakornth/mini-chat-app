import { render, screen, act, fireEvent } from './test-utils'
import ChatRoom from '../pages/chat/index'
import mockSdk from 'firebase-mock'

const mockPush = jest.fn()

jest.mock('next/router', () => ({
  push: jest.fn(),
  useRouter: jest.fn(() => ({
    push: mockPush,
  })),
}))

jest.mock('../helpers/firebase', () => ({
  auth: new mockSdk.MockAuthentication(),
  database: new mockSdk.MockDatabase(),
}))

it('can has expected elements', () => {
  render(<ChatRoom />)
  expect(screen.getByLabelText(/room number/i)).toBeInTheDocument()
  expect(screen.getByRole('button')).toBeInTheDocument()
})

it('can send you to the chat room', () => {
  render(<ChatRoom />)
  act(() => {
    const roomNumberInput = screen.getByLabelText(/number/i)
    fireEvent.change(roomNumberInput, { target: { value: '1234' } })
    fireEvent.click(screen.getByRole('button'))
  })
  expect(mockPush).toHaveBeenCalledWith('/chat/1234')
})

/*
TODO:
  - If user is not authenticated, it will redirect to /
  - Validation of chat room id structure
  - Ability to create or join actual chat
*/
