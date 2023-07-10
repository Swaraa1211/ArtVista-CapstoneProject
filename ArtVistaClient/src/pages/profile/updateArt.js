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

import React, { useEffect, useRef, useState } from 'react';
import { getArt, postArt, getArtById, putArt, deleteArt } from '../../API/art';

import { BiDotsHorizontalRounded } from 'react-icons/bi';

import { useRecoilValue } from 'recoil';
import { 
    userAtom } from '../../constant/atomRecoil';


const UpdateAndDeleteArt = () => {
    //const { userId, username } = useRecoilValue(userAtom);
    const userToken = localStorage.getItem('userToken');
    const parsedToken = JSON.parse(userToken);
    const userId = parsedToken.data.userId;
    const username = parsedToken.data.username;
    const formRef = useRef(null);
    const [art, setArt] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updatedArtData, setUpdatedArtData] = useState({
        art_id: '',
        art_description: '',
        artist_name: '',
        art_name: '',
        price: '',
        picture: '',
        user_id: '',
        user_name: '',
    });


    const fetchArt = async () => {
        try {
            const response = await getArt();
            const artData = Array.isArray(response.data) ? response.data : [];
            setArt(artData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchArt();
    }, []);


    const openModal = async (artId) => {
        try {
            const response = await getArtById(artId);
            const artData = response.data;

            setUpdatedArtData({
                art_id: artData.art_id,
                art_description: artData.art_description,
                artist_name: artData.artist_name,
                art_name: artData.art_name,
                price: artData.price,
                picture: artData.picture,
                user_id: userId,
                user_name: username,
            });

            setIsModalOpen(true);
        } catch (error) {
            console.error('Error fetching art:', error);
        }
    };


    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleUpdate = async (artId) => {
        try {
            const response = await putArt(artId, updatedArtData);

            console.log('Response:', response);
            if (response && response.status === true) {

                console.log('Art updated successfully');
                setArt(prevArt =>
                    prevArt.map(item => (item.art_id === artId ? updatedArtData : item))
                );

                closeModal();
                fetchArt();

            } else {
                console.log('Failed to update art');
            }
        } catch (error) {
            console.error('Error updating art', error);
        }
    };

    const [modalData, setModalData] = useState(null);

    const openViewModal = (item) => {
        setModalData(item);
    };

    const closeViewModal = () => {
        setModalData(null);
    };


    // const handleDelete = async (artId) => {
    //     if (window.confirm('Are you sure you want to delete this item?')) {
    //         try {
    //             const response = await deleteArt(artId);
    //             if (response && response.status) {
    //                 setArt((prevArt) => prevArt.filter((item) => item.art_id !== artId));
    //                 console.log('Item deleted successfully');
    //             } else {
    //                 console.log('Failed to delete item');
    //             }
    //         } catch (error) {
    //             console.error('Error deleting item', error);
    //         }
    //     }
    // };

    return (

        <>

            <Box>
            <Heading align="center" justifyContent="center" color="#F78104">Update Art</Heading>


                <Wrap spacing={4} mt={2} justify="center" align="center">
                    {art &&
                        art
                            .filter((item) => item.user_id === userId)
                            .map((item) => (
                                <WrapItem key={item.art_id}>
                                    <Flex width='250px' height="400px" bgColor="white" boxShadow="0 2px 10px rgba(4, 11, 97, 0.1)" borderRadius="5px" alignItems="center" m={2}>
                                        <Box m="10px">
                                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                                <Heading as="h2" color="#040B61" size="md" mb={2}>
                                                    {item.art_name}
                                                </Heading>
                                                <BiDotsHorizontalRounded onClick={() => openViewModal(item)} />
                                            </Box>

                                            {modalData && (
                                                <Modal isOpen={true} onClose={closeViewModal}>
                                                    <ModalOverlay />
                                                    <ModalContent>
                                                        <ModalHeader color="#040B61" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                            <Heading as="h2" fontSize="5xl">
                                                                {modalData.art_name}
                                                            </Heading>
                                                            <Box ml={5} style={{ marginLeft: 'auto' }}>
                                                                <Heading as="h3" fontSize="lg" color="#249EA0" textAlign="right">
                                                                    - {modalData.artist_name}
                                                                </Heading>
                                                            </Box>
                                                        </ModalHeader>


                                                        <ModalBody>
                                                            <Box flex={1}>
                                                                <Box display="flex" justifyContent="center" alignItems="center" height="200px" >
                                                                    <Image src={modalData.picture} alt={modalData.art_name} width="200px" height="200px" borderRadius="10px" />

                                                                </Box>

                                                                <Box flex={1} textAlign="center">
                                                                    <Heading fontWeight="bold" color="#040B61" fontSize="2xl" mt={2} mb={2}>
                                                                        ₹ {modalData.price}
                                                                    </Heading>
                                                                    <Text fontSize="xl" mb={2}>
                                                                        {modalData.art_description}
                                                                    </Text>

                                                                </Box>


                                                            </Box>
                                                        </ModalBody>
                                                        <ModalFooter>
                                                            <Button bg="#F78104" onClick={closeViewModal} ml={2}>
                                                                Close
                                                            </Button>
                                                        </ModalFooter>
                                                    </ModalContent>
                                                </Modal>
                                            )}

                                            <Box display="flex" justifyContent="center" alignItems="center" height="200px" m={3}>
                                                <Image src={item.picture} alt={item.art_name} width="200px" height="200px" borderRadius="10px" />
                                            </Box>
                                            <Box flex={1} textAlign="center">
                                                <Heading fontWeight="bold" color="#040B61" fontSize="2xl" mt={2} mb={2}>
                                                    ₹ {item.price}
                                                </Heading>
                                            </Box>

                                            <Box display="flex" justifyContent="center" alignItems="center" m={3}>
                                                <Button onClick={() => openModal(item.art_id)} bg="#F78104" color="white">Update</Button>
                                            </Box>
                                        </Box>
                                    </Flex>
                                </WrapItem>

                            ))}
                </Wrap>
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Update Art</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl>
                                <FormLabel fontWeight="bold">Art Description</FormLabel>
                                <Input
                                    type="text"
                                    value={updatedArtData.art_description}
                                    boxShadow="0 4px 12px rgba(4, 11, 97, 0.1)"
                                    onChange={(e) =>
                                        setUpdatedArtData((prevData) => ({
                                            ...prevData,
                                            art_description: e.target.value,
                                        }))
                                    }
                                    
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel fontWeight="bold">Artist Name</FormLabel>
                                <Input
                                    type="text"
                                    value={updatedArtData.artist_name}
                                    boxShadow="0 4px 12px rgba(4, 11, 97, 0.1)"
                                    onChange={(e) =>
                                        setUpdatedArtData((prevData) => ({
                                            ...prevData,
                                            artist_name: e.target.value,
                                        }))
                                    }
                                    
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel fontWeight="bold">Art Name</FormLabel>
                                <Input
                                    type="text"
                                    value={updatedArtData.art_name}
                                    boxShadow="0 4px 12px rgba(4, 11, 97, 0.1)"
                                    onChange={(e) =>
                                        setUpdatedArtData((prevData) => ({
                                            ...prevData,
                                            art_name: e.target.value,
                                        }))
                                    }
                                    
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel fontWeight="bold">Price</FormLabel>
                                <Input
                                    type="number"
                                    value={updatedArtData.price}
                                    boxShadow="0 4px 12px rgba(4, 11, 97, 0.1)"
                                    onChange={(e) =>
                                        setUpdatedArtData((prevData) => ({
                                            ...prevData,
                                            price: e.target.value,
                                        }))
                                    }
                                    
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel fontWeight="bold">Picture</FormLabel>
                                <Input
                                    type="text"
                                    value={updatedArtData.picture}
                                    boxShadow="0 4px 12px rgba(4, 11, 97, 0.1)"
                                    onChange={(e) =>
                                        setUpdatedArtData((prevData) => ({
                                            ...prevData,
                                            picture: e.target.value,
                                        }))
                                    }
                                    
                                />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button bg="#F78104" color="white" onClick={handleUpdate}>
                                Update
                            </Button>
                            <Button bg="red" color="white" ml={3} onClick={closeModal}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

            </Box>
        </>
    );

};

export default UpdateAndDeleteArt;