import type { LearningPath } from "./types";

export async function generatePath(topic: string): Promise<LearningPath> {
  const res = await fetch("/api/generate-path", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic }),
  });
  if (!res.ok) throw new Error("Failed to generate path");
  return res.json();
}

export async function savePath(topic: string, data: LearningPath) {
  const res = await fetch("/api/save-path", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic, data }),
  });
  if (!res.ok) throw new Error("Failed to save path");
  return res.json();
}

export async function fetchUserPaths(): Promise<any[]> {
  const res = await fetch("/api/paths");
  if (!res.ok) throw new Error("Failed to fetch paths");
  return res.json();
}

export async function updateProgress(path_id: string, lesson_id: string, completed: boolean) {
  const res = await fetch("/api/progress", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path_id, lesson_id, completed }),
  });
  if (!res.ok) throw new Error("Failed to update progress");
  return res.json();
}
