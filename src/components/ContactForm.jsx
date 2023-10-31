import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, Text } from '@chakra-ui/react';

const ContactForm = () => {
  const containerStyle = {
    backgroundImage: "url('footerice.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '16px',
  };

  const formContainerStyle = {
    border: '1px solid white',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '500px',
    width: '100%',
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

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFormSubmit = () => {
    const mensajeWhatsApp = `Nombre: ${formData.nombre}%0AEmail: ${formData.email}%0ATeléfono: ${formData.telefono}%0AMensaje: ${formData.mensaje}`;
    const numeroWhatsApp = '+5492995692142'; // Reemplaza con el número de WhatsApp al que deseas enviar el mensaje
    const whatsappURL = `https://wa.me/${numeroWhatsApp}?text=${mensajeWhatsApp}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <Box style={containerStyle}>
      <Box style={formContainerStyle}>
        <Text style={titleStyle}>Contacto</Text>
        <form>
          <FormControl isRequired>
            <FormLabel color="white">Nombre</FormLabel>
            <Input
              type="text"
              name="nombre"
              placeholder="Su nombre"
              style={inputStyle}
              value={formData.nombre}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl isRequired mt="4">
            <FormLabel color="white">Email</FormLabel>
            <Input
              type="email"
              name="email"
              placeholder="Su email"
              style={inputStyle}
              value={formData.email}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl isRequired mt="4">
            <FormLabel color="white">Número de teléfono</FormLabel>
            <Input
              type="tel"
              name="telefono"
              placeholder="Su número de teléfono"
              style={inputStyle}
              value={formData.telefono}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl isRequired mt="4">
            <FormLabel color="white">Mensaje</FormLabel>
            <Textarea
              name="mensaje"
              placeholder="Su mensaje"
              style={inputStyle}
              value={formData.mensaje}
              onChange={handleInputChange}
            />
          </FormControl>

          <Button type="button" mt="4" colorScheme="teal" onClick={handleFormSubmit}>
            Enviar
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default ContactForm;
