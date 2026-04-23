import { ToneMode } from "../types";

function pick(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getPersonalityLine(tone: ToneMode) {
  const serious = [
    "Ta nói thẳng, không vòng vo.",
    "Phần này cần nhìn rõ, không nên né tránh.",
  ];

  const warm = [
    "Mình nói thật nhưng nhẹ nhàng thôi nhé.",
    "Có gì thì mình cùng nhìn, không cần căng.",
  ];

  const funny = [
    "Ok, nói nhẹ thôi chứ nói thật là dễ giật mình 😄",
    "Chuẩn bị tinh thần nha, có đoạn hơi trúng đó 😄",
  ];

  if (tone === "serious") return pick(serious);
  if (tone === "warm") return pick(warm);
  return pick(funny);
}
export function getPlayfulLine() {
  return pick([
    "Nói tới đây là đạo hữu bắt đầu thấy quen quen rồi đó 😄",
    "Đoạn này nhiều người đọc xong hay im lặng lắm 😄",
  ]);
}