import { extendTheme } from '@chakra-ui/react';
import "@fontsource/poppins";

const theme = extendTheme({
    backgroundColor: '#f5f5dc',
    fonts: {
      heading: `'Poppins', semi-bold`,
      body: `'Poppins', semi-bold`,
    },
  })

export default theme