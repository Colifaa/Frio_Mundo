import React, { useEffect, useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Select, // Agregar importación para Select
} from '@chakra-ui/react';
import { supabase } from "../../lib/supabaseClient";
import CardsAdmin from './CardsAdmin';

function AdminForm() {
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [nombreProducto, setNombreProducto] = useState('');
  const [precioProducto, setPrecioProducto] = useState('');
  const [pared, setPared] = useState('');
  const [imagenProducto, setImagenProducto] = useState("");
  const [Tamaño, setTamaño] = useState("");
  const [categoria, setCategoria] = useState(''); // Nuevo estado para la categoría

  const [productos, setProductos] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFormularioOpen, setIsFormularioOpen] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [editProductData, setEditProductData] = useState({
    id: '',
    nombreProducto: '',
    precioProducto: '',
    pared: '',
    imagenProducto: '',
  });

  const handleClose = () => {
    setEditMode(false);
    setShowForm(false);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imagenProducto) {
      console.log("Debe seleccionar una imagen");
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const imagenBase64 = event.target.result;

        const nuevoProducto = {
          name: nombreProducto,
          price: precioProducto,
          size: Tamaño,
          wall_type: pared,
          image: imagenBase64,
          category: categoria, // Asocia la categoría seleccionada
        };

        if (editMode) {
          const { data, error } = await supabase
            .from('Products')
            .update(nuevoProducto)
            .eq('id', editProductData.id);

          if (error) {
            console.error('Error al actualizar producto en Supabase:', error);
          } else {
            console.log('Producto actualizado en Supabase:', data);
            handleClose();
          }
        } else {
          const { data, error } = await supabase
            .from('Products')
            .insert([nuevoProducto]);

          if (error) {
            console.error('Error al insertar producto en Supabase:', error);
          } else {
            console.log('Producto insertado en Supabase:', data);
            setProductos([...productos, nuevoProducto]);
            setProductoSeleccionado(nuevoProducto);
            setIsFormularioOpen(true);
            handleClose();
          }
        }
      };
      reader.readAsDataURL(imagenProducto);
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }
  };

  // Resto del código sin cambios

  return (
    <Box p={4}>
      <Modal isOpen={showForm} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {editMode ? 'Editar Producto' : 'Agregar Producto'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <FormControl>
                <FormLabel>Nombre del Producto</FormLabel>
                <Input
                  type='text'
                  value={nombreProducto}
                  onChange={(e) => setNombreProducto(e.target.value)}
                />
                <FormHelperText>Indicar nombre del producto.</FormHelperText>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Precio del Producto</FormLabel>
                <Input
                  type='number'
                  value={precioProducto}
                  onChange={(e) => setPrecioProducto(e.target.value)}
                />
                <FormHelperText>Indicar precio del producto.</FormHelperText>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Tamaño</FormLabel>
                <Input
                  type='number'
                  value={Tamaño}
                  onChange={(e) => setTamaño(e.target.value)}
                />
                <FormHelperText>Indicar tamaño.</FormHelperText>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Tipo de pared</FormLabel>
                <Input
                  type='text'
                  value={pared}
                  onChange={(e) => setPared(e.target.value)}
                />
                <FormHelperText>Indicar Detalle del producto.</FormHelperText>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Categoría</FormLabel>
                <Select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                >
                  <option value="Camaras Frigorificas">Camaras Frigorificas</option>
                  <option value="Walking in Cooler">Walking in Cooler</option>
                  <option value="Conservadoras Termicas">Conservadoras Termicas</option>
                  <option value="Condensadores y Evaporadores">Condensadores y Evaporadores</option>
                  <option value="Paneles Frigorificos">Paneles Frigorificos</option>
                </Select>
                <FormHelperText>Selecciona la categoría del producto.</FormHelperText>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Imagen del Producto</FormLabel>
                <Input
                  type='file'
                  accept='image/*'
                  onChange={(e) => setImagenProducto(e.target.files[0])}
                />
                <FormHelperText>
                  Agregar una imagen representativa del producto.
                </FormHelperText>
              </FormControl>
              <Button type='submit' mt={4} colorScheme='teal' onClick={handleSubmit}>
                {editMode ? 'Guardar Cambios' : 'Agregar Producto'}
              </Button>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleClose} colorScheme='teal' mr={3}>
              Cerrar Formulario
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <CardsAdmin />
      <Box display="flex" justifyContent="center" mt={4}>
        <Button onClick={toggleForm} colorScheme='blue'>
          {showForm ? 'Cerrar Formulario' : 'Agregar Producto'}
        </Button>
      </Box>
    </Box>
  );
}

export default AdminForm;
