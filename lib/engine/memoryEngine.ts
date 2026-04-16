import type { Topic } from "../types";

const MEMORY_KEY = "boi_vui_ai_memory_v2";

export type VisitorMemory = {
  name?: string;
  gender?: string;
  birth?: string;
  phone?: string;
  visitCount: number;
  lastVisitAt: string;
  lastTopic?: Topic;
  lastStyleTone?: "soft" | "sharp" | "mystic" | "playful";
};

export function getVisitorMemory(): VisitorMemory | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(MEMORY_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as VisitorMemory;
  } catch {
    return null;
  }
}

export function saveVisitorMemory(
  patch?: Partial<VisitorMemory>
) {
  if (typeof window === "undefined") return;

  const prev = getVisitorMemory();

  const next: VisitorMemory = {
    name: patch?.name ?? prev?.name,
    gender: patch?.gender ?? prev?.gender,
    birth: patch?.birth ?? prev?.birth,
    phone: patch?.phone ?? prev?.phone,
    visitCount: (prev?.visitCount || 0) + 1,
    lastVisitAt: new Date().toISOString(),
    lastTopic: patch?.lastTopic ?? prev?.lastTopic,
    lastStyleTone: patch?.lastStyleTone ?? prev?.lastStyleTone
  };

  window.localStorage.setItem(MEMORY_KEY, JSON.stringify(next));
}

export function updateVisitorMemory(
  patch: Partial<VisitorMemory>
) {
  if (typeof window === "undefined") return;

  const prev = getVisitorMemory();

  const next: VisitorMemory = {
    name: patch.name ?? prev?.name,
    gender: patch.gender ?? prev?.gender,
    birth: patch.birth ?? prev?.birth,
    phone: patch.phone ?? prev?.phone,
    visitCount: prev?.visitCount || 1,
    lastVisitAt: patch.lastVisitAt ?? prev?.lastVisitAt ?? new Date().toISOString(),
    lastTopic: patch.lastTopic ?? prev?.lastTopic,
    lastStyleTone: patch.lastStyleTone ?? prev?.lastStyleTone
  };

  window.localStorage.setItem(MEMORY_KEY, JSON.stringify(next));
}

export function getDaysSinceLastVisit(lastVisitAt?: string): number | null {
  if (!lastVisitAt) return null;

  const last = new Date(lastVisitAt).getTime();
  if (Number.isNaN(last)) return null;

  const now = Date.now();
  const diff = now - last;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}