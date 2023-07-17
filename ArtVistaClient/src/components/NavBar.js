import {
  Box,
  Flex,
  Spacer,
  Button,
  Text,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@chakra-ui/react";
import { BsCartFill, } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { useNavigate, Link } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../pages/Auth/authProvider';
import { deleteCart, getCart } from "../API/cart";


const Navbar = () => {
  const { handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogoutFunction = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const handleSubmitLogout = async (event) => {
    for (const item of cart) {
      const { cartId } = item;
      const response = await deleteCart(cartId);

      if (response && response.status) {
        console.log(`Cart item with ID ${cartId} deleted successfully`);
      } else {
        console.error(`Failed to delete cart item with ID ${cartId}`);
      }
    }
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  const [cart, setCart] = useState([]);
  const fetchCart = async () => {
    try {
      const response = await getCart();
      const cartData = Array.isArray(response.data) ? response.data : [];
      //console.log("cart fetch " + cartData);
      setCart(cartData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <>
      <Box
        bg="#249EA0"
        py={5}
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
                <Link to="/bidding" >
                  Bidding
                </Link>
              </Text>
            </Flex>

          </Box>
          <Spacer />
          <Link to="/profile" >
            <CgProfile color="white" size={30} ml={4} />
          </Link>
          <Link to="/cart" >
            <BsCartFill color="white" size={30} mr={20} />
          </Link>
          <Box>
            <Button onClick={() => openLogoutModal()} colorScheme="whiteAlpha" ml={5}>
              LogOut
            </Button>
          </Box>
        </Flex>
      </Box>
      <Modal isOpen={isLogoutModalOpen} onClose={closeLogoutModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Logout</ModalHeader>
          <ModalBody>
            <Text> Are you sure you want to LogOut ?</Text>            
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmitLogout} bg="#040B61" color="white">
              LogOut
            </Button>

            <Button colorScheme="gray" onClick={closeLogoutModal} ml={2} bg="red" color="white">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Navbar;
