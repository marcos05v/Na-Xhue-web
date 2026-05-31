'use client';

import React from 'react';
import Link from 'next/link';

// Interfaz para la tabla del proveedor
interface SupplierProduct {
  id: string;
  name: string;
  category_name: string;
  price: number;
  unit: string;
  stock: number;
  is_active: boolean;
  image_url: string;
}

// Datos de prueba para el proveedor logueado
const myProducts: SupplierProduct[] = [
  {
    id: '1',
    name: 'Zanahoria Nantes',
    category_name: 'Vegetales / Tubérculos',
    price: 1.25,
    unit: 'kg',
    stock: 450,
    is_active: true,
    image_url: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=150&q=80',
  },
  {
    id: '2',
    name: 'Papa Blanca',
    category_name: 'Vegetales / Tubérculos',
    price: 0.90,
    unit: 'kg',
    stock: 1200,
    is_active: true,
    image_url: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=150&q=80',
  },
  {
    id: '3',
    name: 'Cebolla Morada',
    category_name: 'Vegetales',
    price: 1.50,
    unit: 'kg',
    stock: 0,
    is_active: false,
    image_url: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=150&q=80',
  }
];

export default function SupplierInventory() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header de la sección */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Mi Inventario</h1>
          <p className="text-slate-500 mt-1 text-sm">Gestiona los productos que tienes a la venta.</p>
        </div>
        
        {/* Botón para ir al formulario de creación (el que ya hicimos) */}
        <Link 
          href="/dashboard/inventory" 
          className="bg-[#0f4c3a] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#0c3e2f] transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Agregar Producto
        </Link>
      </div>

      {/* Tabla de Productos */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-6 py-4 font-medium">Producto</th>
                <th className="px-6 py-4 font-medium">Categoría</th>
                <th className="px-6 py-4 font-medium">Precio</th>
                <th className="px-6 py-4 font-medium">Stock</th>
                <th className="px-6 py-4 font-medium">Estado</th>
                <th className="px-6 py-4 font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {myProducts.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                  
                  {/* Imagen y Nombre */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0">
                        {product.image_url ? (
                          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-xs text-slate-400 flex h-full items-center justify-center">Sin img</span>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{product.name}</p>
                        <p className="text-xs text-slate-500">ID: {product.id.slice(0,8)}...</p>
                      </div>
                    </div>
                  </td>

                  {/* Categoría */}
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {product.category_name}
                  </td>

                  {/* Precio */}
                  <td className="px-6 py-4 text-sm font-medium text-slate-800">
                    ${product.price.toFixed(2)} <span className="text-slate-500 font-normal">/ {product.unit}</span>
                  </td>

                  {/* Stock con alerta si es bajo */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${product.stock === 0 ? 'text-red-600' : 'text-slate-800'}`}>
                        {product.stock}
                      </span>
                      {product.stock === 0 && (
                        <span className="w-2 h-2 rounded-full bg-red-500" title="Agotado"></span>
                      )}
                    </div>
                  </td>

                  {/* Estado (Toggle visual) */}
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {product.is_active ? 'Publicado' : 'Oculto'}
                    </span>
                  </td>

                  {/* Acciones */}
                  <td className="px-6 py-4 text-right space-x-3">
                    <Link 
                      href={`/dashboard/inventory/edit/${product.id}`}
                      className="text-slate-400 hover:text-[#0f4c3a] transition-colors inline-block"
                      title="Editar Producto"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </Link>
                    <button 
                      className="text-slate-400 hover:text-red-600 transition-colors inline-block"
                      title="Eliminar Producto"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Paginación simple */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between">
          <p className="text-sm text-slate-500">Mostrando <span className="font-medium text-slate-700">3</span> productos</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-slate-300 rounded text-sm text-slate-600 hover:bg-slate-100 disabled:opacity-50" disabled>Anterior</button>
            <button className="px-3 py-1 border border-slate-300 rounded text-sm text-slate-600 hover:bg-slate-100 disabled:opacity-50" disabled>Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  );
}