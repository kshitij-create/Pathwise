import { Icon } from "@/components/ui/Icon";

interface BenefitItemProps {
  icon: string;
  iconClassName: string;
  title: string;
  description: string;
}

export function BenefitItem({ icon, iconClassName, title, description }: BenefitItemProps) {
  return (
    <div className="flex gap-4">
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${iconClassName}`}
      >
        <Icon icon={icon} className="text-xl" />
      </div>
      <div>
        <h4 className="text-white font-medium mb-1">{title}</h4>
        <p className="text-sm text-neutral-400">{description}</p>
      </div>
    </div>
  );
}
