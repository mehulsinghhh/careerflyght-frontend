import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={['student', 'admin']}>
      <div className="min-h-screen bg-zinc-50">
        {/* Sidebar/Navbar will go here in later phases */}
        <main className="pt-20 px-6 container mx-auto">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
