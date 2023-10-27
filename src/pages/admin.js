import * as Components from "../components";
import React from 'react'

export default function admin() {
  return (
    <div>
      <Components.Header/>
      <Components.AdminForm/>
      <Components.LogoutButton />
      <Components.Footer/>
    </div>
  )
}
