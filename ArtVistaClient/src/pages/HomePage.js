import React from 'react';
import { Container, Heading, Text } from '@chakra-ui/react';
import Navbar from '../components/navBar';


export default function HomePage(){
    return (
        <>
        <Navbar />
        
        <Container>
            <Heading>
                Welcome To Art Vista!!
            </Heading>
            <Text>
                Art Exhibition - The term "vista" typically refers to a view or prospect, often a wide and scenic one. It is derived from the Latin word "videre," meaning "to see." A vista can refer to a panoramic or expansive view of natural landscapes, cityscapes, or any visually captivating scene.
            </Text>
        </Container>
        </>
    )
}