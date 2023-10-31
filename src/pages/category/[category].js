import React, { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import {  Alert, AlertIcon, AlertTitle, AlertDescription, Box, Text, Heading, Image, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Grid, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import * as Components from "../../components";
import { FaShieldAlt, FaTruck } from 'react-icons/fa';

function Category() {
  const router = useRouter();
  const { category } = router.query;

  const [products, setProducts] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const getProductos = async () => {
    try {
      const { data, error } = await supabase
        .from('Products')
        .select('*')
        .eq('category', category);

      if (error) {
        console.error('Error al cargar los productos:', error);
      } else {
        setProducts(data);
      }
    } catch (error) {
      console.error('Error al cargar los productos:', error);
    }
  };

  const handleAddToCart = async (product) => {
    const existingCartItem = carrito.find((item) => item.id === product.id);

    if (existingCartItem) {
      const updatedCart = carrito.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCarrito(updatedCart);
    } else {
      const newCartItem = { ...product, quantity: 1 };
      setCarrito([...carrito, newCartItem]);
    }

    // Muestra la alerta de éxito
    setSuccessMessage(`'${product.category}' agregado al carrito`);
    setShowAlert(true);

    // También puedes configurar un temporizador para ocultar la alerta después de unos segundos
    setTimeout(() => {
      setShowAlert(false);
      setSuccessMessage("");
    }, 5000); // Ocultar la alerta después de 5 segundos
  };

  const handleZoomImage = (url) => {
    setZoomedImage(url);
  };

  useEffect(() => {
    getProductos();
  }, [category]);

  return (
    <div>
      <Components.Header />
      <Flex>
        <h1>Productos en la categoría <br></br>{category}</h1>
        {products.map((product) => (
          <Box 
            key={product.id}
            maxW="300%"
            m={4}
            bgColor="white"
            color="#FFFFFF"
            p={4}
            display="flex"
          >
            <div
              onMouseEnter={() => handleZoomImage(product.image)}
              onMouseLeave={() => handleZoomImage(null)}
              style={{ position: 'relative' }}
            >
              <Image
                marginLeft='200px'
                src={product.image}
                alt={`Imagen de ${product.name}`}
                borderRadius="lg"
                border="4px solid #217dc1"
                boxSize="100%"
                width='700px'
                height='600px'
              />
              {zoomedImage === product.image && (
                <Image
                  src={product.image}
                  alt={`Zoom de ${product.name}`}
                  style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '200px', // Ajusta el tamaño de zoom según tus necesidades
                    height: 'auto',
                    zIndex: 1,
                  }}
                />
              )}
            </div>
            <Box marginTop="4" marginLeft='200px'>
              <Text color="black" fontFamily='Poppins' fontSize='30px'>{product.category}</Text>
              <Text color='black' fontWeight="bold" bgColor="#217dc1" fontSize='20px'>Detalle del Producto:</Text>
              <Text color='black' >{product.detailmax}</Text>
              
              <Text color="black" bgColor="#217dc1" fontFamily='Poppins' fontSize='15px' paddingTop='5px'>
                <FaShieldAlt /> Garantía: 1 año
                </Text>
                <br></br>
                <Text color="black" bgColor="#217dc1" fontFamily='Poppins' fontSize='15px' paddingTop='5px'>
                  <FaTruck /> Envíos a todo el pais
                </Text>
              
              <Text
                fontSize={['xs', 'sm', 'md', 'lg', 'xl']}
                fontWeight="light"
                fontFamily="Georgia"
              >
                {product.wall_type}
              </Text>
              <Heading size="md" color="#A7414C">
                {product.name}
              </Heading>
              <Text color="BLACK" fontSize="xl">
                ${product.price}
              </Text>
              <Button
                colorScheme="green"
                bgColor="#217dc1"
                onClick={() => handleAddToCart(product)}
              >
                Agregar Pedido
              </Button>
            </Box>
          </Box>
        ))}
      </Flex>
      {showAlert && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
          }}
        >
         <Box borderRadius="2xl"  bgColor="blue.600" p={2} maxW="500px" w="90%">
            <Alert
               status="success"
               variant="subtle"
               flexDirection="column"
               alignItems="center"
               justifyContent="center"
               textAlign="center"
               height="auto"
            >
          <AlertIcon boxSize="80px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg" color="black"> 
        Éxito
      </AlertTitle>
      <AlertDescription maxWidth="sm" color="black"> {/* Cambia el color del texto a negro */}
        {successMessage}
      </AlertDescription>
    </Alert>
          </Box>
        </div>
      )}
      <Components.Cart
        items={carrito}
        onRemoveItem={(itemId) => {
          const updatedCart = carrito.filter((item) => item.id !== itemId);
          setCarrito(updatedCart);
        }}
        onCheckout={() => {
          console.log('Compra realizada');
        }}
      />
      <Flex justifyContent="center">
        <Button onClick={onOpen} mt={4} colorScheme="WHITE" bgColor="#217dc1">
          Realizar Compra
        </Button>
      </Flex>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader alignItems='center'>Realizar Compra</DrawerHeader>
            <DrawerBody>
              <Components.WhatsAppForm cartItems={carrito} />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
      <Components.Footer />
    </div>
  );
}

export default Category;
