import React, { useState } from 'react';
import { Box, Text, SimpleGrid, VStack } from "@chakra-ui/react";

function Nosotros() {
  const [selectedImage, setSelectedImage] = useState(0); // Índice de la imagen seleccionada

  const images = [
    "quienes1.jpeg",
    "quienes2.jpeg",
    "quienes3.jpeg"
  ];

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  return (
    <div className="container">
      <div className="image-container">
        <h1 style={{ backgroundColor: 'lightblue', padding: '20px', textAlign: 'center', position: 'absolute', width: '100%', top: 0, left: 0, margin: 0 }}>Nuestra Empresa FRIO MUNDO</h1>
        <img
          src={images[selectedImage]}
          alt={`Imagen ${selectedImage + 1}`}
          className="main-image"
          onClick={() => handleImageClick(selectedImage)}
        />
        <div className="small-images">
          {images.slice(0, 3).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Imagen ${index + 1}`}
              className="small-image"
              onClick={() => handleImageClick(index)}
            />
          ))}
        </div>
      </div>

      <div className="text-container">
        <Box mt={4}>
          <Text fontSize="xl" fontWeight="bold" className="fade-in-text">Sobre Nosotros</Text>
          <Text className="fade-in-text">
            En cada proyecto que emprendemos, nuestra prioridad es proporcionar soluciones de refrigeración confiables y eficientes que superen las expectativas. Nuestro equipo altamente capacitado y comprometido utiliza tecnología de punta y métodos avanzados de fabricación para garantizar la excelencia en cada detalle de nuestras cámaras frigoríficas.
          </Text>
        </Box>
      </div>

      <div className="values-container">
        <VStack align="stretch">
          <Box p={4} bg="blue.400" color="white" rounded="md" className="fade-in-box" border="1px solid blue" margin="10px">
            <Text fontSize="xl" fontWeight="bold">Misión</Text>
            <Text>
              Buscamos la perfección en la termorregulación y la gestión del proceso productivo relacionado con el enfriamiento. Contamos con la mejor tecnología y nos apasiona alcanzar la excelencia en todo lo que hacemos.
            </Text>
          </Box>
        </VStack>
        <VStack align="stretch">
          <Box p={4} bg="red.400" color="white" rounded="md" className="fade-in-box" border="1px solid red" margin="10px">
            <Text fontSize="xl" fontWeight="bold">Visión</Text>
            <Text>
              Somos el referente global en termorregulación y gestión del frío, destacando por nuestra innovación y ofreciendo los mejores productos. Nuestro crecimiento y diversificación a nivel mundial generan nuevos valores.
            </Text>
          </Box>
        </VStack>
        <VStack align="stretch">
          <Box p={4} bg="gray.400" color="white" rounded="md" className="fade-in-box" border="1px solid gray" margin="10px">
            <Text fontSize="xl" fontWeight="bold">Valores</Text>
            <Text>
              Nuestros valores se fundamentan en la pasión por la mejora, la ética y la construcción de valor a largo plazo a través de la sostenibilidad, transparencia y valoración de las personas.
            </Text>
          </Box>
        </VStack>
      </div>

      <style jsx>{`
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    position: relative;
  }

  .image-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .main-image {
    width: 100%;
    height: auto;
    cursor: pointer;
    transition: transform 0.5s;
  }

  .small-images {
    display: flex;
    justify-content: center;
  }

  .small-image {
    width: 200px;
    height: 100px;
    cursor: pointer;
    margin: 10px;
    transition: transform 0.5s;
  }

  .text-container {
    text-align: center;
    margin-top: 60px; /* Agrega margen superior para desplazarlo hacia abajo */
  }

  .fade-in-text {
    opacity: 0;
    animation: fadeIn 2s forwards;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  /* Cambia position: absolute a position: relative */
  h1 {
    background-color: 'lightblue';
    padding: '20px';
    text-align: 'center';
    position: relative;
    width: '100%';
    top: 0;
    left: 0;
    margin: 0;
  }

  .values-container {
    grid-column: span 2;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }

  .fade-in-box {
    opacity: 0;
    animation: fadeIn 2s forwards;
  }

  .scroll-link {
    text-align: center;
    margin-top: 20px;
  }
  .main-image {
    width: 100%; /* Ocupa el ancho completo */
    height: auto; /* Ajusta la altura automáticamente */
    cursor: pointer;
    transition: transform 0.5s;
  }
  
  .main-image:hover {
    transform: scale(1.05);
  }
  
  .small-image {
    width: 200px;
    height: 100px;
    cursor: pointer;
    margin: 10px;
    transition: transform 0.5s;
  }
  
  .small-image:hover {
    transform: scale(1.1);
  }
`}
</style>
    </div>
  );
}

export default Nosotros;
