import Index from '../pages/index'
import { render, screen } from './test-utils'

it('have email and password form', () => {
  render(<Index />)
  screen.getByLabelText(/E-mail/i)
  screen.getByLabelText(/Password/i)
  screen.getByText(/Login/i)
})
