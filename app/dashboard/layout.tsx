export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-gray-50">
        <nav className="p-4">
            <h1>Componente del dashboard</h1>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}