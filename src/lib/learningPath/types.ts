export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export interface Lesson {
  id: string;
  title: string;
  channel: string;
  duration: string;
  difficulty: Difficulty;
  thumbnailUrl: string;
  youtubeUrl: string;
  completed: boolean;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface LearningPath {
  id: string;
  topic: string;
  totalTime: string;
  modules: Module[];
  createdAtIso: string;
  lastActiveIso: string;
}

