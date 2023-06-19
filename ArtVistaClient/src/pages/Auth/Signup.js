
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
import { useState, useEffect } from 'react';
import { Signup } from '../../API/users';

export default function SignupPage() {

  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = {
      userName: event.target.elements.name.value,
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
    };
  
    const response = await Signup(formData);
  
    if (response && response.status) {
      console.log('Successful SignUp', response.data);
      // Perform any additional actions after successful signup
  
      // Navigate to the home page
      navigate('/homePage');
    } else {
      console.log('Signup failed in handle submit', response);
      // Handle signup failure, display error message, etc.
    }
  };
  
  

  return (
    <>
      <Flex width="full" align="center" justifyContent="center">
        <Box p={2}>
          <Box textAlign="center">
            <Heading>SignUp</Heading>
          </Box>
          <Box p={4} textAlign="left">
            <form onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input type='text' name='name' placeholder='Name' />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input type='email' name='email' placeholder='test@gmail.com' />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input type='password' name='password' placeholder='******' />
              </FormControl>
              <Button type='submit'>Sign Up</Button>
            </form>

          </Box>
        </Box>
      </Flex>

    </>
  )
}