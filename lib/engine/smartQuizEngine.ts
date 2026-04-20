import { QuizQuestion, MbtiLetter, MbtiScores } from "../types";

function emptyScores(): MbtiScores {
  return {
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0,
  };
}

// 🔢 Tính điểm
export function runQuizEngine(
  questions: QuizQuestion[],
  answers: MbtiLetter[]
): MbtiScores {
  const scores = emptyScores();

  questions.forEach((q, index) => {
    const answer = answers[index];
    if (!answer) return;

    scores[answer] += 1;
  });

  return scores;
}

// 🎯 Lấy axis đang yếu nhất (EI, SN, TF, JP)
function getWeakAxis(scores: MbtiScores): "EI" | "SN" | "TF" | "JP" {
  const pairs: Array<["EI" | "SN" | "TF" | "JP", number]> = [
    ["EI", scores.E + scores.I],
    ["SN", scores.S + scores.N],
    ["TF", scores.T + scores.F],
    ["JP", scores.J + scores.P],
  ];

  pairs.sort((a, b) => a[1] - b[1]);

  return pairs[0][0];
}

// 🚫 Tránh câu đã hỏi
function filterUsed(
  bank: QuizQuestion[],
  usedIds: number[]
): QuizQuestion[] {
  return bank.filter((q) => !usedIds.includes(q.id));
}

// 🎯 Lấy câu theo axis
function getByAxis(
  bank: QuizQuestion[],
  axis: QuizQuestion["axis"]
): QuizQuestion[] {
  return bank.filter((q) => q.axis === axis);
}

// 🤖 AI chọn câu hỏi
export function pickSmartQuiz(
  bank: QuizQuestion[],
  answers: MbtiLetter[],
  usedIds: number[]
): QuizQuestion {
  const scores = runQuizEngine(bank, answers);

  const weakAxis = getWeakAxis(scores);

  const unused = filterUsed(bank, usedIds);

  const priority = getByAxis(unused, weakAxis);

  if (priority.length > 0) {
    return priority[Math.floor(Math.random() * priority.length)];
  }

  return unused[Math.floor(Math.random() * unused.length)];
}