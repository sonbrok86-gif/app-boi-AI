import { QuizQuestion } from "../types";

function shuffle<T>(arr: T[]) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function pickMbtiQuiz(bank: QuizQuestion[], perAxis = 3): QuizQuestion[] {
  const groups = {
    EI: bank.filter((q) => q.axis === "EI"),
    SN: bank.filter((q) => q.axis === "SN"),
    TF: bank.filter((q) => q.axis === "TF"),
    JP: bank.filter((q) => q.axis === "JP"),
  };

  const picked = [
    ...shuffle(groups.EI).slice(0, perAxis),
    ...shuffle(groups.SN).slice(0, perAxis),
    ...shuffle(groups.TF).slice(0, perAxis),
    ...shuffle(groups.JP).slice(0, perAxis),
  ];

  return shuffle(picked);
}