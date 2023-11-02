import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Grid,
  Card,
  CardBody,
  Image,
  Text,
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { supabase } from '../../lib/supabaseClient';

function CardsAdmin() {
  const [productos, setProductos] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null); // Producto en modo de edición
  const [isEditingModalOpen, setEditingModalOpen] = useState(false); // Estado del modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Modal de eliminación
  const [productToDelete, setProductToDelete] = useState(null); // Producto a eliminar
  const cancelRef = useRef();

  // Función para cargar los productos desde la base de datos
  const getProductos = async () => {
    try {
      // Realiza la consulta para obtener todos los productos
      const { data: productos, error } = await supabase.from('Products').select('*');

      if (error) {
        console.error('Error al cargar los productos:', error);
      } else {
        setProductos(productos); // Actualiza el estado con los productos obtenidos
      }
    } catch (error) {
      console.error('Error al cargar los productos:', error);
    }
  };

  // Función para guardar los cambios en el producto editado
  const handleEditProduct = async (editedProduct) => {
    try {
      // Realiza la actualización del producto en la base de datos
      const { data, error } = await supabase
        .from('Products')
        .update({
          name: editedProduct.name,
          price: editedProduct.price,
          Detail: editedProduct.Detail,
          image: editedProduct.image, // El producto editado contiene la imagen en formato Base64
        })
        .eq('id', editedProduct.id);
  
      if (error) {
        console.error('Error al actualizar el producto:', error);
      } else {
        // Actualiza el estado de productos después de la edición
        const updatedProductos = productos.map((producto) =>
          producto.id === editedProduct.id ? editedProduct : producto
        );
        setProductos(updatedProductos);
        setEditingModalOpen(false); // Cierra el modal
      }
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  };

  // Función para abrir el modal de edición
  const openEditModal = (product) => {
    setEditingProduct(product);
    setEditingModalOpen(true);
  };

  // Función para eliminar un producto de la base de datos
  const handleDeleteProduct = async (product) => {
    setProductToDelete(product); // Guarda el producto a eliminar en el estado
    setIsDeleteModalOpen(true); // Abre el modal de confirmación
  };

  const onCloseDeleteModal = () => {
    setIsDeleteModalOpen(false); // Cierra el modal de confirmación
  };

  // Función para confirmar y realizar la eliminación del producto
  const handleConfirmDelete = async (product) => {
    // Realiza la eliminación del producto de la base de datos
    try {
      const { data, error } = await supabase.from('Products').delete().eq('id', product.id);

      if (error) {
        console.error('Error al eliminar el producto:', error);
      } else {
        // Actualiza el estado de productos después de la eliminación
        const updatedProductos = productos.filter((producto) => producto.id !== product.id);
        setProductos(updatedProductos);
        onCloseDeleteModal(); // Cierra el modal de confirmación
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  useEffect(() => {
    getProductos();
  }, []);

  return (
    <Grid
      templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
      gap={4}
      justifyContent="center"
    >
      {productos?.map((producto) => (
        <Box key={producto.id} display="flex" flexDirection="column" alignItems="center">
          <Card maxW="300px" mx="auto" bgColor="#000000" color="#FFFFFF" alignItems="center">
            <CardBody>
              <Image
                src={producto.image}
                alt={`Imagen de ${producto.name}`}
                borderRadius="lg"
                border="4px"
                borderColor="#FF5733"
                boxSize="250px"
              />
              <Text color="#FF5733" fontSize="xl">
                {producto.category}
              </Text>
              <Text color="#FF5733" fontSize="xl">
                ${producto.price}
              </Text>
              <Text color="#FF5733" fontSize="xl">
                {producto.Detail}
              </Text>
              <Box  display="flex" justifyContent="center" justifyItems="center" mt="2"> 
              <Button colorScheme="green" bgColor="#FF5733" onClick={() => openEditModal(producto)}>
                Editar
              </Button>
              </Box>
              <Box  display="flex" justifyContent="center" justifyItems="center" marginTop="2"> 
              <Button colorScheme="red" bgColor="#FF5733" onClick={() => handleDeleteProduct(producto)}>
                Eliminar
              </Button>
              </Box>
          
            </CardBody>
          </Card>
        </Box>
      ))}
      <Modal isOpen={isEditingModalOpen} onClose={() => setEditingModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Producto</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Formulario de edición en el modal */}
            <label htmlFor="name">Nombre:</label>
            <Input
              id="name"
              placeholder="Nombre"
              value={editingProduct?.name || ''}
              onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
            />
            <label htmlFor="price">Precio:</label>
            <Input
              id="price"
              placeholder="Precio"
              type="number"
              value={editingProduct?.price || ''}
              onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
            />
            <label htmlFor="Detail">Detalle:</label>
            <Input
              id="Detail"
              placeholder="Detalle"
              value={editingProduct?.Detail || ''}
              onChange={(e) => setEditingProduct({ ...editingProduct, Detail: e.target.value })}
            />
            <label htmlFor="image">Imagen:</label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files[0];
                if (file) {
                  // Lee el archivo de imagen como una cadena Base64
                  const reader = new FileReader();
                  reader.onload = async (event) => {
                    const imagenBase64 = event.target.result;
                    // Almacena la representación Base64 de la imagen en el estado del producto editado
                    setEditingProduct({ ...editingProduct, image: imagenBase64 });
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" bgColor="#FF5733" onClick={() => handleEditProduct(editingProduct)}>
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Modal de confirmación antes de eliminar */}
      <AlertDialog
        isOpen={isDeleteModalOpen}
        leastDestructiveRef={cancelRef}
        onClose={onCloseDeleteModal}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Eliminar Producto
            </AlertDialogHeader>
            <AlertDialogBody>
              ¿Estás seguro de que deseas eliminar este producto?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseDeleteModal}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={() => handleConfirmDelete(productToDelete)} ml={3}>
                Eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Grid>
  );
}

export default CardsAdmin;
