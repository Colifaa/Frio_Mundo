import * as Components from "../components";
import { Box, Container, Heading, Text, Button, Image, Flex, Input } from "@chakra-ui/react";

const Home = () => {
  return (
    <>
  <Components.Header/>
<Components.Carousel/>
   
    <Components.AboutUs/>
     

{/* Delivery */}

<Components.Carrodeli/>


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
