import React from 'react';
import { Box, Text, SimpleGrid, VStack } from "@chakra-ui/react";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Importa los estilos CSS del carrusel

function Nosotros() {
  const imageStyles = {
    width: '780px',
    height: '450px',
  };

  return (
    <div>
      <Carousel showThumbs={false} showStatus={false}>
        <div>
          <img style={imageStyles} src="quienes1.jpeg" alt="Imagen 1" />
        </div>
        <div>
          <img style={imageStyles} src="quienes2.jpeg" alt="Imagen 2" />
        </div>
        <div>
          <img style={imageStyles} src="quienes3.jpeg" alt="Imagen 3" />
        </div>
      </Carousel>

      <Box mt={4}>
        <Text fontSize="xl" fontWeight="bold" textAlign="center">Sobre Nosotros</Text>
        <Text textAlign="center">
          Somos una empresa dedicada a la termorregulación y la gestión del proceso productivo relacionado con el enfriamiento. Contamos con la mejor tecnología y nos apasiona alcanzar la excelencia en todo lo que hacemos.
        </Text>
      </Box>

      <SimpleGrid columns={3} spacing={4} mt={8}>
        <VStack align="stretch">
          <Box
            p={4}
            bg="blue.400"
            color="white"
            rounded="md"
          >
            <Text fontSize="xl" fontWeight="bold">Misión</Text>
            <Text>
              Buscamos la perfección en la termorregulación y la gestión del proceso productivo relacionado con el enfriamiento. Contamos con la mejor tecnología y nos apasiona alcanzar la excelencia en todo lo que hacemos.
            </Text>
          </Box>
        </VStack>
        <VStack align="stretch">
          <Box
            p={4}
            bg="red.400"
            color="white"
            rounded="md"
          >
            <Text fontSize="xl" fontWeight="bold">Visión</Text>
            <Text>
              Somos el referente global en termorregulación y gestión del frío, destacando por nuestra innovación y ofreciendo los mejores productos. Nuestro crecimiento y diversificación a nivel mundial generan nuevos valores.
            </Text>
          </Box>
        </VStack>
        <VStack align="stretch">
          <Box
            p={4}
            bg="gray.400"
            color="white"
            rounded="md"
          >
            <Text fontSize="xl" fontWeight="bold">Valores</Text>
            <Text>
              Nuestros valores se fundamentan en la pasión por la mejora, la ética y la construcción de valor a largo plazo a través de la sostenibilidad, transparencia y valoración de las personas.
            </Text>
          </Box>
        </VStack>
      </SimpleGrid>
    </div>
  );
}

export default Nosotros;
