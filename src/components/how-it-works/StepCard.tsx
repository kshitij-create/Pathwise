import { Icon } from "@/components/ui/Icon";

interface StepCardProps {
  stepNumber: number;
  icon: string;
  title: string;
  description: string;
  iconClassName?: string;
}

export function StepCard({ stepNumber, icon, title, description, iconClassName }: StepCardProps) {
  return (
    <div className="glass-panel p-8 rounded-2xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <span className="text-8xl font-display font-bold text-white">{stepNumber}</span>
      </div>
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center text-green-400 mb-6 relative z-10 ${iconClassName ?? "bg-white/5 border border-white/10"}`}
      >
        <Icon icon={icon} className="text-2xl" />
      </div>
      <h3 className="text-xl font-medium text-white mb-3 relative z-10">{title}</h3>
      <p className="text-neutral-400 text-sm leading-relaxed relative z-10">{description}</p>
    </div>
  );
}
