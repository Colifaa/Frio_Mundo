import React from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';

const ContactForm = () => {
  return (
    <Box maxW="500px" mx="auto" mt="20px">
      <form>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input type="text" placeholder="Your Name" />
        </FormControl>

        <FormControl isRequired mt="4">
          <FormLabel>Email</FormLabel>
          <Input type="email" placeholder="Your Email" />
        </FormControl>

        <FormControl isRequired mt="4">
          <FormLabel>Phone Number</FormLabel>
          <Input type="tel" placeholder="Your Phone Number" />
        </FormControl>

        <FormControl isRequired mt="4">
          <FormLabel>Message</FormLabel>
          <Textarea placeholder="Your Message" />
        </FormControl>

        <Button type="submit" mt="4" colorScheme="teal">
          Send
        </Button>
      </form>
    </Box>
  );
};

export default ContactForm;
