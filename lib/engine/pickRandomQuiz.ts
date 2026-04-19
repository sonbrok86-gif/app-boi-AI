import { QuizQuestion } from "../types";

export function pickRandomQuiz(
  bank: QuizQuestion[],
  count = 10
): QuizQuestion[] {
  const copy = [...bank];
  const out: QuizQuestion[] = [];

  while (copy.length > 0 && out.length < count) {
    const index = Math.floor(Math.random() * copy.length);
    out.push(copy.splice(index, 1)[0]);
  }

  return out;
}