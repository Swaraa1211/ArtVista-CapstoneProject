import {
    Heading,
    Box,
    Flex,
    Text,
    Image,
    Badge,
    Grid,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { deleteFavorites, getFavorites } from '../../API/favorites';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../../constant/atomRecoil';

const Favorites = () => {
    const [fav, setFav] = useState([]);
    //const { userId, username } = useRecoilValue(userAtom);
    const userToken = localStorage.getItem('userToken');
    const parsedToken = JSON.parse(userToken);
    const userId = parsedToken.data.userId;
    const username = parsedToken.data.username;

    const fetchFavorites = async () => {
        try {
            const response = await getFavorites();
            const favData = response.data;
            const filteredByUserID = favData.filter(favUser => favUser.userId === userId)
            setFav(filteredByUserID);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {


        fetchFavorites();
    }, []);

    console.log("Fav Fetch" + fav);

    const handleDelete = async (favId) => {
        if (window.confirm('Are you sure you want to remove from Fav?')) {
            try {
                const response = await deleteFavorites(favId);
                if (response && response.status) {
                    setFav((prevFav) => prevFav.filter((item) => item.favId !== favId));
                    console.log('Item deleted successfully');
                } else {
                    console.log('Failed to delete item');
                }
            } catch (error) {
                console.error('Error deleting item', error);
            }
        }
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
            <Flex
                alignItems="center"
                justifyContent="center"
            >

                <Box p={4}>
                    <Heading align="center" justifyContent="center" color="#F78104">Your Favorites</Heading>

                    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                        {fav.map((item) => (
                            <Box key={item.favId}>
                                <Flex width='250px' height="400px" bgColor="white" boxShadow="0 2px 10px rgba(4, 11, 97, 0.2)" borderRadius="5px" alignItems="center" m={2}>
                                    <Box m="10px">
                                        <Box display="flex" justifyContent="space-between" alignItems="center">
                                            <Heading as="h2" color="#040B61" size="md" mb={2}>
                                                {item.artName}
                                            </Heading>
                                            <BiDotsHorizontalRounded onClick={() => openModal(item)} />
                                        </Box>

                                        {modalData && (
                                            <Modal isOpen={true} onClose={closeModal}>
                                                <ModalOverlay />
                                                <ModalContent>
                                                    <ModalHeader color="#040B61" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                        <Heading as="h2" fontSize="5xl">
                                                            {modalData.artName}
                                                        </Heading>
                                                        <Box ml={5} style={{ marginLeft: 'auto' }}>
                                                            <Heading as="h3" fontSize="lg" color="#249EA0" textAlign="right">
                                                                - {modalData.artistName}
                                                            </Heading>
                                                        </Box>
                                                    </ModalHeader>


                                                    <ModalBody>
                                                        <Box flex={1}>
                                                            <Box display="flex" justifyContent="center" alignItems="center" height="200px" >
                                                                <Image src={modalData.artPicture} alt={modalData.artName} width="200px" height="200px" borderRadius="10px" />

                                                            </Box>

                                                            <Box flex={1} textAlign="center">
                                                                <Heading fontWeight="bold" color="#040B61" fontSize="2xl" mt={2} mb={2}>
                                                                    ₹ {modalData.artPrice}
                                                                </Heading>
                                                                <Text fontSize="xl" mb={2}>
                                                                    {modalData.artDescription}
                                                                </Text>

                                                            </Box>


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

                                        <Box display="flex" justifyContent="center" alignItems="center" height="200px" m={3}>
                                            <Image src={item.artPicture} alt={item.artName} width="200px" height="200px" borderRadius="10px" />
                                        </Box>
                                        <Box flex={1} textAlign="center">
                                            <Heading fontWeight="bold" color="#040B61" fontSize="2xl" mt={2} mb={2}>
                                                ₹ {item.artPrice}
                                            </Heading>
                                        </Box>

                                        <Box display="flex" justifyContent="center" alignItems="center" m={3}>
                                            <Button colorScheme="red" mt={4} onClick={() => handleDelete(item.favId)}>
                                                Unfavorite
                                            </Button>
                                        </Box>
                                    </Box>
                                </Flex>
                            </Box>
                        ))}
                    </Grid>
                </Box>

            </Flex>
        </>

    );
}

export default Favorites;