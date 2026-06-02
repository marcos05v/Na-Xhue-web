'use client';

import { useState } from 'react';

interface PagoProps {
  open: boolean;
  onClose: () => void;
  subtotal: number;
  envio: number;
  impuestos: number;
  total: number;
}

export default function Pago({
  open,
  onClose,
  subtotal,
  envio,
  impuestos,
  total
}: PagoProps) {

  const [metodoPago, setMetodoPago] = useState('efectivo');

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">

      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">

        {/* Encabezado */}
        <div className="border-b px-8 py-5 flex items-center justify-between">

          <h2 className="text-2xl font-bold text-[#0f4c3a]">
            Finalizar Pedido
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-red-500"
          >
            ×
          </button>

        </div>

        <div className="grid lg:grid-cols-3 gap-8 p-8">

          {/* IZQUIERDA */}
          <div className="lg:col-span-2 space-y-6">

            {/* Dirección */}
            <div className="border rounded-xl p-6">

              <div className="flex justify-between mb-4">

                <h3 className="font-bold text-slate-800">
                  Dirección de entrega
                </h3>

                <button className="text-[#0f4c3a] font-medium">
                  Cambiar
                </button>

              </div>

              <div className="bg-slate-50 p-4 rounded-lg">

                <p className="font-semibold text-slate-800">
                  Almacén Central Águila
                </p>

                <p className="text-sm text-slate-500">
                  Calle Industrial #452, Sector Norte
                </p>

                <p className="text-sm text-slate-500">
                  Entrada por el portón gris
                </p>

              </div>

            </div>

            {/* Método de pago */}
            <div className="border rounded-xl p-6">

              <h3 className="font-bold text-slate-800 mb-5">
                Método de pago
              </h3>

              <div className="grid md:grid-cols-2 gap-4">

                {/* Efectivo */}
                <div
                  onClick={() => setMetodoPago('efectivo')}
                  className={`border rounded-lg p-4 cursor-pointer transition
                  ${
                    metodoPago === 'efectivo'
                      ? 'border-green-600 bg-green-50'
                      : 'border-slate-200'
                  }`}
                >
                  <h4 className="font-semibold">
                    Efectivo contra entrega
                  </h4>

                  <p className="text-sm text-slate-500 mt-1">
                    Paga al recibir tus productos
                  </p>

                </div>

                {/* Tarjeta */}
                <div
                  onClick={() => setMetodoPago('tarjeta')}
                  className={`border rounded-lg p-4 cursor-pointer transition
                  ${
                    metodoPago === 'tarjeta'
                      ? 'border-green-600 bg-green-50'
                      : 'border-slate-200'
                  }`}
                >
                  <h4 className="font-semibold">
                    Tarjeta bancaria
                  </h4>

                  <p className="text-sm text-slate-500 mt-1">
                    Visa, MasterCard
                  </p>

                </div>

              </div>

              {/* Datos de tarjeta */}
              {metodoPago === 'tarjeta' && (

                <div className="space-y-4 mt-6">

                  <div>

                    <label className="block text-sm font-medium mb-2">
                      Número de tarjeta
                    </label>

                    <input
                      type="text"
                      placeholder="**** **** **** 4582"
                      className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-600"
                    />

                  </div>

                  <div className="grid grid-cols-2 gap-4">

                    <div>

                      <label className="block text-sm font-medium mb-2">
                        Vencimiento
                      </label>

                      <input
                        type="text"
                        placeholder="MM/AA"
                        className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-600"
                      />

                    </div>

                    <div>

                      <label className="block text-sm font-medium mb-2">
                        CVV
                      </label>

                      <input
                        type="password"
                        placeholder="***"
                        className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-600"
                      />

                    </div>

                  </div>

                </div>

              )}

            </div>

          </div>

          {/* DERECHA */}
          <div>

            <div className="border rounded-xl p-6 sticky top-4">

              <h3 className="font-bold text-slate-800 mb-6">
                Resumen final
              </h3>

              <div className="space-y-3 text-sm">

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Envío</span>
                  <span>${envio.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Impuestos</span>
                  <span>${impuestos.toFixed(2)}</span>
                </div>

              </div>

              <div className="border-t mt-6 pt-5 flex justify-between items-center">

                <span className="font-bold text-lg">
                  Total
                </span>

                <span className="text-2xl font-black text-[#0f4c3a]">
                  ${total.toFixed(2)}
                </span>

              </div>

              <button
                className="w-full mt-6 bg-[#2a4d3e] text-white py-3 rounded-lg hover:bg-[#1f3a2e] transition"
              >
                Finalizar Pedido
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}