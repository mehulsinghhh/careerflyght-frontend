import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function MentorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={['mentor', 'admin']}>
      <div className="min-h-screen bg-white">
        {/* Mentor specific navigation */}
        <main className="pt-20 px-6 container mx-auto">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
