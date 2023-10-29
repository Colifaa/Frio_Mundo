import { Box, Button, Text } from "@chakra-ui/react";

const Cart = ({ items, onRemoveItem, onCheckout }) => {
  return (
    <Box p={4} borderWidth="1px" borderRadius="md" bg="#217dc1" color="#FFF">
      <Text fontSize="xxx-large" mb={4} textAlign="center" mt={20} fontStyle="oblique" fontWeight="extrabold" fontFamily="Georgia" color="WHITE" >
        Carrito de Compras
      </Text>
      {items && items.length === 0 ? (
        <Text>Su carrito está vacío.</Text>
      ) : (
        items?.map((item) => (
          <Box key={item.id} p={4} borderWidth={1} borderRadius="lg" borderColor="#217dc1" bgColor="WHITE" color="#FFFFFF" boxShadow="none">
            <Text fontSize="xl" color="#B76840" bgColor="rgba(0, 0, 0, 0.86)">
              {item.name}
            </Text>
            <img
              src={item.image}
              alt={item.name}
              style={{ width: "150px", height: "150px" }} // Establece el ancho y alto fijo
            />
            <Text fontSize="xl" color="#217dc1" bgColor="rgba(0, 0, 0, 0.86">
              {item.category}
            </Text>
            <Text fontSize="xl" color="#217dc1" bgColor="rgba(0, 0, 0, 0.86">
              Precio: ${item.price}
            </Text>
            <Text fontSize="xl" color="red" bgColor="rgba(0, 0, 0, 0.86">
              {item.quantity > 1 && (
                <span>Cantidad: x{item.quantity}</span>
              )}
            </Text>
            <Text fontSize="xx-large" color="#df0e00" fontWeight="bold" bgColor="rgba(0, 0, 0, 0.86">
              Precio Total: ${item.price * item.quantity}
            </Text>
            <Button onClick={() => onRemoveItem(item.id)} mt={2} bgColor="#df0e00" color="#FFFFFF" colorScheme='red'>
              Eliminar
            </Button>
          </Box>
        ))
      )}
    </Box>
  );
};

export default Cart;
