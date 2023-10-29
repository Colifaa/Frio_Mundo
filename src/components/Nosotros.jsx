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
    <div className="container" style={{backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <h1 style={{fontSize:'40px', fontFamily: 'Bebas Neue, sans serif', border:"1px solid blue",backgroundColor: 'white', padding: '20px', textAlign: 'center', position: 'absolute', width: '100%', top: 0, left: 0, margin: 0 }}>Nuestra Empresa FRIO MUNDO</h1>

      <div  style={{backgroundImage: `url('271.jpg')`, marginLeft: '100px', marginRight:'20px', border:"1px solid blue", borderRadius:'20px', marginTop:'100px'}} className="text-container"  >
        <Box mt={4}  >
          <Text fontSize="xl" fontWeight="bold" className="fade-in-text" textAlign='center'>Sobre Nosotros</Text>
          <Text className="fade-in-text" fontFamily='Bebas Neue'>
            En cada proyecto que emprendemos, nuestra prioridad es proporcionar soluciones de refrigeración confiables y eficientes que superen las expectativas. Nuestro equipo altamente capacitado y comprometido utiliza tecnología de punta y métodos avanzados de fabricación para garantizar la excelencia en cada detalle de nuestras cámaras frigoríficas.
          </Text>
        </Box>
      </div>
      <div className="image-container" style={{marginRight:'100px', border:"1px solid blue", borderRadius:'20px', marginTop:'100px'}}>
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
      <div>
        <Text style={{fontSize:'30px', fontFamily: 'Bebas Neue, sans serif',border:"1px solid blue", backgroundColor: 'white', textAlign: 'center', position: 'absolute', width: '100%' }}>Nuestros Valores</Text>
      </div>
      <div className="values-container">
        <VStack align="stretch">
          <Box p={4} bg="blue.400" color="white" rounded="md" className="fade-in-box" border="1px solid blue" margin="10px" marginRight='30px' marginLeft='300px' borderRadius="20px" marginTop='50px'>
            <Text fontSize="xl" fontWeight="bold">Misión</Text>
            <Text>
              Buscamos la perfección en la termorregulación y la gestión del proceso productivo relacionado con el enfriamiento. Contamos con la mejor tecnología y nos apasiona alcanzar la excelencia en todo lo que hacemos.
            </Text>
          </Box>
        </VStack>
        <VStack align="stretch">
          <Box p={4} bg="blue.400" color="white" rounded="md" className="fade-in-box" border="1px solid blue" margin="10px" marginLeft='180px' marginRight='180px' borderRadius="20px" marginTop='50px'>
            <Text fontSize="xl" fontWeight="bold">Visión</Text>
            <Text>
              Somos el referente global en termorregulación y gestión del frío, destacando por nuestra innovación y ofreciendo los mejores productos. Nuestro crecimiento y diversificación a nivel mundial generan nuevos valores.
            </Text>
          </Box>
        </VStack>
        <VStack align="stretch">
          <Box p={4} bg="blue.400" color="white" rounded="md" className="fade-in-box" border="1px solid blue" margin="10px" marginLeft='30px' marginRight='300px' borderRadius="20px" marginTop='50px'>
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
          grid-template-rows: auto; /* Ajusta el tamaño de fila automáticamente según el contenido */
          position: relative;
          min-height: 100vh; /* Asegura que el contenido ocupe al menos el alto de la ventana */
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
