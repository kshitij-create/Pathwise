import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

export function HeroCTAs() {
  return (
    <div className="flex flex-col sm:flex-row gap-6 mt-10 gap-x-6 gap-y-6 items-center justify-center animate-hero-element animate-install">
      <button
        type="button"
        className="shiny-cta group overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 rounded-full relative shadow-2xl"
      >
        <div className="shiny-cta-bg absolute inset-0 rounded-full" />
        <div className="relative z-10 px-8 py-3.5 flex items-center gap-2 text-sm font-semibold text-white bg-[#0a0a0a] m-[1px] rounded-full hover:bg-[#111] transition-colors">
          <Icon icon="solar:magic-stick-3-linear" className="text-lg text-green-400" />
          Generate Your Path
        </div>
      </button>

      <Link
        href="#how-it-works"
        className="group px-8 py-3.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-sm font-semibold text-white flex items-center gap-2 backdrop-blur-sm shadow-xl"
      >
        See How It Works
        <Icon icon="solar:arrow-down-linear" className="text-lg text-neutral-400 group-hover:translate-y-1 transition-transform" />
      </Link>
    </div>
  );
}
