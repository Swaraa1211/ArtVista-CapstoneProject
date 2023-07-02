import {
    Heading,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Table,
    TableCaption,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    Box,
    Text
} from '@chakra-ui/react'
import Navbar from '../components/navBar';
import { getCart } from '../API/cart';
import React, { useEffect, useRef, useState } from 'react';
// import Razorpay from 'razorpay';


const Cart = () => {
    const [cart, setCart] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [currentTab, setCurrentTab] = useState(0);

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


    const handleIncreaseQuantity = (cartId) => {
        const updatedCart = cart.map((item) => {
            if (item.cartId === cartId) {
                const updatedQuantity = item.quantity + 1;
                const updatedPrice = item.artPrice * updatedQuantity;
                return {
                    ...item,
                    quantity: updatedQuantity,
                    artPrice: updatedPrice,
                };
            }
            return item;
        });
        setCart(updatedCart);
    };

    const handleDecreaseQuantity = (cartId) => {
        const updatedCart = cart.map((item) => {
            if (item.cartId === cartId && item.quantity > 1) {
                const updatedQuantity = item.quantity - 1;
                const updatedPrice = item.artPrice * updatedQuantity;
                return {
                    ...item,
                    quantity: updatedQuantity,
                    artPrice: updatedPrice,
                };
            }
            return item;
        });
        setCart(updatedCart);
    };

    const handleCheckout = () => {
        // Store the selected items for checkout
        setSelectedItems(cart);
        // Switch to the Order tab
        setCurrentTab(1);
    };

    //payment
    const razorPageUrl = "https://rzp.io/l/PUmNaEj";
    const [isPaymentModalOpen, setIsPayementModalOpen] = useState(false);

    const openPaymentModal = () => {
        setIsPayementModalOpen(true);
    }

    const closePayemtnModal = () => {
        setIsPayementModalOpen(false);
    }

    // const handlePayment = () => {
    //             const totalAmount = selectedItems.reduce((total, item) => total + item.artPrice, 0);

    //     const options = {
    //         key: 'YOUR_RAZORPAY_KEY',
    //         amount: totalAmount * 100, // Replace with the total amount
    //         currency: 'INR', // Replace with the currency code
    //         name: 'Your Company Name',
    //         description: 'Payment for Art',
    //         handler: function (response) {
    //             // Handle the payment success callback
    //             console.log('Payment Success:', response);

    //             // Perform the post payment actions or API call
    //             // ...
    //         },
    //         prefill: {
    //             name: 'John Doe',
    //             email: 'john.doe@example.com',
    //             contact: '1234567890'
    //         },
    //         theme: {
    //             color: '#F37254'
    //         }
    //     };

    //     //const razorpayInstance = new Razorpay(options);
    //     //razorpayInstance.open();
    // };


    const openPaymentPage = () => {
        // Calculate the total amount
        const totalAmount = selectedItems.reduce((total, item) => total + item.artPrice, 0);

        // Generate the Razorpay order and obtain the order ID
        //const razorpayOrderId = generateRazorpayOrder(totalAmount);

        // Create the Razorpay instance and initialize the payment
        const options = {
            key: 'rzp_test_pierxxGArZAwUJ',
            amount: totalAmount * 100, // Amount in paise or smallest currency unit
            currency: 'INR',
            name: 'Your Store Name',
            description: 'Payment for selected items',
            //order_id: razorpayOrderId,
            handler: function (response) {
                // Payment success callback
                handlePaymentSuccess(response);
            },
            prefill: {
                name: 'Customer Name',
                email: 'customer@example.com',
                contact: '1234567890',
            },
            notes: {
                // Additional notes, if any
            },
            theme: {
                color: '#528FF0',
            },
        };

        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.open();
    };

    const handlePaymentSuccess = (response) => {
        // Handle the payment success response
        console.log('Payment successful:', response);

        // Perform the post method or any other actions here
        console.log('Perform post method');

        // Redirect to the order success page or display a success message
        // You can update this part as per your application's flow
        window.location.href = '/order-success';
    };

    return (
        <>
            <Navbar />
            <Heading>
                Cart Page
            </Heading>
            <Tabs isLazy index={currentTab} onChange={setCurrentTab}>
                <TabList>
                    <Tab>Cart</Tab>
                    <Tab>Order Details</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <Table variant="striped" colorScheme="gray">
                            <TableCaption>Cart</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>Art Name</Th>
                                    <Th>Quantity</Th>
                                    <Th>Price</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {cart.map((item) => (
                                    <Tr key={item.cartId}>
                                        <Td>{item.artName}</Td>
                                        <Td>
                                            <Button
                                                size="sm"
                                                onClick={() => handleDecreaseQuantity(item.cartId)}
                                                disabled={item.quantity === 1}
                                            >
                                                -
                                            </Button>
                                            {item.quantity}
                                            <Button
                                                size="sm"
                                                onClick={() => handleIncreaseQuantity(item.cartId)}
                                            >
                                                +
                                            </Button>
                                        </Td>
                                        <Td>{item.artPrice}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                        <Button onClick={handleCheckout}>Checkout</Button>
                    </TabPanel>
                    <TabPanel>
                        <Table variant="striped" colorScheme="gray">
                            <TableCaption>Checkout</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>Art Name</Th>
                                    <Th>Quantity</Th>
                                    <Th>Price</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {selectedItems.map((item) => (
                                    <Tr key={item.cartId}>
                                        <Td>{item.artName}</Td>
                                        <Td>{item.quantity}</Td>
                                        <Td>{item.artPrice}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>

                        {/* <Button onClick={handlePayment}>Payment</Button> */}

                    </TabPanel>
                </TabPanels>
            </Tabs>

            {/* <Modal isOpen={isPaymentModalOpen} onClose={closePayemtnModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Payment</ModalHeader>
                    <ModalBody>
                        
                        <Box h="600px">
                            <iframe title="Razor Page" src={razorPageUrl} width="100%" height="100%" frameBorder="0"></iframe>
                        </Box>

                    </ModalBody>
                </ModalContent>
            </Modal>
 */}

        </>

    );
};

export default Cart;