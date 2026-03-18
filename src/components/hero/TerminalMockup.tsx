import { Icon } from "@/components/ui/Icon";

type ModuleVariant = "completed" | "active" | "locked";

interface ModuleRowProps {
  variant: ModuleVariant;
  title: string;
  author: string;
  duration?: string;
  progress?: number;
}

function ModuleRow({ variant, title, author, duration = "", progress }: ModuleRowProps) {
  if (variant === "completed") {
    return (
      <div className="flex items-center gap-4 p-3 sm:p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors cursor-pointer group relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 rounded-l-xl" />
        <div className="h-14 w-24 bg-neutral-900 rounded-lg relative overflow-hidden flex-shrink-0 border border-white/10">
          <div className="absolute inset-0 bg-gradient-to-tr from-green-900/40 to-black" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon icon="solar:play-bold" className="text-white text-xl opacity-90" />
          </div>
          <div className="absolute bottom-1 right-1 bg-black/80 text-[9px] px-1 rounded text-white font-mono">
            {duration}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm text-white font-medium truncate mb-1">{title}</h4>
          <p className="text-xs text-neutral-500 flex items-center gap-1">
            <Icon icon="solar:user-circle-linear" />
            {author}
          </p>
        </div>
        <div className="hidden sm:flex h-8 w-8 rounded-full border border-green-500/30 items-center justify-center bg-green-500/10 text-green-400 shrink-0">
          <Icon icon="solar:check-read-linear" className="text-lg" />
        </div>
      </div>
    );
  }

  if (variant === "active") {
    return (
      <div className="flex items-center gap-4 p-3 sm:p-4 rounded-xl bg-green-500/5 border border-green-500/20 transition-colors cursor-pointer group relative">
        <div className="h-14 w-24 bg-neutral-900 rounded-lg relative overflow-hidden flex-shrink-0 border border-white/10">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 to-black" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon icon="solar:play-bold" className="text-white text-xl opacity-90" />
          </div>
          {progress !== undefined && (
            <div
              className="absolute bottom-0 left-0 h-1 bg-green-500"
              style={{ width: `${progress}%` }}
            />
          )}
          <div className="absolute bottom-1 right-1 bg-black/80 text-[9px] px-1 rounded text-white font-mono">
            {duration}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm text-white font-medium truncate mb-1">{title}</h4>
          <p className="text-xs text-neutral-500 flex items-center gap-1">
            <Icon icon="solar:user-circle-linear" />
            {author}
          </p>
        </div>
        <div className="hidden sm:block text-xs font-medium text-green-400 border border-green-500/20 bg-green-500/10 px-3 py-1 rounded-full shrink-0">
          In Progress
        </div>
      </div>
    );
  }

  // locked
  return (
    <div className="flex items-center gap-4 p-3 sm:p-4 rounded-xl bg-white/[0.01] border border-transparent hover:bg-white/[0.03] hover:border-white/5 transition-colors cursor-pointer group opacity-60">
      <div className="h-14 w-24 bg-[#0a0a0a] rounded-lg relative flex-shrink-0 border border-white/5 flex items-center justify-center">
        <Icon icon="solar:lock-keyhole-linear" className="text-neutral-500 text-xl" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm text-white font-medium truncate mb-1">{title}</h4>
        <p className="text-xs text-neutral-500 flex items-center gap-1">
          <Icon icon="solar:user-circle-linear" />
          {author}
        </p>
      </div>
      <div className="hidden sm:flex h-8 w-8 rounded-full border border-white/10 items-center justify-center bg-white/5 text-neutral-500 shrink-0">
        <Icon icon="solar:list-arrow-down-linear" className="text-lg" />
      </div>
    </div>
  );
}

export function TerminalMockup() {
  return (
    <div className="w-full max-w-4xl mt-20 relative animate-hero-element animate-terminal">
      <div className="absolute -inset-1 bg-gradient-to-b from-green-500/20 to-transparent blur-2xl rounded-[2rem] -z-10 opacity-70" />

      <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative text-left">
        {/* App Header */}
        <div className="bg-white/[0.02] border-b border-white/5 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-white/10" />
            <div className="w-3 h-3 rounded-full bg-white/10" />
            <div className="w-3 h-3 rounded-full bg-white/10" />
          </div>
          <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full border border-white/5">
            Pathwise AI engine
          </div>
          <div className="w-12" />
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/5 pb-6 mb-6 gap-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-900/40 border border-green-500/20 flex items-center justify-center text-green-400">
                <Icon icon="solar:code-square-linear" className="text-3xl" />
              </div>
              <div>
                <h3 className="text-xl font-display font-medium text-white mb-1">
                  Full-Stack React Development
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm flex items-center gap-2">
                  <Icon icon="solar:clock-circle-linear" />
                  24 Videos • 18h 45m total
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-white/5 text-neutral-300 text-xs border border-white/5 font-medium">
                React
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 text-neutral-300 text-xs border border-white/5 font-medium">
                Node.js
              </span>
            </div>
          </div>

          {/* Learning Modules List */}
          <div className="space-y-3">
            <ModuleRow
              variant="completed"
              title="1. JavaScript Crash Course for React"
              author="Traversy Media"
              duration="1:20:45"
            />
            <ModuleRow
              variant="active"
              title="2. React Core Concepts (Hooks & Props)"
              author="Web Dev Simplified"
              duration="45:12"
              progress={45}
            />
            <ModuleRow
              variant="locked"
              title="3. Next.js App Router Masterclass"
              author="Codevolution"
            />
          </div>

          {/* Footer Action */}
          <div className="mt-6 pt-4 border-t border-white/5 flex justify-center">
            <button
              type="button"
              className="text-xs font-medium text-neutral-400 hover:text-white transition-colors flex items-center gap-2"
            >
              View remaining 21 videos
              <Icon icon="solar:alt-arrow-down-linear" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
