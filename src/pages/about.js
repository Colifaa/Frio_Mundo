import { Box } from "@chakra-ui/react";
import * as Components from "../components";
import React from 'react'

export default function about() {
  return (
    <div>
      <Components.Header/>
      <Box>
      <Components.Nosotros/>
      </Box>
      <Components.Footer/>
      
    </div>
  )
}