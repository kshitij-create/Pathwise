"use client";

import { useEffect, useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import type { LearningPath } from "@/lib/learningPath/types";
import { loadSavedPaths, removeSavedPath } from "@/lib/learningPath/storage";

function percentComplete(path: LearningPath) {
  const all = path.modules.flatMap((m) => m.lessons);
  const completed = all.filter((l) => l.completed).length;
  return all.length === 0 ? 0 : Math.round((completed / all.length) * 100);
}

function summaryCounts(path: LearningPath) {
  const videos = path.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  return { modules: path.modules.length, videos };
}

export default function SavedPathsPage() {
  const [paths, setPaths] = useState<LearningPath[]>([]);

  useEffect(() => {
    setPaths(loadSavedPaths());
  }, []);

  const sorted = useMemo(() => {
    return [...paths].sort((a, b) => b.lastActiveIso.localeCompare(a.lastActiveIso));
  }, [paths]);

  return (
    <main className="max-w-[1600px] mx-auto pt-20 pb-16 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-semibold text-white tracking-tight">
            Saved Learning Paths
          </h1>
          <p className="text-sm text-neutral-400 mt-2">
            Pick up where you left off. Your progress is saved per lesson.
          </p>
        </div>
        <a
          href="/app"
          className="inline-flex items-center gap-2 text-xs font-semibold text-white rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
        >
          <Icon icon="solar:arrow-left-linear" />
          Back to Dashboard
        </a>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {sorted.map((p) => {
          const pct = percentComplete(p);
          const stats = summaryCounts(p);
          return (
            <div
              key={p.id}
              className="glass-panel rounded-2xl p-5 border border-white/10 relative overflow-hidden"
            >
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-green-500/10 blur-[70px] rounded-full pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-display font-semibold text-white tracking-tight line-clamp-2">
                      {p.topic}
                    </h2>
                    <p className="text-xs text-neutral-500 mt-2 flex items-center gap-2">
                      <span className="flex items-center gap-1.5">
                        <Icon icon="solar:folder-linear" />
                        {stats.modules} modules
                      </span>
                      <span className="w-1 h-1 rounded-full bg-neutral-700" />
                      <span className="flex items-center gap-1.5">
                        <Icon icon="solar:video-library-linear" />
                        {stats.videos} videos
                      </span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      removeSavedPath(p.id);
                      setPaths((prev) => prev.filter((x) => x.id !== p.id));
                    }}
                    className="text-neutral-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
                    aria-label="Remove saved path"
                  >
                    <Icon icon="solar:trash-bin-trash-linear" className="text-lg" />
                  </button>
                </div>

                <p className="text-[11px] text-neutral-500 mt-4 flex items-center gap-2">
                  <Icon icon="solar:clock-circle-linear" />
                  {p.totalTime}
                </p>

                <div className="mt-5 space-y-2.5">
                  <div className="flex justify-between items-end text-[11px] font-medium text-neutral-400">
                    <span>Progress</span>
                    <span className="text-white font-semibold">{pct}%</span>
                  </div>
                  <div className="h-2 w-full bg-black/50 border border-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <a
                    href="/app"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-black bg-white rounded-lg hover:bg-neutral-200 transition-colors"
                  >
                    <Icon icon="solar:play-bold" className="text-[10px]" />
                    Continue
                  </a>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-white border border-white/10 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {sorted.length === 0 && (
          <div className="md:col-span-2 xl:col-span-3 border border-white/10 rounded-2xl bg-white/5 p-10 text-center">
            <p className="text-sm text-neutral-300 font-medium mb-2">No saved paths yet</p>
            <p className="text-sm text-neutral-500 mb-6">
              Generate a learning path on the dashboard and click “Save Path”.
            </p>
            <a
              href="/app"
              className="inline-flex items-center gap-2 text-xs font-semibold text-black bg-white rounded-lg px-4 py-2 hover:bg-neutral-200 transition-colors"
            >
              <Icon icon="solar:magic-stick-3-linear" />
              Generate a path
            </a>
          </div>
        )}
      </div>
    </main>
  );
}

