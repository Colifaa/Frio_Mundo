import * as Components from "../components";
import { Box, Container, Heading, Text, Button, Image, Flex, Input, Center } from "@chakra-ui/react";

const Home = () => {
  return (
    <>
  <Components.Header/>
<Components.Carousel/>
   
    <Components.AboutUs/>
     

{/* Delivery */}

<Components.Carrodeli/>


      {/* Products */}
      <Box className="products" py={12} bgSize="cover"  bgRepeat="no-repeat">
      <Text fontSize='40px' fontFamily='Poppins, sans-serif' textAlign="center" style={{ textDecoration: 'underline' }}>Productos</Text>
            <Components.Cards/>
      </Box>

      <Components.Tree/>

      {/* Contact */}
      <Box bgColor="#02031c" className="contact" py={12}>
          <Components.ContactForm/>

      </Box>

 <Components.Footer/>
    </>
  );
};

export default Home;
