"use client";
import { useState } from "react";
import { InputField } from "./FormFields";
import Image from "next/image";
import { Utensils, Package, ArrowLeft } from "lucide-react";

interface LoginScreenProps {
  role: "restaurant" | "supplier";
  onBack: () => void;
  onRegister: () => void;
  onLogin: (email: string, password: string) => void;
}

const CONFIG = {
  restaurant: {
    accent: "#4a7c3f",
    accentLight: "#f0f7ee",
    accentMid: "#a8d5a2",
    icon: Utensils,
    label: "Restaurante",
    placeholder: "restaurante@gastronext.com",
    bgImage: "/images/restaurante.webp", // Ruta local dentro de public/
    stat: [
      { num: "2,400+", label: "Restaurantes activos" },
      { num: "48h", label: "Tiempo de activación" },
      { num: "99.9%", label: "Uptime garantizado" },
    ],
    tagline: "Gestiona tu abastecimiento con productores locales certificados.",
  },
  supplier: {
    accent: "#e8601c",
    accentLight: "#fef0e8",
    accentMid: "#f4a06a",
    icon: Package,
    label: "Proveedor",
    placeholder: "proveedor@empresa.com",
    bgImage: "/images/agricultor.jpg", // Ruta local dentro de public/
    stat: [
      { num: "850+", label: "Proveedores activos" },
      { num: "15K+", label: "Pedidos mensuales" },
      { num: "32", label: "Ciudades cubiertas" },
    ],
    tagline: "Conecta tu negocio con los mejores restaurantes del país.",
  },
};

export function LoginScreen({ role, onBack, onRegister, onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const cfg = CONFIG[role];
  
  const IconComponent = cfg.icon;

  const handleSubmit = async () => {
    if (!email || !password) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] flex">
      {/* Left panel */}
      <div className="hidden lg:flex w-5/12 flex-col justify-between p-12 relative overflow-hidden">
        
        {/* Imagen de Next.js optimizada cubriendo el fondo */}
        <Image
          src={cfg.bgImage}
          alt={`Fondo de ${cfg.label}`}
          fill
          priority
          className="object-cover z-0"
        />

        {/* Capa de superposición (overlay) para contraste de textos */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] z-10" />

        {/* Círculos decorativos sutiles */}
        <div className="absolute -top-32 -left-32 w-125 h-125 rounded-full opacity-10 z-10" style={{ background: cfg.accent }} />

        {/* Logo */}
        <div className="relative z-20">
          <button onClick={onBack} className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm mb-12 group">
            <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" /> 
            Volver al inicio
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center text-white">
              <IconComponent size={24} />
            </div>
            <span className="text-2xl font-bold text-white" style={{ fontFamily: "'Georgia', serif" }}>
              Gastro<span style={{ color: cfg.accentMid }}>Next</span>
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white text-xs font-medium border border-white/20 backdrop-blur-md">
            <IconComponent size={14} style={{ color: cfg.accentMid }} /> Acceso {cfg.label}
          </div>
          <h2 className="text-4xl font-bold text-white leading-tight" style={{ fontFamily: "'Georgia', serif" }}>
            Tu negocio,<br />
            <span style={{ color: cfg.accentMid }}>mejor conectado.</span>
          </h2>
          <p className="text-white/80 text-base leading-relaxed max-w-xs">{cfg.tagline}</p>
        </div>

        {/* Stats */}
        <div className="relative z-20 grid grid-cols-3 gap-3">
          {cfg.stat.map(({ num, label }) => (
            <div key={label} className="bg-black/20 rounded-2xl p-4 border border-white/10 backdrop-blur-md">
              <p className="text-xl font-bold text-white" style={{ fontFamily: "'Georgia', serif" }}>{num}</p>
              <p className="text-white/70 text-xs mt-1 leading-tight">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
        {/* Mobile back */}
        <div className="lg:hidden w-full max-w-md mb-6">
          <button onClick={onBack} className="text-sm text-[#888] hover:text-[#333] transition-colors flex items-center gap-1">
            <ArrowLeft size={16} /> Volver
          </button>
        </div>

        <div className="w-full max-w-md">
          <div className="mb-8">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4 border"
              style={{ backgroundColor: cfg.accentLight, color: cfg.accent, borderColor: `${cfg.accent}30` }}
            >
              <IconComponent size={12} /> {cfg.label}
            </div>
            <h2 className="text-3xl font-bold text-[#1a1a1a]" style={{ fontFamily: "'Georgia', serif" }}>
              Iniciar sesión
            </h2>
            <p className="text-[#999] mt-2">Ingresa tus credenciales para continuar</p>
          </div>

          <div className="space-y-5">
            <InputField
              label="Correo electrónico"
              type="email"
              placeholder={cfg.placeholder}
              value={email}
              onChange={setEmail}
              accentColor={cfg.accent}
            />
            <InputField
              label="Contraseña"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={setPassword}
              accentColor={cfg.accent}
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded cursor-pointer"
                  style={{ accentColor: cfg.accent }}
                />
                <span className="text-sm text-[#888]">Recordarme</span>
              </label>
              <button className="text-sm font-medium hover:underline transition-all" style={{ color: cfg.accent }}>
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!email || !password || loading}
              className="w-full py-3.5 rounded-xl text-white font-bold text-sm tracking-wide transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] mt-2"
              style={{
                backgroundColor: !email || !password || loading ? "#ccc" : cfg.accent,
                boxShadow: email && password ? `0 4px 20px ${cfg.accent}35` : "none",
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                    <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Verificando...
                </span>
              ) : (
                "Entrar"
              )}
            </button>

            <p className="text-center text-sm text-[#aaa] pt-2">
              ¿No tienes una cuenta?{" "}
              <button onClick={onRegister} className="font-semibold hover:underline" style={{ color: cfg.accent }}>
                Regístrate gratis
              </button>
            </p>
          </div>

          <div className="mt-10 pt-8 border-t border-[#ede8e0] flex justify-center gap-6">
            {["Privacidad", "Términos", "Soporte"].map((t) => (
              <a key={t} href="#" className="text-xs text-[#ccc] hover:text-[#888] transition-colors">{t}</a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}