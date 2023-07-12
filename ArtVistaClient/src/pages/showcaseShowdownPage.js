
import Navbar from '../components/navBar';
import { getArt } from '../API/art';
import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Image,
  Wrap,
  WrapItem,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Flex,
  InputGroup,
  InputRightElement,
  Spacer,
  Grid,
  GridItem
} from "@chakra-ui/react";
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BsCart, BsCartFill } from 'react-icons/bs';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { GoCommentDiscussion } from 'react-icons/go';
import { deleteFavorites, getFavorites, postFavorites } from '../API/favorites';
import { getReview, getReviewById, postReview } from '../API/review';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../constant/atomRecoil';
import { getCart, postCart } from '../API/cart';

const ShowcaseShowdown = () => {
  //const { userId, username } = useRecoilValue(userAtom);
  const userToken = localStorage.getItem('userToken');
  const parsedToken = JSON.parse(userToken);
  const userId = parsedToken.data.userId;
  const username = parsedToken.data.username;
  const formRef = useRef(null);
  const [art, setArt] = useState([]);

  //  const [loading, setLoading ] = useState(false);

  //art
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
  useEffect(() => {


    fetchArt();
  }, []);
  console.log(art);

  //favorites
  const [fav, setFav] = useState([]);
  const [isFavorite, setIsFavorite] = useState([]);
  const handleFavoriteClick = async (userId, artId) => {
    console.log("handle fav " + userId + artId)
    try {
      const data = {
        user_id: userId,
        art_id: artId
      };
      await postFavorites(data);
      fetchArt();
      setIsFavorite(true);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await getFavorites();
        const favorites = response.data;
        console.log("in fav fetch " + favorites);
        setFav(favorites);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavorites();
  }, []);

  //review
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [rating, setRating] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewContent, setReviewContent] = useState([]);
  const [selectedArtId, setSelectedArtId] = useState(null);
  var starRating = 0;



  const openReviewModal = (artID) => {
    setIsReviewModalOpen(true);
    setSelectedArtId(artID);
    fetchReviewContent(artID);
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
    setRating('');
    setReviewComment('');
    setReviewContent([]);
  };

  const handleSubmitReview = async (event) => {
    event.preventDefault();

    const formData = {
      User_id: userId,
      rating: event.target.elements.art_rating.value,
      reviewcomment: event.target.elements.review_comment.value,
      Art_id: selectedArtId,
    }

    const response = await postReview(formData);

    if (response && response.status) {
      console.log('Successful in adding review', response.data);
      //formRef.current.reset();

    } else {
      console.log('adding review failed in handle submit', response);
    }

    closeReviewModal();
  };

  const fetchReviewContent = async (artID) => {

    try {
      const response = await getReview();
      console.log("response in fetch " + response)
      const reviewData = response.data;
      const filteredReviewData = reviewData.filter(review => review.artId === artID);
      setReviewContent(filteredReviewData);
      // const reviewData = response.data;
      // setReviewContent(response.data);

    } catch (error) {
      console.error('Failed to fetch review content:', error);
    }
  };

  //cart
  const [addedToCart, setAddedToCart] = useState([]);
  //const [isAddedToCart, setIsAddedToCart] = useState([])
  const [isAddedToCart, setIsAddedToCart] = useState(false);


  const addToCart = async (artId, artName) => {
    try {
      const cartData = {
        art_id: artId,
        art_name: artName,
        quantity: 1
      };

      const response = await postCart(cartData);
      console.log('Item added to cart:', response.data);

      //setIsAddedToCart(true);
      setIsAddedToCart(prevState => !prevState);
      window.location.reload();
      fetchArt();

      // if (response && response.status) {
      //   console.log('Successful in adding cart', response.data);
      //   //fetchCart(); // Fetch cart data after adding an item

      // } else {
      //   console.log('Adding cart failed in handle submit', response);
      // }
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  };



  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await getCart();
        const carts = response.data;
        console.log("In cart fetch", carts);
        setAddedToCart(carts);
        //setIsAddedToCart(carts);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCart();
  }, []);

  //search
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArt, setFilteredArt] = useState([]);

  useEffect(() => {
    // Fetch art data
    const fetchArt = async () => {
      try {
        const response = await getArt();
        const artData = Array.isArray(response.data) ? response.data : [];
        setArt(artData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArt();
  }, []);

  useEffect(() => {
    // Filter art based on search query
    const filtered = art.filter(item =>
      item.art_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredArt(filtered);
  }, [searchQuery, art]);

  const handleSearch = event => {
    setSearchQuery(event.target.value);
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
      <Box mt={5}>
        <Heading align="center" justify="center">
          <Text as="span" color="#040B61" fontSize="6xl">
            Showcase
          </Text>{" "}
          <Text as="span" color=" #F78104" fontSize="6xl">
            Showdown
          </Text>
        </Heading>
        <Box align="center" mt={4}>
          <input
            type="text"
            placeholder="Search Art"
            value={searchQuery}
            onChange={handleSearch}
            style={{
              //backgroundColor: 'lightblue', 
              fontSize: '16px',
              boxShadow: "0 2px 4px rgba(4, 11, 97, 0.2)",
              borderRadius: "5px",
              padding: "8px",
              width: "96vw"
            }}
          />
        </Box>

        <Wrap spacing={4} mt={4} justify="center" align="center">
          {filteredArt &&
            filteredArt
              .filter((item) => item.user_id !== userId)
              .map((item) => {
                const isFavorite = fav.some(favorite => favorite.artId === item.art_id && favorite.userId === userId);
                const isAddedToCart = addedToCart.some(cart => cart.artId === item.art_id);

                return (
                  <WrapItem key={item.art_id}>
                    <Flex width='250px' height="400px" bgColor="white" boxShadow="0 2px 10px rgba(4, 11, 97, 0.2)" borderRadius="5px" alignItems="center" m={2}>
                      <Box m="10px">
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Heading as="h2" color="#040B61" size="md" mb={2}>
                            {item.art_name}
                          </Heading>
                          <BiDotsHorizontalRounded onClick={() => openModal(item)} />
                        </Box>

                        {modalData && (
                          <Modal isOpen={true} onClose={closeModal}>
                            <ModalOverlay />
                            <ModalContent>
                              <ModalHeader color="#040B61" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Heading as="h2" fontSize="5xl">
                                  {modalData.art_name}
                                </Heading>
                                <Box ml={5} style={{ marginLeft: 'auto' }}>
                                  <Heading as="h3" fontSize="lg" color="#249EA0" textAlign="right">
                                    - {modalData.artist_name}
                                  </Heading>
                                </Box>
                              </ModalHeader>


                              <ModalBody>
                                <Box flex={1}>
                                  <Box display="flex" justifyContent="center" alignItems="center" height="200px" >
                                    <Image src={modalData.picture} alt={modalData.art_name} width="200px" height="200px" borderRadius="10px" />

                                  </Box>

                                  <Box flex={1} textAlign="center">
                                    <Heading fontWeight="bold" color="#040B61" fontSize="2xl" mt={2} mb={2}>
                                      ₹ {modalData.price}
                                    </Heading>
                                    <Text fontSize="xl" mb={2}>
                                      {modalData.art_description}
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
                          <Image src={item.picture} alt={item.art_name} width="200px" height="200px" borderRadius="10px" />
                        </Box>
                        <Box flex={1} textAlign="center">
                          <Heading fontWeight="bold" color="#040B61" fontSize="2xl" mt={2} mb={2}>
                            ₹ {item.price}
                          </Heading>
                        </Box>

                        <Box display="flex" justifyContent="space-between" alignItems="center" m={3}>
                          <Box display="flex" alignItems="center">
                            {!isFavorite ? (
                              <AiOutlineHeart onClick={() => handleFavoriteClick(userId, item.art_id)} size={24} />
                            ) : (
                              <AiFillHeart size={24} color="#F78104" />
                            )}

                            <Box mr={4} />

                            <GoCommentDiscussion onClick={() => openReviewModal(item.art_id)} size={24} />
                          </Box>

                          {!isAddedToCart ? (
                            <BsCart onClick={() => addToCart(item.art_id, item.art_name)} size={24} />
                          ) : (
                            <BsCartFill size={24} color="#249EA0" />
                          )}
                        </Box>
                      </Box>
                    </Flex>
                  </WrapItem>
                );
              })}

          <Modal isOpen={isReviewModalOpen} onClose={closeReviewModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader color="#040B61" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Heading as="h2" fontSize="5xl">
                  Review & Rate !
                </Heading>

              </ModalHeader>
              <ModalBody>
                {reviewContent.map((review) => (
                  <Box key={review.reviewId} p={4} borderWidth="1px" boxShadow="0 2px 10px rgba(4, 11, 97, 0.2)" borderRadius="md" mb={4}>
                    <Box display="flex" alignItems="center" >
                      <Text fontWeight="bold" fontSize="lg" mr={2}>
                        Rating:
                      </Text>
                      {starRating = Math.round(review.ratings)}
                      {Array.from({ length: starRating }, (_, index) => (
                        <AiFillStar key={index} color="#F78104" />
                      ))}
                      {Array.from({ length: 5 - starRating }, (_, index) => (
                        <AiOutlineStar key={index + starRating} />
                      ))}
                    </Box>
                    <Box display="flex" alignItems="center" >
                      <Text fontWeight="bold" fontSize="lg" mr={2}>
                        Review Comment:
                      </Text>
                      <Text>{review.reviewComment}</Text>
                    </Box>
                  </Box>
                ))}
              </ModalBody>
              <ModalFooter>
                <Box w="full">
                  <form onSubmit={handleSubmitReview}>
                    <FormControl isRequired>
                      <FormLabel>Rating</FormLabel>
                      <Input type="number" min={1} max={10} name="art_rating" placeholder="Rate 1 - 10" />
                    </FormControl>
                    <FormControl mt={4} isRequired>
                      <FormLabel>Review Comment</FormLabel>
                      <Textarea type="text" name="review_comment" placeholder="Your Review" />
                    </FormControl>
                    <Box mt={5} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'right' }}>
                      <Button bg="#F78104" type="submit">
                        Submit
                      </Button>
                      <Button colorScheme="red" onClick={closeReviewModal} ml={2}>
                        Cancel
                      </Button>
                    </Box>


                  </form>
                </Box>


              </ModalFooter>
            </ModalContent>
          </Modal>
        </Wrap>
      </Box>

    </>
  );
};


export default ShowcaseShowdown;