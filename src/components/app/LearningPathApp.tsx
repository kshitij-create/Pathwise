"use client";

import { useEffect, useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import type { LearningPath, Lesson } from "@/lib/learningPath/types";
import { generateMockLearningPath } from "@/lib/learningPath/mock";
import { saveActivePath, upsertSavedPath } from "@/lib/learningPath/storage";

function percentComplete(path: LearningPath) {
  const all = path.modules.flatMap((m) => m.lessons);
  const completed = all.filter((l) => l.completed).length;
  return all.length === 0 ? 0 : Math.round((completed / all.length) * 100);
}

function summaryCounts(path: LearningPath) {
  const videos = path.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  return { modules: path.modules.length, videos };
}

function LessonRow({
  lesson,
  active,
  onToggleCompleted,
}: Readonly<{
  lesson: Lesson;
  active: boolean;
  onToggleCompleted: () => void;
}>) {
  return (
    <div
      className={`group flex items-center gap-4 p-3 mx-2 ${
        active
          ? "rounded-lg bg-white/[0.05] border border-white/5 transition-colors cursor-pointer relative overflow-hidden"
          : "rounded-lg hover:bg-white/[0.02] transition-colors cursor-pointer"
      } ${lesson.completed ? "" : ""}`}
    >
      {active && <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-green-500" />}

      <button
        type="button"
        onClick={onToggleCompleted}
        className={`flex-shrink-0 w-5 h-5 rounded-full border ml-1 flex items-center justify-center transition-colors ${
          lesson.completed
            ? "border-green-500/50 bg-green-500/10 text-green-400"
            : "border-neutral-600 hover:border-green-500 bg-black/50 text-transparent hover:text-green-500"
        }`}
        aria-label={lesson.completed ? "Mark as incomplete" : "Mark as completed"}
      >
        <Icon icon="solar:check-read-linear" className="text-[10px]" />
      </button>

      <div className="w-24 h-14 bg-neutral-800 rounded-md overflow-hidden relative flex-shrink-0 border border-white/10">
        <img
          src={lesson.thumbnailUrl}
          className={`w-full h-full object-cover ${
            active ? "opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" : "opacity-50"
          } ${lesson.completed ? "grayscale" : ""}`}
          alt="thumbnail"
        />
        <div className={`absolute bottom-1 right-1 bg-black/80 text-[9px] font-medium px-1 rounded ${active ? "text-white" : "text-neutral-300"}`}>
          {lesson.duration}
        </div>
        {!active && !lesson.completed && (
          <div className="absolute inset-0 pointer-events-none" />
        )}
      </div>

      <div className="flex-grow min-w-0">
        <h4
          className={`text-sm truncate transition-colors ${
            active ? "font-semibold text-white group-hover:text-green-400" : "font-medium text-neutral-300 group-hover:text-white"
          } ${lesson.completed ? "line-through decoration-neutral-600 text-neutral-400" : ""}`}
        >
          {lesson.title}
        </h4>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-[11px] truncate ${active ? "text-neutral-400" : "text-neutral-500"}`}>
            {lesson.channel}
          </span>
          <span className="w-1 h-1 rounded-full bg-neutral-700 hidden sm:block" />
          <span
            className={`text-[9px] font-semibold px-1.5 py-0.5 rounded border uppercase tracking-wider hidden sm:block ${
              lesson.difficulty === "Beginner"
                ? "bg-white/5 text-neutral-400 border-white/5"
                : lesson.difficulty === "Intermediate"
                  ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                  : "bg-purple-500/10 text-purple-300 border-purple-500/20"
            }`}
          >
            {lesson.difficulty}
          </span>
        </div>
      </div>

      <a
        href={lesson.youtubeUrl}
        target="_blank"
        rel="noreferrer"
        className={`hidden sm:flex flex-shrink-0 items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors shadow-sm ${
          active ? "text-black bg-white hover:bg-neutral-200" : "text-neutral-200 bg-white/5 border border-white/10 hover:bg-white/10"
        }`}
      >
        <Icon icon="solar:play-bold" className="text-[10px]" />
        Watch
      </a>
    </div>
  );
}

function ModuleCard({
  index,
  title,
  description,
  lessons,
  activeLessonId,
  onToggleLesson,
}: Readonly<{
  index: number;
  title: string;
  description: string;
  lessons: Lesson[];
  activeLessonId: string | null;
  onToggleLesson: (lessonId: string) => void;
}>) {
  const completedCount = lessons.filter((l) => l.completed).length;
  const allDone = completedCount === lessons.length && lessons.length > 0;

  return (
    <div
      className={`border rounded-xl overflow-hidden ${
        index === 1
          ? "border-white/10 bg-black/40 shadow-lg ring-1 ring-white/5"
          : allDone
            ? "border-white/5 bg-black/20"
            : "border-white/5 bg-black/20"
      }`}
    >
      <div className={`p-4 sm:p-5 border-b border-white/5 flex justify-between items-center ${index === 1 ? "bg-white/[0.04]" : "bg-white/[0.02]"}`}>
        <div>
          <h3 className="font-medium text-white flex items-center gap-2">
            {allDone ? (
              <span className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xs border border-green-500/30">
                <Icon icon="solar:check-read-linear" />
              </span>
            ) : (
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border ${index === 1 ? "bg-[#0a0a0a] text-white border border-white/20" : "bg-white/5 text-neutral-500 border-white/10"}`}>
                {index + 1}
              </span>
            )}
            {title}
          </h3>
          <p className="text-xs text-neutral-500 mt-1 ml-8">{description}</p>
        </div>
        <span className={`text-xs font-medium hidden sm:block ${index === 1 ? "text-green-400" : "text-neutral-500"}`}>
          {completedCount}/{lessons.length} Completed
        </span>
      </div>

      <div className={`flex flex-col ${index === 1 ? "py-2" : ""}`}>
        {lessons.map((lesson, i) => (
          <LessonRow
            key={lesson.id}
            lesson={lesson}
            active={activeLessonId ? activeLessonId === lesson.id : index === 1 && i === 0}
            onToggleCompleted={() => onToggleLesson(lesson.id)}
          />
        ))}
      </div>
    </div>
  );
}

