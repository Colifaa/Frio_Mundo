import React, { useState } from 'react';
import { Box, Text } from "@chakra-ui/react";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function Nosotros() {
  const [selectedImage, setSelectedImage] = useState(0);
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
      content: "Buscamos la perfección en la termorregulación y la gestión del proceso productivo relacionado con el enfriamiento. Contamos con la mejor tecnología y nos apasiona alcanzar la excelencia en todo lo que hacemos.",
      backgroundImage: 'url("mision.png")'
    },
    {
      title: "VISIÓN",
      content: "Somos el referente global en termorregulación y gestión del frío, destacando por nuestra innovación y ofreciendo los mejores productos. Nuestro crecimiento y diversificación a nivel mundial generan nuevos valores.",
      backgroundImage: 'url("ojo.png")'
    },
    {
      title: "VALORES",
      content: "Nuestros valores se fundamentan en la pasión por la mejora, la ética y la construcción de valor a largo plazo a través de la sostenibilidad, transparencia y valoración de las personas.",
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
    <div className="container">
      <div className="header">
        <h1>NUESTRA EMPRESA</h1>
      </div>
      <div className="content-container">
        <div className="text-container">
          <h2 style={{color:'#0551ab', fontFamily:'Poppins'}}>SOBRE NOSOTROS</h2>
          <p>En FRIO MUNDO, nos enorgullece ser líderes en la industria de cámaras frigoríficas, ofreciendo soluciones de almacenamiento en frío de primera calidad para una amplia gama de aplicaciones. Desde nuestra fundación, hemos estado comprometidos con la excelencia y la satisfacción del cliente, construyendo relaciones sólidas basadas en la confianza y la calidad.</p>
        </div>
        <div className="carousel-container carousel-container-mobile">
  <Carousel showArrows={true} showStatus={false} showThumbs={false} showIndicators={false}>
    {images.map((image, index) => (
      <div key={index}>
        <img src={image} alt={`Imagen ${index + 1}`} />
      </div>
    ))}
  </Carousel>
</div>
      </div>
      <div className="philosophy-container">
        <Text color='#0551ab' fontFamily='Poppins' fontSize='30px'>Nuestra Filosofia</Text>
      </div>
      <div className="values-container">
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
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
        }

        .header {
          background-image: url('aboutbg2.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          font-family: 'Poppins';
          height: 300px;
          text-align: center;
          position: relative;
          width: 100%;
          top: 0;
          left: 0;
          margin: 0;
        }

        .header h1 {
          font-family: 'Poppins';
          color: white;
          margin-top: 100px;
          font-size: 40px;
        }

        .content-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 20px;
          align-items: center;
        }

        .text-container {
          padding: 20px;
          text-align: center;
          max-width: 400px;
        }

        .text-container h2 {
          font-size: 34px;
        }

        .text-container p {
          font-size: 16px;
        }

        .carousel-container {
          max-width: 100%;
          width: 600px; /* Ajusta este valor según tu preferencia */
          border: 10px solid blue
        }

        .philosophy-container {
          text-align: center;
          margin-top: 20px;
          
        }

        .values-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 20px;
        }

        .card {
          width: 300px;
          height: 400px;
          perspective: 1000px;
          transition: transform 0.5s;
          margin: 10px;
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

        @media screen and (max-width: 768px) {
          .header h1 {
            font-size: 30px;
          }

          .main-image {
            max-width: 100%;
          }
        }

        @media screen and (max-width: 480px) {
          .header h1 {
            font-size: 24px;
          }

          .main-image {
            border-radius: 5px;
          }
        }
        @media screen and (max-width: 768px) {
          .carousel-container-mobile {
            width: 100%; /* Haz que el carrusel ocupe el 100% del ancho en dispositivos móviles */
            max-width: none; /* Elimina el ancho máximo anterior */
            border: 5px solid blue; /* Ajusta el borde según tus necesidades */
          }
        }
        
      `}</style>
    </div>
  );
}

export default Nosotros;
