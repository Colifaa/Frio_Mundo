import { Box, Flex, Button, Icon, HStack, useBreakpointValue } from "@chakra-ui/react";
import { FaSearch, FaBars } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const menuDisplay = useBreakpointValue({ base: "block", md: "none" });

  return (
    <Box as="header" bgColor="blue.50" bgImage="/chico.png" bgSize="cover" bgPos="center" bgRepeat="no-repeat">
      <Flex justify="space-between" align="center" flexWrap="wrap" padding={4}>
        <Box flex={{ base: 1, sm: 1, md: 2 }}>
          <Box maxW={{ base: "120px", sm: "240px" }} marginLeft={['10px', '40px']}>
            <Link href="/">
              <img src="/LOGOBIEN.png" alt="Logo" />
            </Link>
          </Box>
        </Box>

        <Box flex={{ base: 1, sm: 1, md: 2 }}>
          <HStack
            spacing={10}
            align="center"
            display={{ base: "none", md: "flex" }}
            justifyContent="flex-end"
            fontFamily="Oswald, sans-serif"
            fontWeight={700}
            marginRight={['10px', '30px']}
          >
            <Link href="/" style={{ color: "white" }}>
              Inicio
            </Link>
            <Link href="/about" style={{ color: "white" }}>
              Nuestra Empresa
            </Link>
            <Link href="/categories" style={{ color: "white" }}>
              Categorías
            </Link>
            <Link href="/contact" style={{ color: "white" }}>
              Contacto
            </Link>
          </HStack>
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
          display={menuDisplay}
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
          <Link href="/categories" style={{ display: "block", marginBottom: "8px" }}>
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
