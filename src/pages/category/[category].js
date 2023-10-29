import React, { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { Box, Text, Heading, Image, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Grid, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import * as Components from "../../components";
import Link from 'next/link';

function Category() {
  const router = useRouter();
  const { category } = router.query;

  const [products, setProducts] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null);

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
                src={product.image}
                alt={`Imagen de ${product.name}`}
                borderRadius="lg"
                border="4px solid #217dc1"
                boxSize="100%"
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
            <Box marginTop="4">
              <Text color="black">{product.category}</Text>
              <Text color='black' fontWeight="bold" bgColor="#217dc1">Detalle del Producto:</Text>
              <Text color='black' >{product.Detail}</Text>
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
