
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
  
  export default function SignupPage(){

    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",

    });

    const navigate = useNavigate();
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
      useEffect(() => {
        const userData = localStorage.getItem("userData");
        if (JSON.parse(userData)) {
        //   navigate(`/${JSON.parse(userData).role}/jobs`);
        }
      }, []);

      const handleSubmit = async (event) => {
        event.preventDefault();
    
        const data = await Signup({
          Username: 'Swaroopa',
          Email: 'dee@gmail.com',
          Password: '12112001',
        });
        if (data.status) {
          console.log(data.data);
          localStorage.setItem("userData", JSON.stringify(data.data));
        //   navigate(`/${data.data.role}/jobs`);
          window.location.reload();
        }
        // Here you can perform any validation or API call to submit the form data
        // For this example, we just show a success message
        // setShowSuccessMessage(true);
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
                              <Input type='text' onChange={handleInputChange} placeholder='Name' />
                          </FormControl>
                          <FormControl isRequired>
                              <FormLabel>Email</FormLabel>
                              <Input type='email' onChange={handleInputChange} placeholder='test@gmail.com' />
                          </FormControl>
                          <FormControl isRequired>
                              <FormLabel>Password</FormLabel>
                              <Input type='password' onChange={handleInputChange}  placeholder='******' />
                          </FormControl>
                          <Button type='submit'>Sign Up</Button>
                       </form>
                  </Box>
                   
              </Box>
          </Flex>
              
          </>
      )
  }