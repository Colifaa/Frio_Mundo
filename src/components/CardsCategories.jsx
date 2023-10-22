import React, { useState, useEffect } from 'react';
import { Flex,Box, Grid, Card, CardBody, Image, Text, Heading, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody } from '@chakra-ui/react';
import { supabase } from '../../lib/supabaseClient';
import * as Components from "../components";


function CardsCategories() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]); // Estado para almacenar los productos en el carrito
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [showOrderForm, setShowOrderForm] = useState(false); // Estado para controlar si mostrar el formulario
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar si el Drawer está abierto
  const [total, setTotal] = useState(0);

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
  };
  useEffect(() => {
    getProductos();
  }, []);

  return (
    <Box>
      <h2>Categorías Disponibles</h2>
      <ul>
        <li key="all">
          <a href="#" onClick={() => filterProductsByCategory(null)}>
            Todos
          </a>
        </li>
        {categories.map(category => (
          <li key={category}>
            <a href="#" onClick={() => filterProductsByCategory(category)}>
              {category}
            </a>
          </li>
        ))}
      </ul>
     
      <Grid
        templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)' }}
        gap={4}
        justifyContent="center"
      >
        {productos
          .filter(producto => !selectedCategory || producto.category === selectedCategory)
          .map((producto, index) => (
            <Box key={index} display="flex" flexDirection="column" alignItems="center">
              <Card maxW="300px" mx="auto" bgColor="#000000" color="#FFFFFF" alignItems="center">
                <CardBody>
                  <Image
                    src={producto.image}
                    alt={`Imagen de ${producto.name}`}
                    borderRadius="lg"
                    border="4px"
                    borderColor="#FF5733"
                    boxSize="250px"
                  />
                  <Text fontSize={['xs', 'sm', 'md', 'lg', 'xl']} fontWeight="light" fontFamily="Georgia">
                    {producto.wall_type}
                  </Text>
                  <Heading size="md" color="#A7414C">
                    {producto.name}
                  </Heading>
                  <Text color="#FF5733" fontSize="xl">
                    ${producto.price}
                  </Text>
                </CardBody>
                <Button colorScheme="green" bgColor="#FF5733" onClick={() => handleAddToCart(producto)}>
                  Agregar Pedido
                </Button>
              </Card>
            </Box>
          ))}
      </Grid>
       {/* Agrega el componente de carrito aquí */}
       <Components.Cart items={carrito} onRemoveItem={(itemId) => {
        // Lógica para eliminar un elemento del carrito
        const updatedCart = carrito.filter((item) => item.id !== itemId);
        setCarrito(updatedCart);
      }} onCheckout={() => {
        // Lógica para procesar la compra
        console.log("Compra realizada");
      }} />
    <Flex justifyContent="center"> 
<Button onClick={onOpen} mt={4} colorScheme='blue' bgColor="#FF5733" >Realziar Compra</Button>
</Flex>
<Drawer isOpen={isOpen} placement="right" onClose={onClose}>
  <DrawerOverlay>
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader>Realizar Compra</DrawerHeader>
      <DrawerBody>
        <Components.WhatsAppForm cartItems={carrito} />
      </DrawerBody>
    </DrawerContent>
  </DrawerOverlay>
</Drawer>
</Box>
   
  );
}

export default CardsCategories;