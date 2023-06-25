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
            <Heading as="h2" size="lg" color="black" mb={4}>
            Painting and Drawing
            </Heading>
            <Slider {...settings}>
                <Box>
                    <Flex>

                    
                    <Image
                    width="200px"
                    height="200px"
                        src="https://c4.wallpaperflare.com/wallpaper/60/872/1010/photo-of-water-falls-wallpaper-preview.jpg"
                        alt="Dan Abramov"
                        mb={4}
                    />
                    <Text as="h3" size="lg" color="black">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                        facilisi. Morbi a massa sit amet sapien tempor semper eu et ipsum.
                        Mauris luctus, purus at finibus lacinia, turpis est tincidunt dui, ut
                        luctus dolor odio vitae turpis. Aenean congue aliquet nibh vel
                        fringilla. Suspendisse eget consectetur mauris. Integer auctor, mauris
                        at suscipit commodo, urna nisi congue elit, eu volutpat sapien quam
                        ac felis. Quisque nec nunc vestibulum, commodo lorem et, tincidunt
                        justo. Morbi sit amet quam eget erat dapibus rutrum. Fusce nec mauris
                        in lectus condimentum consequat id nec ex. Pellentesque blandit
                        condimentum justo, id viverra turpis lobortis sed. </Text></Flex>
                </Box>
                <Box>
                    <Heading as="h3" size="lg" color="black">
                        2
                    </Heading>
                </Box>
                <Box>
                    <Heading as="h3" size="lg" color="black">
                        3
                    </Heading>
                </Box>
                <Box>
                    <Heading as="h3" size="lg" color="black">
                        4
                    </Heading>
                </Box>
                <Box>
                    <Heading as="h3" size="lg" color="black">
                        5
                    </Heading>
                </Box>
                <Box>
                    <Heading as="h3" size="lg" color="black">
                        6
                    </Heading>
                </Box>
            </Slider>
        </Box>
    );
};

export default SimpleSlider;
