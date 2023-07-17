import {
    VStack,
    Text,
    Box,
    Button,
    Flex,
    Heading,
    Image,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { getArtist } from '../API/artistPortfolio';

const SideBar = () => {
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

    return (
        <VStack spacing={2} align="stretch" h="100%">
            <Flex
                style={{ display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: 'center' }}>
                <Heading as="span" color="#F78104" fontSize="2xl">
                    Hey
                </Heading>
                <Heading ml="10px" color="#040B61" fontSize="2xl">
                    {username} !
                </Heading>
                <Box width="50px" height="50px" mx="auto">
                    <Image
                        src={artistPhoto}
                        alt="Artist Photo"
                        width="100%"
                        height="100%"
                        borderRadius="full"
                    />
                </Box>
            </Flex>
            <VStack
                spacing={4}
                align="stretch"
                mt="5px"
            >
                <Button bg="#249EA0" color="white" >
                    <Link to="createArt">
                        Craft It
                    </Link>
                </Button>
                <Button bg="#249EA0" color="white" >
                    <Link to="updateArt">
                        Upgrade Here
                    </Link>
                </Button>
                <Button bg="#249EA0" color="white" >
                    <Link to="portfolio">
                        Portfolix
                    </Link>
                </Button>
                <Button bg="#249EA0" color="white" >
                    <Link to="favorites">
                        Adored
                    </Link>
                </Button>
                <Button bg="#249EA0" color="white" >
                    <Link to="orders">
                        Purchase
                    </Link>
                </Button>
            </VStack>
        </VStack>
    );
};
export default SideBar;