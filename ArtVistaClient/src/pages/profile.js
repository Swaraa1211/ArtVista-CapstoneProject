import { Box, Flex, FormControl, Heading } from '@chakra-ui/react'
import React from 'react'
import Navbar from '../components/navBar';
import { postArt } from '../API/art';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../constant/atomRecoil';

const Profile = () => {
    const { userId, username } = useRecoilValue(userAtom);

    console.log(userId + " " + username + " from profile and userAtom")
    //console.log(userId + " " + username);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            art_description: event.target.elements.artdescription.value,
            artist_name: event.target.elements.artistname.value,
            art_name: event.target.elements.artname.value,
            price: event.target.elements.price.value,
            picture: event.target.elements.picture.value

        };

        const response = await postArt(formData);

        if (response && response.status) {
            console.log('Successful in adding art', response.data);

        } else {
            console.log('adding art failed in handle submit', response);
        }

    }

    return (
        <>
            <Navbar />
            <Flex>
                <Heading>
                    Profile
                </Heading>
                {/* <Box p={4}>
                    <form onSubmit={handleSubmit}>
                        <FormControl isRequired>

                        </FormControl>
                    </form>
                </Box> */}
            </Flex>
        </>

    );

};

export default Profile;