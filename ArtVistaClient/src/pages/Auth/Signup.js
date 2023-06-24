
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
import { Signup } from '../../API/users';
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
            <Heading color="black">ᔕIGᑎᑌᑭ</Heading>
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
              <Button mt={4} type="submit" width="full" colorScheme="blue">Sign Up</Button>
            </form>
            <Text mt={4} textAlign="center" >
            Already have an account?
              <Link to='/login'>
                <Button mt='1px' type='submit' width="full" colorScheme="blue">Login</Button>

              </Link>
              </Text>

            {/* <p></p>
            <p>Login Here</p>
            <Link to="/login">
              <Button>Go to Login</Button>
            </Link> */}
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
           <Image src='https://cdn-icons-png.flaticon.com/128/10835/10835987.png' alt='Dan Abramov' />

          <TypewriterEffect text="⬅️ᔕIGᑎᑌᑭ ᕼEᖇE `" />
          <Text fontSize="30px">​🇹​​🇴​ ​🇻​​🇮​​🇸​​🇮​​🇹​ ​🇹​​🇭​​🇪​ ​🇬​​🇴​-​🇹​​🇴​ ​🇩​​🇪​​🇸​​🇹​​🇮​​🇳​​🇦​​🇹​​🇮​​🇴​​🇳​ ​🇫​​🇴​​🇷​ ​🇦​​🇷​​🇹​ ​🇪​​🇳​​🇹​​🇭​​🇺​​🇸​​🇮​​🇦​​🇸​​🇹​​🇸​ ​🇸​​🇪​​🇪​​🇰​​🇮​​🇳​​🇬​ <br></br>​🇮​​🇳​​🇸​​🇵​​🇮​​🇷​​🇦​​🇹​​🇮​​🇴​​🇳​</Text>
        </Box>
      </Flex>

    </>
  )
}