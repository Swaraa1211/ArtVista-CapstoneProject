
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
import { Link } from 'react-router-dom';
import { Signup } from '../../API/users';

export default function SignupPage() {

  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      user_name: event.target.elements.name.value,
      user_email: event.target.elements.email.value,
      user_password: event.target.elements.password.value,
    };

    const response = await Signup(formData);

    if (response && response.status) {
      console.log('Successful SignUp', response.data);
      navigate('/homePage');
    } else {
      console.log('Signup failed in handle submit', response);
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

            <p>Already have an account?</p>
            <p>Login Here</p>
            <Link to="/login">
              <Button>Go to Login</Button>
            </Link>
          </Box>
        </Box>
      </Flex>

    </>
  )
}