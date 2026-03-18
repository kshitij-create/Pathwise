export function HeroBadge() {
  return (
    <div className="inline-flex animate-hero-element animate-badge mb-6 items-center">
      <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium backdrop-blur-sm border-green-500/20 bg-green-500/10 text-green-300">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-green-400" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
        New: Generate complete curriculums in seconds
      </div>
    </div>
  );
}
