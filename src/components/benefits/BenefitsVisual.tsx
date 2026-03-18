import { Icon } from "@/components/ui/Icon";

export function BenefitsVisual() {
  return (
    <div className="relative h-[500px] rounded-3xl border border-white/10 bg-[#0a0a0a] overflow-hidden flex items-center justify-center">
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Floating Path Elements */}
      <div className="relative w-full max-w-sm px-6">
        {/* Node 1 */}
        <div className="glass-panel p-4 rounded-xl flex items-center gap-4 animate-float-slow relative z-20 shadow-2xl">
          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 border border-green-500/30">
            <Icon icon="solar:check-read-linear" />
          </div>
          <div>
            <div className="h-2 w-24 bg-white/20 rounded-full mb-2" />
            <div className="h-2 w-16 bg-white/10 rounded-full" />
          </div>
        </div>

        <div className="h-12 w-0.5 bg-gradient-to-b from-green-500/50 to-white/10 ml-9 my-2" />

        {/* Node 2 */}
        <div className="glass-panel p-4 rounded-xl flex items-center gap-4 animate-float-medium delay-500 relative z-20 shadow-2xl opacity-80">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white border border-white/10">
            <Icon icon="solar:play-bold" />
          </div>
          <div>
            <div className="h-2 w-32 bg-white/20 rounded-full mb-2" />
            <div className="h-2 w-20 bg-white/10 rounded-full" />
          </div>
        </div>

        <div className="h-12 w-0.5 bg-white/10 ml-9 my-2" />

        {/* Node 3 */}
        <div className="glass-panel p-4 rounded-xl flex items-center gap-4 animate-float-fast delay-1000 relative z-20 shadow-2xl opacity-40 border-dashed">
          <div className="w-10 h-10 rounded-full bg-transparent flex items-center justify-center text-neutral-500 border border-white/10 border-dashed">
            <Icon icon="solar:lock-keyhole-linear" />
          </div>
          <div>
            <div className="h-2 w-28 bg-white/10 rounded-full mb-2" />
            <div className="h-2 w-16 bg-white/5 rounded-full" />
          </div>
        </div>
      </div>

      {/* Lighting FX */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/20 blur-[80px] rounded-full pointer-events-none" />
    </div>
  );
}
