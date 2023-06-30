import { Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { deleteFavorites, getFavorites } from '../../API/favorites';
import { Box, Flex, Text, Image, Badge, Grid, Button } from '@chakra-ui/react';
const Favorites = () => {
    const [fav, setFav] = useState([]);


    const fetchFavorites = async () => {
        try {
            const response = await getFavorites();
            setFav(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        

        fetchFavorites();
    }, []);
    // const fetchFav = async () => {
    //     try {
    //       const response = await getFavorites();
    //       const favData = Array.isArray(response.data) ? response.data : [];

    //       // Convert the response to a JSON string
    //       const favString = JSON.stringify(favData);
    //       console.log(favString);

    //       setFav(favData);
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };

    //   fetchFav();


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


    return (
        <>
            <Heading>Favorites</Heading>
            {/* <div>
                {fav.map((item) => (
                    <div key={item.fav_id}>
                        <p>User ID: {item.userid}</p>
                        <p>Art ID: {item.artid}</p>
                    </div>
                ))}
            </div> */}
            <Box p={4}>
                <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                    {fav.map((item) => (
                        <Box key={item.favId} borderWidth="1px" borderRadius="md" p={4}>
                            <Flex justifyContent="center" mb={4}>
                                <Image src={item.artPicture} alt={item.artName} maxH="200px" />
                            </Flex>
                            <Text fontWeight="bold" fontSize="lg" mb={2}>
                                {item.artName}
                            </Text>
                            <Text fontSize="sm" mb={2}>
                                Artist: {item.artistName}
                            </Text>
                            <Text fontSize="sm" mb={2}>
                                Description: {item.artDescription}
                            </Text>
                            <Flex justifyContent="space-between">
                                <Badge colorScheme="teal" borderRadius="full" px={2} py={1} fontSize="sm">
                                    Price: {item.artPrice}
                                </Badge>
                                <Badge colorScheme="blue" borderRadius="full" px={2} py={1} fontSize="sm">
                                    User: {item.userId}
                                </Badge>
                            </Flex>
                            <Button colorScheme="red" mt={4} onClick={() => handleDelete(item.favId)}>
                                Delete
                            </Button>
                        </Box>
                    ))}
                </Grid>
            </Box>


        </>

    );
}

export default Favorites;