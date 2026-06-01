"use client";
import { CheckCircle2, Search, ClipboardList, LayoutDashboard, ChevronRight, Package, Store } from "lucide-react";
import Image from "next/image";

interface SuccessScreenProps {
  role: "restaurant" | "supplier";
  onRestart: () => void; // Este debe redirigir al login
}

export function SuccessScreen({ role, onRestart }: SuccessScreenProps) {
  const isRestaurant = role === "restaurant";
  const accent = isRestaurant ? "#4a7c3f" : "#e8601c";
  const accentMid = isRestaurant ? "#a8d5a2" : "#f4a06a";
  const bgImage = isRestaurant ? "/images/rest3.jpeg" : "/images/agricult2.jpeg";
  
  const nextSteps = isRestaurant
    ? [
        { icon: Search, title: "Explora proveedores", desc: "Catálogo de productores certificados" },
        { icon: ClipboardList, title: "Crea tu primer pedido", desc: "Solicita insumos directamente" },
        { icon: LayoutDashboard, title: "Dashboard", desc: "Monitorea pedidos y estadísticas" },
      ]
    : [
        { icon: Package, title: "Sube tu catálogo", desc: "Agrega tus productos y precios" },
        { icon: Store, title: "Configura rutas", desc: "Define tus zonas de distribución" },
        { icon: LayoutDashboard, title: "Dashboard", desc: "Gestiona pedidos y clientes" },
      ];

  return (
    <div className="min-h-screen bg-[#faf8f5] flex font-sans">
      {/* Left panel */}
      <div className="hidden lg:flex w-5/12 flex-col justify-center items-center p-12 relative overflow-hidden">
        <Image
          src={bgImage}
          alt="Registro exitoso"
          fill
          priority
          className="object-cover z-0"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-10" />

        <div className="relative z-20 text-center space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-white/15 backdrop-blur-md flex items-center justify-center mx-auto border border-white/20">
            <CheckCircle2 size={40} className="text-white" />
          </div>
          <div className="space-y-2">
            <p className="text-white/50 text-xs uppercase tracking-[0.2em]">Registro completado</p>
            <h2 className="text-4xl font-extrabold text-white tracking-tight">
              Bienvenido a<br />
              <span style={{ color: accentMid }}>GastroNext</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
        <div className="w-full max-w-md text-center">
          {/* Success Header */}
          <div className="mb-10">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-100">
              <CheckCircle2 size={32} style={{ color: accent }} />
            </div>
            <h2 className="text-3xl font-bold text-[#1a1a1a] tracking-tight">¡Cuenta lista!</h2>
            <p className="text-gray-500 mt-3 leading-relaxed">
              Tu perfil ha sido creado correctamente. Por seguridad, por favor <span className="font-semibold" style={{ color: accent }}>inicia sesión</span> para acceder a tu panel.
            </p>
          </div>

          {/* Next steps simplified */}
          <div className="text-left space-y-3 mb-10">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">¿Qué puedes hacer ahora?</p>
            {nextSteps.map((item) => (
              <div key={item.title} className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-white hover:border-gray-200 transition-all group cursor-default">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gray-50 text-gray-400 group-hover:bg-white transition-colors">
                  <item.icon size={18} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-[#1a1a1a] text-sm tracking-tight">{item.title}</p>
                  <p className="text-gray-400 text-xs">{item.desc}</p>
                </div>
                <ChevronRight size={16} className="text-gray-300 group-hover:translate-x-1 transition-transform" />
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <button
              onClick={onRestart}
              className="w-full py-4 rounded-xl text-white font-bold text-sm tracking-wide transition-all active:scale-[0.98]"
              style={{ backgroundColor: accent, boxShadow: `0 8px 24px ${accent}25` }}
            >
              Ir a Iniciar Sesión
            </button>
            
            <p className="text-xs text-gray-400">
              ¿No recibiste el correo? <button className="underline hover:text-gray-600 transition-colors">Reenviar confirmación</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}