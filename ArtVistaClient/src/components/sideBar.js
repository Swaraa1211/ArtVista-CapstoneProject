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
import {
    TbSettings2,
    TbHome2,
    TbInfoSquareRounded,
    TbDashboard,
} from 'react-icons/tb'; // Import Chakra UI Icons
import { MdOutlineAnalytics } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { TbFileUpload } from 'react-icons/tb';
import { RiApps2Line } from 'react-icons/ri';
import { BiGitPullRequest } from 'react-icons/bi';
import { AuthContext } from '../pages/Auth/authProvider';
import {useNavigate, Link } from "react-router-dom";
import { useContext, useState } from 'react';

const SideBar = () => {
    const { handleLogout } = useContext(AuthContext);

  //const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
    const links = [
        { name: 'Home', path: '/', icon: TbHome2 },
        { name: 'Explore', path: '/explore', icon: RiApps2Line },
        { name: 'Dashboard', path: '/dashboard', icon: MdOutlineAnalytics },
        { name: 'Upload', path: '/upload', icon: TbFileUpload },
        { name: 'Profile', path: '/profile', icon: CgProfile },
        { name: 'Requests', path: '/request', icon: BiGitPullRequest },
    ];

    const handleLogoutFunction = () => {
        // onClose(); // Close the logout confirmation modal
        // localStorage.clear('profile');
        // window.location.reload();
        handleLogout();
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