export function LearningPathApp({
  initialPath,
}: Readonly<{
  initialPath?: LearningPath;
}>) {
  const [topic, setTopic] = useState("");
  const [path, setPath] = useState<LearningPath>(
    () => initialPath ?? generateMockLearningPath("Learn React")
  );

  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  useEffect(() => {
    // choose first non-completed lesson as active by default
    const first = path.modules.flatMap((m) => m.lessons).find((l) => !l.completed);
    setActiveLessonId(first?.id ?? path.modules.flatMap((m) => m.lessons)[0]?.id ?? null);
  }, [path.id]);

  useEffect(() => {
    if (initialPath) {
      setPath(initialPath);
    }
  }, [initialPath?.id]);

  const stats = useMemo(() => summaryCounts(path), [path]);
  const progress = useMemo(() => percentComplete(path), [path]);

  function toggleLessonCompleted(lessonId: string) {
    setPath((prev) => ({
      ...prev,
      lastActiveIso: new Date().toISOString(),
      modules: prev.modules.map((m) => ({
        ...m,
        lessons: m.lessons.map((l) =>
          l.id === lessonId ? { ...l, completed: !l.completed } : l
        ),
      })),
    }));
  }

  function handleGenerate() {
    const next = generateMockLearningPath(topic);
    setPath(next);
    setTopic("");
    saveActivePath(next);
  }

  function handleSave() {
    upsertSavedPath(path);
    saveActivePath(path);
  }

  return (
    <div className="max-w-[1600px] mx-auto pt-20 pb-16 px-4 sm:px-6 grid grid-cols-1 xl:grid-cols-12 gap-8">
      <div className="xl:col-span-8 flex flex-col gap-8">
        {/* Topic Generator */}
        <div className="relative w-full z-20 group">
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
            placeholder="What do you want to learn? (e.g., Learn React, Learn Spanish)"
          />
          <div className="absolute inset-y-2 right-2 flex items-center">
            <button
              type="button"
              onClick={handleGenerate}
              className="bg-white text-black text-xs font-semibold px-4 py-2 rounded-lg hover:bg-neutral-200 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              Generate Path
              <Icon icon="solar:arrow-right-linear" />
            </button>
          </div>
        </div>

        {/* Active Learning Path */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-green-500/10 blur-[80px] rounded-full pointer-events-none" />

          <div className="mb-8 relative z-10">
            <div className="flex items-center justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <span className="bg-green-500/10 text-green-400 border border-green-500/20 px-2.5 py-1 rounded text-[10px] font-semibold tracking-wide uppercase">
                  Active Path
                </span>
                <span className="text-xs text-neutral-500 font-medium">Generated just now</span>
              </div>
              <button
                type="button"
                onClick={handleSave}
                className="text-xs font-semibold text-white rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <Icon icon="solar:bookmark-linear" className="text-neutral-300" />
                Save Path
              </button>
            </div>

            <h1 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight text-white mb-4">
              {path.topic}
            </h1>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-neutral-400 mb-8 border-b border-white/5 pb-8">
              <span className="flex items-center gap-2">
                <Icon icon="solar:clock-circle-linear" className="text-lg" /> {path.totalTime}
              </span>
              <span className="flex items-center gap-2">
                <Icon icon="solar:folder-linear" className="text-lg" /> {stats.modules} Modules
              </span>
              <span className="flex items-center gap-2">
                <Icon icon="solar:video-library-linear" className="text-lg" /> {stats.videos} Videos
              </span>
            </div>

            <div className="space-y-2.5">
              <div className="flex justify-between items-end text-sm">
                <span className="font-medium text-white">Course Progress</span>
                <span className="text-green-400 font-semibold tracking-tight">{progress}%</span>
              </div>
              <div className="h-2 w-full bg-black/50 border border-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute top-0 right-0 bottom-0 left-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4yKSIvPjwvc3ZnPg==')] opacity-50" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 relative z-10">
            {path.modules.map((m, idx) => (
              <ModuleCard
                key={m.id}
                index={idx}
                title={`Module ${idx + 1}: ${m.title.replace(/^Module \\d+:\\s*/, "")}`}
                description={m.description}
                lessons={m.lessons}
                activeLessonId={activeLessonId}
                onToggleLesson={(lessonId) => {
                  setActiveLessonId(lessonId);
                  toggleLessonCompleted(lessonId);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right column */}
      <aside className="xl:col-span-4 space-y-6">
        <SavedPathsWidget />

        <div className="glass-panel rounded-2xl p-5 border border-white/10">
          <h2 className="text-sm font-semibold text-white tracking-tight mb-4 flex items-center gap-2">
            <Icon icon="solar:chart-square-linear" className="text-neutral-400" />
            Weekly Goal
          </h2>
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-white/10"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-green-400"
                  strokeDasharray="75, 100"
                  strokeWidth="3"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-xs font-semibold text-white">3/4h</span>
            </div>
            <div>
              <p className="text-sm font-medium text-white mb-0.5">Almost there!</p>
              <p className="text-xs text-neutral-400">
                Watch 1 more hour to hit your weekly learning goal.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function SavedPathsWidget() {
  const [paths, setPaths] = useState<LearningPath[]>([]);

  useEffect(() => {
    import("@/lib/learningPath/storage").then(({ loadSavedPaths }) => {
      setPaths(loadSavedPaths());
    });
  }, []);

  return (
    <div className="glass-panel rounded-2xl p-5 border border-white/10">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-sm font-semibold text-white tracking-tight flex items-center gap-2">
          <Icon icon="solar:bookmark-linear" className="text-neutral-400" />
          Saved Learning Paths
        </h2>
        <a
          href="/app/paths"
          className="text-[11px] font-medium text-neutral-400 hover:text-white transition-colors"
        >
          View All
        </a>
      </div>

      <div className="space-y-3">
        {paths.slice(0, 3).map((p) => (
          <SavedPathCard key={p.id} path={p} />
        ))}
        {paths.length === 0 && (
          <div className="text-xs text-neutral-500 border border-white/5 bg-black/30 rounded-xl p-4">
            Save a path to see it here.
          </div>
        )}
      </div>
    </div>
  );
}

function SavedPathCard({ path }: Readonly<{ path: LearningPath }>) {
  const pct = percentComplete(path);
  const stats = summaryCounts(path);

  return (
    <a
      href="#"
      className="group bg-black/40 border border-white/5 rounded-xl p-4 hover:border-white/10 hover:bg-white/[0.02] transition-colors cursor-pointer block"
    >
      <h3 className="text-sm font-medium text-white mb-1 group-hover:text-green-400 transition-colors line-clamp-1">
        {path.topic}
      </h3>
      <p className="text-[11px] text-neutral-500 mb-4 flex items-center gap-2">
        <span>{stats.modules} Modules</span>
        <span className="w-1 h-1 rounded-full bg-neutral-700" />
        <span>{path.totalTime.replace(" total", "")}</span>
      </p>
      <div className="space-y-1.5">
        <div className="flex justify-between items-end text-[10px] font-medium text-neutral-400 uppercase tracking-wider">
          <span>Progress</span>
          <span className="text-white">{pct}%</span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full group-hover:bg-green-400 transition-colors"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </a>
  );
}

