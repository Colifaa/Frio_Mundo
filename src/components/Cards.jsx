import React, { useState, useEffect } from 'react';
import { useDisclosure } from "@chakra-ui/react";
import { supabase } from "../../lib/supabaseClient";
import { Box, Grid, GridItem, Image, Text, Heading, Card, CardBody } from '@chakra-ui/react';
import * as Components from ".";
import Link from 'next/link';

export default function Cards() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  // Estado para almacenar los productos
  const [productos, setProductos] = useState([]);
  console.log("productos",productos);

  // Función para cargar los productos desde la base de datos
  const getProductos = async () => {
    try {
      // Realiza la consulta para obtener todos los productos
      const { data: productos, error } = await supabase
        .from('Products')
        .select('*');

      if (error) {
        console.error('Error al cargar los productos:', error);
      } else {
        setProductos(productos); // Actualiza el estado con los productos obtenidos
      }
    } catch (error) {
      console.error('Error al cargar los productos:', error);
    }
  };


  useEffect(() => {
    getProductos();
  }, []);

  return (
    <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)' }} gap={4} justifyContent="center">
    {productos?.map((producto, index) => (
      <GridItem key={index} display="flex" flexDirection="column" alignItems="center">
          <Link href="/categories">
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
            <Text fontSize={['xs', 'sm', 'md', 'lg', 'xl']} fontWeight="light" fontFamily="Georgia">
              {producto.wall_type}
            </Text>
            <Heading size="md" color="#A7414C">
              {producto.name}
            </Heading>
            <Text color="#FF5733" fontSize="xl">
              ${producto.price}
            </Text>
          </CardBody>
        </Card>
        </Link>
      </GridItem>
    ))}
  </Grid>
);
}

