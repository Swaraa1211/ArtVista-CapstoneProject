import React from 'react';
import NavBar from '../components/NavBar';
import { Container, Heading, Text } from '@chakra-ui/react';


export default function HomePage(){
    return (
        <>
        <NavBar />
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