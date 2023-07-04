import {
    VStack,
    Text,
    Box,
    Button,
    Flex,
} from '@chakra-ui/react';
import React from 'react';

import { AuthContext } from '../pages/Auth/authProvider';
import { useNavigate, Link } from "react-router-dom";
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
                <Button bg="#249EA0" color="#040B61" mr={4}>
                    <Link to="createArt">
                        Create Art
                    </Link>
                </Button>
                <Button bg="#249EA0" color="#040B61" mr={4}>
                    <Link to="updateAndDeleteArt">
                        Update / Delete Art
                    </Link>
                </Button>
                <Button bg="#249EA0" color="#040B61" mr={4}>
                    <Link to="portfolio">
                        Portfolio
                    </Link>
                </Button>
                <Button bg="#249EA0" color="#040B61" mr={4}>
                    <Link to="favorites">
                        Favorites
                    </Link>
                </Button>

               
            </VStack>
            <>
                {/* <Box>
                    <Button colorScheme="#040B61" ml={5} onClick={handleLogoutFunction}>Log Out</Button>
                </Box> */}
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