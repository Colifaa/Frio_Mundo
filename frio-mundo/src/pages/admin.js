import ProductCategories from '@/components/ProductCategories'
import AdminForm from '@/components/adminForm'
import React from 'react'

export default function admin() {
  return (
    <div>
      <AdminForm/>
      <ProductCategories/>
    </div>
  )
}
