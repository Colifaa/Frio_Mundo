
import { supabase } from '../../lib/supabaseClient';
import * as Components from '../components';
import Link from 'next/link';
import { FaSnowflake } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Alert, AlertIcon, AlertTitle, AlertDescription, Flex, Box, Grid, Card, CardBody, Image, Text, Heading, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, HStack } from '@chakra-ui/react';

function CardsCategories() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductDrawerOpen, setIsProductDrawerOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const handleOpenCart = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const getProductos = async () => {
    try {
      const { data: productos, error } = await supabase
        .from('Products')
        .select('*');

      if (error) {
        console.error('Error al cargar los productos:', error);
      } else {
        setProductos(productos);

        const uniqueCategories = [...new Set(productos.map(producto => producto.category))];
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error('Error al cargar los productos:', error);
    }
  };

  const filterProductsByCategory = (category) => {
    setSelectedCategory(category);
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

    setSuccessMessage(`'${product.category}' agregado al carrito`);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
      setSuccessMessage("");
    }, 3000);
  };

  useEffect(() => {
    getProductos();
  }, []);

  const openProductDrawer = (product) => {
    setSelectedProduct(product);
    setIsProductDrawerOpen(true);
  };

  const closeProductDrawer = () => {
    setSelectedProduct(null);
    setIsProductDrawerOpen(false);
  };

  const handleRealizarCompraClick = () => {
    if (carrito.length > 0) {
      setIsOpen(true);
      setIsAlertVisible(false);
    } else {
      setIsAlertVisible(true);
      setTimeout(() => {
        setIsAlertVisible(false);
      }, 3000);
    }
  };



  return (

    <Flex
      w="100%"
      bg="#217dc1"
      flexDirection="column"
      alignItems="center"
    >
          <Flex
      flexDirection="column"
      alignItems="center"
      // Ruta de tu imagen de fondo
      bgSize="cover" // Ajusta el tamaño de la imagen de fondo
    >
      <Box
        w="100%"
        h="10%" // Altura del área de encabezado en porcentaje
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontFamily="Poppins" // Estilo de fuente
        fontSize={["2xl", "3xl", "4xl"]} // Tamaños de fuente responsivos
        color="white" // Color del texto
      >
        PRODUCTOS
      </Box>
      <Flex
        w="100%"
       
        flexDirection={{ base: 'column', md: 'row' }}
        alignItems="center"
      >
        {categories.map((category) => (
          <li
            key={category}
            style={{
              marginRight: "20px",
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              border: "1px solid blue",
              borderRadius: "20px",
              padding: "10px",
              backgroundColor: "lightblue",
              boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Link href={`/category/${category}`} style={{ display: 'flex', alignItems: 'center' }}>
              <Box borderWidth="1px" borderRadius="md" p="2" borderColor="black" bgColor="blue.300">
                <FaSnowflake />
              </Box>
              <Box ml="2">{category}</Box>
            </Link>
          </li>
        ))}
        </Flex>
      </Flex>
      
      
      <HStack spacing={4} alignItems="center" justifyContent="center">
      <Button mt={4} onClick={handleOpenCart} leftIcon={<FaShoppingCart />}>
  Abrir Carrito
</Button>
        <Components.Cart
          isOpen={isCartOpen}
          onClose={handleCloseCart}
          items={carrito}
          onRemoveItem={(itemId) => {
            const updatedCart = carrito.filter((item) => item.id !== itemId);
            setCarrito(updatedCart);
          }}
          onCheckout={() => {
            console.log('Compra realizada');
          }}
        />
<Button onClick={handleRealizarCompraClick} mt={4} colorScheme="blue" bgColor="#FF5733">
  Comprar Ahora
</Button>
      </HStack>

      {/* Contenido principal en el centro */}
      <Box w="100%">
        <Grid
          templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
          gap={4}
          justifyContent="center"
        >
          {productos
            .filter(producto => !selectedCategory || producto.category === selectedCategory)
            .map((producto, index) => (
              <Box key={index} display="flex" flexDirection="column" alignItems="center">
                <Card mx="auto" bgColor="white" color="#FFFFFF" alignItems="center">
                  <CardBody boxSize="280px">
                    <Image
                      src={producto.image}
                      alt={`Imagen de ${producto.category}`}
                      borderRadius="lg"
                      border="4px"
                      borderColor="#217dc1"
                      boxSize="250px"
                    />
                    <Heading size="md" color="#A7414C">
                      {producto.category}
                    </Heading>
                    <Text color="#217dc1" fontSize="xl">
                      ${producto.price}
                    </Text>
                  </CardBody>
                  <Button
                    colorScheme="green"
                    bgColor="black"
                    onClick={() => handleAddToCart(producto)}
                  >
                    Agregar Pedido
                  </Button>
                  <Button
                    colorScheme="blue"
                    bgColor="#FF5733"
                    mt="3"
                    onClick={() => openProductDrawer(producto)}
                  >
                    Ver Detalles
                  </Button>
                </Card>
              </Box>
            ))}
        </Grid>
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
            <Box borderRadius="2xl" bgColor="blue.600" p={2} maxW="500px" w="90%">
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
                <AlertDescription maxWidth="sm" color="black">
                  {successMessage}
                </AlertDescription>
              </Alert>
            </Box>
          </div>
        )}
        {carrito.length > 0 ? (
          <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
            <DrawerOverlay>
              <DrawerContent bgSize="cover" bgRepeat="no-repeat" bgImage="https://media.istockphoto.com/id/866676980/es/foto/bosque-de-hielo.jpg?s=2048x2048&w=is&k=20&c=epQKjMcOpEU-RLCxeqyoGHyDGf0_Gk4mSvJ3ndLKVIw=">
                <DrawerCloseButton />
                <DrawerHeader>Realizar Compra</DrawerHeader>
                <DrawerBody>
                  <Components.WhatsAppForm cartItems={carrito} />
                </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
        ) : (
          isAlertVisible && (
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
              <Box borderRadius="2xl" bgColor="blue.600" p={2} maxW="500px" w="90%">
                <Alert
                  status="warning"
                  variant="subtle"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  textAlign="center"
                  height="auto"
                >
                  <AlertIcon boxSize="80px" mr={0} />
                  <AlertTitle>No hay productos en el carrito</AlertTitle>
                  <AlertDescription maxWidth="sm" color="black">
                    Debes agregar productos al carrito para realizar el pedido.
                  </AlertDescription>
                </Alert>
              </Box>
            </div>
          )
        )}
      </Box>
      <Drawer isOpen={isProductDrawerOpen} placement="right" onClose={closeProductDrawer} size="md">
        <DrawerOverlay>
          <DrawerContent bgSize="cover" bgRepeat="no-repeat" bgImage="https://media.istockphoto.com/id/1135953192/es/foto/bosque-en-una-cresta-de-monta%C3%B1a-cubierta-de-nieve-v%C3%ADa-l%C3%A1ctea-en-un-cielo-estrellado-noche-de.jpg?s=2048x2048&w=is&k=20&c=N5ts0vAVPWN3krWvLNWtdCg7hkxHvuqCJHJQSAN6jr4=">
            <DrawerCloseButton />
            <DrawerHeader>Detalles del Producto</DrawerHeader>
            <DrawerBody>
              {selectedProduct && (
                <Flex flexDirection="column" align="center">
                  <Image
                    src={selectedProduct.image}
                    alt={`Imagen de ${selectedProduct.category}`}
                    borderRadius="lg"
                    border="4px"
                    borderColor="#217dc1"
                    boxSize="250px"
                  />
                  <Text mt="10" color="black" fontSize={['xs', 'sm', 'md', 'lg', 'xl']} fontWeight="light" fontFamily="Georgia">
                    {selectedProduct.Detail}
                  </Text>
                  <Heading mt="10" size="md" color="#A7414C">
                    {selectedProduct.category}
                  </Heading>
                  <Text color="#217dc1" fontSize="xl">
                    ${selectedProduct.price}
                  </Text>
                </Flex>
              )}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Flex>
  );
}

export default CardsCategories;
