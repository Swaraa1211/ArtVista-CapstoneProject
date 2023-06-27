
import React from 'react'
import Navbar from '../components/navBar';
import { getArt } from '../API/art';
import { useEffect, useState } from 'react';
import { Box, Heading, Text, Image, Wrap, WrapItem } from "@chakra-ui/react";

const ShowcaseShowdown = () => {
    const [art, setArt] = useState([]);
//  const [loading, setLoading ] = useState(false);
    useEffect(() => {
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
  
      fetchArt();
    }, []);
  console.log(art);
    return (
      <>
        <Navbar />
        <Heading>ShowcaseShowdown</Heading>
        <Wrap spacing={4} mt={4}>
        {art&&art.map((item) => (

          <WrapItem key={item.art_id}>
            <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
              <Image src={item.picture} alt={item.art_name} />
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
      </Wrap>
      </>
    );
  };
  

export default ShowcaseShowdown;