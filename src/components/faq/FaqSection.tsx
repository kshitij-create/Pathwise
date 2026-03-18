"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

interface FaqItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

function FaqItem({ question, answer, defaultOpen = false }: FaqItemProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-white/10 rounded-xl bg-[#050505]/80 hover:bg-white/[0.03] transition-colors">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full px-4 py-4 sm:px-6 sm:py-5 flex items-start justify-between gap-4 text-left"
      >
        <div>
          <h3 className="text-sm sm:text-base font-medium text-white">
            {question}
          </h3>
        </div>
        <span
          className={`mt-0.5 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-300 transition-transform duration-300 ${
            open ? "rotate-90" : ""
          }`}
        >
          <Icon icon="solar:alt-arrow-right-linear" className="h-3.5 w-3.5" />
        </span>
      </button>
      <div
        className={`px-4 sm:px-6 pb-5 pt-0 overflow-hidden transition-all duration-300 ease-out ${
          open ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1"
        }`}
      >
        <p className="text-sm text-neutral-400 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export function FaqSection() {
  const faqs: FaqItemProps[] = [
    {
      question: "What does this platform do?",
      answer:
        "This platform helps you learn any skill by turning scattered YouTube tutorials into a structured learning path. Instead of searching for videos one by one, you can enter a topic you want to learn and receive an organized curriculum built from the best available tutorials.",
      defaultOpen: true,
    },
    {
      question: "How does the learning path generator work?",
      answer:
        "When you enter a topic, the system analyzes relevant YouTube tutorials and selects high-quality videos. It removes redundant or low-value content and organizes the remaining videos into structured modules that progress from beginner to advanced.",
    },
    {
      question: "Is the platform free to use?",
      answer:
        "The platform provides free access to generate learning paths and explore curated tutorials. Additional features such as advanced learning tools, progress tracking, and personalized recommendations may be available through a premium plan.",
    },
    {
      question: "Does this replace YouTube?",
      answer:
        "No. The platform works alongside YouTube by organizing existing tutorials into a structured format. You still watch the videos directly from YouTube, but the platform helps you follow a clear learning order.",
    },
    {
      question: "How are videos selected for a learning path?",
      answer:
        "Videos are selected based on factors such as relevance to the topic, engagement, clarity of instruction, and overall quality. The system prioritizes tutorials that provide strong educational value and removes repetitive or outdated content.",
    },
    {
      question: "What kinds of topics can I learn?",
      answer:
        "You can generate learning paths for a wide variety of subjects, including programming, languages, design, music production, video editing, business skills, and many other topics available on YouTube.",
    },
    {
      question: "How long does a learning path take to complete?",
      answer:
        "Each learning path includes an estimated total learning time based on the duration of the curated videos. This helps learners plan their study schedule and understand the commitment required for each topic.",
    },
    {
      question: "Who is this platform designed for?",
      answer:
        "The platform is designed for anyone who wants to learn more efficiently from online content. It is especially useful for self-learners, students, professionals developing new skills, and anyone who prefers structured learning over random tutorial searching.",
    },
  ];

  return (
    <section className="py-24 border-t border-white/5 relative z-10 bg-[#050505]/90">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-white mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto">
            Answers to common questions about how Pathwise turns YouTube chaos into
            clear, structured learning journeys.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <FaqItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              defaultOpen={faq.defaultOpen}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

