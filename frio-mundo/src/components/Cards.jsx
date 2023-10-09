import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardBody, Image, Text, Heading, Button } from '@chakra-ui/react';
import { supabase } from '../../lib/supabaseClient';

function Cards() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]); // Nuevo estado para almacenar los productos en el carrito

  // Función para cargar los productos desde la base de datos
  const getProductos = async () => {
    try {
      // Realiza la consulta para obtener todos los productos
      const { data: productos, error } = await supabase
        .from('Products')
        .select('*');

      if (error) {
        console.error('Error al cargar los productos:', error);
      } else {
        setProductos(productos); // Actualiza el estado con los productos obtenidos
      }
    } catch (error) {
      console.error('Error al cargar los productos:', error);
    }
  };

  // Función para agregar un producto al carrito
  const handleAddToCart = (producto) => {
    setCarrito([...carrito, producto]);
  };

  useEffect(() => {
    getProductos();
  }, []);



  return (
    <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)' }} gap={4} justifyContent="center">
      {productos?.map((producto, index) => (
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
  );
}

export default Cards;
