import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

function ProductCategories() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      // Obtener la lista de productos desde la base de datos
      const { data, error } = await supabase.from('Products').select('category');

      if (error) {
        console.error('Error al obtener categorías:', error);
      } else {
        // Extraer valores únicos de la propiedad 'category'
        const uniqueCategories = [...new Set(data.map(item => item.category))];
        setCategories(uniqueCategories);
      }
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchProductsByCategory() {
      // Obtener los productos asociados a la categoría seleccionada
      if (selectedCategory) {
        const { data, error } = await supabase.from('Products').select('*').eq('category', selectedCategory);

        if (error) {
          console.error('Error al obtener productos por categoría:', error);
        } else {
          setProducts(data);
        }
      }
    }

    fetchProductsByCategory();
  }, [selectedCategory]);

  return (
    <div>
      <h2>Categorías Disponibles</h2>
      <ul>
        {categories.map(category => (
          <li key={category}>
            <a href="#" onClick={() => setSelectedCategory(category)}>
              {category}
            </a>
          </li>
        ))}
      </ul>

      {selectedCategory && (
        <div>
          <h2>Productos en la categoría {selectedCategory}</h2>
          <ul>
            {products.map(product => (
              <li key={product.id}>
                <h3>{product.name}</h3>
                <p>Precio: ${product.price}</p>
                <p>Tamaño: {product.size}</p>
                {/* Mostrar otros detalles del producto */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProductCategories;
