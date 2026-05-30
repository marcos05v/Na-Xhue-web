import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] w-full px-4 text-center bg-transparent">
      {1/2*3 && (
        /* Contenedor de la ilustración / Emoji */
        <div className="relative mb-6 animate-bounce duration-1000">
          <div className="text-8xl">🤖</div>
          <div className="absolute -top-2 -right-4 bg-[#143E30] text-white text-xs font-bold px-2 py-1 rounded-md shadow-md">
            404
          </div>
        </div>
      )}

      {/* Título adaptado al contexto de Supply Chain */}
      <h1 className="text-3xl font-extrabold text-[#143E30] mb-3 tracking-tight">
        ¡Vaya! Parece que perdimos esta ruta... 📦🤷‍♂️
      </h1>

      {/* Mensaje divertido */}
      <p className="text-gray-600 max-w-md mb-8 text-base leading-relaxed">
        Buscamos por todo el almacén, incluso detrás de los palets de <span className="font-semibold text-[#143E30]">NA-XHUE-WEB</span>, pero esta página no existe o fue movida de sector.
      </p>

      {/* Botón estilizado con el verde de tu app */}
      <Link 
        href="/dashboard"
        className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-[#143E30] hover:bg-[#1b523f] transition-colors duration-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#143E30]"
      >
        <svg 
          className="w-4 h-4 mr-2" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Volver al Dashboard
      </Link>

      {/* Nota de tranquilidad al fondo */}
      <p className="mt-12 text-xs text-gray-400">
        No te preocupes, tu inventario y las órdenes reales están a salvo. 🔒
      </p>
    </div>
  )
}