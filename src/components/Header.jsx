import { Box, Flex, Button, Icon, HStack } from "@chakra-ui/react";
import { FaSearch, FaBars } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Box as="header" bgImage="chico.png" height="111px" width="100%" position="relative">
      <Flex justify="space-between" align="center" flexWrap="wrap" position="relative">
        <Box flex={{ base: 1, sm: 1, md: 2 }}>
          <Box maxW={{ base: "100px", sm: "200px" }}>
            <Link href="/">
              <img src="LOGOBIEN.png" alt="Logo" />
            </Link>
          </Box>
        </Box>
        <Box fontFamily='Poppins, sans-serif' flex={{ base: 1, sm: 1, md: 2 }}>
          <HStack
            spacing={4}
            align="center"
            display={{ base: "none", md: "flex" }}
          >
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
          </HStack>
          {/* Botón de búsqueda */}

          {/* Botón de hamburguesa */}
          <Button
            colorScheme="teal"
            display={{ base: "block", md: "none" }}
            leftIcon={<Icon as={FaBars} />}
            onClick={toggleMenu}
            zIndex={10}
          />
        </Box>
      </Flex>
      {menuOpen && (
        <Box
          bg="white"
          display={{ base: "block", md: "none" }}
          p={4}
          boxShadow="lg"
          zIndex={9}
          position="absolute"
          top="60px"
          right="0"
        >
          <Link href="/" style={{ display: "block", marginBottom: "8px" }}>
            Inicio
          </Link>
          <Link href="/about" style={{ display: "block", marginBottom: "8px" }}>
            Nuestra Empresa
          </Link>
          <Link
            href="/categories"
            style={{ display: "block", marginBottom: "8px" }}
          >
            Categorías
          </Link>
          <Link href="/contact" style={{ display: "block", marginBottom: "8px" }}>
            Contacto
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default Header;
