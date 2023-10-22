import React from 'react';
import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, DrawerCloseButton } from '@chakra-ui/react';

const DrawerFormWsp = ({ isOpen, onClose, cartItems }) => {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Realizar Compra</DrawerHeader>
          <DrawerBody>
         
       
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default DrawerFormWsp;
