import { Box, Flex, Button, Icon } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import Link from 'next/link';


const Header = () => {
  return (

    <Box as="header" bgImage="chico.png" height="110px" width="1900x">
      <Flex justify="space-between" align="center" flexWrap="wrap">
        <Box flex="1">
          <Box maxW="200px">
            <Link href="/">
              <img src="LOGOBIEN.png" alt="Logo" />
            </Link>
          </Box>
        </Box>
        <Box flex="1">
          <Flex align="center">
            <Button
              colorScheme="teal"
              display={["none", "none", "block"]}
              style={{ marginRight: "16px" }}
              leftIcon={<Icon as={FaSearch} />}
            >
              Buscar
            </Button>
            <Link href="/" style={{ marginRight: "16px" }}>
              Inicio
            </Link>
            <Link href="/about" style={{ marginRight: "16px" }}>
              Nuestra Empresa
            </Link>
            <Link href="/categories" style={{ marginRight: "16px" }}>
              Categorías
            </Link>
            <Link href="/contact" style={{ marginRight: "16px" }}>
              Contacto
            </Link>
            <Button
              colorScheme="teal"
              display={["block", "block", "none"]}
              leftIcon={<Icon as={FaSearch} />}
              mr={8}
            />
            <Link href="/login" style={{ marginRight: "16px" }}>
              Iniciar sesión
            </Link>
          </Flex>
        </Box>
      </Flex>
    </Box>
  
  );
};

export default Header;
