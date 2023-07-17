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
import { useOutlet } from 'react-router-dom';
import { FaHandPeace } from 'react-icons/fa';
import SideBar from '../components/sideBar';
import { getArtist } from '../API/artistPortfolio';

const DefaultProfilePage = () => {
    const userToken = localStorage.getItem('userToken');
    const parsedToken = JSON.parse(userToken);
    const userId = parsedToken.data.userId;
    const username = parsedToken.data.username;

    const [artist, setArtist] = useState([]);
    const [artistPhoto, setArtistPhoto] = useState([]);
    const [userAbout, setUserAbout] = useState([]);
    useEffect(() => {
        const fetchArtist = async () => {
            try {
                const response = await getArtist();
                console.log(response);

                const filteredArtist = response.data
                    .filter((artist) => artist.user_id === userId)
                    .map((artist) => artist.artist_picture);

                if (filteredArtist.length > 0) {
                    setArtistPhoto(filteredArtist[0]);
                }
                const filteredAbout = response.data
                    .filter((userAbout) => userAbout.user_id === userId)
                    .map((userAbout) => userAbout.about);

                if (filteredArtist.length > 0) {
                    setUserAbout(filteredAbout[0]);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchArtist();
    }, [username]);

    console.log("picture" + artistPhoto)
    console.log(artist);

    return (
        <Flex
            width="100%"
            height="400px"
            alignItems="center"
            justifyContent="center"
        >
            <Box textAlign="center">
                <Flex align="center" justifyContent="center">
                    <Heading as="span" color="#F78104" fontSize="6xl">
                        Hola
                    </Heading>

                    <Heading ml="20px" color="#040B61" fontSize="6xl">
                        {username} !
                    </Heading>
                    <FaHandPeace size={50} color="#F78104" />
                </Flex>

                <Box width="200px" height="200px" mx="auto">
                    <Image
                        src={artistPhoto}
                        alt="Artist Photo"
                        width="100%"
                        height="100%"
                        borderRadius="full"
                    />
                </Box>

                <Text fontSize="2xl" mt={4}>
                    {userAbout}
                </Text>

            </Box>
        </Flex>
    );
};

const Profile = () => {
    const outlet = useOutlet();
    //const { userId, username } = useRecoilValue(userAtom);
    const userToken = localStorage.getItem('userToken');
    const parsedToken = JSON.parse(userToken);
    const userId = parsedToken.data.userId;
    const username = parsedToken.data.username;

    console.log(userId + " " + username + " from profile and userAtom")

    return (
        <>
            <Navbar />
            <Grid
                h="85vh"
                overflowY="hidden"
                templateRows="repeat(2, 1fr)"
                templateColumns="repeat(6, 1fr)"
            >
                <GridItem rowSpan={2} colSpan={1} p={5} bg="#fff" overflowY="auto">
                    <SideBar />
                </GridItem>
                <GridItem rowSpan={2} colSpan={5} p={2} overflowY="auto">
                    <Box overflowY="auto">
                        <Heading align="center" justify="center">
                            <Text as="span" color="#040B61" fontSize="6xl">
                                Pro
                            </Text>
                            <Text as="span" color="#F78104" fontSize="6xl">
                                file
                            </Text>
                        </Heading>
                        {/* {outlet} */}
                        {outlet || <DefaultProfilePage />}
                    </Box>
                </GridItem>
            </Grid>
        </>
    );
};

export default Profile;