import { Box, Flex, Input, Button, Link, Image, Icon, Text } from "@chakra-ui/react";
import { FaUser, FaLock } from "react-icons/fa";
import { useState } from 'react'; // Importa useState para manejar el estado local.
import { supabase } from "../../lib/supabaseClient"; // Importa tu instancia de Supabase.
import { useRouter } from 'next/router';


const Login = () => {


  const [email, setEmail] = useState(''); // Estado para el campo de correo electrónico
  const [password, setPassword] = useState(''); // Estado para el campo de contraseña
  const [error, setError] = useState(''); // Estado para manejar errores
  const router = useRouter();

  console.log('Correo electrónico:', email); // Agregar esta línea para consoluear el correo electrónico
  
  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        setError(error.message);
      } else {
        // Inicio de sesión exitoso, redirige al usuario a la página deseada
        router.push('/admin'); // Cambia '/adminForm' al enlace de tu página
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  }

  return (
     <Flex justifyContent="center" alignItems="center" height="100vh">
      <Box
        p={4}
        borderRadius="md"
        backgroundColor="white"
        boxShadow="md"
        width={{ base: "90%", sm: "80%", md: "50%" }}
        textAlign="center"
        maxW="400px"
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
            <Input
              type="text"
              name="userName"
              id="userName"
              placeholder="Username"
              ml={2}
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Flex>
          <Flex align="center" className="form-field">
            <Icon as={FaLock} fontSize="lg" />
            <Input
              type="password"
              name="password"
              id="pwd"
              placeholder="Password"
              ml={2}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Flex>
          <Button className="btn mt-3" colorScheme="teal" onClick={handleLogin}>
            Login
          </Button>
        </form>
        {error && <Text color="red">{error}</Text>}
        <Text className="fs-6 mt-2">
          <Link href="#">Forget password?</Link> or <Link href="#">Sign up</Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default Login;