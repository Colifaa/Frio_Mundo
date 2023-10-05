import { Box, Flex, Link, Button, Icon } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const Header = () => {
  return (
    <Box as="header" backgroundColor="gray.800" color="white" py={3}>
      <Flex justify="space-between" align="center" flexWrap="wrap">
        <Box flex="1">
          <Box maxW="200px">
            <Link href="/">
              <img src="/images/LOGOBIEN2.png" alt="Logo" />
            </Link>
          </Box>
        </Box>
        <Box flex="1">
          <Flex align="center">
            <Button
              colorScheme="teal"
              display={["none", "none", "block"]}
              mr={4}
              leftIcon={<Icon as={FaSearch} />}
            >
              Buscar
            </Button>
            <Link href="/" mr={4}>
              Inicio
            </Link>
            <Link href="/about" mr={4}>
              Nuestra Empresa
            </Link>
            <Link href="/product" mr={4}>
              Categorias
            </Link>
            <Link href="/contact">
              Contacto
            </Link>
            <Button
              colorScheme="teal"
              display={["block", "block", "none"]}
              leftIcon={<Icon as={FaSearch} />}
              mr={2}
            />
            <Link href="/login" display={["block", "block", "none"]}>
              Iniciar sesión
            </Link>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;