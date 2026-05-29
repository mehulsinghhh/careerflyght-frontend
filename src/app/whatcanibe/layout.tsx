import WhatCanIBeNavbar from "@/components/layout/whatcanibe/WhatCanIBeNavbar";
import WhatCanIBeFooter from "@/components/layout/whatcanibe/WhatCanIBeFooter";

export default function WhatCanIBeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black text-zinc-900 dark:text-white transition-colors duration-300">
      <WhatCanIBeNavbar />
      <main className="flex-1">{children}</main>
      <WhatCanIBeFooter />
    </div>
  );
}
