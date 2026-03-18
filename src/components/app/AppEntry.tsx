"use client";

import { useEffect, useState } from "react";
import type { LearningPath } from "@/lib/learningPath/types";
import {
  hasOnboarded,
  loadActivePath,
  saveActivePath,
  setOnboarded,
  upsertSavedPath,
} from "@/lib/learningPath/storage";
import { OnboardingDashboard } from "@/components/app/OnboardingDashboard";
import { LearningPathApp } from "@/components/app/LearningPathApp";

export function AppEntry() {
  const [ready, setReady] = useState(false);
  const [onboarded, setOnboardedState] = useState(false);
  const [active, setActive] = useState<LearningPath | null>(null);

  useEffect(() => {
    const a = loadActivePath();
    setActive(a);
    setOnboardedState(hasOnboarded());
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <main className="max-w-[1600px] mx-auto pt-20 pb-16 px-4 sm:px-6">
        <div className="glass-panel rounded-2xl p-8 border border-white/10">
          <div className="h-4 w-40 bg-white/10 rounded mb-4" />
          <div className="h-3 w-96 max-w-full bg-white/5 rounded mb-8" />
          <div className="h-10 w-full bg-white/5 rounded-xl" />
        </div>
      </main>
    );
  }

  if (!onboarded && !active) {
    return (
      <OnboardingDashboard
        onGenerateFirstPath={(path) => {
          saveActivePath(path);
          upsertSavedPath(path);
          setOnboarded(true);
          setOnboardedState(true);
          setActive(path);
        }}
      />
    );
  }

  return <LearningPathApp initialPath={active ?? undefined} />;
}

