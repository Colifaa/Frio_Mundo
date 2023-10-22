import { Box, Flex, Text, Heading, Button, IconButton } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

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
    {
      imageSrc: "conserva.png",
      title: "Nuevo Producto",
      subtitle: "Accesorios",
      info: "Descripción del nuevo producto",
    },
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

  useEffect(() => {
    const interval = setInterval(handleNextSlide, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [activeIndex]);

  return (
    <Box
      bgImage="bg6.png"
      height="844px"
      width="100%" // Cambia a 100% para ocupar todo el ancho disponible
      backgroundSize="cover"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
    >
      <Flex maxWidth="1200px" width="100%" padding="0 20px" alignItems="center">
        <Box flex="1">
          <Text fontSize="3xl" color="teal.500"> {/* Aumenta el tamaño del título */}
            {carouselItems[activeIndex].title}
          </Text>
          <Heading fontSize="6xl" mt={2}> {/* Aumenta el tamaño del subtítulo */}
            {carouselItems[activeIndex].subtitle}
          </Heading>
          <Text fontSize="2xl" mt={4}>{carouselItems[activeIndex].info}</Text> {/* Aumenta el tamaño del texto */}
          <Button colorScheme="teal" mt={4}>
            Ver más
          </Button>
          <Button colorScheme="teal" ml={2}>
            Contacto
          </Button>
        </Box>
        <Box flex="1">
          <img
            src={carouselItems[activeIndex].imageSrc}
            alt="#"
            style={{
              width: "100%",
              maxHeight: "600px", // Aumenta la altura máxima de la imagen
              borderRadius: "5px",
            }}
          />
        </Box>
      </Flex>
      <IconButton
        icon={<ChevronLeftIcon />}
        position="absolute"
        left="5%"
        top="50%"
        transform="translateY(-50%)"
        fontSize="32px"
        onClick={handlePrevSlide}
      />
      <IconButton
        icon={<ChevronRightIcon />}
        position="absolute"
        right="5%"
        top="50%"
        transform="translateY(-50%)"
        fontSize="32px"
        onClick={handleNextSlide}
      />
    </Box>
  );
};

export default Carousel;