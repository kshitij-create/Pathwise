import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 relative z-10 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400">
            <Icon icon="solar:route-square-linear" className="text-sm" />
          </div>
          <span className="text-sm font-semibold text-neutral-300 tracking-tight">PATHWISE</span>
        </div>

        <div className="flex items-center gap-6 text-xs text-neutral-500">
          <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link href="#" className="hover:text-white transition-colors">Twitter / X</Link>
        </div>

        <p className="text-xs text-neutral-600">
          © 2024 Pathwise. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
