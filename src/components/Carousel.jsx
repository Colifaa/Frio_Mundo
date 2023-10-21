import { Box, Flex, Text, Heading, Button, IconButton } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"; // Importar iconos de flecha


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

  // Lógica para cambiar automáticamente las diapositivas
  useEffect(() => {
    const interval = setInterval(handleNextSlide, 5000); // Cambia la diapositiva cada 5 segundos

    return () => {
      clearInterval(interval);
    };
  }, [activeIndex]);


  return (
    <Box
      bgImage="bg6.png"
      height="773px" // Ajusta la altura de la imagen
      width="1900"
      backgroundSize="cover" // Ajusta el tamaño de la imagen de fondo
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative" // Añade esta línea para establecer la posición relativa
      
    >
      <Flex>
        <Box flex="1">
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
        <Box flex="1">
          <img
            src={carouselItems[activeIndex].imageSrc}
            alt="#"
            style={{
              width: "100%", // Ajusta el ancho de la imagen
              maxHeight: "400px", // Ajusta la altura máxima
              borderRadius: "5px",
            }}
          />
        </Box>
      </Flex>
      <IconButton
        icon={<ChevronLeftIcon />}
        position="absolute"
        left="5%"
        top="50%" // Cambia el valor top a 50%
        transform="translateY(-50%)" // Ajusta la posición vertical
        fontSize="32px"
        onClick={handlePrevSlide}
      />
      <IconButton
        icon={<ChevronRightIcon />}
        position="absolute"
        right="5%"
        top="50%" // Cambia el valor top a 50%
        transform="translateY(-50%)" // Ajusta la posición vertical
        fontSize="32px"
        onClick={handleNextSlide}
      />
    </Box>
  );
};

export default Carousel;