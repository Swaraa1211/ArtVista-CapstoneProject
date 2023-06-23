import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import '@fontsource/raleway/400.css';
import '@fontsource/open-sans/700.css';
import theme from './constant/theme';
import AuthProvider from '../src/pages/Auth/authProvider';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <ChakraProvider theme={theme}>
    <AuthProvider>
      <App />
    </AuthProvider>
    
  </ChakraProvider>
);