import { supabase } from '../../lib/supabaseClient';
import * as Components from '../components';
import Link from 'next/link';
import { FaSnowflake } from 'react-icons/fa'; // Importa el ícono de hielo de FontAwesome
import React, { useState, useEffect } from 'react';
import { Alert, AlertIcon, AlertTitle, AlertDescription, Flex, Box, Grid, Card, CardBody, Image, Text, Heading, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, HStack } from '@chakra-ui/react';


function CardsCategories() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]); // Estado para almacenar los productos en el carrito
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [showOrderForm, setShowOrderForm] = useState(false); // Estado para controlar si mostrar el formulario
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar si el Drawer está abierto
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

  const onOpen = () => setIsOpen(true); // Función para abrir el Drawer
  const onClose = () => setIsOpen(false); // Función para cerrar el Drawer

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
  // Verifica si el producto ya está en el carrito
  const existingCartItem = carrito.find((item) => item.id === product.id);

  if (existingCartItem) {
    // Si el producto ya está en el carrito, actualiza la cantidad
    const updatedCart = carrito.map((item) =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCarrito(updatedCart);
  } else {
    // Si el producto no está en el carrito, agrégalo con cantidad 1
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
  }, 3000); // Ocultar la alerta después de 5 segundos
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
      setIsAlertVisible(false); // Ocultar el Alert si se abre el Drawer
    } else {
      setIsAlertVisible(true); // Mostrar el Alert si el carrito está vacío
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
      {/* Menú de categorías a la izquierda */}
      <Flex w="100%" bg="#217dc1" flexDirection="column" alignItems="center">
      <Flex
    bgImage="bgproduct.png"
    w="100%"
    h="300px"
    p="4"
    color="purple"
    alignItems="center"
    justifyContent="flex-end" // Alinea a la derecha en pantallas más pequeñas
  >
     <Flex
      as="ul"
      listStyleType="none"
      margin="0"
      padding="0"
      justifyContent="center"
      mt={{ base: "20px", md: "100px" }} // Ajusta el margen superior para pantallas pequeñas y medianas
      mr={{ base: "0", md: "300px" }} // Ajusta el margen derecho para pantallas medianas
      flexWrap="wrap"
    >
            {categories.map((category) => (
              <li
                key={category}
                style={{
                  marginRight: "20px",
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid blue",
                  borderRadius: "20px",
                  padding: "10px", // Añadir un relleno para un aspecto más atractivo
                  backgroundColor: "lightblue", // Cambiar el color de fondo si es necesario
                  boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)", // Agregar una sombra
                
                  
                }}
              >
                <Link href={`/category/${category}`} style={{ display: 'flex', alignItems: 'center' }}>
                  <Box
   
               borderWidth="1px"
               borderRadius="md"
               p="2"
               borderColor="black"
               bgColor="blue.300"
             >
             
                  
                    <FaSnowflake />
                  </Box>
                  <Box ml="2">{category}</Box>
                </Link>
              </li>
            ))}
          </Flex>
        </Flex>

        <HStack spacing={4} alignItems="center" justifyContent="center">
  <Button mt={4} onClick={handleOpenCart}>Abrir Carrito</Button>
  <Components.Cart
    isOpen={isCartOpen}
    onClose={handleCloseCart}
    items={carrito}
    onRemoveItem={(itemId) => {
      // Lógica para eliminar un elemento del carrito
      const updatedCart = carrito.filter((item) => item.id !== itemId);
      setCarrito(updatedCart);
    }}
    onCheckout={() => {
      // Lógica para procesar la compra
      console.log('Compra realizada');
    }}
  />
  <Button onClick={handleRealizarCompraClick} mt={4} colorScheme="blue" bgColor="#FF5733">
    Realizar Compra
  </Button>
</HStack>
        {/* Contenido principal en el centro */}
        <Box w="60%" p="4">
          <Grid
            templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
            gap={4}
            justifyContent="center"
          >
            {productos
              .filter(producto => !selectedCategory || producto.category === selectedCategory)
              .map((producto, index) => (
                <Box key={index} display="flex" flexDirection="column" alignItems="center">
                  <Card maxW="300px" mx="auto" bgColor="white" color="#FFFFFF" alignItems="center">
                    <CardBody>
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
                zIndex: 999, // Un valor alto para mantenerlo en la parte superior
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
          {/* Agrega el componente de carrito aquí */}
          {carrito.length > 0 ? (
            <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
              <DrawerOverlay>
                <DrawerContent bgSize="cover" bgRepeat="no-repeat"bgImage="https://imgs.search.brave.com/mz4KbHsFHfDjr9HQcWBUBnOl09PHtrh2T3w1bmIW7Mw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/aW5mb2JhZS5jb20v/bmV3LXJlc2l6ZXIv/RFJHajVjcXFZT1hu/YW4zUFNNVHlWODAx/M2I0PS9maWx0ZXJz/OmZvcm1hdCh3ZWJw/KTpxdWFsaXR5KDg1/KS9hcmMtYW5nbGVy/ZmlzaC1hcmMyLXBy/b2QtaW5mb2JhZS5z/My5hbWF6b25hd3Mu/Y29tL3B1YmxpYy9I/NzJIUlgzUzRORjZC/TDJPT0tNVDVVM0NP/TS5qcGc">
                  <DrawerCloseButton />
                  <DrawerHeader>Realizar Compra</DrawerHeader>
                  <DrawerBody>
                    <Components.WhatsAppForm cartItems={carrito} />
                  </DrawerBody>
                </DrawerContent>
              </DrawerOverlay>
            </Drawer>
          ) : (
            // Mostrar el Alert si el carrito está vacío
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
                  zIndex: 999, // Un valor alto para mantenerlo en la parte superior
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
        <Drawer  isOpen={isProductDrawerOpen} placement="right" onClose={closeProductDrawer} size="md" >
          <DrawerOverlay>
            <DrawerContent bgSize="cover" bgRepeat="no-repeat" bgImage="https://imgs.search.brave.com/mz4KbHsFHfDjr9HQcWBUBnOl09PHtrh2T3w1bmIW7Mw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/aW5mb2JhZS5jb20v/bmV3LXJlc2l6ZXIv/RFJHajVjcXFZT1hu/YW4zUFNNVHlWODAx/M2I0PS9maWx0ZXJz/OmZvcm1hdCh3ZWJw/KTpxdWFsaXR5KDg1/KS9hcmMtYW5nbGVy/ZmlzaC1hcmMyLXBy/b2QtaW5mb2JhZS5z/My5hbWF6b25hd3Mu/Y29tL3B1YmxpYy9I/NzJIUlgzUzRORjZC/TDJPT0tNVDVVM0NP/TS5qcGc">
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
                    <Text  mt="10" color="black" fontSize={['xs', 'sm', 'md', 'lg', 'xl']} fontWeight="light" fontFamily="Georgia">
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
    </Flex>
  );
                }  

export default CardsCategories ;
