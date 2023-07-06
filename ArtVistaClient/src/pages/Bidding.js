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
} from '@chakra-ui/react'
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
            bidArtist_name: event.target.elements.bid_artist.value,
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
            return <Text>Sold</Text>;
        }

        return (
            <Button onClick={() => openPriceModal(bidArtId, bidArtName)} mt={4}>
                BidPrice
            </Button>
        );
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
            <Heading>Add art for bidding</Heading>
            <Button onClick={() => openBidModal()} mt={4}>
                Add Art
            </Button>
            {/* <Button bg="#249EA0" color="#040B61" mr={4}>
                <Link to="biddingPrice">
                    Show
                </Link>
            </Button> */}
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
                            <FormControl isRequired>
                                <FormLabel>Artist Name</FormLabel>
                                <Input type="text" name="bid_artist" placeholder="Artist Name" />
                            </FormControl>
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
            {/* <Grid
                // h="100vh"
                overflowY="hidden"
                templateRows="repeat(2, 1fr)"
                templateColumns="repeat(6, 1fr)"
            // bg="gray.100"
            >
                <GridItem colSpan={5} > */}
            <Wrap spacing={4} mt={4} justify="center" align="center">
                {bidart && bidart.map((item) => {
                    return (
                        <WrapItem key={item.bidArt_id}>
                            <Flex width='550px' height="250px" borderWidth="1px" borderRadius="10px" >
                                <Box display="flex" justifyContent="center" alignItems="center" m="10px">
                                    <Image src={item.picture} alt={item.bidArt_name} width="200px" height="200px" borderRadius="10px" />
                                </Box>
                                <Box p={4} flex={1}>
                                    <Heading as="h2" size="md" mb={2}>
                                        {item.bidArt_name}
                                    </Heading>
                                    <Text fontSize="sm" mb={2}>
                                        Artist: {item.bidArtist_name}
                                    </Text>
                                    <Text fontSize="sm" mb={2}>
                                        {item.bidArt_description}
                                    </Text>
                                    <Text fontSize="sm">Price: {item.bidPrice}</Text>

                                    <div key={item.bidArt_id}>
                                        {/* Render the button or "Sold" text based on the BidArt_id status */}
                                        {renderButtonOrSoldText(item.bidArt_id, item.bidArt_name)}
                                    </div>
                                    {/* <Button onClick={() => openPriceModal(item.bidArt_id, item.bidArt_name)} mt={4}>
                                        BidPrice
                                    </Button> */}
                                </Box>
                            </Flex>
                        </WrapItem>
                    );
                })}
            </Wrap>
            {/* </GridItem>
                <GridItem rowSpan={2} colSpan={1} p={5} bg="#fff">

                    <Box>
                        {outlet}
                    </Box>
                </GridItem>
            </Grid> */}
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
            {/* <Wrap spacing={4} mt={4} justify="center" align="center">
                {bidart && bidart.map((item) => {
                    return (
                        <WrapItem key={item.bidArt_id}>
                            <Flex width='550px' height="250px" borderWidth="1px" borderRadius="10px" >
                                <Box display="flex" justifyContent="center" alignItems="center" m="10px">
                                    <Image src={item.picture} alt={item.bidArt_name} width="200px" height="200px" borderRadius="10px" />
                                </Box>
                                <Box p={4} flex={1}>
                                    <Heading as="h2" size="md" mb={2}>
                                        {item.bidArt_name}
                                    </Heading>
                                    <Text fontSize="sm" mb={2}>
                                        Artist: {item.bidArtist_name}
                                    </Text>
                                    <Text fontSize="sm" mb={2}>
                                        {item.bidArt_description}
                                    </Text>
                                    <Text fontSize="sm">Price: {item.bidPrice}</Text>
                                    
                                    
                                    
                                </Box>
                            </Flex>
                        </WrapItem>
                    );
                })}
            </Wrap> */}


        </>

    );

};

export default Bidding;