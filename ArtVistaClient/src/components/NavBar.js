import { Box, Flex, Spacer, Button, Text } from "@chakra-ui/react";
import { SearchIcon } from '@chakra-ui/icons'
import { BsCartFill } from 'react-icons/bs';
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <Box
      bg="#249EA0"
      py={4}
      rounded="full"
      mx={4}
      mb={4}
      mt={2}
      boxShadow="md"
    >
      <Flex maxW="container.lg" mx="auto" align="center" >
        <Text color="white" fontWeight="bold" fontSize="3xl">
          <Link to="/homePage">
            ᗩᖇT ᐯIᔕTᗩ
          </Link>

        </Text>
        <Spacer />
        <Box>
          <Flex fontSize="2xl">
            
            <Text color="white" mr={4}>
              <Link to="/showcaseShowdown" >
                Showcase
              </Link>
            </Text>
            <Text color="white" mr={4}>
              <Link to="/artistPortfolio" >
                Portfolio
              </Link>
            </Text>
            <Text color="white" mr={4}>
              <Link to="/marketMingle" >
                Pursuit
              </Link>
            </Text>
          </Flex>

        </Box>
        <Spacer />
        <Link to="/search" >
          <SearchIcon color="white" w={6} h={6} mr={4} />
        </Link>
        <Link to="/cart" >
          <BsCartFill color="white" size={30} m={4} />
        </Link>
        <Box>
          <Button colorScheme="whiteAlpha" ml={5}>Log Out</Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
