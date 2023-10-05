import { Box, Flex, Icon, Link, Text, Input, Button } from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <Box as="footer" backgroundColor="gray.800" color="white" py={10}>
      <Flex justify="space-between" align="center" flexWrap="wrap">
        <Box flex="1" mb={6}>
          <img src="/images/logo1.png" alt="#" className="logo1" />
          <Flex mt={4}>
            <Link href="#" mr={4}>
              <Icon as={FaFacebook} fontSize="20px" />
            </Link>
            <Link href="#" mr={4}>
              <Icon as={FaTwitter} fontSize="20px" />
            </Link>
            <Link href="#" mr={4}>
              <Icon as={FaLinkedin} fontSize="20px" />
            </Link>
            <Link href="#">
              <Icon as={FaInstagram} fontSize="20px" />
            </Link>
          </Flex>
        </Box>
        <Box flex="1" mb={6}>
          <Text fontSize="xl" mb={2}>
            About Us
          </Text>
          <Text>
            dolor sit amet, consectetur magna aliqua. Ut enim ad minim veniam,
            quisdotempor incididunt r
          </Text>
        </Box>
        <Box flex="1" mb={6}>
          <Text fontSize="xl" mb={2}>
            Contact Us
          </Text>
          <Text>
            dolor sit amet, consectetur magna aliqua. quisdotempor incididunt ut e
          </Text>
        </Box>
        <Box flex="1" mb={6}>
          <form className="bottom_form">
            <Text fontSize="xl" mb={2}>
              Newsletter
            </Text>
            <Input
              className="enter"
              placeholder="Enter your email"
              type="email"
              name="email"
              mb={2}
            />
            <Button colorScheme="teal">Subscribe</Button>
          </form>
        </Box>
      </Flex>
      <Box borderTop="1px solid white" mt={8} pt={4}>
        <Text fontSize="sm">
          © 2019 All Rights Reserved. Design by{" "}
          <Link href="https://html.design/" color="teal.500">
            Free Html Templates
          </Link>
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;