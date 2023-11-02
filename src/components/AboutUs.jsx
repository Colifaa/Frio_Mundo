import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  Button,
  useBreakpointValue,
  useMediaQuery
} from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const AboutUs = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const images = ['quienes1.jpeg', 'quienes2.jpeg', 'quienes3.jpeg'];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  
  const imageWidth = isLargerThan768 ? "600px" : "80%";
  const marginLeftValue = isLargerThan768 ? "250px" : "0";
  const marginRightValue = isLargerThan768 ? "200px" : "0";

  return (
    <Box p={4}>
      <Container maxW='max'>
        <Flex flexDirection={{ base: 'column', md: 'row' }}>
          <Box flex={{ base: 1, md: 2 }} marginLeft={marginLeftValue} marginTop='30px' marginBottom='30px'>
            <Heading as="h1" size="xl" mb={4} color="#217dc1">
              QUIENES SOMOS?
            </Heading>
            <Text fontFamily='Poppins, sans-serif' mb={4}>
              En FRIO MUNDO, nos enorgullece llevar más de [número de años de experiencia] años en la vanguardia de la industria de cámaras frigoríficas. Somos una empresa comprometida con la excelencia y la innovación, diseñando y fabricando soluciones de refrigeración de alta calidad que cumplen con las más exigentes normas y necesidades de nuestros clientes.
            </Text>
            <Text fontFamily='Poppins, sans-serif' mb={4}>
              En cada proyecto que emprendemos, nuestra prioridad es proporcionar soluciones de refrigeración confiables y eficientes que superen las expectativas.
            </Text>
            <Box mt={4}>
              <Text fontSize="lg" color="teal.500" fontFamily='Poppins, sans-serif'>Nuestras Redes Sociales:</Text>
              <Flex mt={2}>
                <a href="https://www.facebook.com/friomundo.ok" target="_blank" rel="noopener noreferrer">
                  <FaFacebook size={30} style={{ marginRight: '10px', color: 'teal' }} />
                </a>
                <a href="https://www.instagram.com/friomundo.ok" target="_blank" rel="noopener noreferrer">
                  <FaInstagram size={30} style={{ marginRight: '10px', color: 'teal' }} />
                </a>
                <Button
                  as="a"
                  href="https://api.whatsapp.com/send/?phone=%2B542995692142&text=Hola+tengo+la+siguiente+consulta:+&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  leftIcon={<FaWhatsapp />}
                  colorScheme="teal"
                  style={{ marginLeft: '10px' }}
                >
                  Contáctanos en WhatsApp
                </Button>
              </Flex>
            </Box>
          </Box>
          <Box flex={{ base: 1, md: 3 }} marginTop='30px' marginBottom='30px' marginRight={marginRightValue}>
            <Carousel
              autoPlay
              infiniteLoop
              showArrows
              showStatus={false}
              showThumbs={false}
              interval={5000}
              
            >
              {images.map((image, index) => (
                <div key={index}>
                  <img src={image} alt={`Slide ${index}`} style={{ width:imageWidth, height:'auto' }} />
                </div>
              ))}
            </Carousel>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default AboutUs;
