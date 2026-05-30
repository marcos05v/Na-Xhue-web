'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  // Obtenemos la ruta actual del navegador de forma dinámica
  const pathname = usePathname(); 

  const menuItems = [
    { label: 'Dashboard', href: '/dashboard', icon: 'M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z' },
    { label: 'Inventory', href: '/dashboard/inventory', icon: 'M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z' },
    { label: 'Logistics', href: '/dashboard/logistics', icon: 'M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125a1.125 1.125 0 0 0 1.125-1.125V11.25a9 9 0 0 0-9-9H6.375a1.125 1.125 0 0 0-1.125 1.125v9.375m16.5 0H16.5a2.25 2.25 0 0 0-2.25 2.25v1.5a2.25 2.25 0 0 0 2.25 2.25h3.375a1.125 1.125 0 0 0 1.125-1.125V14.25' },
    { label: 'Suppliers', href: '/dashboard/suppliers', icon: 'M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z' },
    { label: 'Orders', href: '/dashboard/orders', icon: 'M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5A3.375 3.375 0 0 0 10.125 2.25H3.75A1.125 1.125 0 0 0 2.625 3.375v17.25c0 .621.504 1.125 1.125 1.125h12.75a1.125 1.125 0 0 0 1.125-1.125V14.25Z' },
    { label: 'Analytics', href: '/dashboard/analytics', icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v5.625c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 0 1 3 18.75v-5.625ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v10.125c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v14.625c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z' }
  ];

  const bottomItems = [
    { label: 'Settings', href: '/dashboard/settings', icon: 'M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.43l-1.003.767a1.119 1.119 0 0 0-.362 1.03c.004.074.006.148.006.222 0 .074-.002.148-.006.222a1.119 1.119 0 0 0 .362 1.03l1.003.767a1.125 1.125 0 0 1 .26 1.43l-1.296 2.247a1.125 1.125 0 0 1-1.37.49l-1.216-.456a1.125 1.125 0 0 0-1.076.124a6.57 6.57 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281a1.125 1.125 0 0 0-.646-.87a6.555 6.555 0 0 1-.22-.127a1.125 1.125 0 0 0-1.074-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.43l1.004-.767a1.119 1.119 0 0 0 .361-1.03a6.26 6.26 0 0 1-.006-.222c0-.074.002-.148.006-.222a1.119 1.119 0 0 0-.36-1.03l-1.004-.767a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.49l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128c.332-.183.582-.495.644-.869l.214-1.28Z' },
    { label: 'Support', href: '/dashboard/support', icon: 'M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z' }
  ];

  return (
    <aside className="w-64 bg-[#f8faf9] border-r border-slate-100 flex flex-col justify-between h-[calc(100vh-64px)]">
      <div>
        {/* Header interno del Sidebar (Supply Chain HQ) */}
        <div className="px-6 py-5">
          <h2 className="text-xs font-bold text-[#0f4c3a] tracking-wider uppercase">Tianguis Digital</h2>
          <p className="text-sm font-medium text-slate-400 mt-0.5">Almacen</p>
        </div>

        {/* Menú de navegación principal */}
        <nav className="px-3 space-y-1">
          {menuItems.map((item) => {
            // Evaluamos si el pathname actual coincide exactamente con el href del item
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center justify-between group rounded-md py-2.5 pl-3 pr-4 text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-[#edf7f4] text-[#0f4c3a]' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <svg 
                    className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-[#0f4c3a]' : 'text-slate-400 group-hover:text-slate-600'}`} 
                    fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                  <span>{item.label}</span>
                </div>
                
                {/* Línea verde indicadora a la derecha si está activo */}
                {isActive && <div className="w-1 h-5 bg-[#0f4c3a] rounded-full -mr-4" />}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer del Sidebar (Settings y Support) */}
      <div className="px-3 pb-5 space-y-1 border-t border-slate-100 pt-4">
        {bottomItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 rounded-md py-2.5 px-3 text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-[#edf7f4] text-[#0f4c3a]' 
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <svg 
                className={`w-5 h-5 ${isActive ? 'text-[#0f4c3a]' : 'text-slate-400'}`} 
                fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}