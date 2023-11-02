import React, { useState } from 'react';
import { Box, Button, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from "@chakra-ui/react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from 'next/router';

const LogoutButton = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const handleLogout = async () => {
    onClose(); // Cierra el diálogo de confirmación antes de ejecutar el cierre de sesión

    try {
      let { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error al cerrar sesión:', error);
      } else {
        console.log('Sesión cerrada exitosamente');
        router.push('/'); // Asegúrate de que esta redirección se ejecute
      }
    } catch (error) {
      console.error('Error inesperado:', error);
    }
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Button colorScheme="red" onClick={onOpen}>
        Cerrar Sesión
      </Button>

      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Confirmar</AlertDialogHeader>
            <AlertDialogBody>
              ¿Estás seguro de que deseas cerrar la sesión?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={handleLogout} >Sí</Button>
              <Button colorScheme="red" onClick={onClose}  ml={3}>
              No
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default LogoutButton;
