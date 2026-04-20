export type DaoHuuTone = "serious" | "warm" | "funny";

export function daoHuuLine(
  serious: string,
  warm: string,
  funny: string,
  tone: DaoHuuTone = "warm"
) {
  if (tone === "serious") return serious;
  if (tone === "warm") return warm;
  return funny;
}

export const dh = {
  greet: (name?: string) =>
    [
      `Đạo hữu${name ? ` ${name}` : ""} lại tới rồi.`,
      `Hữu duyên thì gặp — đạo hữu lại ghé.`,
      `Ta nhớ đạo hữu rồi 😄`,
    ][Math.floor(Math.random() * 3)],

  loading: [
    "Đợi ta xem kỹ khí của đạo hữu...",
    "Đang ghép các tầng dữ liệu...",
    "Khí này không đơn giản...",
    "Sắp ra rồi, đừng rời đi 😄",
  ],

  transitions: {
    formToLife:
      "Được rồi đạo hữu. Ta xem phần nền trước — giống căn cơ của một người.",
    lifeToQuiz:
      "Nền chỉ nói được một nửa. Giờ xem cách đạo hữu phản ứng với đời.",
    quizToTarot:
      "Đã thấy phần bên trong. Giờ nhìn thêm bằng ‘vận’.",
    tarotToFinal:
      "Đủ dữ liệu. Ta nói thẳng, không vòng.",
  },

  outro:
    "Ta nói đến đây thôi. Nghe được bao nhiêu là duyên của đạo hữu. Thấy đúng… lần sau quay lại, ta nói tiếp 😄",
};