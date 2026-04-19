import { StoredUserProfile, ToneMode } from "../types";

function normalizePhone(phone: string) {
  return phone.replace(/\D/g, "");
}

function todayKey() {
  const now = new Date();
  const y = now.getFullYear();
  const m = `${now.getMonth() + 1}`.padStart(2, "0");
  const d = `${now.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function buildDailyKey(phone: string, birthDate: string) {
  return `boi_ai_daily_${normalizePhone(phone)}_${birthDate}_${todayKey()}`;
}

function buildProfileKey(phone: string, birthDate: string) {
  return `boi_ai_profile_${normalizePhone(phone)}_${birthDate}`;
}

export function getDailyViewCount(phone: string, birthDate: string): number {
  if (typeof window === "undefined") return 0;
  const key = buildDailyKey(phone, birthDate);
  return Number(localStorage.getItem(key) || "0");
}

export function canViewToday(phone: string, birthDate: string, limit = 3): boolean {
  return getDailyViewCount(phone, birthDate) < limit;
}

export function registerView(phone: string, birthDate: string): number {
  if (typeof window === "undefined") return 1;
  const key = buildDailyKey(phone, birthDate);
  const next = getDailyViewCount(phone, birthDate) + 1;
  localStorage.setItem(key, String(next));
  return next;
}

export function getToneModeByVisit(count: number): ToneMode {
  if (count <= 1) return "serious";
  if (count === 2) return "warm";
  return "funny";
}

export function saveUserProfile(phone: string, birthDate: string, payload: StoredUserProfile & {
  lastViewedAt?: string;
  dailyVisitCount?: number;
}) {
  if (typeof window === "undefined") return;
  const key = buildProfileKey(phone, birthDate);
  localStorage.setItem(key, JSON.stringify(payload));
}

export function getUserProfile(phone: string, birthDate: string): StoredUserProfile | null {
  if (typeof window === "undefined") return null;
  const key = buildProfileKey(phone, birthDate);
  const raw = localStorage.getItem(key);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}