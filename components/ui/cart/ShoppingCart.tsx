'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Tipado basado en tu esquema (cruzando products, order_items y profiles)
interface CartItem {
  id: string; // ID temporal para el carrito
  productId: string;
  name: string;
  supplierId: string;
  supplierName: string;
  supplierBadge: string; // Ej: 'PROVEEDOR DE VEGETALES'
  badgeColor: 'green' | 'orange'; // Para el diseño visual
  packagingInfo: string; // Ej: 'Bolsa de 5kg'
  pricePerUnit: number; // Ej: 2.50
  unit: string; // Ej: 'kg'
  quantity: number; // Cantidad de empaques
  totalPricePerPackage: number; // packagingInfo * pricePerUnit
  imageUrl: string;
}

// Datos de prueba reconstruidos matemáticamente a partir de tu imagen
const initialCart: CartItem[] = [
  {
    id: 'c1',
    productId: 'p1',
    name: 'Zanahoria Orgánica Premium',
    supplierId: 's1',
    supplierName: 'Granja San José',
    supplierBadge: 'PROVEEDOR DE VEGETALES',
    badgeColor: 'green',
    packagingInfo: 'Bolsa de 5kg',
    pricePerUnit: 2.50,
    unit: 'kg',
    quantity: 2,
    totalPricePerPackage: 12.50, // 5kg * $2.50
    imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=150&q=80'
  },
  {
    id: 'c2',
    productId: 'p2',
    name: 'Espinaca Baby Hidropónica',
    supplierId: 's1', // Mismo proveedor que arriba
    supplierName: 'Granja San José',
    supplierBadge: 'PROVEEDOR DE VEGETALES',
    badgeColor: 'green',
    packagingInfo: 'Caja 2kg',
    pricePerUnit: 4.00,
    unit: 'kg',
    quantity: 5,
    totalPricePerPackage: 8.00, // 2kg * $4.00
    imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=150&q=80'
  },
  {
    id: 'c3',
    productId: 'p3',
    name: 'Corte Ribeye Premium',
    supplierId: 's2',
    supplierName: 'Carnes del Valle',
    supplierBadge: 'PROVEEDOR DE CÁRNICOS',
    badgeColor: 'orange',
    packagingInfo: 'Empaque al vacío 1.5kg',
    pricePerUnit: 22.00,
    unit: 'kg',
    quantity: 2,
    totalPricePerPackage: 33.00, // 1.5kg * $22.00
    imageUrl: 'https://images.unsplash.com/photo-1603048297172-c92544798d5e?w=150&q=80'
  }
];

