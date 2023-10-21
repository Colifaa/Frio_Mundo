
import { Box, Flex, Icon, Link, Text, Input, Button } from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import ContactForm from "./ContactForm";

const Footer = () => {
  return (

    <Box       as="footer"
    backgroundColor="gray.800"
    color="white"
    py={5}
   
    bottom="0"
    left="0"
    right="0"
    
    >
   
      <Flex justify="space-between" align="center" flexWrap="wrap">
        <Box flex="1" mb={6}>
          <img src="circulo2.png" height="300px" width="300px" alt="#" className="logo1" />
          <Flex mt={4} justify="center">
            <Link href="https://www.facebook.com/friomundo.ok" mr={4}>
              <Icon as={FaFacebook} fontSize="20px" />
            </Link>
            <Link href="https://www.instagram.com/friomundo.ok/">
              <Icon as={FaInstagram} fontSize="20px" />
            </Link>
          </Flex>
        </Box>
        <Box flex="1" mb={6}>
          <Text fontSize="xl" mb={2}>
            Horarios de Atencion
          </Text>
          <Text>
            Lunes a Viernes
            09Hrs a 21Hrs
          </Text>
        </Box>
        <Box flex="1" mb={6}>
          <Text fontSize="xl" mb={2}>
            Contacto
          </Text>
          <Text>
          +54 260 xxxxxx example@gmail.com
          </Text>
        </Box>
        <Box flex="1" mb={6}>
          <form className="bottom_form">
            <Text fontSize="xl" mb={2}>
              Para mas info
            </Text>
            <Input
              className="enter"
              placeholder="Ingresa tu email"
              type="email"
              name="email"
              mb={2}
            />
            <Button colorScheme="teal">Subscribe</Button>
          </form>
        </Box>
      </Flex>
      <Box borderTop="1px solid white" mt={8} pt={4}>
        <Text fontSize="sm">
        © 2023 Todos los derechos reservados. Diseñado por 
          <Link href="https://www.instagram.com/web_desweby/" color="teal.500">
             DESWEBY
          </Link>
        </Text>
      </Box>
      
    </Box>
  );
};

export default Footer;