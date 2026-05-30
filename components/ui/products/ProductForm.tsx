'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Interfaz basada estrictamente en tu tabla 'products'
export interface ProductFormData {
  name: string;
  category_id: string; // Asumiendo que el select maneja strings antes de enviar
  description: string;
  price: number | '';
  unit: string;
  stock: number | '';
  image_url: string;
  is_active: boolean;
}

interface ProductFormProps {
  initialData?: ProductFormData;
  isEditing?: boolean;
}

export default function ProductForm({ initialData, isEditing = false }: ProductFormProps) {
  // Estado inicial basado en si estamos creando o editando
  const [formData, setFormData] = useState<ProductFormData>(
    initialData || {
      name: '',
      category_id: '',
      description: '',
      price: '',
      unit: 'kg', // Valor por defecto común
      stock: '',
      image_url: '',
      is_active: true,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Manejo especial para checkboxes (toggles) y números
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: value === '' ? '' : Number(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos listos para enviar a Supabase:', formData);
    // Aquí iría tu lógica de mutación/fetch a tu API
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header del Formulario */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">
          {isEditing ? 'Editar Producto' : 'Agregar Nuevo Producto'}
        </h1>
        <p className="text-slate-500 mt-1 text-sm">
          {isEditing
            ? 'Actualiza la información del artículo en tu inventario.'
            : 'Complete el formulario para registrar un nuevo artículo en su catálogo.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna Izquierda: Información Principal */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Tarjeta: Información General */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Información General</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Nombre del Producto *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Ej. Manzanas Gala Orgánicas"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0f4c3a] focus:border-[#0f4c3a] outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category_id" className="block text-sm font-medium text-slate-700 mb-1">Categoría *</label>
                  <select
                    id="category_id"
                    name="category_id"
                    required
                    value={formData.category_id}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0f4c3a] focus:border-[#0f4c3a] outline-none transition-colors bg-white"
                  >
                    <option value="" disabled>Selecciona una categoría</option>
                    {/* Estas opciones deberían venir de tu tabla 'categories' */}
                    <option value="1">Frutas</option>
                    <option value="2">Verduras</option>
                    <option value="3">Lácteos</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="unit" className="block text-sm font-medium text-slate-700 mb-1">Unidad de Medida *</label>
                  <select
                    id="unit"
                    name="unit"
                    required
                    value={formData.unit}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0f4c3a] focus:border-[#0f4c3a] outline-none transition-colors bg-white"
                  >
                    <option value="kg">Kilogramo (kg)</option>
                    <option value="pieza">Pieza</option>
                    <option value="litro">Litro (L)</option>
                    <option value="caja">Caja</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">Descripción</label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  placeholder="Detalles sobre el origen, calidad y especificaciones del producto..."
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0f4c3a] focus:border-[#0f4c3a] outline-none transition-colors resize-none"
                />
              </div>
            </div>
          </div>

          {/* Tarjeta: Gestión de Stock y Precios */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Gestión de Stock y Precios</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-slate-700 mb-1">Precio Unitario ($) *</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500">$</span>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    required
                    min="0.01"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0f4c3a] focus:border-[#0f4c3a] outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-slate-700 mb-1">
                  {isEditing ? 'Stock Actual' : 'Stock Inicial'} *
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  required
                  min="0"
                  placeholder="0"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0f4c3a] focus:border-[#0f4c3a] outline-none transition-colors"
                />
              </div>
            </div>

            {/* Toggle de Publicación (is_active en tu BD) */}
            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
              <div>
                <h3 className="text-sm font-medium text-slate-800">Publicado (Visible para restaurantes)</h3>
                <p className="text-xs text-slate-500 mt-1">Si está inactivo, el producto no aparecerá en el catálogo.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0f4c3a]"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Imagen y Acciones */}
        <div className="space-y-6">
          
          {/* Tarjeta: Imagen del Producto */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col h-full">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Imagen del Producto</h2>
            
            <div className="flex-1 flex flex-col justify-center items-center border-2 border-dashed border-slate-300 rounded-lg p-6 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
              <svg className="w-10 h-10 text-slate-400 group-hover:text-[#0f4c3a] transition-colors mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
              </svg>
              <p className="text-sm font-medium text-[#0f4c3a]">Haz clic para cargar</p>
              <p className="text-xs text-slate-500 mt-1">PNG, JPG (Max. 5MB)</p>
              {/* Aquí iría el input type="file" oculto en un caso real */}
            </div>

            {/* Cuadro de asistencia (como en tu diseño) */}
            <div className="mt-6 bg-[#edf7f4] border border-[#b2dfd0] rounded-lg p-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#0f4c3a] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p className="text-sm text-[#0f4c3a]">
                  Asegúrese de que el precio unitario refleje el costo por la unidad de medida seleccionada ({formData.unit}) para evitar errores en los pedidos.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Botones de Acción (Full Width al final) */}
        <div className="lg:col-span-3 flex justify-end gap-4 border-t border-slate-200 pt-6 mt-2">
          <Link
            href="/dashboard/inventory"
            className="px-6 py-2.5 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#0f4c3a] text-white font-medium rounded-lg hover:bg-[#0c3e2f] shadow-sm transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            {isEditing ? 'Actualizar Producto' : 'Guardar Producto'}
          </button>
        </div>
      </form>
    </div>
  );
}