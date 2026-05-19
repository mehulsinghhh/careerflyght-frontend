import WhatCanIBeNavbar from "@/components/layout/whatcanibe/WhatCanIBeNavbar";
import WhatCanIBeFooter from "@/components/layout/whatcanibe/WhatCanIBeFooter";

export default function WhatCanIBeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <WhatCanIBeNavbar />
      <main className="flex-1">{children}</main>
      <WhatCanIBeFooter />
    </div>
  );
}
