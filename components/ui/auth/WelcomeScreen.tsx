"use client";
import { GastroNextLogo } from "./GastroNextLogo";
import Image from "next/image";

interface WelcomeScreenProps {
  onSelectRole: (role: "restaurant" | "supplier") => void;
}

export function WelcomeScreen({ onSelectRole }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-[#faf8f5] flex">
      <div className="hidden lg:flex w-1/2 flex-col justify-between p-12 relative overflow-hidden bg-[#2d5a27]">
        
        <Image
          src="/images/NaXhue_Rep.png" 
          alt="Conectando el campo con restaurantes"
          fill
          priority
          sizes="50vw"
          className="object-cover object-center transition-transform duration-700 hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#1a3d18]/15 via-[#2d5a27]/50 to-[#122610]/95 z-0 dynamic-overlay" />

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center text-2xl backdrop-blur-md border border-white/10">
              🍃
            </div>
            <span className="text-2xl font-bold text-white" style={{ fontFamily: "'Georgia', serif" }}>
              Na<span className="text-[#f4a06a]">Xhue</span>
            </span>
          </div>
        </div>

        <div className="relative z-10 space-y-6 my-auto py-12">
          <h1 className="text-5xl font-bold text-white leading-tight drop-shadow-sm" style={{ fontFamily: "'Georgia', serif" }}>
            Conectamos<br />
            <span className="text-[#a8d5a2]">Restaurantes</span><br />
            con el campo.
          </h1>
          <p className="text-white/80 text-lg leading-relaxed max-w-sm drop-shadow-sm">
            La plataforma B2B líder para el sector gastronómico. Productores locales, logística inteligente.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-3 gap-4">
          {[
            { num: "2,400+", label: "Restaurantes" },
            { num: "850+", label: "Proveedores" },
            { num: "98%", label: "Satisfacción" },
          ].map(({ num, label }) => (
            <div key={label} className="bg-white/10 rounded-2xl p-4 backdrop-blur-md border border-white/15 shadow-2xl">
              <p className="text-2xl font-bold text-white" style={{ fontFamily: "'Georgia', serif" }}>{num}</p>
              <p className="text-white/60 text-xs font-medium uppercase tracking-wider mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <GastroNextLogo size="md" />
          </div>

          <h2 className="text-5xl font-bold text-[#1a1a1a] mb-2" style={{ fontFamily: "'Georgia', serif" }}>
            Bienvenido de nuevo
          </h2>
          <p className="text-[#888] mb-10 text-base">Selecciona como deseas acceder</p>

          <div className="space-y-4">
            <button
              onClick={() => onSelectRole("restaurant")}
              className="group w-full flex items-center gap-5 px-6 py-5 rounded-2xl border-2 border-[#e8ede6] bg-[#f8fdf7] hover:border-[#4a7c3f] hover:bg-white hover:shadow-lg hover:shadow-[#4a7c3f]/10 transition-all duration-300 text-left cursor-pointer"
            >
              <div className="w-14 h-14 bg-[#4a7c3f] rounded-2xl flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform duration-300">
                🍴
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-[#4a7c3f] uppercase tracking-widest mb-1">Inicia como: </p>
                <p className="text-xl font-bold text-[#1a1a1a]" style={{ fontFamily: "'Georgia', serif" }}>Restaurante</p>
                <p className="text-sm text-[#999] mt-0.5">Gestiona pedidos, proveedores y logística</p>
              </div>
              <span className="text-[#4a7c3f] text-xl opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">→</span>
            </button>

            <button
              onClick={() => onSelectRole("supplier")}
              className="group w-full flex items-center gap-5 px-6 py-5 rounded-2xl border-2 border-[#f5e8e0] bg-[#fef9f7] hover:border-[#e8601c] hover:bg-white hover:shadow-lg hover:shadow-[#e8601c]/10 transition-all duration-300 text-left cursor-pointer"
            >
              <div className="w-14 h-14 bg-[#e8601c] rounded-2xl flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform duration-300">
                📦
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-[#e8601c] uppercase tracking-widest mb-1">Inicia como: </p>
                <p className="text-xl font-bold text-[#1a1a1a]" style={{ fontFamily: "'Georgia', serif" }}>Proveedor</p>
                <p className="text-sm text-[#999] mt-0.5">Administra tu catálogo, clientes y rutas</p>
              </div>
              <span className="text-[#e8601c] text-xl opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">→</span>
            </button>
          </div>

          <div className="mt-10 pt-8 border-t border-[#ede8e0] flex justify-center gap-6">
            {["Términos y Condiciones", "Aviso de Privacidad", "Soporte"].map((link) => (
              <a key={link} href="#" className="text-xs text-[#bbb] hover:text-[#666] transition-colors">
                {link}
              </a>
            ))}
          </div>
          <p className="text-center text-xs text-[#ddd] mt-3">© 2026 Na Xhue S.A.</p>
        </div>
      </div>
    </div>
  );
}