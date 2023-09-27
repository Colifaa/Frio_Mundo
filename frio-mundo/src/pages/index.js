import React from 'react';
import { useDisclosure } from "@chakra-ui/react"


import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
} from '@chakra-ui/react'

export default function Home() {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  return (
    <>
      <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
        Open
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='top'
        onClose={onClose}
        finalFocusRef={btnRef}
        size="full"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Chupala Santi !! HAHAHAAHAHA 🤑❤️</DrawerHeader>

          <DrawerBody>
            <Input placeholder='BOCA TU COLA ES MIA' />
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Sabpee🤑❤️</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
