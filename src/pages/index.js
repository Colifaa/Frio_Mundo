import * as Components from "../components";
import { Box, Container, Heading, Text, Button, Image, Flex, Input } from "@chakra-ui/react";

const Home = () => {
  return (
    <>
  <Components.Header/>
<Components.Carousel/>
   
    <Components.AboutUs/>
     

{/* Delivery */}
<Box
      bgImage="url('PUBLI.png')"
      backgroundSize="cover"
      backgroundPosition="center"
      minHeight="500px"
      width="100%" // Ancho del 100% para que se adapte al ancho de la pantalla
    >
      <Container maxW="container.lg">
        <Flex flexWrap={{ base: 'wrap', md: 'nowrap' }} justifyContent="space-between" alignItems="center">
          <Box flex="1">
          </Box>

        </Flex>
      </Container>
    </Box>

      {/* Products */}
      <Box className="products" py={12} bgImage="bg6.png" bgSize="cover"  bgRepeat="no-repeat">
      <Components.Cards/>
      </Box>

      <Components.Tree/>

      {/* Contact */}
      <Box className="contact" py={12}>
          <Components.ContactForm/>

      </Box>

 <Components.Footer/>
    </>
  );
};

export default Home;
