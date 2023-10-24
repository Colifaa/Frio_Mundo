import React, { useEffect, useState } from 'react';
import { Box, Container, Flex, Image, Text } from "@chakra-ui/react";

function Carrodeli() {
  const [showCarro, setShowCarro] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showImagenFinal, setShowImagenFinal] = useState(false);
  const [showNewImage, setShowNewImage] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const middlePosition = window.innerWidth / 2;
    const messagePosition = middlePosition + 150;
    const carroFinalPosition = middlePosition + 200;

    if (scrollPosition >= messagePosition) {
      setShowMessage(true);
    } else {
      setShowMessage(false);
    }

    if (scrollPosition >= carroFinalPosition && !showCarro) {
      setShowCarro(true);
    }

    if (scrollPosition >= carroFinalPosition && !showImagenFinal) {
      setShowImagenFinal(true);
    }

    if (scrollPosition >= carroFinalPosition && !showNewImage) {
      setShowNewImage(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box
      bgImage="url('PUBLI2.png')"
      backgroundSize="cover"
      backgroundPosition="center"
      minHeight="500px"
      width="100%"
      position="relative"
      overflow="hidden"
    >
      <Container maxW="container.lg">
        <Flex
          flexWrap={{ base: 'wrap', md: 'nowrap' }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            flex="1"
            style={{
              transform: showCarro ? 'translateX(200px)' : 'translateX(-100%)',
              transition: 'transform 2s ease',
            }}
          >
            <Image src="carro.png" alt="#" maxW="100%" height="auto" />
          </Box>
          {showImagenFinal && (
            <Image
              src='argentina.png'
              alt="Imagen Final"
              maxW="100%"
              height="auto"
              style={{
                transform: 'translateX(100px)' // Ajusta la propiedad transform para alejar la imagen
              }}
            />
          )}
          {showNewImage && (
            <Image
              src='delfrio.png'
              alt="Nueva Imagen"
              maxW="100%"
              height="auto"
              style={{
                position: 'absolute',
                top: '50px',
                left: '50px',
              }}
            />
          )}
          {showMessage && (
            <Text
              position="absolute"
              top="20%"
              left="50%"
              transform="translate(-50%, -50%)"
              fontSize="24px"
              color="white"
            >
              Hacemos envíos a todo el país
            </Text>
          )}
        </Flex>
      </Container>
    </Box>
  );
}

export default Carrodeli;
