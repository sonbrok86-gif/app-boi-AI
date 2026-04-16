import type { BaseReading, UserProfile } from "../types";

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function pickOne<T>(arr: T[], seed: string): T {
  const idx = hashString(seed) % arr.length;
  return arr[idx];
}

function pickMany<T>(arr: T[], count: number, seed: string): T[] {
  const cloned = [...arr];
  const result: T[] = [];
  let local = seed;
  for (let i = 0; i < count && cloned.length > 0; i++) {
    const idx = hashString(local + i) % cloned.length;
    result.push(cloned[idx]);
    cloned.splice(idx, 1);
    local = String(hashString(local + "_next_" + i));
  }
  return result;
}

const energyTypes = [
  "thiên cảm",
  "thiên động",
  "thiên lý trí",
  "thiên nội tâm",
  "thiên thích nghi"
] as const;

const elements = ["Kim", "Mộc", "Thủy", "Hỏa", "Thổ"] as const;

const colorSets = [
  ["tím trầm", "xanh than"],
  ["xanh rêu", "đen"],
  ["trắng bạc", "xanh khói"],
  ["đỏ mận", "nâu ấm"],
  ["xám lạnh", "tím than"]
];

const numberSets = [
  [3, 7, 18],
  [2, 8, 11],
  [1, 6, 19],
  [5, 9, 16],
  [4, 10, 22]
];

const lifePhases = [
  "giai đoạn tích lực",
  "giai đoạn đổi nhịp",
  "giai đoạn mở vận nhẹ",
  "giai đoạn thận trọng nhưng có cửa",
  "giai đoạn cần bỏ thói quen cũ"
];

const currentFortunes = [
  "đang lưng chừng, chưa xấu nhưng chưa hẳn thuận",
  "đang có cửa sáng nếu đi đúng nhịp",
  "đang cần chậm lại để tránh tự lệch hướng",
  "đang có tín hiệu mở vận nhẹ",
  "đang trong pha phải chọn đúng thay vì chọn nhiều"
];

export function buildBaseReading(profile: UserProfile): BaseReading {
  const seed = `${profile.name}|${profile.gender}|${profile.birth}|${profile.phone}`;
  const energyType = pickOne(energyTypes as unknown as string[], seed + "energy");
  const element = pickOne(elements as unknown as BaseReading["element"][], seed + "element");
  const luckyColors = pickOne(colorSets, seed + "colors");
  const luckyNumbers = pickOne(numberSets, seed + "numbers");
  const lifePhase = pickOne(lifePhases, seed + "phase");
  const currentFortune = pickOne(currentFortunes, seed + "fortune");

  const summaryTemplates = [
    `${profile.name}, bạn thuộc kiểu năng lượng ${energyType}, bên ngoài có thể khá ổn nhưng bên trong nghĩ nhiều hơn người khác tưởng.`,
    `${profile.name}, nhịp số hiện tại cho thấy bạn là người ${energyType}, không yếu nhưng dễ tự tạo áp lực khi muốn mọi thứ tốt hơn.`,
    `${profile.name}, hồ sơ nền của bạn mang màu ${energyType}, càng đi chậm và đúng nhịp thì càng dễ bật lên.`
  ];

  const summary = pickOne(summaryTemplates, seed + "summary");

  return {
    energyType,
    element,
    luckyColors,
    luckyNumbers,
    lifePhase,
    currentFortune,
    summary
  };
}