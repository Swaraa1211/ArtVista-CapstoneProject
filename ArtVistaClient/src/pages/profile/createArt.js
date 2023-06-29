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
import { useRecoilValue } from 'recoil';
import { userAtom } from '../../constant/atomRecoil';

const CreateArt = () => {
    const { userId, username } = useRecoilValue(userAtom);
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
            artist_name: event.target.elements.artistname.value,
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

        } else {
            console.log('adding art failed in handle submit', response);
        }

    }

    return (
        <>
            
            <Heading>CreateArt</Heading>
            <Box p={4}>
                <Heading>Create Art</Heading>
                <form ref={formRef} onSubmit={handleArtSubmit}>
                    <FormControl isRequired>
                        <FormLabel color="black">Art Description</FormLabel>
                        <Input type="text" name="artdescription" placeholder="Description" />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel color="black">Artist Name</FormLabel>
                        <Input type="text" name="artistname" placeholder="Name" />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel color="black">Art Name</FormLabel>
                        <Input type="text" name="artname" placeholder="Art Name" />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel color="black">Price</FormLabel>
                        <Text>₹</Text><Input type="number" name="price" placeholder="Price" />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel color="black">Picture</FormLabel>
                        <Input type="text" name="picture" placeholder="Enter URL" />
                    </FormControl>
                    <Button type="submit" width="full" colorScheme="blue">Submit</Button>

                </form>

            </Box>

        </>

    );

};

export default CreateArt;