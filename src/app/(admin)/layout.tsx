import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="min-h-screen bg-zinc-950 text-white">
        <main className="pt-20 px-6 container mx-auto">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
