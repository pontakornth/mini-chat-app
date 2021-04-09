import Index from '../pages/index'
import Router from 'next/router'
import { render, screen, fireEvent } from './test-utils'

it('have email and password form', () => {
  render(<Index />)
  screen.getByLabelText(/E-mail/i)
  screen.getByLabelText(/Password/i)
  screen.getByText(/Login/i)
})

it('can validate email address', () => {
  render(<Index />)
  const emailInput = screen.getByLabelText(/E-mail/i)
  fireEvent.input(emailInput, { target: { value: 'errorman' } })
  fireEvent.click(screen.getByText('Login'))
  screen.getByText(/Invalid E-mail address/i)
})

it('can redirect once the login is good', () => {
  jest.mock('next/router', () => {
    jest.fn()
  })
  // TODO: Mock authentication
  fireEvent.input(screen.getByLabelText(/E-mail/i), { target: { value: 'valid@email.com' } })
  fireEvent.input(screen.getByLabelText(/Password/i), { target: { value: 'correct_password' } })
  fireEvent.click(screen.getByText('Login'))
  expect(Router.push).toHaveBeenCalledWith('/chat')
})
