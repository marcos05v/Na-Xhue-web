interface SuccessScreenProps {
  role: "restaurant" | "supplier";
  onRestart: () => void;
}

export function SuccessScreen({ role, onRestart }: SuccessScreenProps) {
  const isRestaurant = role === "restaurant";
  const accent = isRestaurant ? "#4a7c3f" : "#e8601c";
  const accentLight = isRestaurant ? "#f0f7ee" : "#fef0e8";
  const bgClass = isRestaurant ? "bg-[#2d5a27]" : "bg-[#8a2f0a]";
  const accentMid = isRestaurant ? "#a8d5a2" : "#f4a06a";
  const icon = isRestaurant ? "🍴" : "📦";
  const label = isRestaurant ? "Restaurante" : "Proveedor";
  const nextSteps = isRestaurant
    ? [
        { icon: "🔍", title: "Explora proveedores", desc: "Navega el catálogo de productores certificados" },
        { icon: "📋", title: "Crea tu primer pedido", desc: "Solicita insumos directamente desde la plataforma" },
        { icon: "📊", title: "Revisa tu dashboard", desc: "Monitorea pedidos, entregas y estadísticas" },
      ]
    : [
        { icon: "📦", title: "Sube tu catálogo", desc: "Agrega tus productos y precios" },
        { icon: "🗺️", title: "Configura rutas", desc: "Define tus zonas y centros de distribución" },
        { icon: "📊", title: "Revisa tu dashboard", desc: "Gestiona pedidos y clientes desde un solo lugar" },
      ];

  return (
    <div className="min-h-screen bg-[#faf8f5] flex">
      {/* Left panel */}
      <div className={`hidden lg:flex w-5/12 ${bgClass} flex-col justify-center items-center p-12 relative overflow-hidden`}>
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-20" style={{ background: accent }} />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-30 bg-black/30" />

        <div className="relative z-10 text-center space-y-6">
          <div className="w-24 h-24 rounded-3xl bg-white/15 flex items-center justify-center text-5xl mx-auto border border-white/20">
            {icon}
          </div>
          <div>
            <p className="text-white/50 text-sm uppercase tracking-widest mb-2">Cuenta creada</p>
            <h2 className="text-4xl font-bold text-white" style={{ fontFamily: "'Georgia', serif" }}>
              Bienvenido a<br />
              <span style={{ color: accentMid }}>GastroNext</span>
            </h2>
          </div>
          <p className="text-white/50 text-base max-w-xs mx-auto leading-relaxed">
            Tu cuenta como {label} ha sido verificada y está lista para usar.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
        <div className="w-full max-w-lg text-center">
          {/* Success icon */}
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl"
            style={{ backgroundColor: accentLight }}
          >
            ✅
          </div>

          <h2 className="text-3xl font-bold text-[#1a1a1a] mb-3" style={{ fontFamily: "'Georgia', serif" }}>
            ¡Registro exitoso!
          </h2>
          <p className="text-[#999] text-base mb-10 leading-relaxed">
            Hemos enviado un correo de confirmación a tu dirección registrada. Ya puedes comenzar a usar la plataforma.
          </p>

          {/* Next steps */}
          <div className="text-left space-y-3 mb-10">
            <p className="text-xs font-bold text-[#bbb] uppercase tracking-widest mb-4">Próximos pasos</p>
            {nextSteps.map(({ icon: ic, title, desc }, i) => (
              <div key={title} className="flex items-center gap-4 p-4 rounded-xl border border-[#ede8e0] bg-white hover:border-current transition-colors group">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                  style={{ backgroundColor: accentLight }}
                >
                  {ic}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-[#1a1a1a] text-sm">{title}</p>
                  <p className="text-[#999] text-xs mt-0.5">{desc}</p>
                </div>
                <span className="text-[#ddd] group-hover:text-current transition-colors text-sm" style={{ color: accent }}>→</span>
              </div>
            ))}
          </div>

          <button
            onClick={onRestart}
            className="w-full py-4 rounded-xl text-white font-bold text-base transition-all active:scale-[0.98]"
            style={{ backgroundColor: accent, boxShadow: `0 4px 20px ${accent}35` }}
          >
            Ir al Panel Principal →
          </button>

          <button onClick={onRestart} className="mt-4 text-sm text-[#bbb] hover:text-[#888] transition-colors">
            Volver al inicio de sesión
          </button>
        </div>
      </div>
    </div>
  );
}