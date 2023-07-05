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
import { getArt, postArt,getArtById, putArt, deleteArt } from '../../API/art';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../../constant/atomRecoil';

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


    const handleDelete = async (artId) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                const response = await deleteArt(artId);
                if (response && response.status) {
                    setArt((prevArt) => prevArt.filter((item) => item.art_id !== artId));
                    console.log('Item deleted successfully');
                } else {
                    console.log('Failed to delete item');
                }
            } catch (error) {
                console.error('Error deleting item', error);
            }
        }
    };
    return(

    <>
    
    <Box>
                <Wrap spacing={4} mt={4}>
                    {art &&
                        art
                            .filter((item) => item.user_id === userId) 
                            .map((item) => (
                                <WrapItem key={item.art_id}>
                                    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
                                        <Image src={item.picture} alt={item.art_name} width="200px" height="200px" />
                                        <Box p={4}>
                                            <Heading as="h2" size="md" mb={2}>
                                                {item.art_name}
                                            </Heading>
                                            <Text fontSize="sm" mb={2}>
                                                Artist: {item.artist_name}
                                            </Text>
                                            <Text fontSize="sm" mb={2}>
                                                {item.art_description}
                                            </Text>
                                            <Text fontSize="sm">Price: {item.price}</Text>
                                            <Button onClick={() => openModal(item.art_id)}>Update</Button>
                                            <Button colorScheme="red" mt={4} onClick={() => handleDelete(item.art_id)}>
                                                Delete
                                            </Button>
                                        </Box>
                                    </Box>
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
                                <FormLabel>Art Description</FormLabel>
                                <Input
                                    type="text"
                                    value={updatedArtData.art_description}
                                    onChange={(e) =>
                                        setUpdatedArtData((prevData) => ({
                                            ...prevData,
                                            art_description: e.target.value,
                                        }))
                                    }
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Artist Name</FormLabel>
                                <Input
                                    type="text"
                                    value={updatedArtData.artist_name}
                                    onChange={(e) =>
                                        setUpdatedArtData((prevData) => ({
                                            ...prevData,
                                            artist_name: e.target.value,
                                        }))
                                    }
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Art Name</FormLabel>
                                <Input
                                    type="text"
                                    value={updatedArtData.art_name}
                                    onChange={(e) =>
                                        setUpdatedArtData((prevData) => ({
                                            ...prevData,
                                            art_name: e.target.value,
                                        }))
                                    }
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Price</FormLabel>
                                <Input
                                    type="number"
                                    value={updatedArtData.price}
                                    onChange={(e) =>
                                        setUpdatedArtData((prevData) => ({
                                            ...prevData,
                                            price: e.target.value,
                                        }))
                                    }
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Picture</FormLabel>
                                <Input
                                    type="text"
                                    value={updatedArtData.picture}
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
                            <Button colorScheme="blue" onClick={handleUpdate}>
                                Update
                            </Button>
                            <Button colorScheme="gray" ml={3} onClick={closeModal}>
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