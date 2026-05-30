const restaurantBenefits = [
  {
    icon: (
      <svg className="w-4 h-4 text-[#064E3B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    title: "Frescura Extrema",
    desc: "Productos cosechados el mismo día de la entrega.",
  },
  {
    icon: (
      <svg className="w-4 h-4 text-[#064E3B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Ahorro de Costos",
    desc: "Precios hasta un 25% menores al evitar intermediarios.",
  },
  {
    icon: (
      <svg className="w-4 h-4 text-[#064E3B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Datos y Análisis",
    desc: "Trazabilidad completa y reportes de gasto mensual.",
  },
];

const supplierBenefits = [
  {
    icon: (
      <svg className="w-4 h-4 text-[#064E3B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    title: "Pago Justo",
    desc: "Tú fijas tus precios y recibes pagos en menos de 48 horas.",
  },
  {
    icon: (
      <svg className="w-4 h-4 text-[#064E3B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
      </svg>
    ),
    title: "Logística Simplificada",
    desc: "Nosotros nos encargamos de recoger y entregar el producto.",
  },
  {
    icon: (
      <svg className="w-4 h-4 text-[#064E3B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Estadísticas",
    desc: "Conoce la demanda futura para planificar tus siembras.",
  },
];

function BenefitItem({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl hover:bg-[#F9FAFB] transition duration-200">
      <div className="w-8 h-8 bg-[#ECFDF5] border border-[#A7F3D0] rounded-lg flex items-center justify-center shrink-0 mt-0.5">
        {icon}
      </div>
      <div>
        <p className="text-[#1C1917] font-semibold text-sm">{title}</p>
        <p className="text-[#78716C] text-xs leading-relaxed mt-0.5">{desc}</p>
      </div>
    </div>
  );
}

export default function Benefits() {
  return (
    <section className="w-full py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-[#1C1917] font-black text-3xl md:text-4xl mb-2">
            Beneficios de la Red
          </h2>
          <p className="text-[#78716C] text-base">
            Optimizamos cada eslabón de la cadena para que tú te enfoques en lo
            que mejor sabes hacer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Restaurants card */}
          <div className="border border-[#E7E5E4] rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-[#364A29]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
              <h3 className="text-[#1C1917] font-bold text-lg">
                Para Restaurantes
              </h3>
            </div>
            <p className="text-[#78716C] text-sm mb-4 pl-7">
              Calidad premium y control total sobre tus insumos.
            </p>
            <div className="space-y-1">
              {restaurantBenefits.map((b) => (
                <BenefitItem key={b.title} {...b} />
              ))}
            </div>
          </div>

          {/* Suppliers card */}
          <div className="border border-[#E7E5E4] rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-[#364A29]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
              </svg>
              <h3 className="text-[#1C1917] font-bold text-lg">
                Para Proveedores
              </h3>
            </div>
            <p className="text-[#78716C] text-sm mb-4 pl-7">
              Justicia económica y herramientas de crecimiento.
            </p>
            <div className="space-y-1">
              {supplierBenefits.map((b) => (
                <BenefitItem key={b.title} {...b} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}