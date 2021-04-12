import Index from '../pages/index'
import { render, screen, fireEvent, act } from './test-utils'
import mockSdk from 'firebase-mock'

const mockPush = jest.fn()

jest.mock('../helpers/auth', () => ({
  loginWithEmail: jest.fn().mockImplementation((email: string, password: string) => {
    return new Promise<void>((resolve, reject) => {
      if (email == 'errorman') {
        reject({ code: 'auth/invalid-email' })
      } else if (password == 'incorrect') {
        reject({ code: 'auth/wrong-password' })
      } else if (email == 'not@found.com') {
        reject({ code: 'auth/user-not-found' })
      } else {
        resolve()
      }
    })
  }),
}))
jest.mock('next/router', () => ({
  push: jest.fn(),
  useRouter: jest.fn(() => ({
    push: mockPush,
  })),
}))

jest.mock('../helpers/firebase', () => ({
  default: mockSdk,
  auth: new mockSdk.MockAuthentication(),
  database: new mockSdk.MockDatabase(),
}))

it('have email and password form', () => {
  render(<Index />)
  screen.getByLabelText(/E-mail/i)
  screen.getByLabelText(/Password/i)
  screen.getByRole('button')
})

it('can validate email address', () => {
  render(<Index />)
  const emailInput = screen.getByLabelText(/E-mail/i)
  act(() => {
    fireEvent.change(emailInput, { target: { value: 'errorman' } })
    fireEvent.click(screen.getByRole('button'))
  })
  screen.findByText(/Invalid E-mail address/i)
})

it('can redirect once the login is good', () => {
  render(<Index />)
  act(() => {
    fireEvent.change(screen.getByLabelText(/E-mail/i), { target: { value: 'valid@email.com' } })
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'correct_password' } })
    fireEvent.click(screen.getByRole('button'))
  })
  expect(mockPush).toHaveBeenCalledWith('/chat')
})
