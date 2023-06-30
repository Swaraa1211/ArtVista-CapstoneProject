
import React from 'react'
import Navbar from '../components/navBar';
import { getArt } from '../API/art';
import { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Image,
  Wrap,
  WrapItem,
  Button
} from "@chakra-ui/react";
import { deleteFavorites, getFavorites, postFavorites } from '../API/favorites';

const ShowcaseShowdown = () => {
  const [art, setArt] = useState([]);
  const [fav, setFav] = useState([]);
  const [isFavorite, setIsFavorite] = useState([]);
  //  const [loading, setLoading ] = useState(false);

  const fetchArt = async () => {
    try {
      const response = await getArt();
      console.log(response);
      const artData = Array.isArray(response.data) ? response.data : [];
      setArt(artData);

      //console.log("api fetch in showcasecshowdown");
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    

    fetchArt();
  }, []);
  console.log(art);

  const handleFavoriteClick = async (userId, artId) => {
    console.log("handle fav " + userId + artId)
    try {
      // Save as favorite
      const data = {
        user_id: userId,
        art_id: artId
      };
      await postFavorites(data);
      fetchArt();
      setIsFavorite(true);
    } catch (error) {
      console.error(error);
      // Handle error if needed
    }
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await getFavorites();
        const favorites = response.data;
        setFav(favorites);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavorites();
  }, []);





  return (
    <>
      <Navbar />
      <Heading>ShowcaseShowdown</Heading>
      <Wrap spacing={4} mt={4}>
        {art && art.map((item) => {
          const isFavorite = fav.some(favorite => favorite.artId === item.art_id);

          return (
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
                  {!isFavorite && (
                    <Button onClick={() => handleFavoriteClick(item.user_id, item.art_id)}>
                      Add to Favorites
                    </Button>
                  )}
                </Box>
              </Box>
            </WrapItem>
          );
        })}
      </Wrap>


      {/* //working fine
       <Wrap spacing={4} mt={4}>
        {art && art.map((item) => (
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
                <Button onClick={() => handleFavoriteClick(item.user_id, item.art_id)}>
                  Add to Favorites
                </Button>
              </Box>
            </Box>
          </WrapItem>
        ))}
      </Wrap> */}

      {/* <Wrap spacing={4} mt={4}>
        {art&&art.map((item) => (

          <WrapItem key={item.art_id}>
            <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
              <Image src={item.picture} alt={item.art_name} width="200px"
                                    height="200px" />
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
              </Box>
            </Box>
          </WrapItem>
        ))}
      </Wrap> */}
    </>
  );
};


export default ShowcaseShowdown;