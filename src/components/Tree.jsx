import { Box, Center, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useInView } from "react-intersection-observer";

const Tree = () => {
  const [ref1, inView1] = useInView();
  const [ref2, inView2] = useInView();
  const [ref3, inView3] = useInView();

  const itemVariants = {
    hidden: { opacity: 0, x: -30 }, // Ocultar con desplazamiento hacia la izquierda
    visible: { opacity: 1, x: 0 }, // Mostrar en su lugar
  };

  // Estados para el color de fondo
  const [grid1Background, setGrid1Background] = useState("initial");
  const [grid2Background, setGrid2Background] = useState("initial");
  const [grid3Background, setGrid3Background] = useState("initial");

  const handleMouseEnter = (gridNumber) => {
    if (gridNumber === 1) {
      setGrid1Background("#b9d4ff");
    } else if (gridNumber === 2) {
      setGrid2Background("#b9d4ff");
    } else if (gridNumber === 3) {
      setGrid3Background("#b9d4ff");
    }
  };

  const handleMouseLeave = (gridNumber) => {
    if (gridNumber === 1) {
      setGrid1Background("initial");
    } else if (gridNumber === 2) {
      setGrid2Background("initial");
    } else if (gridNumber === 3) {
      setGrid3Background("initial");
    }
  };

  return (
    <Center>
      <Box>
        <Box>
          <div style={{ position: "relative" }}>
            <Image src="nuevo.png" style={{ maxWidth: "100%", marginBottom: "30px" }} />
            <motion.div
              initial="hidden"
              animate={inView1 ? "visible" : "hidden"}
              variants={itemVariants}
              style={{
                position: "absolute",
                top: "20px",
                left: "20px",
                zIndex: 1,
                color: "white", // Personaliza el color del texto
              }}
            >
              <Text fontFamily="Poppins, sans serif" fontSize="2xl" textAlign="center">
                Texto encima de la imagen
              </Text>
            </motion.div>
            <motion.div
              initial="hidden"
              animate={inView2 ? "visible" : "hidden"}
              variants={itemVariants}
              style={{
                position: "absolute",
                top: "50%",
                left: "20px",
                zIndex: 1,
                color: "white", // Personaliza el color del texto
              }}
            >
              <Text fontFamily="Poppins, sans serif" fontSize="2xl" textAlign="center">
                Texto en el medio
              </Text>
            </motion.div>
            <motion.div
              initial="hidden"
              animate={inView3 ? "visible" : "hidden"}
              variants={itemVariants}
              style={{
                position: "absolute",
                bottom: "20px",
                left: "20px",
                zIndex: 1,
                color: "white", // Personaliza el color del texto
              }}
            >
              <Text fontFamily="Poppins, sans serif" fontSize="2xl" textAlign="center">
                Texto debajo de la imagen
              </Text>
            </motion.div>
          </div>
        </Box>
        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }}
          gap={4} // Aumenté el espacio entre las cajas para mejorar la responsividad
          alignItems="center"
          marginTop="100px"
          marginBottom="30px"
        >
          <motion.div
            ref={ref1}
            initial="hidden"
            animate={inView1 ? "visible" : "hidden"}
            variants={itemVariants}
            style={{ margin: "0 10px" }}
            onMouseEnter={() => handleMouseEnter(1)}
            onMouseLeave={() => handleMouseLeave(1)}
          >
            <GridItem>
              <Box
                border="1px solid #0059e2"
                borderRadius="20px"
                padding="8px"
                textAlign="center"
                width='300px'
                height="400px"
                style={{ position: "relative" }}
              >
                <motion.div
                  style={{
                    backgroundColor: grid1Background,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: "20px",
                    opacity: 0.5,
                  }}
                />
                <Image src="venta.png" maxW="100%" height="auto" />
                <Text fontFamily="Poppins, sans serif" fontSize={{ base: "sm", md: "md" }}>
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
            style={{ margin: "0 10px" }}
            onMouseEnter={() => handleMouseEnter(2)}
            onMouseLeave={() => handleMouseLeave(2)}
          >
            <GridItem>
              <Box
                border="1px solid #0059e2"
                borderRadius="20px"
                padding="8px"
                textAlign="center"
                maxWidth="100%" // Aumenté el ancho máximo para dispositivos pequeños
                height="auto"
                style={{ position: "relative", width: '300px', height: "400px" }}
              >
                <motion.div
                  style={{
                    backgroundColor: grid2Background,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: "20px",
                    opacity: 0.5,
                  }}
                />
                <Image src="fabricar.png" maxW="100%" height="auto" />
                <Text fontFamily="Poppins, sans serif" fontSize={{ base: "sm", md: "md" }}>
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
            style={{ margin: "0 10px" }}
            onMouseEnter={() => handleMouseEnter(3)}
            onMouseLeave={() => handleMouseLeave(3)}
          >
            <GridItem>
              <Box
                border="1px solid #0059e2"
                borderRadius="20px"
                padding="8px"
                textAlign="center"
                maxWidth="100%" // Aumenté el ancho máximo para dispositivos pequeños
                height="auto"
                style={{ position: "relative", width: '300px', height: "400px" }}
              >
                <motion.div
                  style={{
                    backgroundColor: grid3Background,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: "20px",
                    opacity: 0.5,
                  }}
                />
                <Image src="amedida.png" maxW="100%" height="auto" />
                <Text fontFamily="Poppins, sans serif" fontSize={{ base: "sm", md: "md" }}>
                  Realizamos Camaras Frigorificas a Medida
                </Text>
              </Box>
            </GridItem>
          </motion.div>
        </Grid>
        <Text fontFamily="Poppins, sans serif" fontSize="2xl" textAlign="center">Texto debajo de la imagen</Text>
      </Box>
    </Center>
  );
};

export default Tree;
