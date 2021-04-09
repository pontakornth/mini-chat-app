import Header from '../components/Header'
import { render as rawRender, screen } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'

const render = (ui, options?: Parameters<typeof rawRender>[1]): ReturnType<typeof rawRender> => {
  return rawRender(<ChakraProvider>{ui}</ChakraProvider>, options)
}

it('render correctly', () => {
  render(<Header />)
  screen.getByText(/hello/i)
})
