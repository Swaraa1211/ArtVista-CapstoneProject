import {
    VStack,
    Text,
    Icon,
    Box,
    HStack,
    Heading,
    Button,
    useDisclosure,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Avatar,
    Flex,
} from '@chakra-ui/react';
import React from 'react';

import { AuthContext } from '../pages/Auth/authProvider';
import {useNavigate, Link } from "react-router-dom";
import { useContext, useState } from 'react';

const SideBar = () => {

  const navigate = useNavigate();
   

    const handleLogoutFunction = () => {
        
    navigate('/login'); 
    };
    return (
        <VStack spacing={6} align="stretch" h="100%">
            <Flex alignItems="center">

            </Flex>
            <VStack spacing={4} align="stretch">
                <Text color="white" mr={4}>
                    <Link to="/createArt" >
                        Create Art
                    </Link>
                </Text>
                {/* <Text color="white" mr={4}>
                    <Link to="/artistPortfolio" >
                        Portfolio
                    </Link>
                </Text>
                <Text color="white" mr={4}>
                    <Link to="/artAnnouncement" >
                        ArtAnnouncement
                    </Link>
                </Text> */}
            </VStack>
            <>
            <Box>
          <Button colorScheme="whiteAlpha" ml={5} onClick={handleLogoutFunction}>Log Out</Button>
        </Box>
                {/* <Button onClick={onOpen}>Logout</Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Logout Confirmation</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Text>Are you sure you want to logout?</Text>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="brand" mr={3} onClick={handleLogout}>
                                Logout
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal> */}
            </>
        </VStack>
    );
};
export default SideBar;