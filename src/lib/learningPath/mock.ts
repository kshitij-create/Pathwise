import type { Difficulty, LearningPath, Module } from "./types";

function id(prefix: string) {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
}

function estimateTotalTime(modules: Module[]) {
  // quick, deterministic-ish: sum durations like "45:30" and "1:20:45" not needed here.
  // we present a human label, so use a simple approximation based on lesson count.
  const lessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const hours = Math.max(4, Math.round(lessons * 0.75));
  const minutes = (lessons * 7) % 60;
  return `${hours}h ${minutes.toString().padStart(2, "0")}m total`;
}

const thumbnails = [
  "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1627398240411-8bbeb7d56a23?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&q=80&auto=format&fit=crop",
];

const channels = [
  "Fireship",
  "Web Dev Simplified",
  "Traversy Media",
  "Programming with Mosh",
  "freeCodeCamp.org",
  "Codevolution",
];

const durations = ["18:24", "24:10", "45:30", "12:08", "1:02:15", "33:41"];

function lessonTitle(topic: string, difficulty: Difficulty, index: number) {
  const clean = topic.replace(/^learn\s+/i, "").trim();
  if (difficulty === "Beginner") {
    return `${index}. ${clean}: Fundamentals & Setup`;
  }
  if (difficulty === "Intermediate") {
    return `${index}. ${clean}: Practical Projects & Patterns`;
  }
  return `${index}. ${clean}: Performance & Production`;
}

export function generateMockLearningPath(topicRaw: string): LearningPath {
  const topic = topicRaw.trim().length ? topicRaw.trim() : "Learn React";
  const createdAt = new Date();

  const modules: Module[] = [
    {
      id: id("module"),
      title: "Module 1: Foundations",
      description: "Core concepts, terminology, and a solid baseline.",
      lessons: Array.from({ length: 4 }).map((_, i) => ({
        id: id("lesson"),
        title: lessonTitle(topic, "Beginner", i + 1),
        channel: channels[(i + 1) % channels.length]!,
        duration: durations[i % durations.length]!,
        difficulty: "Beginner",
        thumbnailUrl: thumbnails[i % thumbnails.length]!,
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        completed: i === 0,
      })),
    },
    {
      id: id("module"),
      title: "Module 2: Build & Apply",
      description: "Hands-on practice with real-world workflows and projects.",
      lessons: Array.from({ length: 5 }).map((_, i) => ({
        id: id("lesson"),
        title: lessonTitle(topic, "Intermediate", i + 1),
        channel: channels[(i + 2) % channels.length]!,
        duration: durations[(i + 2) % durations.length]!,
        difficulty: "Intermediate",
        thumbnailUrl: thumbnails[(i + 2) % thumbnails.length]!,
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        completed: i === 0 ? false : false,
      })),
    },
    {
      id: id("module"),
      title: "Module 3: Advanced & Next Steps",
      description: "Optimization, best practices, and leveling up.",
      lessons: Array.from({ length: 4 }).map((_, i) => ({
        id: id("lesson"),
        title: lessonTitle(topic, "Advanced", i + 1),
        channel: channels[(i + 3) % channels.length]!,
        duration: durations[(i + 3) % durations.length]!,
        difficulty: "Advanced",
        thumbnailUrl: thumbnails[(i + 3) % thumbnails.length]!,
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        completed: false,
      })),
    },
  ];

  return {
    id: id("path"),
    topic: topic.replace(/^learn\s+/i, "").trim() || topic,
    totalTime: estimateTotalTime(modules),
    modules,
    createdAtIso: createdAt.toISOString(),
    lastActiveIso: createdAt.toISOString(),
  };
}

