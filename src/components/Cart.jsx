import { Box, Button, Text, Flex } from "@chakra-ui/react";

const Cart = ({ items, onRemoveItem, onCheckout }) => {
  return (
    <Box p={4} borderWidth="1px" borderRadius="md" bg="#000" color="#FFF">
      <Text fontSize="xxx-large" mb={4} textAlign="center" mt={20} fontStyle="oblique" fontWeight="extrabold" fontFamily="Georgia" color="teal.700">
        Carrito de Compras
      </Text>
      {items && items.length === 0 ? (
        <Text>Su carrito está vacío.</Text>
      ) : (
        items?.map((item) => (
          <Box key={item.id} p={4} borderWidth={1} borderRadius="lg" borderColor="#FF5733" bgColor="#000000" color="#FFFFFF" boxShadow="none">
            <Text fontSize="xl" color="#B76840" bgColor="rgba(0, 0, 0, 0.86)">
              {item.name}
            </Text>
            <Text fontSize="xl" color="#FF5733" bgColor="rgba(0, 0, 0, 0.86">
              Precio: ${item.price}
            </Text>
            <Text fontSize="xl" color="#F2C94C" bgColor="rgba(0, 0, 0, 0.86)">
              {item.quantity > 1 && (
                <span>Cantidad: x{item.quantity}</span>
              )}
            </Text>
            <Text fontSize="xx-large" color="#FF5733" fontWeight="bold" bgColor="rgba(0, 0, 0, 0.86)">
              Precio Total: ${item.price * item.quantity}
            </Text>
            <Button onClick={() => onRemoveItem(item.id)} mt={2} bgColor="#FF5733" color="#FFFFFF" colorScheme='red'>
              Eliminar
            </Button>
          </Box>
        ))
      )}
    
    </Box>
  );
};

export default Cart;
