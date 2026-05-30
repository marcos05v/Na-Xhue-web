'use client';

import React, { useState } from 'react';

// Interfaz adaptada de tu tabla 'products' (solo lo que el cliente necesita ver)
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  stock: number;
  image_url: string;
  category_name: string; // Asumiendo un JOIN con la tabla 'categories'
  supplier_name: string; // Asumiendo un JOIN con la tabla 'profiles'
}

// Datos de prueba simulando la respuesta de la base de datos
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Zanahoria Nantes',
    description: 'Zanahoria fresca de temporada, ideal para jugos y ensaladas.',
    price: 1.25,
    unit: 'kg',
    stock: 450,
    image_url: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&q=80',
    category_name: 'Vegetales / Tubérculos',
    supplier_name: 'Hacienda Agrícola del Valle'
  },
  {
    id: '2',
    name: 'Tomate Saladette Orgánico',
    description: 'Tomate de invernadero, maduración perfecta.',
    price: 2.10,
    unit: 'kg',
    stock: 120,
    image_url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&q=80',
    category_name: 'Vegetales',
    supplier_name: 'Invernaderos San Juan'
  },
  {
    id: '3',
    name: 'Cebolla Blanca',
    description: 'Cebolla blanca de tamaño mediano, calidad premium.',
    price: 0.85,
    unit: 'kg',
    stock: 0, // Ejemplo de producto agotado
    image_url: 'https://images.unsplash.com/photo-1625904835711-0428d0115eeb?w=500&q=80',
    category_name: 'Vegetales',
    supplier_name: 'Agrícola Norte'
  }
];

export default function ProductCatalog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  // Manejador para los inputs de cantidad
  const handleQuantityChange = (productId: string, value: string, maxStock: number) => {
    let numValue = parseInt(value);
    if (isNaN(numValue) || numValue < 1) numValue = 1;
    if (numValue > maxStock) numValue = maxStock;
    
    setQuantities(prev => ({ ...prev, [productId]: numValue }));
  };

  const handleAddToCart = (product: Product) => {
    const qty = quantities[product.id] || 1;
    console.log(`Agregando al pedido: ${qty} ${product.unit} de ${product.name}`);
    // Aquí despacharías la acción a tu estado global del carrito (Context/Redux)
  };

  // Filtrado simple
  const filteredProducts = mockProducts.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header y Buscador */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Catálogo de Proveedores</h1>
          <p className="text-slate-500 mt-1 text-sm">Explora y agrega productos a tu orden de compra.</p>
        </div>
        
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Buscar por nombre de producto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0f4c3a] focus:border-[#0f4c3a] outline-none transition-colors"
          />
        </div>
      </div>

      {/* Grid de Productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow">
            
            {/* Imagen */}
            <div className="relative h-48 bg-slate-100">
              {product.image_url ? (
                <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  Sin imagen
                </div>
              )}
              {/* Badge de Stock */}
              {product.stock === 0 && (
                <div className="absolute top-2 right-2 bg-red-100 text-red-700 text-xs font-bold px-2.5 py-1 rounded-md">
                  Agotado
                </div>
              )}
            </div>

            {/* Contenido de la Tarjeta */}
            <div className="p-5 flex flex-col flex-1">
              <div className="flex-1">
                <span className="text-xs font-medium text-[#0f4c3a] uppercase tracking-wider">
                  {product.category_name}
                </span>
                <h3 className="text-lg font-bold text-slate-800 mt-1 line-clamp-1">{product.name}</h3>
                <p className="text-sm text-slate-500 mt-1 mb-3">Proveedor: {product.supplier_name}</p>
                
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-xl font-extrabold text-slate-900">${product.price.toFixed(2)}</span>
                  <span className="text-sm text-slate-500">/ {product.unit}</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">Disponible: {product.stock} {product.unit}</p>
              </div>

              {/* Controles de Compra (Solo habilitados si hay stock) */}
              <div className="mt-5 flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  disabled={product.stock === 0}
                  value={quantities[product.id] || 1}
                  onChange={(e) => handleQuantityChange(product.id, e.target.value, product.stock)}
                  className="w-20 px-3 py-2 border border-slate-300 rounded-lg text-center focus:ring-2 focus:ring-[#0f4c3a] outline-none disabled:bg-slate-100 disabled:text-slate-400"
                />
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                  className="flex-1 bg-[#0f4c3a] text-white font-medium py-2 px-4 rounded-lg hover:bg-[#0c3e2f] transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Agregar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">No se encontraron productos con ese nombre.</p>
        </div>
      )}
    </div>
  );
}