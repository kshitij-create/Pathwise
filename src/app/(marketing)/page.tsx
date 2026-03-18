import { HeroSection } from "@/components/hero/HeroSection";
import { HowItWorksSection } from "@/components/how-it-works/HowItWorksSection";
import { BenefitsSection } from "@/components/benefits/BenefitsSection";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";
import { FaqSection } from "@/components/faq/FaqSection";
import { ScrollAnimationObserver } from "@/components/layout/ScrollAnimationObserver";

export default function Home() {
  return (
    <>
      <ScrollAnimationObserver />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <BenefitsSection />
        <TestimonialsSection />
        <FaqSection />
        {/* Placeholder sections for nav anchors (Example Paths, Pricing) */}
        <section id="paths" className="sr-only" aria-hidden />
        <section id="pricing" className="sr-only" aria-hidden />
      </main>
    </>
  );
}

