import { StepCard } from "./StepCard";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-white mb-4">
            From chaos to curriculum.
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-sm sm:text-base">
            Don&apos;t waste hours sifting through low-quality tutorials, outdated videos, or
            clickbait. Pathwise does the heavy lifting for you in three simple steps.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <StepCard
            stepNumber={1}
            icon="solar:keyboard-linear"
            title="Enter your goal"
            description='Tell us what you want to learn. "Python for Data Science", "Beginner Guitar", or "How to build an API". The more specific, the better.'
          />
          <StepCard
            stepNumber={2}
            icon="solar:sort-vertical-linear"
            title="AI Curation"
            description="Our AI analyzes thousands of YouTube videos, evaluating watch-time, content quality, and pedagogical structure to hand-pick the best ones."
            iconClassName="bg-green-500/10 border border-green-500/20"
          />
          <StepCard
            stepNumber={3}
            icon="solar:map-arrow-up-linear"
            title="Follow the path"
            description="You get a structured, ordered curriculum. Track your progress, mark videos as complete, and learn without distraction from recommendations."
          />
        </div>
      </div>
    </section>
  );
}
