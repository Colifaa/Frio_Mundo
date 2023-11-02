import { Box, Flex, Text, Heading, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const Carousel = () => {
  const carouselItems = [
    {
      imageSrc: "primera1.png",
      title: "Camaras ",
      subtitle: "FRIGORIFICAS",
      info: "",
    },
    {
      imageSrc: "carousel4.png",
      title: "Walking In Cooler",
      subtitle: "IN COOLER",
      info: "",
    },
    {
      imageSrc: "carousel32.png",
      title: "Condensadores y",
      subtitle: "EVAPORADORES",
      info: "",
    },
    {
      imageSrc: "conserva.png",
      title: "Conservadora",
      subtitle: "TERMICA",
      info: "",
    },
    {
      imageSrc: "paneles.png",
      title: "Paneles",
      subtitle: "FRIGORIFICOS",
      info: "",
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

  const textFontSize = useBreakpointValue({ base: "2xl", md: "3xl" });
  const titleFontSize = useBreakpointValue({ base: "4xl", md: "6xl" });
  const infoFontSize = useBreakpointValue({ base: "xl", md: "2xl" });

  return (
    <Box
      bgImage="bg6.png"
      height={["500px", "821px"]}
      width="100%"
      backgroundSize="cover"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      fontFamily="Manrope, sans-serif"
      bgSize="cover"
      bgPos="left"
      bgRepeat="no-repeat"
    >
      <Flex
        flexDir={{ base: "column", md: "row" }}
        maxWidth="1200px"
        width="100%"
        padding={{ base: "0 20px", md: "0" }}
        alignItems="center"
      >
        <Box flex={{ base: 1, md: 1 }}>
          <Text fontFamily="Manrope sans-serif" fontSize={textFontSize} color="white">
            {carouselItems[activeIndex].title}
          </Text>
          <Heading fontFamily="Manrope sans-serif" color="white" fontSize={titleFontSize} mt={2}>
            {carouselItems[activeIndex].subtitle}
          </Heading>
          <Text color="white" fontSize={infoFontSize} mt={4}>
            {carouselItems[activeIndex].info}
          </Text>
        </Box>
        <Box flex={{ base: 1, md: 1 }}>
          <img
            src={carouselItems[activeIndex].imageSrc}
            alt="#"
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "100%",
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
