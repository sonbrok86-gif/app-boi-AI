export type UserMemory = {
  fullName: string;
  phone: string;
  birthDate: string;
  visitCount: number;
  lastVisit: string;
};

const KEY_PREFIX = "boiAI_memory_";

export function saveMemory(data: UserMemory) {
  const key = KEY_PREFIX + data.phone + "_" + data.birthDate;
  localStorage.setItem(key, JSON.stringify(data));
}

export function getMemory(phone: string, birthDate: string): UserMemory | null {
  const key = KEY_PREFIX + phone + "_" + birthDate;
  const raw = localStorage.getItem(key);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}