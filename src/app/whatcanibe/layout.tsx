import WhatCanIBeNavbar from "@/components/layout/whatcanibe/WhatCanIBeNavbar";
import WhatCanIBeFooter from "@/components/layout/whatcanibe/WhatCanIBeFooter";

export default function WhatCanIBeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white selection:bg-violet-500/30">
      {/* Noise Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
      />

      <WhatCanIBeNavbar />
      <main className="flex-1">{children}</main>
      <WhatCanIBeFooter />
    </div>
  );
}
