import { BenefitItem } from "./BenefitItem";
import { BenefitsVisual } from "./BenefitsVisual";

export function BenefitsSection() {
  return (
    <section id="benefits" className="py-24 border-t border-white/5 relative z-10 bg-[#050505]/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-display font-medium text-white mb-4">
                Designed for deep learning.
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
                YouTube is an entertainment platform masquerading as an educational one. Pathwise
                strips away the noise, leaving only the knowledge you came for.
              </p>
            </div>

            <div className="space-y-6">
              <BenefitItem
                icon="solar:shield-cross-linear"
                iconClassName="bg-red-500/10 border border-red-500/20 text-red-400"
                title="No Distracting Recommendations"
                description="Stop falling down the rabbit hole. We hide related videos and comments so you stay focused on the lesson."
              />
              <BenefitItem
                icon="solar:layers-minimalistic-linear"
                iconClassName="bg-blue-500/10 border border-blue-500/20 text-blue-400"
                title="Logical Sequencing"
                description="Don't try to learn advanced concepts before the fundamentals. We order videos chronologically based on difficulty."
              />
              <BenefitItem
                icon="solar:chart-square-linear"
                iconClassName="bg-green-500/10 border border-green-500/20 text-green-400"
                title="Progress Tracking"
                description="Know exactly where you left off. Pathwise saves your progress automatically across all devices."
              />
            </div>
          </div>

          <BenefitsVisual />
        </div>
      </div>
    </section>
  );
}
