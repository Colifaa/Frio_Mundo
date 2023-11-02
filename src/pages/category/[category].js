import React, { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { Alert, AlertIcon, AlertTitle, AlertDescription, Box, Text, Heading, Image, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Flex } from '@chakra-ui/react';
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

  useEffect(() => {
    getProductos();
  }, [category]);

  const responsiveProductStyle = {
    maxWidth: '100%',
    width: ['100%', '100%', '50%', '30%'],
  };

  return (
    <div>
      <Components.Header />
      <Flex flexWrap="wrap" justifyContent="center" bgImage="https://media.istockphoto.com/id/1135953192/es/foto/bosque-en-una-cresta-de-monta%C3%B1a-cubierta-de-nieve-v%C3%ADa-l%C3%A1ctea-en-un-cielo-estrellado-noche-de.jpg?s=2048x2048&w=is&k=20&c=N5ts0vAVPWN3krWvLNWtdCg7hkxHvuqCJHJQSAN6jr4="> {/* Centra el contenido */}
        {products.map((product) => (
          <Box
            key={product.id}
            m={4}
            bgColor="white"
            color="#FFFFFF"
            p={4}
            display="flex"
            flexDirection={['column', ]}
            alignItems="center" // Centra verticalmente
          bgImage="https://media.istockphoto.com/id/861625352/es/foto/fondo-de-textura-de-nieve-brillante.jpg?s=2048x2048&w=is&k=20&c=G0O0iUuL6QkrhaM_7lTcNac943NhkuyVibE-fYSnhTs="
            {...responsiveProductStyle}
          >
            <Image
              src={product.image}
              alt={`Imagen de ${product.name}`}
              borderRadius="lg"
              border="4px solid #217dc1"
              boxSize="100%"
              width={['100%', '100%', '100%', '100%']}
              height={['auto', 'auto', '500px', '500px']}
            />
            <Box ml={['0', '0', '4', '4']} style={{ whiteSpace: 'pre-wrap' }}>
              <Text color="black" fontFamily='Poppins' fontSize={['md', 'md', '2xl', '3xl']}>{product.category}</Text>
              <Text color='black' fontWeight="bold" bgColor="#217dc1" fontSize={['xl', 'xl', '2xl', '2xl']}>Detalle del Producto:</Text>
              <Text color='black'>{product.detailmax}</Text>

              <Text color="black" bgColor="#217dc1" fontFamily='Poppins' fontSize={['sm', 'sm', 'md', 'md']} pt={['2', '2', '5', '5']}>
                <FaShieldAlt /> Garantía: 1 año
              </Text>
              <Text color="black" bgColor="#217dc1" fontFamily='Poppins' fontSize={['sm', 'sm', 'md', 'md']} pt={['2', '2', '5', '5']}>
                <FaTruck /> Envíos a todo el país
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
              <Text color="BLACK" fontSize={['md', 'lg', 'xl', '2xl']}>
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
