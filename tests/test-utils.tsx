import { ChakraProvider } from '@chakra-ui/react'
import { render } from '@testing-library/react'

const customRender = (
  ui: JSX.Element,
  options?: Parameters<typeof render>[1]
): ReturnType<typeof render> => {
  return render(<ChakraProvider>{ui}</ChakraProvider>, options)
}

export * from '@testing-library/react'

export { customRender as render }
