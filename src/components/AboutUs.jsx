import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  Button,
} from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

const AboutUs = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const images = ['quienes1.jpeg', 'quienes2.jpeg', 'quienes3.jpeg']; // Agrega tus imágenes aquí

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

  return (
    <Box p={4}>
      <Container maxW="container.lg">
        <Flex flexDirection={{ base: 'column', md: 'row' }}>
          <Box flex={1} mr={{ md: 4 }}>
          <Carousel
  autoPlay
  infiniteLoop
  showArrows
  showStatus={false}
  showThumbs={false}
  interval={5000}
  style={{ width: '1920px', height: '570px' }}
>
  {images.map((image, index) => (
    <div key={index}>
      <img src={image} alt={`Slide ${index}`} style={{ width: '100%', height: '100%' }} />
    </div>
  ))}
</Carousel>

          </Box>
          <Box flex={1}>
            <Heading as="h1" size="xl" mb={4}>
              QUIENES SOMOS?
            </Heading>
            <Text fontSize="lg" mb={4}>
              En [Nombre de tu Empresa], nos enorgullece llevar más de [número de años de experiencia] años en la vanguardia de la industria de cámaras frigoríficas. Somos una empresa comprometida con la excelencia y la innovación, diseñando y fabricando soluciones de refrigeración de alta calidad que cumplen con las más exigentes normas y necesidades de nuestros clientes.
            </Text>
            <Text fontSize="lg" mb={4}>
              En cada proyecto que emprendemos, nuestra prioridad es proporcionar soluciones de refrigeración confiables y eficientes que superen las expectativas. Nuestro equipo altamente capacitado y comprometido utiliza tecnología de punta y métodos avanzados de fabricación para garantizar la excelencia en cada detalle de nuestras cámaras frigoríficas.
            </Text>
            <Box mt={4}>
              <Text fontSize="lg" color="teal.500">Nuestras Redes Sociales:</Text>
              <Flex mt={2}>
                <a href="URL_DE_TU_PAGINA_DE_FACEBOOK" target="_blank" rel="noopener noreferrer">
                  <FaFacebook size={30} style={{ marginRight: '10px', color: 'teal' }} />
                </a>
                <a href="URL_DE_TU_PAGINA_DE_INSTAGRAM" target="_blank" rel="noopener noreferrer">
                  <FaInstagram size={30} style={{ marginRight: '10px', color: 'teal' }} />
                </a>
                <Button
                  as="a"
                  href="https://api.whatsapp.com/send?phone=TUNUMERODETELEFONO"
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
        </Flex>
      </Container>
    </Box>
  );
};

export default AboutUs ;
