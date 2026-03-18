"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import type { LearningPath } from "@/lib/learningPath/types";
import { generatePath } from "@/lib/learningPath/api";

function TopicChip({
  label,
  onClick,
}: Readonly<{ label: string; onClick: () => void }>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-xs font-medium text-neutral-300 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors rounded-full px-3 py-1.5"
    >
      {label}
    </button>
  );
}

function StepCard({
  step,
  icon,
  title,
  description,
}: Readonly<{ step: string; icon: string; title: string; description: string }>) {
  return (
    <div className="glass-panel rounded-2xl p-6 border border-white/10 relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-500/10 blur-[70px] rounded-full pointer-events-none" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-semibold tracking-wider uppercase text-neutral-500">
            {step}
          </span>
          <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-green-300">
            <Icon icon={icon} className="text-lg" />
          </div>
        </div>
        <h3 className="text-white font-medium mb-2">{title}</h3>
        <p className="text-sm text-neutral-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function PreviewModule({
  title,
  bullets,
}: Readonly<{ title: string; bullets: string[] }>) {
  return (
    <div className="border border-white/10 rounded-xl bg-black/30 overflow-hidden">
      <div className="px-4 py-3 border-b border-white/5 bg-white/[0.03]">
        <h4 className="text-sm font-medium text-white">{title}</h4>
      </div>
      <div className="p-4 space-y-2">
        {bullets.map((b) => (
          <div
            key={b}
            className="flex items-center gap-2 text-xs text-neutral-400"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400/70" />
            <span className="truncate">{b}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function OnboardingDashboard({
  onGenerateFirstPath,
}: Readonly<{ onGenerateFirstPath: (path: LearningPath) => void }>) {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);

  const suggestions = useMemo(
    () => [
      "Learn React",
      "Learn Python",
      "Learn Spanish",
      "Learn Video Editing",
      "Learn Music Production",
    ],
    []
  );

  const popularTopics = useMemo(
    () => [
      "Web Development",
      "Data Science",
      "Graphic Design",
      "Language Learning",
      "Music Production",
      "Digital Marketing",
    ],
    []
  );

  async function generate(topicText: string) {
    if (!topicText.trim()) return;
    setLoading(true);
    try {
      const path = await generatePath(topicText);
      onGenerateFirstPath(path);
    } catch (err) {
      alert("Failed to generate path. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-[1600px] mx-auto pt-20 pb-16 px-4 sm:px-6">
      {/* Welcome */}
      <section className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 relative overflow-hidden mb-8">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-green-500/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-start justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium backdrop-blur-sm border-green-500/20 bg-green-500/10 text-green-300 mb-5">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              New here? Let’s build your first learning path.
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight text-white mb-4">
              Welcome to YouTube Learning Path Generator
            </h1>
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
              Turn scattered YouTube tutorials into structured learning paths so you can learn any
              skill without spending hours searching for the “right” video. In a few seconds, you’ll
              have an organized curriculum with modules, estimated learning time, and progress
              tracking.
            </p>
          </div>

          <div className="w-full lg:w-[380px] border border-white/10 rounded-2xl bg-black/30 p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
              <Icon icon="solar:route-square-linear" className="text-green-300" />
              Quick start
            </div>
            <ol className="space-y-2 text-sm text-neutral-400">
              <li className="flex gap-2">
                <span className="text-neutral-500">1.</span> Type a topic.
              </li>
              <li className="flex gap-2">
                <span className="text-neutral-500">2.</span> Generate your path.
              </li>
              <li className="flex gap-2">
                <span className="text-neutral-500">3.</span> Start learning & track progress.
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* First action */}
      <section className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-display font-semibold text-white tracking-tight">
            Generate your first learning path
          </h2>
          <p className="text-sm text-neutral-400 mt-2">
            What do you want to learn today?
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative w-full group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Icon
                icon="solar:magic-stick-3-linear"
                className="text-neutral-400 text-xl group-focus-within:text-green-400 transition-colors"
              />
            </div>
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              type="text"
              className="w-full bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-xl py-4 pl-12 pr-32 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all shadow-lg"
              placeholder="What do you want to learn today?"
            />
            <div className="absolute inset-y-2 right-2 flex items-center">
              <button
                type="button"
                onClick={() => generate(topic)}
                disabled={loading}
                className="bg-white text-black text-xs font-semibold px-4 py-2 rounded-lg hover:bg-neutral-200 disabled:opacity-50 transition-colors flex items-center gap-1.5 shadow-sm"
              >
                {loading ? "Generating..." : "Generate Path"}
                <Icon
                  icon={loading ? "solar:refresh-linear" : "solar:arrow-right-linear"}
                  className={loading ? "animate-spin" : ""}
                />
              </button>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {suggestions.map((s) => (
              <TopicChip key={s} label={s} onClick={() => generate(s)} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mb-12">
        <div className="flex items-end justify-between gap-6 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-display font-semibold text-white tracking-tight">
              How the platform works
            </h2>
            <p className="text-sm text-neutral-400 mt-2">
              Five simple steps from “I want to learn X” to a complete curriculum.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-4">
          <StepCard
            step="Step 1"
            icon="solar:keyboard-linear"
            title="Enter a topic"
            description="Type what you want to learn in plain language."
          />
          <StepCard
            step="Step 2"
            icon="solar:magnifer-linear"
            title="Analyze YouTube"
            description="We find relevant tutorials for your goal."
          />
          <StepCard
            step="Step 3"
            icon="solar:shield-check-linear"
            title="Select quality"
            description="High-quality videos are prioritized and filtered."
          />
          <StepCard
            step="Step 4"
            icon="solar:layers-minimalistic-linear"
            title="Organize modules"
            description="Content is ordered from beginner to advanced."
          />
          <StepCard
            step="Step 5"
            icon="solar:clock-circle-linear"
            title="Get your path"
            description="A complete roadmap with time estimates and progress."
          />
        </div>
      </section>

      {/* Example preview */}
      <section className="mb-12">
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-8">
            <div>
              <span className="bg-white/5 text-neutral-300 border border-white/10 px-2.5 py-1 rounded text-[10px] font-semibold tracking-wide uppercase">
                Example preview
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-semibold tracking-tight text-white mt-4">
                Example learning path: Full-Stack Web Development
              </h2>
              <p className="text-sm text-neutral-400 mt-3 max-w-2xl">
                This is what you’ll get after generating a topic—modules, lessons, and an estimated
                time to help you plan your learning.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-neutral-400">
              <span className="flex items-center gap-2">
                <Icon icon="solar:clock-circle-linear" className="text-lg" /> 28h 30m total
              </span>
              <span className="flex items-center gap-2">
                <Icon icon="solar:folder-linear" className="text-lg" /> 4 Modules
              </span>
              <span className="flex items-center gap-2">
                <Icon icon="solar:video-library-linear" className="text-lg" /> 22 Videos
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            <PreviewModule
              title="Module 1 – Fundamentals"
              bullets={[
                "What is the web? HTML/CSS basics",
                "JavaScript fundamentals",
                "Developer workflow & tooling",
              ]}
            />
            <PreviewModule
              title="Module 2 – Core Concepts"
              bullets={[
                "React components & state",
                "APIs & data fetching",
                "Git fundamentals",
              ]}
            />
            <PreviewModule
              title="Module 3 – Practical Projects"
              bullets={[
                "Build a responsive UI",
                "Connect to an API",
                "Deploy your first app",
              ]}
            />
            <PreviewModule
              title="Module 4 – Advanced Topics"
              bullets={[
                "Performance & caching",
                "Auth & security basics",
                "Testing & maintainability",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Suggested topics */}
      <section className="mb-12">
        <div className="flex items-end justify-between gap-6 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-display font-semibold text-white tracking-tight">
              Suggested topics
            </h2>
            <p className="text-sm text-neutral-400 mt-2">
              Popular starting points—generate a path with one click.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularTopics.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => generate(`Learn ${t}`)}
              className="glass-panel rounded-2xl p-5 border border-white/10 hover:bg-white/[0.03] transition-colors text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">{t}</h3>
                  <p className="text-xs text-neutral-500 mt-1">Generate a structured curriculum</p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300">
                  <Icon icon="solar:arrow-right-linear" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Benefits + progress preview */}
      <section className="mb-12 grid lg:grid-cols-2 gap-6">
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10">
          <h2 className="text-xl sm:text-2xl font-display font-semibold text-white tracking-tight mb-4">
            Why you’ll love learning this way
          </h2>
          <ul className="space-y-3 text-sm text-neutral-400">
            <li className="flex gap-3">
              <Icon icon="solar:clock-circle-linear" className="text-green-300 mt-0.5" />
              Saves hours searching YouTube tutorials
            </li>
            <li className="flex gap-3">
              <Icon icon="solar:layers-minimalistic-linear" className="text-green-300 mt-0.5" />
              Organizes content into structured courses
            </li>
            <li className="flex gap-3">
              <Icon icon="solar:filter-linear" className="text-green-300 mt-0.5" />
              Removes repetitive tutorials
            </li>
            <li className="flex gap-3">
              <Icon icon="solar:map-arrow-up-linear" className="text-green-300 mt-0.5" />
              Helps you follow a clear learning roadmap
            </li>
            <li className="flex gap-3">
              <Icon icon="solar:notebook-linear" className="text-green-300 mt-0.5" />
              Turns free YouTube content into a learning curriculum
            </li>
          </ul>
        </div>

        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 relative overflow-hidden">
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-green-500/10 blur-[80px] rounded-full pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-xl sm:text-2xl font-display font-semibold text-white tracking-tight mb-4">
              Track your progress
            </h2>
            <p className="text-sm text-neutral-400 mb-6">
              Mark lessons as completed and watch your progress update across modules.
            </p>

            <div className="space-y-2.5 mb-6">
              <div className="flex justify-between items-end text-sm">
                <span className="font-medium text-white">Course Progress</span>
                <span className="text-green-400 font-semibold tracking-tight">32%</span>
              </div>
              <div className="h-2 w-full bg-black/50 border border-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 w-[32%] rounded-full" />
              </div>
            </div>

            <div className="space-y-3">
              {[
                { label: "Module 1 – Fundamentals", done: true },
                { label: "Module 2 – Core Concepts", done: false },
                { label: "Module 3 – Practical Projects", done: false },
              ].map((m) => (
                <div
                  key={m.label}
                  className="flex items-center justify-between p-3 rounded-xl border border-white/10 bg-black/30"
                >
                  <span className="text-sm text-neutral-300">{m.label}</span>
                  <span
                    className={`inline-flex items-center gap-2 text-xs font-medium ${
                      m.done ? "text-green-300" : "text-neutral-500"
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                        m.done
                          ? "bg-green-500/10 border-green-500/20"
                          : "bg-white/5 border-white/10"
                      }`}
                    >
                      <Icon
                        icon={
                          m.done
                            ? "solar:check-read-linear"
                            : "solar:lock-keyhole-linear"
                        }
                        className="text-sm"
                      />
                    </span>
                    {m.done ? "Completed" : "Up next"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <h2 className="text-2xl sm:text-3xl font-display font-semibold text-white tracking-tight">
          Start your first learning journey
        </h2>
        <p className="text-sm text-neutral-400 mt-3 max-w-2xl mx-auto">
          Discover the fastest way to learn from YouTube—generate your first path and begin
          learning immediately.
        </p>
        <div className="mt-6">
            <button
              type="button"
              onClick={() => generate(topic)}
              disabled={loading}
              className="shiny-cta group overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.99] rounded-full relative shadow-2xl disabled:opacity-50"
            >
              <div className="shiny-cta-bg absolute inset-0 rounded-full" />
              <div className="relative z-10 px-8 py-3.5 flex items-center gap-2 text-sm font-semibold text-white bg-[#0a0a0a] m-[1px] rounded-full hover:bg-[#111] transition-colors">
                <Icon
                  icon={loading ? "solar:refresh-linear" : "solar:magic-stick-3-linear"}
                  className={`text-lg text-green-400 ${loading ? "animate-spin" : ""}`}
                />
                {loading ? "Generating path..." : "Generate your first path"}
              </div>
            </button>
        </div>
      </section>
    </main>
  );
}

