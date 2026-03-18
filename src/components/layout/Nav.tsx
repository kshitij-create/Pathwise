import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

export function Nav() {
  return (
    <nav className="fixed z-50 bg-[#050505]/80 w-full border-white/5 border-b top-0 backdrop-blur-md">
      <div className="flex h-16 max-w-7xl mr-auto ml-auto pr-6 pl-6 items-center justify-between">
        <Link href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-green-400 group-hover:bg-green-500/10 transition-colors">
            <Icon icon="solar:route-square-linear" className="text-xl" style={{ strokeWidth: 1.5 }} />
          </div>
          <span className="text-sm font-semibold text-white tracking-tight">PATHWISE</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-xs font-medium text-neutral-400">
          <Link href="#how-it-works" className="hover:text-white transition-colors">
            How it Works
          </Link>
          <Link href="#paths" className="hover:text-white transition-colors">
            Example Paths
          </Link>
          <Link href="#benefits" className="hover:text-white transition-colors">
            Benefits
          </Link>
          <Link href="#pricing" className="hover:text-white transition-colors">
            Pricing
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-xs font-medium text-neutral-400 hover:text-white transition-colors hidden sm:block"
          >
            Log in
          </Link>
          <button className="relative border-gradient bg-transparent hover:bg-white/10 transition-colors text-xs font-semibold text-white rounded-full px-4 py-1.5">
            Generate Path
          </button>
        </div>
      </div>
    </nav>
  );
}
