import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
  CloseButton,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { Signup } from "../../API/users";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
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
      // navigate(`/${JSON.parse(userData).role}/jobs`);
    }
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = await Signup({
      Username: formData.userName,
      Email: formData.email,
      Password: formData.password,
    });
    if (data.status) {
      console.log(data.data);
      localStorage.setItem("userData", JSON.stringify(data.data));
      // navigate(`/${data.data.role}/jobs`);
      window.location.reload();
    }
    // Here you can perform any validation or API call to submit the form data
    // For this example, we just show a success message
    setShowSuccessMessage(true);
  };

  // Create an array of inputs that you want to render
  const formInputs = [
    { id: "userName", name: "userName", label: "Username", type: "text" },
    { id: "email", name: "email", label: "Email", type: "email" },
    { id: "password", name: "password", label: "Password", type: "password" },
  ];

  return (
    <Box w="100%" maxW="md" mx="auto" mt="2" bg="#fff" p="6">
      <Heading as="h1" mb="2">
        Sign Up
      </Heading>
      {showSuccessMessage ? (
        <Alert status="success" mb="4">
          <AlertIcon />
          Your account has been created! You can now log in.
          <CloseButton ml="2" onClick={() => setShowSuccessMessage(false)} />
        </Alert>
      ) : null}
      <form onSubmit={handleSubmit}>
        {formInputs.map((input) => (
          <FormControl key={input.id} mb="4">
            <FormLabel htmlFor={input.id}>{input.label}</FormLabel>
            {input.id === "password" ? (
              <InputGroup size="md">
                <Input
                  id={input.id}
                  value={formData[input.name]}
                  onChange={handleInputChange}
                  required
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  name="password"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            ) : (
              <Input
                type={input.type}
                id={input.id}
                name={input.name}
                value={formData[input.name]}
                onChange={handleInputChange}
                required
              />
            )}
          </FormControl>
        ))}
        
        <Button type="submit" colorScheme="purple" w="100%">
          Sign Up
        </Button>
      </form>
    </Box>
  );
}


// import {
//     Flex,
//     Box,
//     Heading,
//     FormControl,
//     FormLabel,
//     Input,
//     Button,
//     } from '@chakra-ui/react';
  
//   import React from 'react';
//   import { useNavigate } from 'react-router-dom';
//   import { useState, useEffect } from 'react';
//   import { Signup } from '../../API/users';
  
//   export default function SignupPage(){

//     const [formData, setFormData] = useState({
//         userName: "",
//         email: "",
//         password: "",

//     });

//     const navigate = useNavigate();
//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setFormData((prevState) => ({
//           ...prevState,
//           [name]: value,
//         }));
//       };
//       useEffect(() => {
//         const userData = localStorage.getItem("userData");
//         if (JSON.parse(userData)) {
//         //   navigate(`/${JSON.parse(userData).role}/jobs`);
//         }
//       }, []);

//       const handleSubmit = async (event) => {
//         event.preventDefault();
    
//         const data = await Signup({
//           Username: 'Swaroopa',
//           Email: 'dee@gmail.com',
//           Password: '12112001',
//         });
//         if (data.status) {
//           console.log(data.data);
//           localStorage.setItem("userData", JSON.stringify(data.data));
//         //   navigate(`/${data.data.role}/jobs`);
//           window.location.reload();
//         }
//         // Here you can perform any validation or API call to submit the form data
//         // For this example, we just show a success message
//         // setShowSuccessMessage(true);
//       };

   


//       return (
//           <>
//           <Flex width="full" align="center" justifyContent="center">
//               <Box p={2}>
//                   <Box textAlign="center">
//                       <Heading>SignUp</Heading>
//                   </Box>
//                   <Box p={4} textAlign="left">
//                     <form onSubmit={handleSubmit}>
//                           <FormControl isRequired>
//                               <FormLabel>Name</FormLabel>
//                               <Input type='text' onChange={handleInputChange} placeholder='Name' />
//                           </FormControl>
//                           <FormControl isRequired>
//                               <FormLabel>Email</FormLabel>
//                               <Input type='email' onChange={handleInputChange} placeholder='test@gmail.com' />
//                           </FormControl>
//                           <FormControl isRequired>
//                               <FormLabel>Password</FormLabel>
//                               <Input type='password' onChange={handleInputChange}  placeholder='******' />
//                           </FormControl>
//                           <Button type='submit'>Sign Up</Button>
//                        </form>
//                   </Box>
                   
//               </Box>
//           </Flex>
              
//           </>
//       )
//   }