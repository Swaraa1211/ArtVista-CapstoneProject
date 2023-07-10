import { 
    Heading
 } from '@chakra-ui/react';
import React, { useState } from 'react';
import { getOrders } from '../../API/orders';

const Orders = () => {
    const [order, setOrder] = useState([]);
    const userToken = localStorage.getItem('userToken');
    const parsedToken = JSON.parse(userToken);
    const userId = parsedToken.data.userId;

    const fetchOrders = async () => {
        try {
            const response = await getOrders();
            const orderData = response.data;
            const filteredByUserID = orderData.filter(orderUser => orderUser.userId === userId)
            setOrder(filteredByUserID);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    console.log("order Fetch" + order);

    return(
        <>
        <Heading>Orders</Heading>
        </>
    )

}

export default Orders;