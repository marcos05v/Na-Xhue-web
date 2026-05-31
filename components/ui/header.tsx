import Link from 'next/link';

// Nota: Puedes reemplazar estos SVG por los de tu librería de iconos (Heroicons, Lucide, etc.)
export default function Header() {
  return (
    <header className="h-16 w-full bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-50">
      {/* Logotipo izquierdo */}
    
        <span className="text-xl font-bold text-[#0f4c3a] tracking-tight">NA-XHUE-WEB</span>
     

      {/* Navegación Derecha + Acciones */}
      <div className="flex items-center gap-8">
         

        {/* Iconos de carrito, campana y Avatar */}
        <div className="flex items-center gap-4 pl-2">
          <Link href="/dashboard/cart">
          <button className="text-slate-700 hover:text-slate-900 hover:cursor-pointer">
            {/* Icono Carrito */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" /></svg>
          </button>
          </Link>
          
          <button className="text-slate-700 hover:text-slate-900">
            {/* Icono Campana */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" /></svg>
          </button>

          {/* Avatar de usuario */}
          <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-200 ml-2 border border-slate-300">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </header>
  );
}