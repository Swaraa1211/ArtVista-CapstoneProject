import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Text,
    Wrap,
    WrapItem,
    Image,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
  Grid,
  GridItem,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/navBar';
import { getArt, postArt, getArtById, putArt, deleteArt } from '../API/art';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../constant/atomRecoil';
import { Outlet } from 'react-router-dom';
import { useOutlet } from 'react-router-dom';

import SideBar from '../components/sideBar';

const Profile = () => {
    const outlet = useOutlet();
    const { userId, username } = useRecoilValue(userAtom);
    

    console.log(userId + " " + username + " from profile and userAtom")
    //console.log(userId + " " + username);


    return (
        <>
            <Navbar />
            <Heading>
                Profile
            </Heading>
            <Grid
                // h="100vh"
                overflowY="hidden"
                templateRows="repeat(2, 1fr)"
                templateColumns="repeat(6, 1fr)"
                bg="gray.100"
            >
                <GridItem rowSpan={2} colSpan={1} p={5} bg="#fff">
                    <SideBar />
                </GridItem>
                <GridItem colSpan={5}>
                    <Box>
                    {outlet}
                        {/* <Outlet /> */}
                    </Box>
                </GridItem>
            </Grid>
           {/*
             */}
        </>

    );

};

export default Profile;