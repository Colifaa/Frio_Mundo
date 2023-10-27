import React from 'react';
import { Button } from "@chakra-ui/react";
import { supabase } from "../../lib/supabaseClient"; // Importa tu instancia de Supabase.
import { useRouter } from 'next/router';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
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
    <Button colorScheme="red" onClick={handleLogout}>
      Cerrar Sesión
    </Button>
  );
};

export default LogoutButton;
