import React from 'react';
import { Box, Image, Text, Container, SimpleGrid, Center, VStack } from "@chakra-ui/react";

function Nosotros() {
  return (

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
  )
}

export default Nosotros;