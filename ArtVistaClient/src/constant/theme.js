import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {

    heading: `'Belanosima', sans-serif`,
    body: `'Raleway', sans-serif`,
  },// #f3bd6b
  styles: {
    global: () => ({
      body: {
        bgImage: "url('https://i.pinimg.com/564x/5c/78/f8/5c78f8110793462260c24954deb9db22.jpg')",
        backgroundSize: "500px 500px",
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
        // bg: 'white',
        // color: '#EDEDED',
      },

    }),
  },
})

export default theme