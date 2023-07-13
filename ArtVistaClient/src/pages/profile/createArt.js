import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Text,
} from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react';
import { getArt, postArt } from '../../API/art';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../../constant/atomRecoil';

const CreateArt = () => {
    //const { userId, username } = useRecoilValue(userAtom);
    const userToken = localStorage.getItem('userToken');
    const parsedToken = JSON.parse(userToken);
    const userId = parsedToken.data.userId;
    const username = parsedToken.data.username;
    const formRef = useRef(null);
    const [art, setArt] = useState([]);

    console.log(userId + " " + username + " from profile and userAtom");

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



    const handleArtSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            art_description: event.target.elements.artdescription.value,
            artist_name: username,
            art_name: event.target.elements.artname.value,
            price: event.target.elements.price.value,
            picture: event.target.elements.picture.value,
            user_id: userId,
            user_name: username,

        };

        const response = await postArt(formData);

        if (response && response.status) {
            console.log('Successful in adding art', response.data);
            formRef.current.reset();
            toast('Added Successfully !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

        } else {
            console.log('adding art failed in handle submit', response);
        }

    }

    return (
        <>
            <Flex
                alignItems="center"
                justifyContent="center"
            >
                <ToastContainer />

                <Box p={4} width="500px">
                    <Heading align="center" justifyContent="center" color="#F78104">Create Art</Heading>
                    <form ref={formRef} onSubmit={handleArtSubmit} bg="white">
                        <FormControl isRequired>
                            <FormLabel color="black" fontWeight="bold">Art Description</FormLabel>
                            <Input type="text" boxShadow="0 4px 12px rgba(4, 11, 97, 0.2)" name="artdescription" placeholder="Description" />
                        </FormControl>
                        {/* <FormControl isRequired>
                            <FormLabel color="black" fontWeight="bold">Artist Name</FormLabel>
                            <Input type="text" boxShadow="0 4px 12px rgba(4, 11, 97, 0.2)" name="artistname" placeholder="Name" />
                        </FormControl> */}
                        <FormControl isRequired>
                            <FormLabel color="black" fontWeight="bold">Art Name</FormLabel>
                            <Input type="text" boxShadow="0 4px 12px rgba(4, 11, 97, 0.2)" name="artname" placeholder="Art Name" />
                        </FormControl>
                        <FormLabel color="black" fontWeight="bold" mr={2}>Price</FormLabel>
                        <Flex align="center">
                            <Text mr="10px">₹</Text>
                            <Input type="number" boxShadow="0 4px 12px rgba(4, 11, 97, 0.4)" name="price" placeholder="Price" />
                        </Flex>

                        <FormControl isRequired>
                            <FormLabel color="black" fontWeight="bold">Picture</FormLabel>
                            <Input type="text" boxShadow="0 4px 12px rgba(4, 11, 97, 0.2)" name="picture" placeholder="Enter URL" />
                        </FormControl>
                        <Button type="submit" width="full" bg="#040B61" mt="10px" color="white">Submit</Button>

                    </form>

                </Box>
            </Flex>
        </>

    );

};

export default CreateArt;