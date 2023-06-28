import React from "react";
import { useEffect, useState } from 'react';
import Navbar from "../components/navBar";
import { Box, Heading, Text, Image, Wrap, WrapItem } from "@chakra-ui/react";
import { getArtist } from '../API/artistPortfolio';

const ArtistPortfolio = () => {
    const [artist, setArtist] = useState([]);
    useEffect(() => {
        const fetchArtist = async () => {
            try {
                const response = await getArtist();
                console.log(response);
                //const artistData = Array.isArray(response.data) ? response.data : [];
                setArtist(response.data);

                //console.log("api fetch in showcasecshowdown");
            } catch (error) {
                console.error(error);
            }
        };

        fetchArtist();
    }, []);
    console.log(artist);

    return (
        <>
            <Navbar />
            <Heading>Artist</Heading>
            <Wrap spacing={4} mt={4}>
                {artist && artist.map((item) => (
                    <WrapItem key={item.artist_id}>
                        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
                            <Image src={item.artist_picture} alt={item.artist_name} width="200px"
                                    height="200px"/>
                            <Box p={4}>
                                <Heading as="h2" size="md" mb={2}>
                                    {item.artist_name}
                                </Heading>
                                <Text fontSize="sm" mb={2}>
                                    {item.about}
                                </Text>

                            </Box>
                            <Box p={4}>
                                <Image src={item.masterpiece_picture} alt={item.masterpiece} width="200px"
                                    height="200px"/>
                                <Heading as="h2" size="md" mb={2}>
                                    {item.masterpiece}
                                </Heading>
                                <Text>
                                    {item.journey}
                                </Text>
                            </Box>

                        </Box>
                    </WrapItem>
                ))}
            </Wrap>
        </>
    )

}

export default ArtistPortfolio;