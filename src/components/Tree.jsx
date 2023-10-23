import { Box, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { useInView } from "react-intersection-observer";

const Tree = () => {
  const [ref1, inView1] = useInView();
  const [ref2, inView2] = useInView();
  const [ref3, inView3] = useInView();

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8}>
      <motion.div
        ref={ref1}
        initial="hidden"
        animate={inView1 ? "visible" : "hidden"}
        variants={itemVariants}
      >
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
      </motion.div>

      <motion.div
        ref={ref2}
        initial="hidden"
        animate={inView2 ? "visible" : "hidden"}
        variants={itemVariants}
      >
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
      </motion.div>

      <motion.div
        ref={ref3}
        initial="hidden"
        animate={inView3 ? "visible" : "hidden"}
        variants={itemVariants}
      >
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
      </motion.div>
    </Grid>
  );
};

export default Tree;
