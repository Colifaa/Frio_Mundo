import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardBody, Image, Text, Heading, Button } from '@chakra-ui/react';
import { supabase } from '../../lib/supabaseClient';

function CardsAdmin() {
    const [productos, setProductos] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null); // Producto en modo de edición
  
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
  
    // Función para guardar los cambios en el producto editado
    const handleEditProduct = async (editedProduct) => {
        try {
          // Realiza la actualización del producto en la base de datos
          const { data, error } = await supabase
            .from('Products')
            .update({
              name: editedProduct.name,
              price: editedProduct.price,
              size: editedProduct.size,
              wall_type: editedProduct.wall_type,
              image: editedProduct.image,
            })
            .eq('id', editedProduct.id);
      
          if (error) {
            console.error('Error al actualizar el producto:', error);
          } else {
            // Actualiza el estado de productos después de la edición
            const updatedProductos = productos.map((producto) =>
              producto.id === editedProduct.id ? editedProduct : producto
            );
            setProductos(updatedProductos);
            setEditingProduct(null); // Sale del modo de edición
          }
        } catch (error) {
          console.error('Error al actualizar el producto:', error);
        }
      };
  

  // Función para borrar un producto
  const handleDeleteProduct = async (productId) => {
    try {
      // Realiza la eliminación del producto en la base de datos
      const { error } = await supabase
        .from('Products')
        .delete()
        .eq('id', productId);

      if (error) {
        console.error('Error al borrar el producto:', error);
      } else {
        // Actualiza la lista de productos eliminando el producto correspondiente
        const updatedProductos = productos.filter((producto) => producto.id !== productId);
        setProductos(updatedProductos);
      }
    } catch (error) {
      console.error('Error al borrar el producto:', error);
    }
  };

  useEffect(() => {
    getProductos();
  }, []);

  return (
    <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)' }} gap={4} justifyContent="center">
      {productos?.map((producto) => (
        <Box key={producto.id} display="flex" flexDirection="column" alignItems="center">
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
                {producto.size}
              </Text>
              <Text color="#FF5733" fontSize="xl">
                {producto.category}
              </Text>

              <Text color="#FF5733" fontSize="xl">
                ${producto.price}
              </Text>
            </CardBody>
            <Button colorScheme="green" bgColor="#FF5733" onClick={() => handleDeleteProduct(producto.id)}>
              Borrar
            </Button>
          </Card>
          
        </Box>
      ))}
    </Grid>
  );
}

export default CardsAdmin;