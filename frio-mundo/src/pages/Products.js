import React, { useState, useEffect } from 'react';
import { useDisclosure } from "@chakra-ui/react";
import { supabase } from "./../../lib/supabaseClient";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

export default function Home() {
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
    <div>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Precio</Th>
          </Tr>
        </Thead>
        <Tbody>
        {productos.map((producto) => (
  <Tr key={producto.id}>
    <Td>{producto.name}</Td> {/* Cambiar producto.nombre a producto.name */}
    <Td>{producto.wall_type}</Td> {/* Cambiar producto.precio a producto.price */}
    <Td>{producto.price}</Td> {/* Cambiar producto.precio a producto.price */}
    <Td>{producto.size}</Td> {/* Cambiar producto.precio a producto.price */}
    <Td>
  <img src={producto.image} alt={producto.name} width="100" />
</Td>
  </Tr>
))}
        </Tbody>
      </Table>
    </div>
  );
}
