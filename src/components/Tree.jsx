import { Box, Grid, GridItem, Image, Text } from "@chakra-ui/react";

const Tree = () => {
  return (
    <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8}>
      <GridItem>
        <Box
          border="1px solid #0059e2"
          borderRadius="20px"
          padding="16px"
          textAlign="center"
        >
          <Image src="venta.png" maxW="100%" height="auto" />
          <Text fontSize={{ base: "lg", md: "xl" }}>
            Venta de Camaras Frigorificas
          </Text>
        </Box>
      </GridItem>
      <GridItem>
        <Box
          border="1px solid #0059e2"
          borderRadius="20px"
          padding="16px"
          textAlign="center"
        >
          <Image src="fabricar.png" maxW="100%" height="auto" />
          <Text fontSize={{ base: "lg", md: "xl" }}>
            Fabricacion de Condensadores y Evaporadores
          </Text>
        </Box>
      </GridItem>
      <GridItem>
        <Box
          border="1px solid #0059e2"
          borderRadius="20px"
          padding="16px"
          textAlign="center"
        >
          <Image src="amedida.png" maxW="100%" height="auto" />
          <Text fontSize={{ base: "lg", md: "xl" }}>
            Realizamos Camaras Frigorificas a Medida
          </Text>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Tree;