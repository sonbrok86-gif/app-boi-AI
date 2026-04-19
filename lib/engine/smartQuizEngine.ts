import { QuizQuestion, TraitKey } from "../types";

type ScoreMap = Record<TraitKey, number>;

export function buildScoreMap(answers: TraitKey[]): ScoreMap {
  const score: ScoreMap = {
    lanh_dao: 0,
    thuc_te: 0,
    cam_xuc: 0,
    sang_tao: 0,
    tham_trong: 0,
  };

  answers.forEach((a) => {
    score[a]++;
  });

  return score;
}

// 🔥 CHỌN TRAIT ĐANG THIẾU
function getWeakTrait(score: ScoreMap): TraitKey {
  const sorted = Object.entries(score).sort((a, b) => a[1] - b[1]);
  return sorted[0][0] as TraitKey;
}

// 🔥 TRÁNH HỎI TRÙNG
function filterUsed(
  bank: QuizQuestion[],
  usedIds: number[]
): QuizQuestion[] {
  return bank.filter((q) => !usedIds.includes(q.id));
}

// 🔥 LẤY CÂU HỎI THEO TRAIT
function getByTrait(
  bank: QuizQuestion[],
  trait: TraitKey
): QuizQuestion[] {
  return bank.filter((q) =>
    q.options.some((o) => o.trait === trait)
  );
}

// 🎯 MAIN AI
export function pickSmartQuiz(
  bank: QuizQuestion[],
  answers: TraitKey[],
  usedIds: number[]
): QuizQuestion {
  const score = buildScoreMap(answers);

  const weakTrait = getWeakTrait(score);

  const unused = filterUsed(bank, usedIds);

  const priorityQuestions = getByTrait(unused, weakTrait);

  if (priorityQuestions.length > 0) {
    return priorityQuestions[
      Math.floor(Math.random() * priorityQuestions.length)
    ];
  }

  // fallback random
  return unused[Math.floor(Math.random() * unused.length)];
}