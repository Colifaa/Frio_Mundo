import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  Button,
  Flex,
} from '@chakra-ui/react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <Box p={4}>
      <Container maxW="container.lg">
        <Heading as="h1" size="xl" mb={4}>
          QUIENES SOMOS?
        </Heading>
        <Flex flexWrap="wrap">
          <Box w={{ base: '100%', md: '50%' }} mb={{ base: 4, md: 0 }}>
            <Image
              src="quienes1.jpeg" // Reemplaza con la ruta correcta de tu imagen
              alt="Acerca de nosotros"
              borderRadius="lg"
            />
          </Box>
          <Box w={{ base: '100%', md: '50%' }}>
            <Text fontSize="lg" mb={4}>
              En [Nombre de tu Empresa], nos enorgullece llevar más de [número de años de experiencia] años en la vanguardia de la industria de cámaras frigoríficas. Somos una empresa comprometida con la excelencia y la innovación, diseñando y fabricando soluciones de refrigeración de alta calidad que cumplen con las más exigentes normas y necesidades de nuestros clientes.
            </Text>
            <Text fontSize="lg" mb={4}>
              En cada proyecto que emprendemos, nuestra prioridad es proporcionar soluciones de refrigeración confiables y eficientes que superen las expectativas. Nuestro equipo altamente capacitado y comprometido utiliza tecnología de punta y métodos avanzados de fabricación para garantizar la excelencia en cada detalle de nuestras cámaras frigoríficas.
            </Text>
            
          </Box>
        </Flex>
        {/* Agrega el título y los íconos de Facebook e Instagram con enlaces a tus páginas */}
        <Box mt={4}>
          <Text fontSize="lg">Nuestras Redes Sociales:</Text>
          <Flex mt={2}>
            <a href="URL_DE_TU_PAGINA_DE_FACEBOOK" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={30} style={{ marginRight: '10px' }} />
            </a>
            <a href="URL_DE_TU_PAGINA_DE_INSTAGRAM" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={30} />
            </a>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutUs;