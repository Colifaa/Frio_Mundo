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
  const [showAlert2, setShowAlert2] = useState(false);
 

  const onOpen = () => {
    if (carrito.length === 0) {
      setShowAlert2(true); // Muestra la alerta si el carrito está vacío
  
      // Configura un temporizador para ocultar la alerta después de 5 segundos
      setTimeout(() => {
        setShowAlert2(false);
      }, 3000); // Ocultar la alerta después de 5 segundos (ajusta el tiempo según tus necesidades)
    } else {
      setIsOpen(true); // Abre el Drawer para realizar la compra
    }
  };
  
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
      <Flex flexWrap="wrap" justifyContent="center" bgRepeat="no-repeat" bgSize="cover" bgImage="https://cdn.pixabay.com/photo/2016/02/13/12/26/aurora-1197753_1280.jpg"> {/* Centra el contenido */}
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
                <FaShieldAlt /> Garantía: 6 meses a 12 meses
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
              <Box display="flex" justifyContent="center" alignItems="center" > 
              <Button
             mr="2"
                colorScheme="green"
                bgColor="#217dc1"
                onClick={() => handleAddToCart(product)}
              >
                Agregar Pedido
              </Button>
              <Button  onClick={onOpen}  colorScheme="WHITE" bgColor="#217dc1" >
          Realizar Compra
        </Button>
        </Box>
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
      
      <Flex justifyContent="center" bgSize="cover" bgImage="https://cdn.pixabay.com/photo/2016/02/13/12/26/aurora-1197753_1280.jpg">
        
      </Flex>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
        <DrawerOverlay>
        <DrawerContent bgSize="cover" bgRepeat="no-repeat" bgImage="https://media.istockphoto.com/id/866676980/es/foto/bosque-de-hielo.jpg?s=2048x2048&w=is&k=20&c=epQKjMcOpEU-RLCxeqyoGHyDGf0_Gk4mSvJ3ndLKVIw=">
        <DrawerCloseButton color="blue.300" bgColor="blue.200" />
            <DrawerHeader alignItems='center'>Realizar Compra</DrawerHeader>
            <DrawerBody>
              <Components.WhatsAppForm cartItems={carrito} />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
      {carrito.length === 0 && showAlert2 && (
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
      )}
      <Components.Footer />
    </div>
  );
}

export default Category;
