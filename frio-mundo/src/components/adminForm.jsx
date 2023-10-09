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
} from '@chakra-ui/react';
import { supabase } from "../../lib/supabaseClient";
import CardsAdmin from './CardsAdmin';

function ProductForm() {
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false); // Nuevo estado para el modo de edición
  const [nombreProducto, setNombreProducto] = useState('');
  const [precioProducto, setPrecioProducto] = useState('');
  //const [ingredientes, setIngredientes] = useState('');
  const [pared, setPared] = useState('');
  const [imagenProducto, setImagenProducto] = useState("");
  const [Tamaño, setTamaño] = useState("");


  const [productos, setProductos] = useState([]); // Lista de productos

  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar si el usuario ha iniciado sesión


  const [isFormularioOpen, setIsFormularioOpen] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);


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
        };

        if (editMode) {
          // Si estamos en modo de edición, actualiza el producto existente
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
          // Si no estamos en modo de edición, inserta un nuevo producto
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

  const handleDeleteProduct = async (index) => {
    try {
      const productIdToDelete = productos[index].id; // Supongamos que el producto tiene un campo 'id'

      const { data, error } = await supabase
        .from('Products')
        .delete()
        .eq('id', productIdToDelete);

      if (error) {
        console.error('Error al eliminar producto de Supabase:', error);
      } else {
        console.log('Producto eliminado de Supabase:', data);
        // Actualiza la lista de productos eliminando el producto correspondiente
        const updatedProductos = productos.filter((_, i) => i !== index);
        setProductos(updatedProductos);
      }
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };


  const [editProductData, setEditProductData] = useState({
    id: '',
    nombreProducto: '',
    precioProducto: '',
    pared: '',
    imagenProducto: '',
  });




  const handleClose = () => {
    setEditMode(false); // Salir del modo de edición al cerrar el formulario
    setShowForm(false);
  };



  const toggleForm = () => {
    setShowForm(!showForm);
  };



  useEffect(() => {
    // Aquí realizas la llamada a Supabase para obtener los productos
    async function fetchProductos() {
      const { data, error } = await supabase.from('Products').select('*');
      if (error) {
        console.error('Error al obtener productos:', error);
      } else {
        setProductos(data);
      }
    }

    fetchProductos();
  }, []);


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
      {/* ... (código existente) */}
      <Box display="flex" justifyContent="center" mt={4}>
        <Button onClick={toggleForm} colorScheme='blue'>
          {showForm ? 'Cerrar Formulario' : 'Agregar Producto'}
        </Button>
      </Box>
    </Box>
  );
}

export default ProductForm;
