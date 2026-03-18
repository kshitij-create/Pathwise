import { AuraBackground } from "@/components/layout/AuraBackground";
import { AppTopNav } from "@/components/app/AppTopNav";

export default function SavedPathsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuraBackground />
      <AppTopNav active="paths" />
      {children}
    </>
  );
}

