import React from 'react';
import {
    Image,
    Heading,
    Text,
    Box,
    Flex,
    Button,
    SimpleGrid,
    GridItem,
    Icon,
    Wrap,
    WrapItem,
    Grid
} from '@chakra-ui/react';
import { FaArrowRight } from "react-icons/fa";
import Navbar from '../components/navBar';
import AboutUs from '../utils/aboutUs';
import { useState, useEffect } from 'react';
import axios from 'axios';
import FloatingText from '../utils/floatingText';


export default function HomePage() {
    const [artworks, setArtworks] = useState([]);

    useEffect(() => {
        fetchArtworks();
    }, []);

    const fetchArtworks = async () => {
        try {
            const artworkIds = [
                '129873', '129874', '129875', '129878', '129879', '129880', '129881', '129882',
                '129883', '129884', '129885', '129887', '129888', '129889', '129890', '129891',
                '129892', '129893', '129785'
            ];
            const artworksData = [];

            for (let i = 0; i < artworkIds.length; i++) {
                const response = await axios.get(`https://api.artic.edu/api/v1/artworks/${artworkIds[i]}`);
                artworksData.push(response.data);
            }

            setArtworks(artworksData);
        } catch (error) {
            console.error('Error fetching artworks:', error);
        }
    };


    console.log("artworks " + artworks);

    return (
        <>
            <Navbar />
            <Box>
                <Flex width="full" align="center" justifyContent="center">
                    <Box width="full" align="center" justifyContent="center" color="white" py={8} px={16}>
                        <Grid templateColumns={["1fr", "1fr", "1fr 1fr"]} gap={8}>
                            <Box>
                                <Heading as="h1" size="2xl" color="#040B61" mb={4} mt="30px">
                                    Welcome to
                                </Heading>
                                <Text fontSize={["4xl", "6xl"]} fontWeight="bold" color="#F78104" mb={4}>
                                    <FloatingText text="𐌀Ɽ𐌕 Ʋ𐌉𐌔𐌕𐌀" />
                                </Text>
                                <Text fontSize={["xl", "xl", "2xl"]} fontWeight="bold" color="black" mb={8}>
                                    Art has the power to transcend boundaries and speak to the depths of our souls. At ART VISTA, we believe in celebrating art in all its forms. Join us on this journey as we celebrate the transformative power of art and its ability to inspire and connect us all.
                                </Text>
                            </Box>
                            <Box position="relative" mt="30px">
                                <Heading fontSize="5xl" fontWeight="bold" lineHeight="1.2" mb={4} color="#040B61">
                                    Art Is Not
                                </Heading>
                                <Heading fontSize="5xl" fontWeight="bold" lineHeight="1.2" mb={4} color="#040B61">
                                    What You See
                                </Heading>
                                <Heading fontSize="4xl" fontWeight="bold" lineHeight="1.2" mb={4} color="#F78104">
                                    <FloatingText text="But," />

                                </Heading>
                                <Heading fontSize="5xl" fontWeight="bold" lineHeight="1.2" mb={4} color="#040B61">
                                    What You Make Others See!
                                </Heading>
                            </Box>
                        </Grid>
                    </Box>
                </Flex>
                <Box py={12} px={16} bg="#249EA0">
                    <AboutUs />
                </Box>

                <Box py={12} px={16} >
                    <Heading as="h1" size="2xl" mb={8} color="#040B61" textAlign="center">Art Institute of Chicago</Heading>
                    <Wrap spacing={4} justify="center" align="center">

                        {artworks.map((artwork) => (
                            <WrapItem key={artwork.data.id}>
                                <Flex
                                    bgColor="white"
                                    boxShadow="0 2px 10px rgba(4, 11, 97, 0.2)"
                                    borderRadius="5px"
                                    alignItems="center"
                                    m={2}
                                >

                                    <Box
                                        style={{ display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: 'center' }}
                                        width="250px" height="350px" m="8px"
                                    >

                                        <Image
                                            src={`https://www.artic.edu/iiif/2/${artwork.data.image_id}/full/843,1000/0/default.jpg`}
                                            alt={artwork.data.title}
                                            width="200px"
                                            height="200px"
                                        />
                                        <Text
                                            as="h2"
                                            fontWeight="bold"
                                            textAlign="center"
                                            size="md"
                                            mt="5px"
                                        >{artwork.data.title}</Text>
                                        <Text
                                            as="h2"
                                            fontWeight="bold"
                                            textAlign="center"
                                            size="md">Artist - {artwork.data.artist_display}</Text>
                                    </Box>
                                </Flex>
                            </WrapItem>
                        ))}
                    </Wrap>
                </Box>
                <Box py={12} px={16} bg="#249EA0" >
                    <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={8}>
                        <GridItem>
                            <Box
                                p={6}
                                borderWidth={1}
                                borderRadius="lg"
                                boxShadow="md"
                                bg="white"
                                alignContent="center"
                                height="100%"
                                textAlign="center"
                            >
                                <Heading as="h3" size="lg" mb={4}>
                                    Reflection of culture & society
                                </Heading>
                                <Image
                                    width="350px"
                                    height="200px"
                                    src="https://images.unsplash.com/photo-1460398495418-62c9b5d79fbf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
                                    alt="Dan Abramov"
                                    mb={4}
                                    mx="auto"
                                    rounded="10px"
                                />
                                <Text fontSize="2x1">
                                    Art reflects the beliefs, values, and cultural context of a particular time and place.
                                </Text>

                            </Box>
                        </GridItem>
                        <GridItem>
                            <Box
                                p={6}
                                borderWidth={1}
                                borderRadius="lg"
                                boxShadow="md"
                                bg="white"
                                alignContent="center"
                                height="100%"
                                textAlign="center"
                            >
                                <Heading as="h3" size="lg" mb={4}>
                                    Inspire & evoke emotions
                                </Heading>
                                <Image
                                    width="350px"
                                    height="200px"
                                    src="https://i.pinimg.com/564x/83/bf/bc/83bfbcbd69c28b10423d0d9fd497f911.jpg"
                                    alt="Dan Abramov"
                                    mb={4}
                                    mx="auto"
                                    rounded="10px"
                                />
                                <Text fontSize="md">
                                    Art has the power to evoke a wide range of emotions, such as joy, sadness, awe, or reflection.
                                </Text>

                            </Box>
                        </GridItem>
                        <GridItem>
                            <Box
                                p={6}
                                borderWidth={1}
                                borderRadius="lg"
                                boxShadow="md"
                                bg="white"
                                alignContent="center"
                                height="100%"
                                textAlign="center"
                            >
                                <Heading as="h3" size="lg" mb={4}>
                                    Creative expression & Aesthetic experience
                                </Heading>
                                <Image
                                    width="350px"
                                    height="200px"
                                    align="center"
                                    src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80"
                                    alt="Dan Abramov"
                                    mb={4}
                                    mx="auto"
                                    rounded="10px"
                                />
                                <Text fontSize="3x1">
                                    Express their thoughts, emotions, and ideas in unique and imaginative ways
                                </Text>

                            </Box>
                        </GridItem>
                    </SimpleGrid>
                </Box>
                <Box
                    py={5}
                    px={10}
                >
                    <Flex
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        minHeight="80vh"
                    >
                        <Box maxW="800px" textAlign="center">
                            <Heading as="h1" size="2xl" mb={8} color="#F78104">
                                The Power of Art: Unleashing Creativity and Imagination
                            </Heading>

                            <Flex justifyContent="center" mb={8}>
                                <Box w="200px" h="200px" borderRadius="md" p={4}>
                                    <Text fontSize="xl" fontWeight="bold" mb={4}>
                                        Primitive Expression
                                    </Text>
                                    <Text fontSize="md">
                                        The beginnings of artistic creation and communication.
                                    </Text>
                                </Box>
                                <Icon as={FaArrowRight} boxSize={6} color="#040B61" mx={4} mt="100px" />
                                <Box w="200px" h="200px" borderRadius="md" p={4}>
                                    <Text fontSize="xl" fontWeight="bold" mb={4}>
                                        Renaissance Rebirth
                                    </Text>
                                    <Text fontSize="md">
                                        A period of cultural, artistic, revival and exploration in art.
                                    </Text>
                                </Box>
                                <Icon as={FaArrowRight} boxSize={6} color="#040B61" mx={4} mt="100px" />
                                <Box w="200px" h="200px" borderRadius="md" p={4}>
                                    <Text fontSize="xl" fontWeight="bold" mb={4}>
                                        Modernism's Revolution
                                    </Text>
                                    <Text fontSize="md">
                                        Breaking boundaries & embracing new artistic perspectives.
                                    </Text>
                                </Box>
                                <Icon as={FaArrowRight} boxSize={6} color="#040B61" mx={4} mt="100px" />
                                <Box w="210px" h="200px" borderRadius="md" p={3}>
                                    <Text fontSize="xl" fontWeight="bold" mb={4}>
                                        Contemporary Diversity
                                    </Text>
                                    <Text fontSize="md">
                                        A celebration of various styles, mediums, and concepts in the art world today.
                                    </Text>
                                </Box>
                            </Flex>
                        </Box>
                    </Flex>
                </Box>

                <Box py={12} px={16} bg="#249EA0">
                    <Text textAlign="center" fontSize="lg" fontWeight="bold">
                        © 2023 Art Vista.
                    </Text>
                </Box>
            </Box>
        </>
    )
}