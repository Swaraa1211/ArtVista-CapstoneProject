import {
    Heading,
    Table,
    TableCaption,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Image,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
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
            console.log(JSON.stringify(response.data) + " Data");

            const filteredByUserID = orderData.filter(
                (orderUser) => orderUser.user_id === userId
            );
            setOrder(filteredByUserID);
        } catch (error) {
            console.error(error);
            // Handle error here (e.g., show error message to the user)
        }
    };


    useEffect(() => {
        fetchOrders();
    }, []);

    //console.log("order Fetch" + order);

    return (
        <>
            <Heading align="center" justifyContent="center" color="#F78104">Your Orders</Heading>
            <Table variant="striped" colorScheme="gray">
                <TableCaption>Order Details</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Order ID</Th>
                        <Th>Art Name</Th>
                        <Th>Picture</Th>
                        <Th>Quantity</Th>
                        <Th>Order Date</Th>
                        <Th>Price</Th>
                        <Th>TotalAmount</Th>
                        <Th>Payment</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {order.map((item) => (
                        <Tr key={item.orderId}>
                            <Td>{item.order_id}</Td>
                            <Td>
                                {item.art_name.split(", ").map((p) => (
                                    <div key={p}>{p},</div>
                                ))}
                            </Td>
                            <Td>
                                {item.picture.split(", ").map((url) => (
                                    <Image key={url} src={url} alt="Art" width="100px" height="50px" m="5px"/>
                                ))}
                            </Td>


                            <Td>{item.quantity.split(", ").map((p) => (
                                <div key={p}>{p},</div>
                            ))}</Td>
                            <Td>{item.order_date}</Td>
                            <Td>{item.price.split(", ").map((p) => (
                                <div key={p}>{p},</div>
                            ))}</Td>
                            <Td>
                                {item.total_amount}
                            </Td>
                            <Td>
                                {item.payment}
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </>
    )

}

export default Orders;