import { Box, Flex, Spacer, Link, Button, Icon } from "@chakra-ui/react";
import { SearchIcon } from '@chakra-ui/icons'
import { BsCartFill } from 'react-icons/bs';


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
        <Link href="#" color="white" fontWeight="bold" fontSize="xl">
        ᗩᖇT ᐯIᔕTᗩ
        </Link>
        <Spacer />
        <Box>
          <Link href="#" color="white" mr={4}>
            Marktet Mingle
          </Link>
          <Link href="#" color="white" mr={4}>
            Showcase Showdown
          </Link>
          <Link href="#" color="white" mr={4}>
            Artist Portfolio
          </Link>
          
        </Box>
        <Spacer />
        <Link href="#" color="white" mr={4}>
              <SearchIcon />
            </Link>
            <Link href="#" color="white" mr={4}>
              <BsCartFill />
            </Link>
        <Box>
            <Button colorScheme="whiteAlpha">Log Out</Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;


// import React from 'react';
// import {
//     VStack,
//     Text,
//     Icon,
//     Heading,
//     Button,
//     Modal,
//     Flex,
//     Box
// } from '@chakra-ui/react';
// import {Link} from 'react-router-dom';

// const NavBar = () => {
//     return (
//         <>
//         <h1>NavBar</h1>
//         <Box>
//             <Box>
//                 <h5>Art Vista</h5>
//             </Box>
//             <Box>
//                 <h5>ShowcaseShowdown</h5>
//                 <h5>MarketMingle</h5>
//                 <h5>FindFinesse</h5>
//             </Box>
//             <Box>
//                 <h5>Cart</h5>
//                 <h5>Orders</h5>
//             </Box>                 
//         </Box>
//         </>
//     )
    
// }

// export default NavBar;