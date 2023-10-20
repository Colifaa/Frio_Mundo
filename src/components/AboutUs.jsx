import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  Button,
  Flex,
  Spacer,
} from '@chakra-ui/react';

const AboutUs = () => {
  return (
    <Box p={4}>
      <Container maxW="container.lg">
        <Heading as="h1" size="xl" mb={4}>
          Acerca de Nosotros
        </Heading>
        <Flex flexWrap="wrap">
          <Box w={{ base: '100%', md: '50%' }} mb={{ base: 4, md: 0 }}>
            <Image
              src="images/about.jpg" // Reemplaza con la ruta correcta de tu imagen
              alt="Acerca de nosotros"
              borderRadius="lg"
            />
          </Box>
          <Box w={{ base: '100%', md: '50%' }}>
            <Text fontSize="lg" mb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
              volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
            <Text fontSize="lg" mb={4}>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur.
            </Text>
            <Button colorScheme="teal">Leer Más</Button>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default AboutUs;
