
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Image
} from '@chakra-ui/react';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Signup, getUsers } from '../../API/users';
import TypewriterEffect from '../../utils/typeWritter';

export default function SignupPage() {

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      user_name: event.target.elements.name.value,
      user_email: event.target.elements.email.value,
      user_password: event.target.elements.password.value,
    };

    const response = await getUsers();
    if (response && response.status) {
      const users = response.data;
      const emailExists = users.some(user => user.user_email === formData.user_email);
      if (emailExists) {
        alert('The provided email is already registered. Please use a different email');        
        return;
      }
      const user = await Signup(formData);
      if (user.status) {
        navigate('/login');
        alert({
          type: 'success',
          title: 'Signup',
          message: `Successfully signed up as ${formData.user_email}`,
        });
      } else {
        // Signup failed
        alert({
          type: 'error',
          title: 'Signup failed',
          message: 'Failed to sign up. Please try again later.',
        });
      }
    } else {
      // Failed to get users
      alert({
        type: 'error',
        title: 'Failed to fetch users',
        message: 'Failed to fetch users. Please try again later.',
      });
    }
  };

  return (
    <>
      <Flex
        minHeight="100vh"
        width="full"
        align="center"
        justifyContent="center"
        bg="url('https://i.pinimg.com/564x/0b/6a/45/0b6a45aeeaf2de806e15f6a3c2f5d555.jpg')"
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
      >
        <Box
          p={2}
          maxWidth="450px"
          maxHeight="900px"
          width="full"
          bgColor="white"
          bgPosition="center"
          position="relative"
          borderRadius="10px"
        >
          <Box textAlign="center">
            <Heading color="#040B61">SIGNUP</Heading>
          </Box>
          <Box p={4} textAlign="left">
            <form onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel color="black">Name</FormLabel>
                <Input type='text' name='name' placeholder='Name' />
              </FormControl>
              <FormControl isRequired>
                <FormLabel color="black">Email</FormLabel>
                <Input type='email' name='email' placeholder='test@gmail.com' />
              </FormControl>
              <FormControl isRequired>
                <FormLabel color="black">Password</FormLabel>
                <Input type='password' name='password' placeholder='******' />
              </FormControl>
              <Button mt={4} type="submit" width="full" color="white" bg="#249EA0">Sign Up</Button>
            </form>
            <Text mt={4} textAlign="center" >
              Already have an account?
              <Link to='/login'>
                <Button mt='1px' type='submit' width="full" color="white" bg="#249EA0">Login</Button>

              </Link>
            </Text>
          </Box>
        </Box>
        <Box
          p={6}
          maxWidth="450px"
          maxHeight="900px"
          width="full"
          align="center"
          justifyContent="center"
        >
          <Heading fontSize="4xl" fontWeight="bold" color="#040B61">WELCOME TO <br></br>ᗩᖇT ᐯIᔕTᗩ!!! </Heading>
          <Image src='https://cdn-icons-png.flaticon.com/128/10835/10835987.png' alt='Artist' />

          <TypewriterEffect text="🡰 ᔕIGᑎᑌᑭ ᕼEᖇE" />
          <Text fontSize="30px">​🇹​​🇴​ ​🇻​​🇮​​🇸​​🇮​​🇹​ ​🇹​​🇭​​🇪​ ​🇬​​🇴​-​🇹​​🇴​ ​🇩​​🇪​​🇸​​🇹​​🇮​​🇳​​🇦​​🇹​​🇮​​🇴​​🇳​ ​🇫​​🇴​​🇷​ ​🇦​​🇷​​🇹​ ​🇪​​🇳​​🇹​​🇭​​🇺​​🇸​​🇮​​🇦​​🇸​​🇹​​🇸​ ​🇸​​🇪​​🇪​​🇰​​🇮​​🇳​​🇬​ <br></br>​🇮​​🇳​​🇸​​🇵​​🇮​​🇷​​🇦​​🇹​​🇮​​🇴​​🇳​</Text>
        </Box>
      </Flex>

    </>
  )
}