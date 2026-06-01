"use client";
import { useState } from "react";
import { InputField, SelectField } from "./FormFields";
import Image from "next/image";
import { Package, ArrowLeft, Globe, Truck, MapPin, CheckCircle2 } from "lucide-react";

interface SupplierRegisterProps {
  onBack: () => void; // Este debe redirigir a la pantalla de Login
  onSuccess: () => void; // Este debe redirigir a la pantalla de Login tras éxito
}

const CATEGORIES = [
  "Frutas y Verduras", "Carnes y Embutidos", "Lácteos y Quesos",
  "Panadería y Repostería", "Bebidas y Licores", "Mariscos y Pescados",
  "Especias y Condimentos", "Granos y Cereales",
];

export function SupplierRegisterScreen({ onBack, onSuccess }: SupplierRegisterProps) {
  const accent = "#e8601c";
  const accentMid = "#f4a06a";

  const [form, setForm] = useState({
    companyName: "", rfc: "", contactPerson: "",
    category: "", email: "", phone: "", address: "",
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
    <div className="min-h-screen bg-[#faf8f5] flex font-sans">
      {/* Left panel */}
      <div className="hidden lg:flex w-5/12 flex-col justify-between p-12 relative overflow-hidden">
        <Image
          src="/images/agricOax.jpeg"
          alt="Registro Proveedor"
          fill
          priority
          className="object-cover z-0"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-10" />

        <div className="relative z-20">
          <button onClick={onBack} className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm mb-12 group">
            <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" /> 
            Volver al inicio
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center text-white">
              <Package size={24} />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">
              Gastro<span style={{ color: accentMid }}>Next</span>
            </span>
          </div>
        </div>

        <div className="relative z-20 space-y-6">
          <h2 className="text-4xl font-extrabold text-white leading-tight tracking-tight">
            Lleva tus productos<br />
            <span style={{ color: accentMid }}>a miles</span> de clientes.
          </h2>
          <div className="space-y-4 pt-4">
            {[
              { icon: Globe, title: "Red Verificada", desc: "Compradores validados" },
              { icon: Truck, title: "Soporte Logístico", desc: "Gestión de rutas optimizada" },
              { icon: MapPin, title: "Geocodificación", desc: "Entregas precisas siempre" },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-4 bg-white/10 rounded-xl p-3 border border-white/10 backdrop-blur-md">
                <item.icon size={20} className="text-white" style={{ color: accentMid }} />
                <div>
                  <p className="text-white text-sm font-semibold">{item.title}</p>
                  <p className="text-white/60 text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-20 text-white/40 text-xs">© 2026 GastroNext S.A.</div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12 overflow-y-auto">
        <div className="w-full max-w-2xl">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4 border bg-[#fef0e8] text-[#e8601c] border-[#e8601c]/20">
              <Package size={12} /> Proveedor
            </div>
            <h2 className="text-3xl font-bold text-[#1a1a1a] tracking-tight">Registro de Proveedor</h2>
            <p className="text-[#999] mt-2">Crea tu perfil de negocio y empieza a vender.</p>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="col-span-2 sm:col-span-1"><InputField label="Nombre de Empresa" placeholder="Razón Social" value={form.companyName} onChange={set("companyName")} accentColor={accent} /></div>
            <div className="col-span-2 sm:col-span-1"><InputField label="RFC" placeholder="XAXX010101000" value={form.rfc} onChange={set("rfc")} accentColor={accent} /></div>
            <div className="col-span-2 sm:col-span-1"><InputField label="Contacto" placeholder="Nombre completo" value={form.contactPerson} onChange={set("contactPerson")} accentColor={accent} /></div>
            <div className="col-span-2 sm:col-span-1"><SelectField label="Categoría" options={CATEGORIES} value={form.category} onChange={set("category")} accentColor={accent} /></div>
            <div className="col-span-2 sm:col-span-1"><InputField label="Email" type="email" placeholder="operaciones@empresa.com" value={form.email} onChange={set("email")} accentColor={accent} /></div>
            <div className="col-span-2 sm:col-span-1"><InputField label="Teléfono" type="tel" placeholder="+52 55..." value={form.phone} onChange={set("phone")} accentColor={accent} /></div>
            <div className="col-span-2"><InputField label="Dirección de Distribución" placeholder="Calle, Colonia, CP..." value={form.address} onChange={set("address")} accentColor={accent} /></div>
          </div>

          <div className="mt-6 space-y-5">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="w-4 h-4 mt-1 rounded border-gray-300" style={{ accentColor: accent }} />
              <span className="text-sm text-[#888] leading-snug group-hover:text-gray-600 transition-colors">
                Acepto los <span className="font-medium" style={{ color: accent }}>Términos</span> y la <span className="font-medium" style={{ color: accent }}>Política de Privacidad</span>.
              </span>
            </label>
            <button
              onClick={handleSubmit}
              disabled={!isValid || loading}
              className="w-full py-4 rounded-xl text-white font-bold transition-all disabled:opacity-40"
              style={{ backgroundColor: isValid ? accent : "#ccc", boxShadow: isValid ? `0 4px 20px ${accent}35` : "none" }}
            >
              {loading ? "Procesando..." : "Completar Registro"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}