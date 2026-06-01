import Image from "next/image";

const productores = [
  { id: 1, nombre: 'Ana', foto: '/images/cevechería.jpeg' },
  { id: 2, nombre: 'Benito', foto: '/images/Max_logo_chava.png' },
  { id: 3, nombre: 'Carla', foto: '/images/mayordomo.jpeg' },
  { id: 4, nombre: 'David', foto: '/images/xadani.jpeg' },
];

export default function HeroSection() {
  return (
    <section className="w-full bg-[#F5F5F4]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 flex flex-col lg:flex-row items-center justify-between gap-16">
        
        <div className="flex-1 max-w-2xl">
          
          <div className="inline-flex items-center gap-2 bg-white border border-zinc-200 rounded-full px-4 py-2 mb-8 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-sm font-medium text-zinc-700 tracking-tight">
              Logística de alimentos oaxaqueña
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-900 leading-[0.95] mb-8">
            Na Xhue:
            <br />
            El enlace directo entre el campo y tu cocina
          </h1>

          <p className="text-lg md:text-xl text-zinc-600 leading-relaxed max-w-xl mb-10">
            Eliminando intermediarios en Oaxaca para productos más frescos y
            precios justos. Una red inteligente que conecta la herencia agrícola
            con la alta gastronomía.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button className="bg-[#364A29] hover:bg-[#2B3A1F] text-white px-7 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:scale-[1.02]">
              Soy Restaurante
            </button>

            <button className="bg-white border border-zinc-300 hover:border-zinc-400 text-zinc-900 px-7 py-4 rounded-xl font-semibold transition-all duration-300">
              Soy Proveedor
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {productores.map((prod) => (
                <img
                  key={prod.id}
                  src={prod.foto}
                  alt={`Foto de ${prod.nombre}`}
                 className="w-11 h-11 rounded-full border-2 border-white object-cover shadow-md"
                />
              ))}
            </div>

            <p className="text-zinc-600 text-sm md:text-base">
              <span className="font-semibold text-zinc-900">
                +1200 negocios
              </span>{" "}
              locales ya confían en nosotros.
            </p>
          </div>
        </div>

        <div className="flex-1 w-full max-w-2xl relative">
          
          <div className="absolute -inset-4 bg-linear-to-r from-emerald-200 to-orange-100 blur-3xl opacity-40 rounded-full" />

          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/40 bg-white">
            <div className="aspect-4/3 relative">
              <Image
                src="/images/Ingredientes.webp"
                alt="Productos frescos de Oaxaca"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="absolute bottom-5 right-5 bg-white/90 backdrop-blur-xl border border-zinc-200 rounded-2xl px-5 py-4 shadow-xl flex items-center gap-4">
              
              <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center shadow-md">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                  />
                </svg>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-zinc-500 font-medium">
                  Entrega en camino
                </p>

                <p className="text-sm font-semibold text-zinc-900">
                  Restaurante El Colibrí
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}