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
  Select,
} from '@chakra-ui/react';
import { supabase } from "../../lib/supabaseClient";
import CardsAdmin from './CardsAdmin';
import * as Components from "../components";

function AdminForm() {
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [nombreProducto, setNombreProducto] = useState('');
  const [precioProducto, setPrecioProducto] = useState('');
  const [pared, setPared] = useState('');
  const [imagenProducto, setImagenProducto] = useState("");
  const [Tamaño, setTamaño] = useState('');
  const [categoria, setCategoria] = useState(''); // Estado para el nombre de la categoría
  const [detalleProducto, setDetalleProducto] = useState('');
  const [productos, setProductos] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFormularioOpen, setIsFormularioOpen] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const [editProductData, setEditProductData] = useState({
    id: '',
    precioProducto: '',
    imagenProducto: '',
    detalleProducto: '',
  });


  const handleEdit = (product) => {
    setEditMode(true);
    setEditProductData(product);
    setShowForm(true);
  };

  
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
          price: precioProducto,
          image: imagenBase64,
          category: categoria, // Asocia la categoría ingresada
          Detail: detalleProducto,
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
            window.location.reload(); // Recargar la página
          }
        }
      };
      reader.readAsDataURL(imagenProducto);
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }
  }

  useEffect(() => {
    const checkLoginStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setIsLoggedIn(true); // El usuario ha iniciado sesión
      } else {
        setIsLoggedIn(false); // El usuario no ha iniciado sesión
      }
    };

    checkLoginStatus();
  }, []);



  return (
    <Box  bgRepeat="no-repeat" bgSize="cover" bgImage="https://images.unsplash.com/photo-1483664852095-d6cc6870702d?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" p={4}>
    
      {isLoggedIn && (
        <>
      

        
          <Modal isOpen={showForm} onClose={handleClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                {editMode ? 'Editar Producto' : 'Agregar Producto'}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <FormControl mt={4}>
                    <FormLabel>Nombre del Producto</FormLabel>
                    <Input
                      type='text'
                      value={categoria}
                      onChange={(e) => setCategoria(e.target.value)}
                    />
                    <FormHelperText>Ingresa el nombre del producto.</FormHelperText>
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
                    <FormLabel>Detalle del Producto</FormLabel>
                    <Input
                      type='text'
                      value={detalleProducto}
                      onChange={(e) => setDetalleProducto(e.target.value)}
                    />
                    <FormHelperText>Ingresa el detalle del producto.</FormHelperText>
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
          <Box display="flex" justifyContent="center" justifyItems="center" my={5}>
            <Button onClick={toggleForm} colorScheme='blue'>
              {showForm ? 'Cerrar Formulario' : 'Agregar Producto'}
            </Button>
       
          </Box>
          <Components.LogoutButton/>
          <CardsAdmin />
         
      
         
        </>
        
      )}
    
    </Box>
         
  );
      }  

export default AdminForm;
