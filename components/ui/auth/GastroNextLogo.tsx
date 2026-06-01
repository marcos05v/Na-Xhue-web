export function GastroNextLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: { container: "w-10 h-10", text: "text-base" },
    md: { container: "w-14 h-14", text: "text-xl" },
    lg: { container: "w-20 h-20", text: "text-3xl" },
  };

  return (
    <div className="flex items-center gap-3">
      <div
        className={`${sizes[size].container} rounded-2xl bg-gr  adient-to-br from-[#4a7c3f] to-[#2d5a27] flex items-center justify-center shadow-lg flex-shrink-0`}
      >
        <span className={sizes[size].text}>🍃</span>
      </div>
      <span className="font-bold tracking-tight text-2xl" style={{ fontFamily: "'Georgia', serif" }}>
        <span className="text-[#2d5a27]">Na</span>
        <span className="text-[#e8601c]">Xhue</span>
      </span>
    </div>
  );
}