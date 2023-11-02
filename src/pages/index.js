import * as Components from "../components";
import { Box, Container, Heading, Text, Button, Image, Flex, Input, Center, useBreakpointValue } from "@chakra-ui/react";

const Home = () => {
  const textFontSize = useBreakpointValue({ base: '24px', md: '40px' });
  const titleFontSize = useBreakpointValue({ base: '2xl', md: '4xl' });

  return (
    <>
      <Components.Header />
      <Components.Carousel />
      <Components.AboutUs />

      {/* Delivery */}
      <Components.Carrodeli />

      {/* Products */}
      <Box className="products" py={12} bgSize="cover" bgRepeat="no-repeat">
        <Text fontSize={textFontSize} fontFamily='Poppins, sans-serif' textAlign="center" style={{ textDecoration: 'underline' }}>Productos</Text>
        <Components.Cards />
      </Box>

      <Components.Tree />

      {/* Contact */}
      <Box bgColor="#02031c" className="contact" py={12}>
        <Components.ContactForm />
      </Box>

      <Components.Footer />
    </>
  );
};

export default Home;
