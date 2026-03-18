"use client";

import type { LearningPath } from "./types";

const SAVED_KEY = "pathwise_saved_paths_v1";
const ACTIVE_KEY = "pathwise_active_path_v1";
const ONBOARDED_KEY = "pathwise_onboarded_v1";

export function loadSavedPaths(): LearningPath[] {
  try {
    const raw = localStorage.getItem(SAVED_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as LearningPath[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function savePaths(paths: LearningPath[]) {
  localStorage.setItem(SAVED_KEY, JSON.stringify(paths));
}

export function upsertSavedPath(path: LearningPath) {
  const existing = loadSavedPaths();
  const next = [path, ...existing.filter((p) => p.id !== path.id)];
  savePaths(next);
}

export function removeSavedPath(id: string) {
  const existing = loadSavedPaths();
  savePaths(existing.filter((p) => p.id !== id));
}

export function loadActivePath(): LearningPath | null {
  try {
    const raw = localStorage.getItem(ACTIVE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as LearningPath;
  } catch {
    return null;
  }
}

export function saveActivePath(path: LearningPath) {
  localStorage.setItem(ACTIVE_KEY, JSON.stringify(path));
}

export function hasOnboarded(): boolean {
  return localStorage.getItem(ONBOARDED_KEY) === "true";
}

export function setOnboarded(value: boolean) {
  localStorage.setItem(ONBOARDED_KEY, value ? "true" : "false");
}

