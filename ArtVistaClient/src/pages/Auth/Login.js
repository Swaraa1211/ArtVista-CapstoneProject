import {
    Flex,
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    } from '@chakra-ui/react';
  
  import React from 'react';
  
  export default function Login(){
      return (
          <>
          <Flex width="full" align="center" justifyContent="center">
              <Box p={2}>
                  <Box textAlign="center">
                      <Heading>Login</Heading>
                  </Box>
                  <Box p={4} textAlign="left">
                          <FormControl isRequired>
                              <FormLabel>Email</FormLabel>
                              <Input type='email' placeholder='test@gmail.com' />
                          </FormControl>
                          <FormControl isRequired>
                              <FormLabel>Password</FormLabel>
                              <Input type='password' placeholder='******' />
                          </FormControl>
                          <Button type='submit'>Log In</Button>
                  </Box>
              </Box>
          </Flex>
              
          </>
      )
  }