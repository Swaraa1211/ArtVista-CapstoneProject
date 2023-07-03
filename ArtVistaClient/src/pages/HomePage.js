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
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter
} from '@chakra-ui/react';
import { FaArrowRight } from "react-icons/fa";
import Navbar from '../components/navBar';
import AboutUs from '../utils/aboutUs';
import { useState, useEffect } from 'react';
import TypewriterEffect from '../utils/typeWritter';


export default function HomePage() {


    return (
        <>

            <Navbar />

            <Box
            // m="20px"
            >
                <Flex width="full" align="center" justifyContent="center">
                    <Box
                        width="full"
                        align="center"
                        justifyContent="center"

                        //bgImage="url('https://i.pinimg.com/564x/18/0f/32/180f32e3c22564fd83dc2c1754b43fa8.jpg')"
                        bg="#D1F2EB9"
                        color="white"
                        py={8}
                        px={16}

                    >
                        <Flex align="center" justify="center" direction={['column', 'column', 'row']}>
                            <Box mr={[0, 0, 8]}>
                                <Heading as="h1" size="2xl" color="#040B61">
                                    Welcome to
                                </Heading>
                                <Text fontSize="6xl" fontWeight="bold" color="#F78104">
                                    𐌀Ɽ𐌕 Ʋ𐌉𐌔𐌕𐌀
                                </Text>

                                {/* <Text color="#F78104">ART VISTA</Text> */}
                                {/* <br></br> */}
                                <Text fontSize="xl" fontWeight="bold" color="black">
                                    Art has the power to transcend boundaries and speak to the depths of our souls. At <TypewriterEffect text="ART VISTA" />, we believe in celebrating art in all its forms.
                                    Join us on this journey as we celebrate the transformative power of art and its ability to inspire, and connect us all.
                                </Text>
                                <br></br>
                                <br></br>
                                <Button mr={10} bg="#F78104">View</Button>
                                <Button bg="#F78104">Show</Button>
                            </Box>
                            <Box
                                display="flex"
                                flexDirection={['column', 'column', 'row']}
                                justifyContent="center"
                                alignItems="center"
                                position="relative"
                            >
                                <Image
                                    width="1500px"
                                    borderRadius='10px'
                                    src="https://i.pinimg.com/564x/df/72/71/df7271c6d5d0c534a2b2e13ef82d9725.jpg"
                                    alt="Art Vista"
                                />
                                <Text
                                    position="absolute"
                                    top="35%"
                                    right="23%"
                                    transform="translateY(-50%)"
                                    p={4}
                                    bg="rgba(0, 0, 0, 0.5)"
                                    color="white"
                                    fontWeight="bold"
                                    fontSize="4xl"
                                    width="250px"
                                >
                                    <Image src="https://i.pinimg.com/564x/bc/ca/9c/bcca9cf93d8940987a1957901561e7bb.jpg" />
                                    {/* ART <br></br>VISTA */}
                                </Text>
                            </Box>
                        </Flex>
                    </Box>
                </Flex>

                <Box py={12} px={16} bg="#249EA0">
                    <AboutUs />
                </Box>
                <Box
                    // bg="gray.100"
                    py={5}
                    px={10}
                >
                    <Flex
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        minHeight="80vh"
                    // padding={8}
                    //bg="gray.200"
                    >
                        <Box maxW="800px" textAlign="center">
                            <Heading as="h1" size="2xl" mb={8} color="#F78104">
                                The Power of Art: Unleashing Creativity and Imagination
                            </Heading>

                            <Flex justifyContent="center" mb={8}>
                                <Box w="200px" h="200px"  borderRadius="md" p={4}>
                                    <Text fontSize="xl" fontWeight="bold" mb={4}>
                                    Primitive Expression
                                    </Text>
                                    <Text fontSize="md">
                                    The beginnings of artistic creation and communication.
                                    </Text>
                                </Box>
                                <Icon as={FaArrowRight} boxSize={6} color="#040B61" mx={4} mt="100px"/>
                                <Box w="200px" h="200px"  borderRadius="md" p={4}>
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
                                <Icon as={FaArrowRight} boxSize={6} color="#040B61" mx={4} mt="100px"/>
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
                <Box py={12} px={16} bg="#249EA0" >
                    {/* <Heading as="h1" size="2xl" color="#040B61" mb={4} textAlign="center">
                        FEATURES
                    </Heading> */}
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
                <Box py={12} px={16}>
                    <Text textAlign="center" fontSize="lg" fontWeight="bold">
                        © 2023 Art Vista. 
                    </Text>
                </Box>
            </Box>
        </>
    )
}