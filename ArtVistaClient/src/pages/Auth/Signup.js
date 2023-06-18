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
  import { useNavigate } from 'react-router-dom';
  import { useState } from 'react';
  
  export default function Signup(){

    const [data, setData] = useState({
        userName: "",
        email: "",
        password: "",

    });

    const handle = (e) =>{
        e.prevenDefault();
        console.log(data);
    }


      return (
          <>
          <Flex width="full" align="center" justifyContent="center">
              <Box p={2}>
                  <Box textAlign="center">
                      <Heading>SignUp</Heading>
                  </Box>
                  <Box p={4} textAlign="left">
                    <form onSubmit={handle}>
                          <FormControl isRequired>
                              <FormLabel>Name</FormLabel>
                              <Input type='text'  placeholder='Name' />
                          </FormControl>
                          <FormControl isRequired>
                              <FormLabel>Email</FormLabel>
                              <Input type='email' placeholder='test@gmail.com' />
                          </FormControl>
                          <FormControl isRequired>
                              <FormLabel>Password</FormLabel>
                              <Input type='password'  placeholder='******' />
                          </FormControl>
                          <Button type='submit'>Sign Up</Button>
                       </form>
                  </Box>
                   
              </Box>
          </Flex>
              
          </>
      )
  }