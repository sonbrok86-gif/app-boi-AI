export function getBirthYear(birthDate: string): number | null {
  if (!birthDate?.trim()) return null;

  if (birthDate.includes("/")) {
    const parts = birthDate.split("/");
    const year = Number(parts[parts.length - 1]);
    return Number.isNaN(year) ? null : year;
  }

  if (birthDate.includes("-")) {
    const parts = birthDate.split("-");
    const year = Number(parts[0].length === 4 ? parts[0] : parts[parts.length - 1]);
    return Number.isNaN(year) ? null : year;
  }

  const year = Number(birthDate);
  return Number.isNaN(year) ? null : year;
}

export function getAgeFromBirthDate(birthDate: string): number | null {
  const year = getBirthYear(birthDate);
  if (!year) return null;
  return new Date().getFullYear() - year;
}

export function getAgeGroup(birthDate: string): string {
  const age = getAgeFromBirthDate(birthDate);
  if (!age) return "chưa xác định rõ nhóm tuổi";
  if (age < 25) return "nhóm tuổi đang dựng nền";
  if (age < 35) return "nhóm tuổi bung hướng và chọn đường";
  if (age < 45) return "nhóm tuổi gom lực và giữ vị thế";
  return "nhóm tuổi ưu tiên độ bền và hậu vận";
}

export function getElementFromBirthYear(birthDate: string): string {
  const year = getBirthYear(birthDate);
  if (!year) return "tho";

  const elements = ["kim", "thuy", "hoa", "tho", "moc"];
  return elements[year % 5] as "kim" | "thuy" | "hoa" | "tho" | "moc";
}