import React from "react";
import { useEffect, useState } from 'react';
import Navbar from "../components/navBar";
import {
    Box,
    Heading,
    Text,
    Image,
    Wrap,
    WrapItem,
    Flex,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "@chakra-ui/react";
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

    //search
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredArtist, setFilteredArtist] = useState([]);

    // useEffect(() => {
    //     // Fetch art data
    //     const fetchArt = async () => {
    //         try {
    //             const response = await getArt();
    //             const artData = Array.isArray(response.data) ? response.data : [];
    //             setArt(artData);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };

    //     fetchArt();
    // }, []);

    useEffect(() => {
        // Filter artist based on search query
        const filtered = artist.filter(item =>
            item.artist_name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredArtist(filtered);
    }, [searchQuery, artist]);
    const handleSearch = event => {
        setSearchQuery(event.target.value);
    };

    const [modalData, setModalData] = useState(null);

    const openModal = (item) => {
        setModalData(item);
    };

    const closeModal = () => {
        setModalData(null);
    };


    return (
        <>
            <Navbar />
            <Heading align="center" justify="center">
                <Text as="span" color="#040B61" fontSize="6xl">
                    Artist
                </Text>{" "}
                <Text as="span" color=" #F78104" fontSize="6xl">
                    Portfolio
                </Text>
            </Heading>
            <Box align="center" mt={4}>
                <input
                    type="text"
                    placeholder="Search Artist"
                    value={searchQuery}
                    onChange={handleSearch}
                    style={{
                        //backgroundColor: 'lightblue', 
                        fontSize: '16px',
                        boxShadow: "0 2px 4px rgba(4, 11, 97, 0.2)",
                        borderRadius: "5px",
                        padding: "8px",
                        width: "96vw"
                    }}
                />
            </Box>
            <Wrap spacing={4} m={5}>
                {filteredArtist &&
                    filteredArtist.map((item) => (
                        <WrapItem key={item.artist_id}>
                            <Flex width='500px' height="" bgColor="white" boxShadow="0 2px 10px rgba(4, 11, 97, 0.2)" borderRadius="5px" alignItems="center">

                                <Box
                                    // maxW="sm"

                                    borderRadius="lg"
                                    overflow="hidden"
                                    display="flex"
                                    alignItems="center"
                                >
                                    <Image src={item.artist_picture} alt={item.artist_name} borderRadius="10px" width="200px" height="200px" m={2} />
                                    <Box p={4} flex={1} alignItems="center" justifyContent="center" textAlign="center">
                                        <Heading as="h2" fontSize="4xl" mb={2} color="#040B61">
                                            {item.artist_name}
                                        </Heading>
                                        <Box>
                                            <Text fontWeight="bold" fontSize="lg" mr={2}>
                                                Masterpiece 🡪 {item.masterpiece}
                                            </Text>
                                        </Box>
                                        <Button mt={2} onClick={() => openModal(item)} bg="#F78104"> Details </Button>
                                    </Box>

                                    {modalData && (
                                        <Modal isOpen={true} onClose={closeModal}>
                                            <ModalOverlay />
                                            <ModalContent>
                                                <ModalHeader color="#040B61" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                    <Heading as="h2" fontSize="5xl">
                                                        {modalData.artist_name}
                                                    </Heading>
                                                    {/* <Box ml={5} style={{ marginLeft: 'auto' }}>
                                                        <Heading as="h3" fontSize="lg" color="#249EA0" textAlign="right">
                                                            - {modalData.artist_name}
                                                        </Heading>
                                                    </Box> */}
                                                </ModalHeader>


                                                <ModalBody>
                                                    <Box flex={1}>

                                                        <Box display="flex" justifyContent="center" alignItems="center" height="200px" >
                                                            <Image src={modalData.artist_picture} alt={modalData.artist_name} width="200px" height="200px" borderRadius="10px" />

                                                        </Box>

                                                        <Box textAlign="center" mt={4} mb={3}>
                                                            <Text fontWeight="bold" fontSize="lg" mr={2}>
                                                                About:
                                                            </Text>
                                                            <Text>{modalData.about}</Text>
                                                            <Text fontWeight="bold" fontSize="lg" mr={2}>
                                                                Journey:
                                                            </Text>
                                                            <Text>{modalData.journey}</Text>
                                                        </Box>

                                                        <Box display="flex" justifyContent="center" alignItems="center" >
                                                            <Image src={modalData.masterpiece_picture} alt={modalData.masterpiece} width="200px" height="200px" borderRadius="10px" />

                                                        </Box>
                                                        <Text fontSize="xl" mb={2} textAlign="center" mt={4}>
                                                            Masterpiece 🡪 {modalData.masterpiece}
                                                        </Text>

                                                    </Box>
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button bg="#F78104" onClick={closeModal} ml={2}>
                                                        Close
                                                    </Button>
                                                </ModalFooter>
                                            </ModalContent>
                                        </Modal>
                                    )}

                                </Box>
                            </Flex>
                        </WrapItem>
                    ))}
            </Wrap>

            {/* <Wrap spacing={4} mt={4}>
                {filteredArtist && filteredArtist.map((item) => (
                    <WrapItem key={item.artist_id}>
                        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
                            <Image src={item.artist_picture} alt={item.artist_name} width="200px"
                                height="200px" />
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
                                    height="200px" />
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
            </Wrap> */}
        </>
    )

}

export default ArtistPortfolio;