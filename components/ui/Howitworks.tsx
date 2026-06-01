const steps = [
  {
    number: "01",
    icon: (
      <svg className="w-5 h-5 text-[#064E3B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Pedido antes de las 10:00 AM",
    description:
      "Realiza tu pedido a través de nuestro portal digital. Los productores reciben la notificación en tiempo real para iniciar la cosecha.",
  },
  {
    number: "02",
    icon: (
      <svg className="w-5 h-5 text-[#064E3B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    title: "Consolidación de Ruta",
    description:
      "Nuestra IA optimiza las trayectorias de recolección en los valles centrales, reduciendo la huella de carbono y costos logísticos.",
  },
  {
    number: "03",
    icon: (
      <svg className="w-5 h-5 text-[#064E3B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    title: "Entrega Directa",
    description:
      "Recibe tus insumos antes del mediodía. De la tierra a tu cocina en menos de 12 horas, garantizando frescura insuperable.",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="w-full bg-[#F9FAFB] py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-[#1C1917] font-black text-3xl md:text-4xl mb-3">
            Cómo Funciona
          </h2>
          <div className="w-10 h-1 bg-[#364A29] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white border border-[#E7E5E4] rounded-2xl p-8 relative hover:shadow-xl hover:-translate-y-2 hover:border-[#364A29]/30 transition-all duration-500 group"
            >
              <span className="absolute top-6 right-6 text-5xl font-black text-[#F0FDF4] group-hover:text-[#ECFDF5] transition-colors duration-500">
                {step.number}
              </span>
              <div className="w-10 h-10 bg-[#ECFDF5] border border-[#A7F3D0] rounded-xl flex items-center justify-center mb-5">
                {step.icon}
              </div>
              <h3 className="text-[#1C1917] font-bold text-xl mb-3">
                {step.title}
              </h3>
              <p className="text-[#78716C] text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}