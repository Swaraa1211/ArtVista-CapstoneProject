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
    Icon
} from '@chakra-ui/react';
import { FaArrowRight } from "react-icons/fa";
import Navbar from '../components/navBar';
import AboutUs from '../utils/aboutUs';


export default function HomePage() {
    return (
        <>
            <Navbar />

            <Box m="20px">
                <Flex width="full" align="center" justifyContent="center">
                    <Box
                        width="full"
                        align="center"
                        justifyContent="center"
                        bg="#f3bd6b"
                        color="white"
                        py={8}
                        px={16}
                    >
                        <Flex align="center" justify="center" direction={['column', 'column', 'row']}>
                            <Box mr={[0, 0, 8]}>
                                <Heading as="h1" size="2xl" mb={4}>
                                    Welcome to Art Vista
                                </Heading>
                                <Text fontSize="xl" fontWeight="bold">
                                    Celebrating Art in All Its Forms
                                </Text>
                                <Button>View</Button>
                                <Button>Show</Button>
                            </Box>
                            <Box
                                display="flex"
                                flexDirection={['column', 'column', 'row']}
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Box p={2} mr={[0, 0, 4]}>
                                    <Image
                                        src="https://c4.wallpaperflare.com/wallpaper/60/872/1010/photo-of-water-falls-wallpaper-preview.jpg"
                                        alt="Dan Abramov"
                                        mb={4}
                                    />
                                </Box>
                                <Box p={2}>
                                    <Image
                                        src="https://c4.wallpaperflare.com/wallpaper/464/842/502/celebration-pattern-tile-texture-wallpaper-preview.jpg"
                                        alt="Dan Abramov"
                                    />
                                </Box>
                            </Box>
                        </Flex>
                    </Box>
                </Flex>

                <Box py={12} px={16} bg="#f3bd6b">
                    <AboutUs />
                </Box>
                <Box 
                bg="gray.100" 
                py={5} 
                px={10}
                >
                    <Flex
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        minHeight="80vh"
                        // padding={8}
                        bg="gray.200"
                    >
                        <Box maxW="800px" textAlign="center">
                            <Heading as="h1" size="2xl" mb={8}>
                                The Power of Art: Unleashing Creativity and Imagination
                            </Heading>

                            <Flex justifyContent="center" mb={8}>
                                <Box w="200px" h="200px" bg="white" borderRadius="md" p={4}>
                                    <Text fontSize="xl" fontWeight="bold" mb={4}>
                                        Step 1
                                    </Text>
                                    <Text fontSize="md">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                                        facilisi.
                                    </Text>
                                </Box>
                                <Icon as={FaArrowRight} boxSize={6} color="blue.500" mx={4} />
                                <Box w="200px" h="200px" bg="white" borderRadius="md" p={4}>
                                    <Text fontSize="xl" fontWeight="bold" mb={4}>
                                        Step 2
                                    </Text>
                                    <Text fontSize="md">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                                        facilisi.
                                    </Text>
                                </Box>
                                <Icon as={FaArrowRight} boxSize={6} color="blue.500" mx={4} mt="100px" />
                                <Box w="200px" h="200px" bg="white" borderRadius="md" p={4}>
                                    <Text fontSize="xl" fontWeight="bold" mb={4}>
                                        Step 3
                                    </Text>
                                    <Text fontSize="md">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                                        facilisi.
                                    </Text>
                                </Box>
                                <Icon as={FaArrowRight} boxSize={6} color="blue.500" mx={4} />
                                <Box w="200px" h="200px" bg="white" borderRadius="md" p={4}>
                                    <Text fontSize="xl" fontWeight="bold" mb={4}>
                                        Step 4
                                    </Text>
                                    <Text fontSize="md">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                                        facilisi.
                                    </Text>
                                </Box>
                            </Flex>
                        </Box>
                    </Flex>
                </Box>
                <Box py={12} px={16}>
                    <Heading as="h2" size="xl" mb={8}>
                        Features
                    </Heading>
                    <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={8}>
                        <GridItem>
                            <Box
                                p={6}
                                borderWidth={1}
                                borderRadius="lg"
                                boxShadow="md"
                                bg="white"
                                height="100%"
                            >
                                <Heading as="h3" size="lg" mb={4}>
                                    John Doe
                                </Heading>
                                <Image
                                    width="200px"
                                    height="200px"
                                    src="https://c4.wallpaperflare.com/wallpaper/60/872/1010/photo-of-water-falls-wallpaper-preview.jpg"
                                    alt="Dan Abramov"
                                    mb={4}
                                />
                                <Text fontSize="md">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                                    facilisi.
                                </Text>
                                <Button mt={4} colorScheme="blue">
                                    Learn More
                                </Button>
                            </Box>
                        </GridItem>
                        <GridItem>
                            <Box
                                p={6}
                                borderWidth={1}
                                borderRadius="lg"
                                boxShadow="md"
                                bg="white"
                                height="100%"
                            >
                                <Heading as="h3" size="lg" mb={4}>
                                    Jane Smith
                                </Heading>
                                <Image
                                    width="200px"
                                    height="200px"
                                    src="https://c4.wallpaperflare.com/wallpaper/60/872/1010/photo-of-water-falls-wallpaper-preview.jpg"
                                    alt="Dan Abramov"
                                    mb={4}
                                />
                                <Text fontSize="md">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                                    facilisi.
                                </Text>
                                <Button mt={4} colorScheme="blue">
                                    Learn More
                                </Button>
                            </Box>
                        </GridItem>
                        <GridItem>
                            <Box
                                p={6}
                                borderWidth={1}
                                borderRadius="lg"
                                boxShadow="md"
                                bg="white"
                                height="100%"
                            >
                                <Heading as="h3" size="lg" mb={4}>
                                    Michael Johnson
                                </Heading>
                                <Image
                                    width="200px"
                                    height="200px"
                                    src="https://c4.wallpaperflare.com/wallpaper/60/872/1010/photo-of-water-falls-wallpaper-preview.jpg"
                                    alt="Dan Abramov"
                                    mb={4}
                                />
                                <Text fontSize="md">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                                    facilisi.
                                </Text>
                                <Button mt={4} colorScheme="blue">
                                    Learn More
                                </Button>
                            </Box>
                        </GridItem>
                    </SimpleGrid>
                </Box>
                <Box bg="gray.200" py={12} px={16}>
                    <Text textAlign="center" fontSize="lg" fontWeight="bold">
                        © 2023 Art Vista. All rights reserved.
                    </Text>
                </Box>
            </Box>
        </>
    )
}