import React, { useState } from 'react';
import { Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Image, Text } from '@chakra-ui/react';

function Detail() {
  // Define el estado para selectedProduct y su función para actualizarlo
  const [selectedProduct, setSelectedProduct] = useState(null);
  

  return (
    <Drawer isOpen={!!selectedProduct} placement="right" onClose={() => setSelectedProduct(null)}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Detalles del Producto</DrawerHeader>
          <DrawerBody>
            {selectedProduct && (
              <div>
                <Image
                  src={selectedProduct.image}
                  alt={`Imagen de ${selectedProduct.name}`}
                />
                <Text>{selectedProduct.description}</Text>
              </div>
            )}
            
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}

export default Detail;