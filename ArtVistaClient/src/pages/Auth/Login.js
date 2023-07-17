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
import { useNavigate, Link } from 'react-router-dom';
import { Login } from '../../API/users';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from './authProvider';
import TypewriterEffect from '../../utils/typeWritter';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '../../constant/atomRecoil';

export default function LoginPage() {
  const setUser = useSetRecoilState(userAtom);
  const { handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('userToken');
    if (JSON.parse(userData)) {
      navigate('/');
    }
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      user_email: event.target.elements.email.value,
      user_password: event.target.elements.password.value,
    };

    try {
      const response = await Login(formData);

      if (response && response.status) {
        console.log('Successful Login', response.data);
        const userToken = await Login(formData);
        localStorage.setItem('userToken', JSON.stringify(userToken));

        const userId = response.data.userId;
        const username = response.data.username;

        setUser({ userId, username });
        
        navigate('/homePage');
      } else {
        console.log('Login failed in handle submit', response);
        alert('Incorrect password. Please try again.');
      }
    } catch (error) {
      console.error('Error in handle submit', error);
      alert('An error occurred. Please try again.');
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
          p={6}
          maxWidth="450px"
          maxHeight="900px"
          width="full"
          bgColor="white"
          bgPosition="center"
          position="relative"
          borderRadius="10px"
        >
          <Box textAlign="center">
            <Heading color="#040B61">LOGIN</Heading>
          </Box>
          <Box p={4}>
            <form onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel color="black">Email</FormLabel>
                <Input type="email" name="email" placeholder="test@gmail.com" />
              </FormControl>
              <FormControl mt={2} isRequired>
                <FormLabel color="black">Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  placeholder="******"
                />
              </FormControl>
              <Button mt={4} type="submit" color="white" width="full" bg="#249EA0">
                Log In
              </Button>
            </form>
            <Text mt={4} textAlign="center" >
              Don't have an account?
              <Link to='/signup'>
                <Button mt='1px' type='submit' color="white" width="full" bg="#249EA0">Sign Up</Button>
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

          <TypewriterEffect text="🡰 ᒪOGIᑎ ᕼEᖇE" />
          <Text fontSize="30px">​🇹​​🇴​ ​🇻​​🇮​​🇸​​🇮​​🇹​ ​🇹​​🇭​​🇪​ ​🇬​​🇴​-​🇹​​🇴​ ​🇩​​🇪​​🇸​​🇹​​🇮​​🇳​​🇦​​🇹​​🇮​​🇴​​🇳​ ​🇫​​🇴​​🇷​ ​🇦​​🇷​​🇹​ ​🇪​​🇳​​🇹​​🇭​​🇺​​🇸​​🇮​​🇦​​🇸​​🇹​​🇸​ ​🇸​​🇪​​🇪​​🇰​​🇮​​🇳​​🇬​ <br></br>​🇮​​🇳​​🇸​​🇵​​🇮​​🇷​​🇦​​🇹​​🇮​​🇴​​🇳​</Text>
        </Box>
      </Flex>
    </>
  )
}