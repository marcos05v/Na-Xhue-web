"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

const restaurantBenefits = [
  { icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z", title: "Frescura Extrema", desc: "Productos cosechados el mismo día." },
  { icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", title: "Ahorro de Costos", desc: "Precios 25% menores sin intermediarios." },
  { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", title: "Datos y Análisis", desc: "Trazabilidad completa de tus insumos." },
];

const supplierBenefits = [
  { icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z", title: "Pago Justo", desc: "Tú fijas tus precios y cobras en 48h." },
  { icon: "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0", title: "Logística Simplificada", desc: "Nosotros recolectamos en tu parcela." },
  { icon: "M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z", title: "Estadísticas", desc: "Planifica tus siembras con datos reales." },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function Benefits() {
  return (
    <section id="beneficios" className="w-full py-24 px-6 md:px-12 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="mb-12"
        >
          <h2 className="text-[#1C1917] font-black text-4xl md:text-5xl mb-4 tracking-tight">Beneficios de la Red</h2>
          <p className="text-[#78716C] text-lg max-w-2xl">Optimizamos la cadena para que tú te enfoques en el sabor y la tierra.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: "Para Restaurantes", data: restaurantBenefits, type: "rest" },
            { title: "Para Proveedores", data: supplierBenefits, type: "prov" }
          ].map((group, idx) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, x: idx === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "circOut" }}
              className="border border-[#E7E5E4] rounded-3xl p-8 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-[#1C1917] font-bold text-2xl mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-[#364A29] rounded-full inline-block" />
                {group.title}
              </h3>
              <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-2">
                {group.data.map((b) => (
                  <motion.div key={b.title} variants={itemVariants} className="flex items-start gap-4 p-4 rounded-xl hover:bg-[#F0FDF4] transition-all group">
                    <div className="w-10 h-10 bg-[#ECFDF5] border border-[#A7F3D0] rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#364A29] transition-colors duration-300">
                      <svg className="w-5 h-5 text-[#064E3B] group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={b.icon} />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[#1C1917] font-bold text-sm">{b.title}</p>
                      <p className="text-[#78716C] text-xs mt-1 leading-relaxed">{b.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}