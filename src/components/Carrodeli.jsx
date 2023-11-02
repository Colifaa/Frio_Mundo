import React, { useEffect, useState } from 'react';
import { Box, Container, Flex, Image, Text, useBreakpointValue, useMediaQuery } from "@chakra-ui/react";

function Carrodeli() {
  const [showCarro, setShowCarro] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showImagenFinal, setShowImagenFinal] = useState(false);
  const [showNewImage, setShowNewImage] = useState(false);

  const [isLargerThan800, isSmallerThanMobile] = useMediaQuery(["(min-width: 800px)", "(max-width: 480px)"]); // Adjust the max-width as needed
  const fontSize = useBreakpointValue({ base: "20px", md: "40px" });
  const imagePosition = useBreakpointValue({ base: "translateX(50%)", md: "translateX(200px)" });
  const imageSizeCarro = useBreakpointValue({ base: "200px", md: "100%" });
  const imageSizeOthers = useBreakpointValue({ base: "75%", md: "100%" });
  const imagePositionMobile = useBreakpointValue({ base: '150px', md: '50px' });

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

  if (isSmallerThanMobile) {
    return null; // Si es una pantalla de celular, no renderizar el componente
  }

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
      <Container maxW={isLargerThan800 ? "container.lg" : "container.sm"}>
        <Flex
          flexWrap={{ base: 'wrap', md: 'nowrap' }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            flex="1"
            style={{
              transform: showCarro ? imagePosition : 'translateX(-100%)',
              transition: 'transform 2s ease',
            }}
          >
            <Image src="carro.png" alt="#" maxW={imageSizeCarro} height="auto" style={{ marginTop: imagePositionMobile }} />
          </Box>
          {showImagenFinal && (
            <Image
              src='argentina.png'
              alt="Imagen Final"
              maxW={imageSizeOthers}
              height="auto"
              style={{
                transform: imagePosition // Ajusta la propiedad transform para alejar la imagen
              }}
            />
          )}
          {showNewImage && (
            <Image
              src='delfrio.png'
              alt="Nueva Imagen"
              maxW={imageSizeOthers}
              height="auto"
              style={{
                position: 'absolute',
                top: imagePositionMobile,
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
              fontSize={fontSize}
              color="white"
              fontFamily='Poppins, sans-serif'
            >
              HACEMOS ENVIOS A TODO EL PAIS!
            </Text>
          )}
        </Flex>
      </Container>
    </Box>
  );
}

export default Carrodeli;
