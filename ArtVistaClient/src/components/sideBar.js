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
                <Button bg="#249EA0" color="white" mr={4}>
                    <Link to="createArt">
                        Create Art
                    </Link>
                </Button>
                <Button bg="#249EA0" color="white" mr={4}>
                    <Link to="updateArt">
                        Update Art
                    </Link>
                </Button>
                <Button bg="#249EA0" color="white" mr={4}>
                    <Link to="portfolio">
                        Portfolio
                    </Link>
                </Button>
                <Button bg="#249EA0" color="white" mr={4}>
                    <Link to="favorites">
                        Favorites
                    </Link>
                </Button>
                <Button bg="#249EA0" color="white" mr={4}>
                    <Link to="orders">
                        Orders
                    </Link>
                </Button>

               
            </VStack>
        </VStack>
    );
};
export default SideBar;