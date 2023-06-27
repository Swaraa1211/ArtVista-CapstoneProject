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
import { useContext } from 'react';
import { AuthContext } from './authProvider';
import TypewriterEffect from '../../utils/typeWritter';

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
            <Heading color="black">ᒪOGIᑎ</Heading>
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
                  // focusBorderColor="yellow"
                />
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
        <Box
          p={6}
          maxWidth="450px"
          maxHeight="900px"
          width="full"
          align="center"
          justifyContent="center"
        >
          <Text fontSize="3xl" fontWeight="bold">ᗯEᒪᑕOᗰE TO ᗩᖇT ᐯIᔕTᗩ!!! </Text>
          
          <Image src='https://cdn-icons-png.flaticon.com/128/10835/10835987.png' alt='Artist' />

          <TypewriterEffect text="⬅️ᒪOGIᑎ ᕼEᖇE" />
          <Text fontSize="30px">​🇹​​🇴​ ​🇻​​🇮​​🇸​​🇮​​🇹​ ​🇹​​🇭​​🇪​ ​🇬​​🇴​-​🇹​​🇴​ ​🇩​​🇪​​🇸​​🇹​​🇮​​🇳​​🇦​​🇹​​🇮​​🇴​​🇳​ ​🇫​​🇴​​🇷​ ​🇦​​🇷​​🇹​ ​🇪​​🇳​​🇹​​🇭​​🇺​​🇸​​🇮​​🇦​​🇸​​🇹​​🇸​ ​🇸​​🇪​​🇪​​🇰​​🇮​​🇳​​🇬​ <br></br>​🇮​​🇳​​🇸​​🇵​​🇮​​🇷​​🇦​​🇹​​🇮​​🇴​​🇳​</Text>
        </Box>
      </Flex>
    </>
  )
}