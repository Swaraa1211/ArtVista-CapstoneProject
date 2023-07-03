import React from "react";
import { Box, Heading, Text, Image, Flex } from "@chakra-ui/react";
import Slider from "react-slick";

const SimpleSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <Box>
            <Heading as="h1" size="2xl" color="#040B61" mb={4} textAlign="center">
                ƲISION & ƲALUES
            </Heading>
            <Slider {...settings}>
                <Box>
                    <Flex>
                        <Image
                            width="400px"
                            height="200px"
                            borderRadius='10px'
                            src="https://i.pinimg.com/564x/d1/8b/60/d18b60da1b4177151fb1c19cc6daced9.jpg"
                            alt="Dan Abramov"
                            mb={4}
                        />
                        <Box>
                            <Heading textAlign="center">Market Mingle</Heading>
                            <Text fontSize="2xl" textAlign="center" color="black" ml="20px">
                            The vibrant marketplace where sellers and buyers connect to trade their treasures. Whether you're looking to sell unique items or find the perfect addition to your collection, MarketMingle offers a dynamic platform for seamless transactions. Join our community of passionate individuals and experience the joy of connecting with fellow enthusiasts.
                            </Text>
                        </Box>
                    </Flex>
                </Box>
                <Box>
                <Flex>
                        <Image
                            width="400px"
                            height="200px"
                            borderRadius='10px'
                            src="https://images.unsplash.com/photo-1559813114-cda845612ae7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
                            alt="Dan Abramov"
                            mb={4}
                        />
                        <Box>
                            <Heading textAlign="center">Showcase Showdown</Heading>
                            <Text fontSize="2xl" textAlign="center" color="black" ml="20px">
                            Discover a captivating showcase of listings, each one a masterpiece waiting to be explored.  Browse through a diverse range of high-quality items, each with its own story and allure. Experience the thrill of uncovering hidden gems and finding that one-of-a-kind piece that speaks to your heart.
                            </Text>
                        </Box>
                    </Flex>
                </Box>
                <Box>
                <Flex>
                        <Image
                            width="400px"
                            height="200px"
                            borderRadius='10px'
                            src="https://images.unsplash.com/photo-1514195037031-83d60ed3b448?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80"
                            mb={4}
                        />
                        <Box>
                            <Heading textAlign="center">Bidding - User Demanding</Heading>
                            <Text fontSize="2xl" textAlign="center" color="black" ml="20px">
                            Engage in exciting bidding wars as users vie for their most coveted treasures. Experience the thrill of competition as you place bids and watch the prices rise. With each bid, you participate in a vibrant community where users demand and appreciate the value of unique and sought-after items.
                            </Text>
                        </Box>
                    </Flex>
                </Box>
                <Box>
                <Flex>
                        <Image
                            width="400px"
                            height="200px"
                            borderRadius='10px'
                            src="https://i.pinimg.com/564x/aa/71/29/aa71292dae0325604352aa189c6227ab.jpg"
                            alt="Dan Abramov"
                            mb={4}
                        />
                        <Box>
                            <Heading textAlign="center">Innovation Canvas</Heading>
                            <Text fontSize="2xl" textAlign="center" color="black" ml="20px">
                            Explore the captivating artist portfolios, where imagination takes form and colors come alive. Discover the remarkable talents of visionary artists who pour their heart and soul into every stroke. Elevate your own artistic journey by drawing inspiration from the artist portfolio. 
                            </Text>
                        </Box>
                    </Flex>
                </Box>
                <Box>
                <Flex>
                        <Image
                            width="400px"
                            height="200px"
                            borderRadius='10px'
                            src="https://i.ytimg.com/vi/ml6j3tBqeaw/maxresdefault.jpg"
                            alt="Dan Abramov"
                            mb={4}
                        />
                        <Box>
                            <Heading textAlign="center">Collect and Cherish</Heading>
                            <Text fontSize="2xl" textAlign="center" color="black" ml="20px">
                            More than just a button, it's an invitation to immerse yourself in a world of artistic brilliance, where each favorite artwork becomes a cherished gem in your personal treasure trove. With just a click, you can build a gallery of inspiration that speaks to your soul.
                            </Text>
                        </Box>
                    </Flex>
                </Box>
                <Box>
                <Flex>
                        <Image
                            width="400px"
                            height="200px"
                            borderRadius='10px'
                            src="https://cdn.dribbble.com/users/142973/screenshots/9875511/media/9fe204959d18d53462629c682ea89c14.png?compress=1&resize=400x300&vertical=center"
                            alt="Dan Abramov"
                            mb={4}
                        />
                        <Box>
                            <Heading textAlign="center">Voice Your Artistic Opinion</Heading>
                            <Text fontSize="2xl" textAlign="center" color="black" ml="20px">
                            Engage with the art community and express your thoughts on captivating artworks. Leave meaningful comments and provide valuable feedback to support and encourage artists on their creative journey. Through sharing your thoughts, you can inspire others to embark on their own artistic journeys.
                            </Text>
                        </Box>
                    </Flex>
                </Box>
            </Slider>
        </Box>
    );
};

export default SimpleSlider;
