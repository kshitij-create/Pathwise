import { AuraBackground } from "@/components/layout/AuraBackground";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuraBackground />
      <Nav />
      {children}
      <Footer />
    </>
  );
}

