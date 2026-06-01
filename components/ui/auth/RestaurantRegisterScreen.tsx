"use client";
import { useState } from "react";
import { InputField } from "./FormFields";
import Image from "next/image";

interface RestaurantRegisterProps {
  onBack: () => void;
  onSuccess: () => void;
}

export function RestaurantRegisterScreen({ onBack, onSuccess }: RestaurantRegisterProps) {
  const accent = "#4a7c3f";

  const [form, setForm] = useState({
    restaurantName: "",
    rfc: "",
    contactName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (key: keyof typeof form) => (val: string) => setForm((f) => ({ ...f, [key]: val }));
  const isValid = Object.values(form).every(Boolean) && agreed;

  const handleSubmit = async () => {
    if (!isValid) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    onSuccess();
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] flex">

<div className="hidden lg:flex w-5/12 flex-col justify-between p-12 relative overflow-hidden bg-[#2d5a27]">

  <Image
    src="/images/restaurante.webp"
    alt="Registro de restaurante"
    fill
    priority
    sizes="40vw"
    className="object-cover object-center brightness-75 contrast-110 transition-transform duration-700 hover:scale-105"
  />

  <div className="absolute inset-0 bg-gradient-to-b from-[#1a3d18]/70 via-[#2d5a27]/60 to-[#122610]/85 z-0" />

  <div className="relative z-10">
    <button
      onClick={onBack}
      className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm mb-12"
    >
      ← Volver al login
    </button>

    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-2xl">
        🍴
      </div>

      <span
        className="text-2xl font-bold text-white"
        style={{ fontFamily: "'Georgia', serif" }}
      >
        Gastro<span className="text-[#a8d5a2]">Next</span>
      </span>
    </div>
  </div>

  <div className="relative z-10 space-y-6">
    <h2
      className="text-4xl font-bold text-white leading-tight"
      style={{ fontFamily: "'Georgia', serif" }}
    >
      Únete a la red
      <br />
      <span className="text-[#a8d5a2]">gastronómica</span>
      <br />
      más grande.
    </h2>

    <p className="text-white/80 text-base leading-relaxed max-w-xs">
      Accede a cientos de proveedores locales certificados y optimiza tu cadena
      de suministro.
    </p>

    <div className="space-y-3 pt-4">
      {[
        {
          icon: "🔒",
          title: "Registro 100% seguro",
          desc: "Datos encriptados con AES-256",
        },
        {
          icon: "✅",
          title: "Proveedores certificados",
          desc: "Todos los socios pasan verificación",
        },
        {
          icon: "🎧",
          title: "Soporte 24/7",
          desc: "Equipo disponible siempre",
        },
      ].map(({ icon, title, desc }) => (
        <div
          key={title}
          className="flex items-center gap-3 bg-white/10 rounded-xl p-3 backdrop-blur-md border border-white/10"
        >
          <span className="text-xl">{icon}</span>

          <div>
            <p className="text-white text-sm font-semibold">{title}</p>
            <p className="text-white/60 text-xs">{desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>

  <div className="relative z-10 text-white/40 text-xs">
    © 2026 GastroNext S.A.
  </div>
</div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12 overflow-y-auto">
        <div className="lg:hidden w-full max-w-2xl mb-6">
          <button onClick={onBack} className="text-sm text-[#888] hover:text-[#333] transition-colors">← Volver</button>
        </div>

        <div className="w-full max-w-2xl">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4 border bg-[#f0f7ee] text-[#4a7c3f] border-[#4a7c3f]/20">
              🍴 Restaurante
            </div>
            <h2 className="text-3xl font-bold text-[#1a1a1a]" style={{ fontFamily: "'Georgia', serif" }}>
              Registro de Restaurante
            </h2>
            <p className="text-[#999] mt-2">Completa tu perfil profesional para comenzar a abastecer tu cocina.</p>
          </div>

          {/* Form grid */}
          <div className="grid grid-cols-2 gap-5">
            <div className="col-span-2 sm:col-span-1">
              <InputField label="Nombre del Restaurante" placeholder="Ej. The Green Bistro" value={form.restaurantName} onChange={set("restaurantName")} accentColor={accent} required />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <InputField label="RFC" placeholder="XAXX010101000" value={form.rfc} onChange={set("rfc")} accentColor={accent} required />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <InputField label="Nombre de Contacto" placeholder="Nombre completo" value={form.contactName} onChange={set("contactName")} accentColor={accent} required />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <InputField label="Email del Restaurante" type="email" placeholder="correo@restaurante.com" value={form.email} onChange={set("email")} accentColor={accent} required />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <InputField label="Número Telefónico" type="tel" placeholder="+52 55 0000 0000" value={form.phone} onChange={set("phone")} accentColor={accent} required />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <InputField label="Dirección" placeholder="Calle, Col., Ciudad, CP" value={form.address} onChange={set("address")} accentColor={accent} required />
            </div>
          </div>

          <div className="mt-6 space-y-5">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded flex-shrink-0 cursor-pointer"
                style={{ accentColor: accent }}
              />
              <span className="text-sm text-[#888] leading-relaxed">
                Acepto los{" "}
                <a href="#" className="underline font-medium" style={{ color: accent }}>Términos y condiciones</a>{" "}
                y la{" "}
                <a href="#" className="underline font-medium" style={{ color: accent }}>Política de Privacidad</a>{" "}
                de GastroNext
              </span>
            </label>

            <button
              onClick={handleSubmit}
              disabled={!isValid || loading}
              className="w-full py-4 rounded-xl text-white font-bold text-base tracking-wide transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
              style={{
                backgroundColor: isValid && !loading ? accent : "#ccc",
                boxShadow: isValid ? `0 4px 20px ${accent}35` : "none",
              }}
            >
              {loading ? "Creando cuenta..." : "Completar Registro →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}