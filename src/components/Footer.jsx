import { Box, Flex, Icon, Link, Text, Input, Button, Image} from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import ContactForm from "./ContactForm";

const Footer = () => {
  return (
    <Box
      as="footer"
      bgImage='/bgfooter.png'
      color="white"
      py={5}
      position="initial"
      bottom="0"
      left="0"
      right="0"
      display="flex"
      justifyContent="center"
      bgSize="cover"
      bgPos="center"
      bgRepeat="no-repeat"
    >
      <Flex
       maxW="1200px"
       mx="auto"
       justify="space-between"
       flexWrap="wrap"
       px={4}
      >
        <Box  flex={{ base: "1", md: "1" }}
          mb={6}
          textAlign="center">
          <Image src="/circulo2.png"  width="150px" // Ajusta el ancho de la imagen
  height="auto" // Mantiene la proporción de la imagen
  mx="auto" // Centra horizontalmente la imagen
  ml="auto" // Desplaza la imagen hacia la derecha/>                 
  


/>

      
            <Link href="https://www.facebook.com/friomundo.ok" mr={4}>
              <Icon as={FaFacebook} fontSize="20px" />
            </Link>
            <Link href="https://www.instagram.com/friomundo.ok/">
              <Icon as={FaInstagram} fontSize="20px" />
            </Link>
         
        </Box>
        <Box     flex={{ base: "1", md: "1" }}
          mb={6}
          textAlign="center">
          <Text fontSize="xl" mb={2}>
            Horarios de Atencion
          </Text>
          <Text>
            Lunes a Viernes
            09Hrs a 21Hrs
          </Text>
        </Box>
        <Box  flex={{ base: "1", md: "1" }}
          mb={6}
          textAlign="center" >
          <Text fontSize="xl" mb={2}>
            Contacto
          </Text>
          <Text>
          +5492995692142<br></br>
          +5492604000756<br></br>
          example@gmail.com
          </Text>
        </Box>
        <Box  flex={{ base: "1", md: "1" }}
          mb={6}
          textAlign="center">
          <form className="bottom_form">
            <Text fontSize="xl" mb={2}>
              Para más info
              Política de Privacidad, Política de Cookies, Aviso Legal
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
    </Box>
  );
};

export default Footer;
