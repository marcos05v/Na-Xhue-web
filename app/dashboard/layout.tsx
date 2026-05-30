import Header from "@/components/ui/header";
import Sidebar from "@/components/ui/sideBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <div className="flex flex-col h-screen overflow-hidden bg-white">
      {/* El Header abarca el 100% superior */}
      <Header />

      {/* Contenedor inferior: Sidebar + Área de Contenido */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        {/* El contenido de tus páginas de Next.js */}
        <main className="flex-1 overflow-y-auto bg-[#fafbfc] p-8">
          {children}
        </main>
      </div>
    </div>
  );
}