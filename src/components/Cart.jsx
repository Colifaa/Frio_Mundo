import { Box, Button, Text, Flex, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody } from "@chakra-ui/react";

const Cart = ({ items, onRemoveItem, onCheckout, isOpen, onClose }) => {
  return (
    <Drawer isOpen={isOpen} placement="right" size="xl" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent bg="rgba(173, 216, 230, 0.5)">
          <DrawerCloseButton />
          <DrawerHeader>
            <Text
              fontSize={{ base: "2xl", md: "3xl", xl: "4xl" }}
              mb={4}
              textAlign="center"
              mt={{ base: 4, md: 20 }}
              fontStyle="oblique"
              fontWeight="extrabold"
              fontFamily="Poppins"
              color="WHITE"
            >
              Carrito de Compras
            </Text>
          </DrawerHeader>
          <DrawerBody>
            {items && items.length === 0 ? (
              <Text color='white'>Su carrito está vacío.</Text>
            ) : (
              items?.map((item) => (
                <Flex
                  key={item.id}
                  flexDirection={{ base: "column", md: "row" }}
                  alignItems={{ base: "center", md: "flex-start" }}
                  p={4}
                  borderWidth={1}
                  borderRadius="lg"
                  borderColor="#217dc1"
                  bgColor="WHITE"
                  color="#FFFFFF"
                  boxShadow="none"
                  mb={4}
                >
                  <Box
                    flex="1"
                    mb={{ base: 4, md: 0 }}
                  >
                    <Text
                      fontSize={{ base: "xl", md: "2xl", xl: "3xl" }}
                      color="#B76840"
                      bgColor="rgba(0, 0, 0, 0.86)"
                    >
                      {item.name}
                    </Text>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: "100%", maxWidth: "200px" }}
                    />
                  </Box>
                  <Box flex="1">
                    <Text
                      fontSize={{ base: "xl", md: "2xl", xl: "3xl" }}
                      color="#217dc1"
                    >
                      {item.category}
                    </Text>
                    <Text
                      fontSize={{ base: "xl", md: "2xl", xl: "3xl" }}
                      color="#217dc1"
                    >
                      Precio: ${item.price}
                    </Text>
                    <Text
                      fontSize={{ base: "xl", md: "2xl", xl: "3xl" }}
                      color="red"
                    >
                      {item.quantity > 1 && <span>Cantidad: x{item.quantity}</span>}
                    </Text>
                    <Text
                      fontSize={{ base: "xl", md: "2xl", xl: "3xl" }}
                      color="#df0e00"
                      fontWeight="bold"
                    >
                      Precio Total: ${item.price * item.quantity}
                    </Text>
                    <Button
                      onClick={() => onRemoveItem(item.id)}
                      mt={2}
                      bgColor="#df0e00"
                      color="#FFFFFF"
                      colorScheme="red"
                    >
                      Eliminar
                    </Button>
                  </Box>
                </Flex>
              ))
            )}
          
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default Cart;
