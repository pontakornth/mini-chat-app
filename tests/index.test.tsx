import Index from '../pages/index'
import Router from 'next/router'
import { render, screen, fireEvent } from './test-utils'
import { loginWithEmail } from '../helpers/auth'

beforeAll(() => {
  jest.mock('next/router', () => ({
    push: jest.fn(),
  }))
  jest.mock('../helpers/auth', () => ({
    login: jest.fn().mockImplementation((email: string, password: string) => {
      if (email == 'errorman') {
        throw { code: 'auth/invalid-email' }
      } else if (password == 'incorrect') {
        throw { code: 'auth/wrong-password' }
      } else if (email == 'not@found.com') {
        throw { code: 'auth/user-not-found' }
      }
    }),
  }))
})

it('have email and password form', () => {
  render(<Index />)
  screen.getByLabelText(/E-mail/i)
  screen.getByLabelText(/Password/i)
  screen.getByRole('button')
})

it('can validate email address', () => {
  render(<Index />)
  const emailInput = screen.getByLabelText(/E-mail/i)
  fireEvent.input(emailInput, { target: { value: 'errorman' } })
  fireEvent.click(screen.getByRole('button'))
  screen.getByText(/Invalid E-mail address/i)
})

it('can redirect once the login is good', () => {
  render(<Index />)
  fireEvent.input(screen.getByLabelText(/E-mail/i), { target: { value: 'valid@email.com' } })
  fireEvent.input(screen.getByLabelText(/Password/i), { target: { value: 'correct_password' } })
  fireEvent.click(screen.getByRole('button'))
  expect(loginWithEmail).toHaveBeenCalledWith(['valid@email.com', 'correct_password'])
  expect(Router.push).toHaveBeenCalledWith('/chat')
})
