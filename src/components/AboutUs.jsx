import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  Button,
  Flex,
  Spacer,
} from '@chakra-ui/react';

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
            <Button colorScheme="teal">Leer Más</Button>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default AboutUs;
