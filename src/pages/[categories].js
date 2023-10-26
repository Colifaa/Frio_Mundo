import React from 'react'
import * as Components from "../components";
import { useRouter } from 'next/router';


export default function categories() {


  return (
    <div>
    <Components.Header/>
    <Components.CardsCategories/>
    <Components.Footer/>
    </div>
  )
}
