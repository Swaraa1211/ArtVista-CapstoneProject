import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
  },// #f3bd6b
  styles: {
    global: () => ({
      body: {
        // bg: 'white',
        // color: '#EDEDED',
      },
      
    }),
  },
})

export default theme