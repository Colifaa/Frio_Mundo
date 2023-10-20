import { Box, Flex, Text, Heading, Button } from "@chakra-ui/react";
import { useState } from "react";

const Carousel = () => {
  const carouselItems = [
    {
      imageSrc: "primera1.png",
      title: "CAMARAS FRIGORIFICAS",
      subtitle: "Accesorios",
      info: "hola que tal soy el chico de las poesias",
    },
    {
      imageSrc: "carousel4.png",
      title: "Walking In Cooler",
      subtitle: "Accesorios",
      info: "tu fiel admirador",
    },
    // Agregar más objetos para representar más diapositivas aquí
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    );
  };

  const handleNextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    
    <Box bgImage="bg6.png" height="720px" width="1980x">
      <Flex>
        <Box flex="1">
          <Box className="text-bg">
            <Text fontSize="xl" color="teal.500">
              {carouselItems[activeIndex].title}
            </Text>
            <Heading fontSize="4xl">{carouselItems[activeIndex].subtitle}</Heading>
            <Text>{carouselItems[activeIndex].info}</Text>
            <Button colorScheme="teal" mt={4}>
              Ver más
            </Button>
            <Button colorScheme="teal" ml={2}>
              Contacto
            </Button>
          </Box>
        </Box>
        <Box flex="1" >
          <img src={carouselItems[activeIndex].imageSrc} alt="#" style={{ width: "50%", maxHeight: "250px", borderRadius: "50%" }} />
        </Box>
      </Flex>
      <Button onClick={handlePrevSlide}>Anterior</Button>
      <Button onClick={handleNextSlide}>Siguiente</Button>
    </Box>
  );
};

export default Carousel;

