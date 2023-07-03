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
    
} from '@chakra-ui/react'
import Navbar from '../components/navBar';
import { deleteCart, getCart } from '../API/cart';
import React, { useEffect, useRef, useState } from 'react';

import { useRecoilValue } from 'recoil';
import { userAtom } from '../constant/atomRecoil';
import { postOrders } from '../API/orders';
// import Razorpay from 'razorpay';


const Cart = () => {
    const [cart, setCart] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [currentTab, setCurrentTab] = useState(0);
    const { userId, username } = useRecoilValue(userAtom);

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

    const handleRemoveFromCart = async (cartId) => {
        const response = await deleteCart(cartId);

        if (response && response.status) {
            console.log(`Cart item with ID ${cartId} deleted successfully`);
            fetchCart();
        } else {
            console.error(`Failed to delete cart item with ID ${cartId}`);
        }

    }

    const handleCheckout = () => {
        // Store the selected items for checkout
        setSelectedItems(cart);
        // Switch to the Order tab
        setCurrentTab(1);
    };

    //payment

    const openPaymentPage = () => {
        const totalAmount = selectedItems.reduce((total, item) => total + item.artPrice, 0);
        const options = {
            key: 'rzp_test_YJLIb2YOLUXfTq',
            key_secret: 'bMYCFq6w4NkNaTsdpe7Zq5DB',
            amount: totalAmount * 100,
            currency: 'INR',
            name: 'Art Vista',
            description: 'Pay here securely',
            //order_id: razorpayOrderId,
            handler: function (response) {
                // Payment success callback
                handlePaymentSuccess(response);
            },
            prefill: {
                name: 'Your Name',
                email: 'example@gmail.com',
                contact: '1234567890',
            },
            notes: {

            },
            theme: {
                color: '#528FF0',
            },
        };

        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.open();
    };

    const handlePaymentSuccess = async (response) => {
        console.log(selectedItems);
        // Handle the payment success response
        console.log('Payment successful:', response);

        for (const item of selectedItems) {
            const { cartId } = item;
            const response = await deleteCart(cartId);

            if (response && response.status) {
                console.log(`Cart item with ID ${cartId} deleted successfully`);
            } else {
                console.error(`Failed to delete cart item with ID ${cartId}`);
            }
        }

        const artIds = selectedItems.map(item => item.artId);
        const artIdString = artIds.join(', ');

        const artNames = selectedItems.map(item => item.artName);
        const artNamesString = artNames.join(', ');

        const artPictures = selectedItems.map(item => item.artPicture);
        const artPicturesString = artPictures.join(', ');

        const artQuantitys = selectedItems.map(item => item.quantity);
        const artQuantitysString = artQuantitys.join(', ');

        const artPrices = selectedItems.map(item => item.artPrice);
        const artPricesString = artPrices.join(', ');

        const totalAmount = selectedItems.reduce((total, item) => total + item.artPrice, 0);

        const current = new Date();
        const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

        const postData = {
            user_id: userId,
            total_amount: totalAmount,
            payment: 'paid',
            order_date: date,
            art_id: artIdString,
            art_name: artNamesString,
            picture: artPicturesString,
            quantity: artQuantitysString,
            price: artPricesString,

        }

        const postResponse = await postOrders(postData);
        if (postResponse && postResponse.status) {
            console.log('Successful in adding order', postResponse.data);
            setSelectedItems([]);

        } else {
            console.log('adding order failed in handle submit', postResponse);
        }

        console.log('Perform post method');

        // window.location.href = '/order-success';
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
                                    <Th>Action</Th>
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
                                        <Td>
                                            <Button
                                                size="sm"
                                                onClick={() => handleRemoveFromCart(item.cartId)}
                                            >
                                                Remove from Cart
                                            </Button>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                        {cart.length > 0 && <Button onClick={handleCheckout}>Checkout</Button>}
                        {/* <Button onClick={handleCheckout}>Checkout</Button> */}
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
                        {selectedItems.length > 0 && <Button onClick={openPaymentPage}>Payment</Button>}
                        {/* <Button onClick={openPaymentPage}>Payment</Button> */}

                    </TabPanel>
                </TabPanels>
            </Tabs>

        </>

    );
};

export default Cart;