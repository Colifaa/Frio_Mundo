import { Box, Flex, Input, Button, Link, Image, Icon, Text } from "@chakra-ui/react";
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  return (
    <Flex justifyContent="center" alignItems="center" height="100vh">
      <Box
        p={4}
        borderRadius="md"
        backgroundColor="white"
        boxShadow="md"
        width={{ base: "90%", sm: "80%", md: "50%" }}
        textAlign="center"
        maxW="400px" // Añadido para hacerlo más cuadrado
      >
        <Flex justifyContent="center" alignItems="center" mb={4}>
          <Image width="100px" height="100px" src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-bird-symbols-png-logo-0.png" alt="Twitter Logo" />
        </Flex>
        <Text className="mt-4" fontSize="2xl" fontWeight="bold">
          Twitter
        </Text>
        <form className="p-3 mt-3">
          <Flex align="center" className="form-field">
            <Icon as={FaUser} fontSize="lg" />
            <Input type="text" name="userName" id="userName" placeholder="Username" ml={2} size="lg" />
          </Flex>
          <Flex align="center" className="form-field">
            <Icon as={FaLock} fontSize="lg" />
            <Input type="password" name="password" id="pwd" placeholder="Password" ml={2} />
          </Flex>
          <Button className="btn mt-3" colorScheme="teal">
            Login
          </Button>
        </form>
        <Text className="fs-6 mt-2">
          <Link href="#">Forget password?</Link> or <Link href="#">Sign up</Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default Login;