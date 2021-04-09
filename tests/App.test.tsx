import Header from '../components/Header'
import { render, screen } from './test-utils'

it('render correctly', () => {
  render(<Header />)
  screen.getByText(/hello/i)
})
