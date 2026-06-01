const stats = [
  { value: "12h", label: "Tiempo Entrega" },
  { value: "400+", label: "Productores" },
  { value: "25%", label: "Ahorro Promedio" },
  { value: "OAX", label: "Origen Local" },
];

export default function CTASection() {
  return (
    <section id="impacto" className="w-full bg-[#1A2E14] py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left */}
        <div className="flex-1 max-w-md">
          <h2 className="text-white font-black text-3xl md:text-4xl leading-tight mb-4">
            ¿Listo para transformar tu cadena de suministro?
          </h2>
          <p className="text-[#A7F3D0] text-base mb-8">
            Únete a la red que está revolucionando la economía alimentaria en
            Oaxaca.
          </p>
          <div className="flex gap-4">
            <button className="bg-[#F97316] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#EA6C0A] transition duration-300 hover:scale-105">
              Solicitar Acceso
            </button>
            <button className="border border-[#A7F3D0] text-[#A7F3D0] font-semibold px-6 py-3 rounded-lg hover:bg-[#FFFFFF10] transition duration-300">
              Hablar con un Asesor
            </button>
          </div>
        </div>

        {/* Right — stats grid */}
        <div className="grid grid-cols-2 gap-4 flex-1 max-w-xs">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-[#FFFFFF0D] border border-[#FFFFFF1A] rounded-2xl p-5 text-center hover:bg-[#FFFFFF1A] hover:border-[#A7F3D0]/50 transition-all duration-300 group cursor-default"
            >
              <p className="text-white font-black text-3xl group-hover:scale-110 transition-transform duration-300">{s.value}</p>
              <p className="text-[#86EFAC] text-xs uppercase tracking-widest mt-1 group-hover:text-white transition-colors">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}