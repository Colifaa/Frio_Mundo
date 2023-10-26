
import React, { useState, useEffect } from 'react';


import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    Input,
    Image,
    Text
  } from '@chakra-ui/react'



function DetailDrawer({ producto }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()


  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Ver detalles
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Detalles del Producto</DrawerHeader>
          <DrawerBody>
            <Image src={producto.image} alt={`Imagen de ${producto.name}`} />
            <Text fontWeight="bold">{producto.name}</Text>
            <Text>{producto.Detail}</Text> {/* Asegúrate de que el objeto producto tenga un campo "detail" */}
            <Text>Precio: ${producto.price}</Text>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cerrar
            </Button>
            {/* Agrega aquí cualquier acción adicional, como agregar al carrito, si es necesario */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default DetailDrawer;