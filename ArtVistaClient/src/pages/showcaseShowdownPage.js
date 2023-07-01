

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
  Textarea
} from "@chakra-ui/react";
import { deleteFavorites, getFavorites, postFavorites } from '../API/favorites';
import { getReview, getReviewById, postReview } from '../API/review';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../constant/atomRecoil';

const ShowcaseShowdown = () => {
  const { userId, username } = useRecoilValue(userAtom);
  const formRef = useRef(null);
  const [art, setArt] = useState([]);
  const [fav, setFav] = useState([]);
  const [isFavorite, setIsFavorite] = useState([]);
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
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await getFavorites();
        const favorites = response.data;
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





  return (
    <>
      <Navbar />
      <Heading>ShowcaseShowdown</Heading>

      <Wrap spacing={4} mt={4}>
        {art && art.map((item) => {
          const isFavorite = fav.some(favorite => favorite.artId === item.art_id);

          return (
            <WrapItem key={item.art_id}>
              <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
                <Image src={item.picture} alt={item.art_name} width="200px" height="200px" />
                <Box p={4}>
                  <Heading as="h2" size="md" mb={2}>
                    {item.art_name}
                  </Heading>
                  <Text fontSize="sm" mb={2}>
                    Artist: {item.artist_name}
                  </Text>
                  <Text fontSize="sm" mb={2}>
                    {item.art_description}
                  </Text>
                  <Text fontSize="sm">Price: {item.price}</Text>
                  {!isFavorite && (
                    <Button onClick={() => handleFavoriteClick(item.user_id, item.art_id)}>
                      Add to Favorites
                    </Button>
                  )}
                  <Button onClick={() => openReviewModal(item.art_id)} mt={4}>
                    Review
                  </Button>
                </Box>
              </Box>
            </WrapItem>
          );
        })}
        <Modal isOpen={isReviewModalOpen} onClose={closeReviewModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Review</ModalHeader>
            <ModalBody>
              {reviewContent.map((review) => (
                <Box key={review.reviewId} p={4} borderWidth="1px" borderRadius="md" mb={4}>
                  <Text mb={2}>Rating: {review.ratings}</Text>
                  <Text mb={2}>Review Comment: {review.reviewComment}</Text>
                </Box>
              ))}
            </ModalBody>
            <ModalFooter>
              <form onSubmit={handleSubmitReview}>
                <FormControl isRequired>
                  <FormLabel>Rating</FormLabel>
                  <Input type="number" min={1} max={10} name="art_rating" placeholder="Rate 1 - 10" />
                </FormControl>
                <FormControl mt={4} isRequired>
                  <FormLabel>Review Comment</FormLabel>
                  <Textarea type="text" name="review_comment" placeholder="Your Review" />
                </FormControl>
                <Button colorScheme="blue" type="submit">
                  Submit
                </Button>
              </form>
              <Button colorScheme="gray" onClick={closeReviewModal} ml={2}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Wrap>

    </>
  );
};


export default ShowcaseShowdown;