// Costos de logística fijos por proveedor (esto podría venir de tu BD después)
const logisticsCosts: Record<string, number> = {
  's1': 12.50,
  's2': 18.00
};

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCart);

  // Funciones de actualización
  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Agrupación por proveedor para el renderizado
  const groupedCart = cartItems.reduce((acc, item) => {
    if (!acc[item.supplierId]) {
      acc[item.supplierId] = {
        supplierId: item.supplierId,
        supplierName: item.supplierName,
        supplierBadge: item.supplierBadge,
        badgeColor: item.badgeColor,
        items: []
      };
    }
    acc[item.supplierId].items.push(item);
    return acc;
  }, {} as Record<string, { supplierId: string; supplierName: string; supplierBadge: string; badgeColor: string; items: CartItem[] }>);

  // Cálculos del Resumen
  const subtotal = cartItems.reduce((sum, item) => sum + (item.totalPricePerPackage * item.quantity), 0);
  
  // Solo cobramos logística de los proveedores que aún tienen items en el carrito
  const activeSuppliers = Object.keys(groupedCart);
  const totalLogistics = activeSuppliers.reduce((sum, supplierId) => sum + (logisticsCosts[supplierId] || 0), 0);
  
  const taxes = subtotal * 0.16; // IVA 16%
  const total = subtotal + totalLogistics + taxes;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center gap-2 mb-8">
        <Link href="/dashboard" className="text-slate-400 hover:text-[#0f4c3a]">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <h1 className="text-2xl font-bold text-[#0f4c3a]">TerraLogistics</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Columna Izquierda: Lista de Productos */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-slate-800">Tu Carrito</h2>
            <span className="text-sm text-slate-500">
              {totalItems} {totalItems === 1 ? 'artículo' : 'artículos'} de {activeSuppliers.length} proveedores
            </span>
          </div>

          {Object.values(groupedCart).map((group) => (
            <div 
              key={group.supplierId} 
              className={`bg-white rounded-xl border-2 overflow-hidden ${
                group.badgeColor === 'green' ? 'border-[#3dbb85]' : 'border-orange-200'
              }`}
            >
              {/* Header del Proveedor */}
              <div className={`px-5 py-3 flex items-center justify-between ${
                group.badgeColor === 'green' ? 'bg-[#f0fdf4]' : 'bg-[#fff7ed]'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-md ${
                    group.badgeColor === 'green' ? 'bg-[#dcfce7] text-[#166534]' : 'bg-[#ffedd5] text-[#9a3412]'
                  }`}>
                    {group.badgeColor === 'green' ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{group.supplierName}</h3>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{group.supplierBadge}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${
                  group.badgeColor === 'green' ? 'bg-[#dcfce7] text-[#166534]' : 'bg-[#ffedd5] text-[#9a3412]'
                }`}>
                  {group.badgeColor === 'green' ? 'Envío Prioritario' : 'Transporte Frío'}
                </span>
              </div>

              {/* Items del Proveedor */}
              <div className="divide-y divide-slate-100">
                {group.items.map(item => (
                  <div key={item.id} className="p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-16 h-16 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">{item.name}</h4>
                        <p className="text-sm text-slate-500">{item.packagingInfo} • ${item.pricePerUnit.toFixed(2)}/{item.unit}</p>
                        
                        {/* Controles de cantidad */}
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center border border-slate-300 rounded-md">
                            <button onClick={() => updateQuantity(item.id, -1)} className="px-2.5 py-1 text-slate-500 hover:bg-slate-50 transition-colors">-</button>
                            <span className="px-3 py-1 text-sm font-medium border-x border-slate-300 min-w-[2.5rem] text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="px-2.5 py-1 text-slate-500 hover:bg-slate-50 transition-colors">+</button>
                          </div>
                          <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-600 text-sm font-medium flex items-center gap-1 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Precio Total por Línea */}
                    <div className="text-right w-full sm:w-auto mt-4 sm:mt-0">
                      <span className="text-xl font-bold text-slate-800">
                        ${(item.totalPricePerPackage * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {cartItems.length === 0 && (
            <div className="bg-white p-12 text-center rounded-xl border border-slate-200">
              <p className="text-slate-500 text-lg">Tu carrito está vacío.</p>
              <Link href="/dashboard/inventory" className="inline-block mt-4 text-[#0f4c3a] font-medium hover:underline">
                Explorar catálogo
              </Link>
            </div>
          )}
        </div>

        {/* Columna Derecha: Resumen */}
        <div className="lg:w-[380px] space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm sticky top-6">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Resumen del Pedido</h2>
            
            <div className="space-y-3 text-sm text-slate-600 mb-6">
              <div className="flex justify-between">
                <span>Subtotal Productos</span>
                <span className="font-medium text-slate-800">${subtotal.toFixed(2)}</span>
              </div>
              
              {activeSuppliers.map(supplierId => (
                <div key={supplierId} className="flex justify-between">
                  <span>Logística {groupedCart[supplierId].supplierName}</span>
                  <span className="font-medium text-slate-800">${logisticsCosts[supplierId].toFixed(2)}</span>
                </div>
              ))}

              <div className="flex justify-between">
                <span>Impuestos (IVA 16%)</span>
                <span className="font-medium text-slate-800">${taxes.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4 mb-6 flex justify-between items-end">
              <span className="text-lg font-bold text-slate-800">Total</span>
              <span className="text-2xl font-black text-[#0f4c3a]">${total.toFixed(2)}</span>
            </div>

            <button 
              disabled={cartItems.length === 0}
              className="w-full bg-[#2a4d3e] text-white font-medium py-3.5 rounded-lg hover:bg-[#1f3a2e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-3 shadow-sm"
            >
              Proceder al Pago
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>
            
            <Link 
              href="/dashboard/inventory"
              className="w-full block text-center bg-white border border-slate-300 text-slate-700 font-medium py-3.5 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Seguir Comprando
            </Link>

            <div className="mt-6 flex items-start gap-3 bg-[#f8faf9] p-4 rounded-lg border border-slate-100">
              <svg className="w-5 h-5 text-[#3dbb85] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              <div>
                <p className="text-sm font-bold text-[#0f4c3a]">Compra Protegida</p>
                <p className="text-xs text-slate-500 mt-0.5">Tus transacciones están cifradas y aseguradas por TerraLogistics.</p>
              </div>
            </div>
          </div>

          {/* Tarjeta de Entrega Estimada */}
          <div className="bg-[#f0fdf4] p-5 rounded-xl border border-[#dcfce7]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-[#166534]">Entrega Estimada</h3>
              <svg className="w-5 h-5 text-[#166534]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
            </div>
            <div className="flex gap-3">
              <div className="w-16 h-16 bg-slate-200 rounded-lg flex-shrink-0 overflow-hidden opacity-80">
                {/* Placeholder para el minimapa */}
                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=150&q=80" alt="Map" className="w-full h-full object-cover grayscale" />
              </div>
              <div>
                <p className="font-semibold text-[#166534]">Mañana, 08:00 - 12:00</p>
                <p className="text-xs text-[#166534] opacity-80 mt-1">Dirección: Bodega Central Calle 10, #45</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}