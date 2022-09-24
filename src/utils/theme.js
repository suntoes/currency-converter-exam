import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const styles = {
  global: (props) => ({
    body: {
      bg: mode('#d3ccc3', '#202023')(props)
    }
  })
}

const components = {
  Link: {
    baseStyle: (props) => ({
      color: mode('#0c3455', '#e9e29f')(props),
      textUnderlineOffset: 3
    })
  }
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true
}

const theme = extendTheme({ config, components, styles});

export default theme