import Link from "next/link";

export default function NavbarWeb() {
  const navLinks = [
    { name: "Cómo Funciona", href: "#como-funciona" },
    { name: "Beneficios", href: "#beneficios" },
    { name: "Impacto", href: "#impacto" }
  ];

  return (
    <>
    <nav className="w-full h-16 flex items-center justify-between px-4 mt-3 sticky top-0 bg-white/90 backdrop-blur-md z-50 transition-all duration-300">
        <div className="flex items-center justify-between w-full">
            <div>
                <h1 className="text-[#064E3B] font-black text-4xl cursor-pointer hover:scale-105 transition-transform duration-200">
                    Na Xhue
                </h1>
            </div>

            {/* ENLACES DE NAVEGACIÓN CENTRALES */}
            <div className="hidden md:flex items-center gap-6">
                {navLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        className="text-[#57534E] font-light text-base px-3 py-2 hover:text-[#064E3B] relative group transition-colors duration-300"
                    >
                        {link.name}
                        {/* Línea animada inferior estilo Na Xhue */}
                        <span className="absolute bottom-0 left-3 w-0 h-0.5 bg-[#364A29] transition-all duration-300 group-hover:w-[80%]"></span>
                    </a>
                ))}
            </div>

            <div className="flex gap-2">
                <Link href="/login" passHref>
                    <div className="px-4 py-2">
                        <h2 className="text-[#57534E] font-light text-xl px-2 py-2 hover:cursor-pointer hover:text-[#1C1917] transition-colors">
                            Log In
                        </h2>
                    </div>
                </Link>
                <Link href="/login" passHref>
                    <div className="bg-[#364A29] rounded-lg px-4 py-2 m-2 hover:bg-[#2B3A1F] transition duration-300 transform hover:scale-105 hover:cursor-pointer">
                        <button className="text-white font-bold text-m hover:cursor-pointer">
                            Join Network
                        </button>
                    </div>
                </Link>
            </div>
        </div>
    </nav>
    </>
  );
}