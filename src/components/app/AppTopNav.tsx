import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

type ActiveKey = "dashboard" | "paths";

function NavLink({
  href,
  active,
  children,
}: Readonly<{
  href: string;
  active: boolean;
  children: React.ReactNode;
}>) {
  return (
    <Link
      href={href}
      className={
        active
          ? "px-3 py-1.5 text-white bg-white/10 rounded-md transition-colors"
          : "px-3 py-1.5 text-neutral-400 hover:text-white hover:bg-white/5 rounded-md transition-colors"
      }
    >
      {children}
    </Link>
  );
}

export function AppTopNav({ active }: Readonly<{ active: ActiveKey }>) {
  return (
    <nav className="fixed z-50 bg-[#050505]/80 w-full border-white/5 border-b top-0 backdrop-blur-md">
      <div className="flex h-14 max-w-[1600px] mx-auto px-4 sm:px-6 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/app" className="flex items-center gap-2 group">
            <span className="text-lg font-display font-semibold tracking-tight text-white flex items-center gap-2">
              <Icon icon="solar:route-bold-duotone" className="text-green-400 text-xl" />
              PATHWISE
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-1 text-sm font-medium">
            <NavLink href="/app" active={active === "dashboard"}>
              Dashboard
            </NavLink>
            <NavLink href="/app/paths" active={active === "paths"}>
              My Paths
            </NavLink>
            <span className="px-3 py-1.5 text-neutral-500 rounded-md">Explore</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="text-neutral-400 hover:text-white transition-colors relative p-1"
            aria-label="Notifications"
          >
            <Icon icon="solar:bell-linear" className="text-xl" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full border border-[#050505]" />
          </button>
          <div className="w-px h-4 bg-white/10 mx-1" />
          <button
            type="button"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            aria-label="User menu"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-green-500 to-blue-500 flex items-center justify-center text-xs font-semibold text-white shadow-inner">
              J
            </div>
            <Icon icon="solar:alt-arrow-down-linear" className="text-neutral-500 text-sm" />
          </button>
        </div>
      </div>
    </nav>
  );
}

