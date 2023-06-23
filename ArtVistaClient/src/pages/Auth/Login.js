import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
} from '@chakra-ui/react';

import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Login } from '../../API/users';
import { useContext } from 'react';
import { AuthContext } from './authProvider';

export default function LoginPage() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      user_email: event.target.elements.email.value,
      user_password: event.target.elements.password.value,
    };

    const response = await Login(formData);

    // setIsAuthenticated(true);

    if (response && response.status) {
      console.log('Successful Login', response.data);
      localStorage.setItem('userToken', response.data.token);

      setIsAuthenticated(true);
      navigate('/homePage');
    } else {
      console.log('Login failed in handle submit', response);
    }

  }
  return (
    <>
      <Flex minHeight="100vh" width="full" align="center" justifyContent="center">
        <Box
          p={6}
          maxWidth="450px"
          maxHeight="900px"
          width="full"
          bg="url('https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60')"
          // bgImage="url('src/assets/images/Untitled.jpeg')"
          bgSize="cover"
          bgPosition="center"
          position="relative"
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={-1}
        >
          <Box textAlign="center">
            <Heading color="white">Login</Heading>
          </Box>
          <Box p={4}>
            <form onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel color="white">Email</FormLabel>
                <Input type="email" name="email" placeholder="test@gmail.com" />
              </FormControl>
              <FormControl mt={2} isRequired>
                <FormLabel color="white">Password</FormLabel>
                <Input type="password" name="password" placeholder="******" />
              </FormControl>
              <Button mt={4} type="submit" width="full" colorScheme="blue">
                Log In
              </Button>
            </form>
            <Text mt={4} textAlign="center" >
              Don't have an account?
              <Link to='/signup'>
                <Button mt='1px' type='submit' width="full" colorScheme="blue">Sign Up</Button>

              </Link>
            </Text>
          </Box>
        </Box>
        <Box>
          <Text textAlign="center">Some additional text or information here</Text>
        </Box>
      </Flex>

      {/* <Flex minHeight="100vh" width="full" align="center" justifyContent="center">
        <Box p={2}>
          <Box textAlign="center">
            <Heading>Login</Heading>
          </Box>
          <Box p={4} textAlign="left">
            <form onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input type='email' name='email' placeholder='test@gmail.com' />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input type='password' name='password' placeholder='******' />
              </FormControl>
              <Button mt='5px' type='submit' width="full" colorScheme="blue" >Log In</Button>
            </form>
            <p>Create new account?</p>
            <p>Sign Up Here</p>
            <Link to='/signup'>
              <Button mt='1px' type='submit' width="full" colorScheme="blue">Sign Up</Button>

            </Link>

          </Box>
        </Box>
        <Box>
          <Text>Welcome</Text>
        </Box>
      </Flex> */}

    </>
  )
}