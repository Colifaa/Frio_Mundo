import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { supabase } from "../../lib/supabaseClient";

function ProductForm() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    size: '',
    image: null,
    wall_type: '',
    price: '',
  });

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) {
      console.error('Error fetching products:', error);
    } else {
      setProducts(data);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('size', formData.size);
    formDataToSend.append('image', formData.image);
    formDataToSend.append('wall_type', formData.wall_type);
    formDataToSend.append('price', formData.price);

    try {
      const { data, error } = await supabase
        .from('products')
        .upsert([{ ...formData }]);

      if (error) {
        console.error('Error adding/updating product:', error);
      } else {
        console.log('Product added/updated:', data);

        // Actualizar la lista de productos
        fetchProducts();

        // Limpiar el formulario después de agregar/editar
        setFormData({
          name: '',
          size: '',
          image: null,
          wall_type: '',
          price: '',
        });
      }
    } catch (error) {
      console.error('Error adding/updating product:', error);
    }
  };

  const handleEdit = (product) => {
    setFormData({ ...product });
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting product:', error);
      } else {
        console.log('Product deleted');

        // Actualizar la lista de productos después de eliminar
        fetchProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <Box p={4}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="start">
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Size</FormLabel>
            <Input
              type="text"
              name="size"
              value={formData.size}
              onChange={handleInputChange}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Image</FormLabel>
            <Input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleImageChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Wall Type</FormLabel>
            <Input
              type="text"
              name="wall_type"
              value={formData.wall_type}
              onChange={handleInputChange}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Price</FormLabel>
            <Input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </FormControl>
          <Button type="submit" colorScheme="teal">
            Save
          </Button>
        </VStack>
      </form>
      <Text mt={4} fontWeight="bold">
        Products
      </Text>
      <VStack spacing={2} align="start">
        {products.map((product) => (
          <Box key={product.id} borderWidth="1px" p={2}>
            <Text>{product.name}</Text>
            <Text>{product.size}</Text>
            <Text>{product.wall_type}</Text>
            <Text>${product.price}</Text>
            <Button colorScheme="blue" onClick={() => handleEdit(product)}>
              Edit
            </Button>
            <Button colorScheme="red" onClick={() => handleDelete(product.id)}>
              Delete
            </Button>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}

export default ProductForm;
