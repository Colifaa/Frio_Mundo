import React from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, Text } from '@chakra-ui/react';

const ContactForm = () => {
  const containerStyle = {
    backgroundImage: "url('footerice.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh', // Establece la altura mínima de la pantalla completa
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '16px', // Agrega espacio interno para mejorar la apariencia en pantallas más pequeñas
  };

  const formContainerStyle = {
    border: '1px solid white',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '500px',
    width: '100%', // Asegura que el formulario ocupe todo el ancho de la pantalla
  };

  const titleStyle = {
    color: 'white',
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '20px',
  };

  const inputStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
  };

  return (
    <Box style={containerStyle}>
      <Box style={formContainerStyle}>
        <Text style={titleStyle}>Contacto</Text>
        <form>
          <FormControl isRequired>
            <FormLabel color="white">Nombre</FormLabel>
            <Input type="text" placeholder="Su nombre" style={inputStyle} />
          </FormControl>

          <FormControl isRequired mt="4">
            <FormLabel color="white">Email</FormLabel>
            <Input type="email" placeholder="Su email" style={inputStyle} />
          </FormControl>

          <FormControl isRequired mt="4">
            <FormLabel color="white">Número de teléfono</FormLabel>
            <Input type="tel" placeholder="Su número de teléfono" style={inputStyle} />
          </FormControl>

          <FormControl isRequired mt="4">
            <FormLabel color="white">Mensaje con alguna de las opciones de arriba</FormLabel>
            <Textarea placeholder="Su mensaje" style={inputStyle} />
          </FormControl>

          <Button type="submit" mt="4" colorScheme="teal">
            Enviar
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default ContactForm;