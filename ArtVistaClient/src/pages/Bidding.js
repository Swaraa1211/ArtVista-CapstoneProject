import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Modal,
    ModalFooter,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    Image,
    Box,
    WrapItem,
    Wrap,

    Grid, GridItem
} from '@chakra-ui/react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import React, { useEffect, useState } from 'react'
import Navbar from '../components/navBar';
import { getBidArt, getBidPrice, postBidArt, postBidPrice } from '../API/bidArt';
import { Link, useOutlet } from 'react-router-dom';

const Bidding = () => {
    const userToken = localStorage.getItem('userToken');
    const parsedToken = JSON.parse(userToken);
    const userId = parsedToken.data.userId;
    const username = parsedToken.data.username;
    console.log(userId)

    const outlet = useOutlet();

    const [isBidModalOpen, setIsBidModalOpen] = useState(false);

    const openBidModal = () => {
        setIsBidModalOpen(true);
    };

    const closeBidModal = () => {
        setIsBidModalOpen(false);
    };

    const handleSubmitBid = async (event) => {
        event.preventDefault();

        const formData = {
            bidArt_description: event.target.elements.art_description.value,
            bidArt_name: event.target.elements.bid_art.value,
            bidArtist_name: username,
            bidPrice: event.target.elements.bid_price.value,
            picture: event.target.elements.picture.value,
            user_id: userId,
            user_name: username,
        }

        const response = await postBidArt(formData);

        if (response && response.status) {
            console.log('Successful in adding Bid', response.data);
        } else {
            console.log('adding Bid failed in handle submit', response);
        }
        fetchBidArt();
        closeBidModal();
    };

    const [bidart, setBidArt] = useState([]);
    //bidart
    const fetchBidArt = async () => {
        try {
            const response = await getBidArt();
            console.log(response);
            const artData = Array.isArray(response.data) ? response.data : [];
            setBidArt(artData);

            //console.log("api fetch in showcasecshowdown");
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchBidArt();
    }, []);
    //console.log(art);


    const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
    const [bidArtId, setBidArtId] = useState(null);
    const [bidArtName, setBidArtName] = useState(null);

    const openPriceModal = (bidId, bidName) => {
        setBidArtId(bidId);
        setBidArtName(bidName);
        setIsPriceModalOpen(true);
    };

    const closePriceModal = () => {
        setIsPriceModalOpen(false);
    };
    const handleSubmitPrice = async (event) => {
        event.preventDefault();
        console.log("Bid Art" + bidArtName)

        const formData = {
            bidart_id: bidArtId,
            Art_name: bidArtName,
            Bidprice: event.target.elements.price_bid.value,
            Status: 'Not Sold',
            User_id: userId
        };

        const response = await postBidPrice(formData);

        if (response && response.status) {
            console.log('Successful in adding Bid', response.data);
        } else {
            console.log('Adding Bid failed in handleSubmitPrice', response);
        }
        closePriceModal();
    };

    const [soldArtIds, setSoldArtIds] = useState([]);

    // Function to fetch the sold BidArt_ids from the API
    const fetchSoldArtIds = async () => {
        try {
            const response = await getBidPrice();
            if (response.status) {
                console.log("response", response);

                const bidPriceData = Array.isArray(response.data) ? response.data : [];
                const soldIds = bidPriceData
                    .filter(item => item.status === 'Sold')
                    .map(item => item.bidArt_id);
                console.log("soldids", soldIds);

                setSoldArtIds(soldIds);
            }
        } catch (error) {
            console.error('Error fetching sold Art ids:', error);
        }
    };

    useEffect(() => {
        fetchSoldArtIds();
    }, []);



    // Function to check if a BidArt_id is sold
    const isSold = bidArtId => {
        console.log("sold" + soldArtIds.includes(bidArtId))
        return soldArtIds.includes(bidArtId);
    };

    // Render the button or "Sold" text based on the BidArt_id status
    const renderButtonOrSoldText = (bidArtId, bidArtName) => {
        if (isSold(bidArtId)) {
            return <Box
                px={3}
                py={1}
                borderRadius="md"
                boxShadow="md"
                backgroundColor="#F78104"
                display="inline-block"
            >
                <Text color="black" fontSize="18px" fontWeight="bold">
                    Sold
                </Text>
            </Box>;
        }

        return (
            <Button onClick={() => openPriceModal(bidArtId, bidArtName)} mt={4} bgColor="#040B61">
                BidPrice
            </Button>
        );
    };

    const [modalData, setModalData] = useState(null);

    const openModal = (item) => {
        setModalData(item);
    };

    const closeModal = () => {
        setModalData(null);
    };

    return (
        <>
            <Navbar />

            <Heading align="center" justify="center">
                <Text as="span" color="#040B61" fontSize="6xl">
                    Bidd
                </Text>
                <Text as="span" color=" #F78104" fontSize="6xl">
                    ing
                </Text>
            </Heading>

            <Modal isOpen={isBidModalOpen} onClose={closeBidModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Bid</ModalHeader>
                    <ModalBody>
                        <form onSubmit={handleSubmitBid}>
                            <FormControl isRequired>
                                <FormLabel>Art</FormLabel>
                                <Input type="text" name="bid_art" placeholder="Art Name" />
                            </FormControl>
                            {/* <FormControl isRequired>
                                <FormLabel>Artist Name</FormLabel>
                                <Input type="text" name="bid_artist" placeholder="Artist Name" />
                            </FormControl> */}
                            <FormControl isRequired>
                                <FormLabel>Art Description</FormLabel>
                                <Input type="text" name="art_description" placeholder="Descrition" />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Price</FormLabel>
                                <Input type="number" name="bid_price" placeholder="Price" />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Picture</FormLabel>
                                <Input type="text" name="picture" placeholder="Picture URL" />
                            </FormControl>

                            <Button colorScheme="blue" type="submit">
                                Submit
                            </Button>
                        </form>
                        <Button colorScheme="gray" onClick={closeBidModal} ml={2}>
                            Cancel
                        </Button>
                    </ModalBody>
                    <ModalFooter>
                        <Text>upload your art here</Text>

                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Flex>


                <Flex width='250px' height="400px" bgColor="white" boxShadow="0 2px 10px rgba(4, 11, 97, 0.2)" borderRadius="5px" alignItems="center" m={5}>

                    <Box m="10px">

                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Heading as="h2" color="#040B61" size="md" mb={2}>
                                Add your BID ART
                            </Heading>
                        </Box>

                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            width="200px"
                            height="200px"
                            m={3}
                            border="2px dotted #040B61"
                            borderRadius="10%"
                        >
                            <AiOutlinePlusCircle size={40} color="#F78104" />
                        </Box>

                        <Box flex={1} textAlign="center">
                            <Text fontWeight="bold" color="white" fontSize="2xl" mt={2} mb={2}>
                                <Button onClick={() => openBidModal()} mt={4} color="white" bgColor="#040B61">
                                    Add Art
                                </Button>
                            </Text>

                        </Box>
                    </Box>
                </Flex>
                <Wrap spacing={4} justify="center" align="center">
                    {bidart &&
                        bidart
                            .filter((item) => item.userId !== userId)
                            .map((item) => {

                                return (
                                    <Box>

                                        <WrapItem key={item.art_id}>
                                            <Flex width='250px' height="400px" bgColor="white" boxShadow="0 2px 10px rgba(4, 11, 97, 0.2)" borderRadius="5px" alignItems="center" m={5}>

                                                <Box m="10px">
                                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                                        <Heading as="h2" color="#040B61" size="md" mb={2}>
                                                            {item.bidArt_name}
                                                        </Heading>
                                                        <BiDotsHorizontalRounded onClick={() => openModal(item)} />
                                                    </Box>

                                                    {modalData && (
                                                        <Modal isOpen={true} onClose={closeModal}>
                                                            <ModalOverlay />
                                                            <ModalContent>
                                                                <ModalHeader color="#040B61" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                                    <Heading as="h2" fontSize="5xl">
                                                                        {modalData.bidArt_name}
                                                                    </Heading>
                                                                    <Box ml={5} style={{ marginLeft: 'auto' }}>
                                                                        <Heading as="h3" fontSize="lg" color="#249EA0" textAlign="right">
                                                                            - {modalData.bidArtist_name}
                                                                        </Heading>
                                                                    </Box>
                                                                </ModalHeader>


                                                                <ModalBody>
                                                                    <Box flex={1}>
                                                                        <Box display="flex" justifyContent="center" alignItems="center" height="200px" >
                                                                            <Image src={modalData.picture} alt={modalData.bidArt_name} width="200px" height="200px" borderRadius="10px" />

                                                                        </Box>

                                                                        <Box flex={1} textAlign="center">
                                                                            <Heading fontWeight="bold" color="#040B61" fontSize="2xl" mt={2} mb={2}>
                                                                                ₹ {modalData.bidPrice}
                                                                            </Heading>
                                                                            <Text fontSize="xl" mb={2}>
                                                                                {modalData.bidArt_description}
                                                                            </Text>

                                                                        </Box>


                                                                    </Box>
                                                                </ModalBody>
                                                                <ModalFooter>
                                                                    <Button bg="#F78104" onClick={closeModal} ml={2}>
                                                                        Close
                                                                    </Button>
                                                                </ModalFooter>
                                                            </ModalContent>
                                                        </Modal>
                                                    )}

                                                    <Box display="flex" justifyContent="center" alignItems="center" height="200px" m={3}>
                                                        <Image src={item.picture} alt={item.bidArt_name} width="200px" height="200px" borderRadius="10px" />
                                                    </Box>
                                                    <Box flex={1} textAlign="center">
                                                        <Heading fontWeight="bold" color="#040B61" fontSize="2xl" mt={2} mb={2}>
                                                            ₹ {item.bidPrice}
                                                        </Heading>
                                                    </Box>

                                                    <Box display="flex" justifyContent="center" alignItems="center" m={3}>
                                                        <div key={item.bidArt_id}>
                                                            {renderButtonOrSoldText(item.bidArt_id, item.bidArt_name)}
                                                        </div>
                                                    </Box>
                                                </Box>
                                            </Flex>
                                        </WrapItem>
                                    </Box>
                                );
                            })}
                </Wrap>
            </Flex>


            <Modal isOpen={isPriceModalOpen} onClose={closePriceModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Bid</ModalHeader>
                    <ModalBody>
                        <form onSubmit={handleSubmitPrice}>
                            <FormControl isRequired>
                                <FormLabel>Price</FormLabel>
                                <Input type="number" name="price_bid" placeholder="Price" />
                            </FormControl>
                            <Button colorScheme="blue" type="submit">
                                Submit
                            </Button>
                        </form>

                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="gray" onClick={closePriceModal} ml={2}>
                            Cancel
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );

};

export default Bidding;