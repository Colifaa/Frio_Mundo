import * as Components from "../components";
import { Box, Container, Heading, Text, Button, Image, Flex, Input } from "@chakra-ui/react";

const Home = () => {
  return (
    <>
  <Components.Header/>
<Components.Carousel/>
   
    <Components.AboutUs/>
     

      {/* Delivery */}
      <Box className="laptop" py={12}>
        <Container maxW="container.lg">
          <Flex>
            <Box flex="1">
              <Heading fontSize="3xl">Hacemos envíos a todo el país!</Heading>
              <Button colorScheme="teal" mt={4}>
                Shop Now
              </Button>
            </Box>
            <Box flex="1">
              <Image src="/images/envios.png" alt="#" />
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Products */}
      <Box className="products" py={12}>
      <Components.Cards/>
      </Box>

   

      {/* Contact */}
      <Box className="contact" py={12}>
          <Heading fontSize="3xl" mb={8}>Contacta ahora</Heading>
          <Components.ContactForm/>

      </Box>

 <Components.Footer/>
    </>
  );
};

export default Home;
