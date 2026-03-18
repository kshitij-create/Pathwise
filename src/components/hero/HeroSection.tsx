import { HeroBadge } from "./HeroBadge";
import { HeroTitle } from "./HeroTitle";
import { HeroDescription } from "./HeroDescription";
import { HeroCTAs } from "./HeroCTAs";
import { TerminalMockup } from "./TerminalMockup";

export function HeroSection() {
  return (
    <section className="overflow-hidden pt-32 pb-20 relative">
      {/* Background Gradients */}
      <div className="-translate-x-1/2 blur-[100px] pointer-events-none -z-10 bg-green-900/20 w-[1000px] h-[400px] rounded-full absolute top-0 left-1/2" />

      <div className="sm:px-6 lg:px-8 flex flex-col z-10 text-center max-w-7xl mr-auto ml-auto pr-6 pl-6 relative items-center">
        <HeroBadge />
        <HeroTitle />
        <HeroDescription />
        <HeroCTAs />
        <TerminalMockup />
      </div>
    </section>
  );
}
