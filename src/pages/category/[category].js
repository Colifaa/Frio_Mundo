import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { Box, Text, Image, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Grid, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import * as Components from "../../components";
import Link from 'next/link';

function Category() {
  const router = useRouter();
  const { category } = router.query;

  const [products, setProducts] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [isOpen, setIsOpen] = useState(false); // Agrega la definición de isOpen aquí

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
  };

  useEffect(() => {
    getProductos();
  }, [category]);

  return (
    <div>
        <Components.Header/>
      <h1>Productos en la categoría {category}</h1>
      <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)' }} gap={4} justifyContent="center">
        {products.map(product => (
          <Box key={product.id} maxW="300px" m={4} bgColor="#000000" color="#FFFFFF" textAlign="center" p={4}>
            <Image src={product.image} alt={`Imagen de ${product.name}`} borderRadius="lg" border="4px solid #FF5733" boxSize="250px" mx="auto" />
            <Text fontSize={['xs', 'sm', 'md', 'lg', 'xl']} fontWeight="light" fontFamily="Georgia">
              {product.wall_type}
            </Text>
            <Text color="#FF5733" fontSize="xl">
              ${product.price}
            </Text>
            <Text>Categoría: {product.category}</Text>
            <Button colorScheme="green" bgColor="#FF5733" onClick={() => handleAddToCart(product)}>
              Agregar Pedido
            </Button>
          </Box>
        ))}
      </Grid>
      
      
      
      {/* Agrega el componente de carrito aquí */}
      <Components.Cart
      
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
      <Flex justifyContent="center">
        <Button onClick={onOpen} mt={4} colorScheme="blue" bgColor="#FF5733">
          Realizar Compra
        </Button>
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
  
      <Components.Footer />
    </div>
  );
}

export default Category;
