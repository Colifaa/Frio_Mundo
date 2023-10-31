import React, { useState } from 'react';
import { Box, Text, SimpleGrid, VStack } from "@chakra-ui/react";


function Nosotros() {
  const [selectedImage, setSelectedImage] = useState(0); // Índice de la imagen seleccionada
  const [selectedCard, setSelectedCard] = useState(null);

  const images = [
    "quienes1.jpeg",
    "quienes2.jpeg",
    "quienes3.jpeg"
  ];

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };
 
    const cards = [
      {
        title: "MISIÓN",
        content:
          "Buscamos la perfección en la termorregulación y la gestión del proceso productivo relacionado con el enfriamiento. Contamos con la mejor tecnología y nos apasiona alcanzar la excelencia en todo lo que hacemos.",
        backgroundImage: 'url("mision.png")'
      },
      {
        title: "VISIÓN",
        content:
          "Somos el referente global en termorregulación y gestión del frío, destacando por nuestra innovación y ofreciendo los mejores productos. Nuestro crecimiento y diversificación a nivel mundial generan nuevos valores.",
        backgroundImage: 'url("ojo.png")'
      },
      {
        title: "VALORES",
        content:
          "Nuestros valores se fundamentan en la pasión por la mejora, la ética y la construcción de valor a largo plazo a través de la sostenibilidad, transparencia y valoración de las personas.",
        backgroundImage: 'url("manos.png")'
      }
    ];

  const handleCardHover = (index) => {
    setSelectedCard(index);
  };

  const handleCardLeave = () => {
    setSelectedCard(null);
  };

  return (
    <div className="container" style={{backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <div style={{fontFamily:'Montage-Demo',height:'300px', backgroundImage:`url('aboutbg2.png')`, fontSize:'40px', padding: '20px', textAlign: 'center', position: 'absolute', width: '100%', top: 0, left: 0, margin: 0 }}><h1 style={{marginTop:'100px', fontFamily:'Poppins', color:'white'}}>NUESTRA EMPRESA</h1></div>
      
      <div  style={{ marginLeft: '200px', borderRadius:'20px', marginTop:'310px'}} className="text-container"  >
        <Box mt={4}  >
          <Text fontSize="30px" fontWeight="bold" className="fade-in-text" textAlign='center' color='blue' fontFamily='Poppins'>Sobre Nosotros</Text>
          <Text fontSize="20px" fontWeight="bold" className="fade-in-text" textAlign='center'>Nuestra Historia</Text>
            <Text>
              Frio Mundo se crea en 1915 como un emprendimiento familiar, pero con el empuje y decisión de las grandes empresas.
            </Text>
            <Text>
              A partir de 1940 pone en práctica su expansión geográfica guiada por un plan estratégico de distribución, consistente en la multiplicación del número de sucursales, que hoy se emplazan en prácticamente toda la Argentina.
            </Text>
            <Text>
              Su firme visión de largo plazo, evidenciada por una constante inversión en tecnología e innovación y por el fortalecimiento de su relación con proveedores, clientes y empleados, ha convertido aquel pequeño emprendimiento inicial en una empresa líder a nivel nacional, con una consolidación regional y proyección mundial.
            </Text>
        </Box>
      </div>
      <div className="image-container" style={{ marginRight:'100px', border:"3px solid blue", borderRadius:'198px', marginTop:'310px',width:'800px', height:'504px', marginLeft:'350px'}}>
        <img style={{width:'800px', height:'500px', borderRadius:'198px' }}
          src={images[selectedImage]}
          alt={`Imagen ${selectedImage + 1}`}
          className="main-image"
          onClick={() => handleImageClick(selectedImage)}
        />
        <div className="small-images">
          {images.slice(0, 3).map((image, index) => (
            <img style={{borderRadius:'150px',border:"3px solid blue"}}
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
        <Text style={{fontSize:'30px', fontFamily: 'Poppins',border:"1px solid blue", backgroundColor: 'white', textAlign: 'center', position: 'absolute', width: '100%', marginTop:'140px' }}>Nuestra Filosofia</Text>
      </div>
      <div className="cards-container" style={{marginTop:'100px', marginRight:'500px',marginTop:'210px', marginBottom:'20px'}}>
      {cards.map((card, index) => (
  <div
    key={index}
    className={`card ${selectedCard === index ? "flipped" : ""}`}
    onMouseEnter={() => handleCardHover(index)}
    onMouseLeave={handleCardLeave}
  >
    <div className="card-inner">
      <div className="card-front" style={{ backgroundImage: card.backgroundImage }}>
        <Text fontSize="20px" fontWeight="bold" className="fade-in-text" textAlign='center' color='white'>
          {card.title}
        </Text>
      </div>
      <div className="card-back">
        <Text fontSize="xl" fontWeight="bold">{card.title}</Text>
        <Text>{card.content}</Text>
      </div>
    </div>
  </div>
))}
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
        .small-image:hover {
          transform: scale(1.1);
        }
        .cards-container {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }
      
        .card {
          width: 300px;
          height: 400px;
          perspective: 1000px;
          transition: transform 0.5s;
        }
      
        .card-inner {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.5s;
        }
      
        .card-front,
        .card-back {
          width: 100%;
          height: 100%;
          position: absolute;
          backface-visibility: hidden;
        }
      
        .card-front {
          background-color: blue;
          display: flex;
          justify-content: center;
          align-items: center;
          
        }
      
        .card-back {
          background-color: white;
          padding: 20px;
          transform: rotateY(180deg);
        }
      
        .card.flipped .card-inner {
          transform: rotateY(180deg);
        }
        
      `}
      </style>
    </div>
  );
  
}

export default Nosotros;
