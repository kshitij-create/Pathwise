import { AuraBackground } from "@/components/layout/AuraBackground";
import { AppTopNav } from "@/components/app/AppTopNav";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuraBackground />
      <AppTopNav active="dashboard" />
      {children}
    </>
  );
}

