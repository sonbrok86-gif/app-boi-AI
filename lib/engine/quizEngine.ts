import { quizBank } from "../data/quizBank";
import type {
  PersonalityProfile,
  QuizQuestion,
  ScoreMap
} from "../types";

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function selectQuizQuestions(seed: string): QuizQuestion[] {
  const requiredGroups = [
    "work",
    "stress",
    "money",
    "love",
    "social",
    "mindset",
    "ambition",
    "decision",
    "family",
    "intuition"
  ] as const;

  return requiredGroups.map((group, index) => {
    const items = quizBank.filter((q) => q.group === group);
    const pickIndex = hashString(seed + group + index) % items.length;
    return items[pickIndex];
  });
}

export function createEmptyScores(): ScoreMap {
  return {
    emotion: 0,
    logic: 0,
    ambition: 0,
    stability: 0,
    risk: 0,
    introvert: 0,
    extrovert: 0,
    sensitivity: 0,
    resilience: 0,
    initiative: 0,
    boredom: 0,
    comfortNeed: 0,
    bluntNeed: 0
  };
}

export function calculateScores(
  questions: QuizQuestion[],
  answers: Record<string, string>
): ScoreMap {
  const scores = createEmptyScores();

  for (const question of questions) {
    const selected = answers[question.id];
    const option = question.options.find((op) => op.value === selected);
    if (!option) continue;

    for (const [key, value] of Object.entries(option.effect)) {
      if (key in scores) {
        scores[key as keyof ScoreMap] += value as number;
      }
    }
  }

  return scores;
}

export function buildPersonalityProfile(scores: ScoreMap): PersonalityProfile {
  const dominantTraits: string[] = [];

  if (scores.emotion >= scores.logic) dominantTraits.push("giàu cảm xúc");
  else dominantTraits.push("thiên lý trí");

  if (scores.ambition >= 3) dominantTraits.push("có tham vọng");
  if (scores.boredom >= 2) dominantTraits.push("đang chán nhịp hiện tại");
  if (scores.introvert >= scores.extrovert) dominantTraits.push("hướng nội");
  else dominantTraits.push("dễ kết nối");
  if (scores.sensitivity >= 2) dominantTraits.push("nhạy cảm");

  let communicationStyle = "cần giọng văn cân bằng";
  if (scores.bluntNeed > scores.comfortNeed) communicationStyle = "hợp nghe nói thẳng";
  else if (scores.comfortNeed > scores.bluntNeed) communicationStyle = "hợp nghe mềm và đỡ áp lực";

  let emotionalState = "tâm trạng tương đối ổn";
  if (scores.boredom >= 2 && scores.sensitivity >= 2) emotionalState = "đang hơi mệt và dễ suy";
  else if (scores.ambition >= 3 && scores.resilience >= 1) emotionalState = "đang có lửa nhưng bị nén";
  else if (scores.stability >= 2) emotionalState = "đang muốn an toàn hơn là bứt phá";

  let workEnergy = "nhịp công việc trung tính";
  if (scores.ambition >= 3 && scores.boredom >= 2) workEnergy = "tham vọng nhưng dễ chán";
  else if (scores.ambition >= 3) workEnergy = "có lửa làm việc";
  else if (scores.boredom >= 2) workEnergy = "đang lệch nhịp công việc";
  else if (scores.stability >= 2) workEnergy = "ưu tiên sự chắc chắn";

  let relationshipStyle = "có xu hướng giữ chừng mực";
  if (scores.emotion >= 3 && scores.introvert >= 2) relationshipStyle = "yêu sâu nhưng giữ trong lòng";
  else if (scores.extrovert >= 2) relationshipStyle = "thể hiện rõ và cần phản hồi";
  else if (scores.logic >= 2) relationshipStyle = "cần sự rõ ràng và nhất quán";

  let vibe: PersonalityProfile["vibe"] = "soft";
  if (scores.logic + scores.bluntNeed > scores.emotion + scores.comfortNeed) vibe = "sharp";
  else if (scores.introvert + scores.sensitivity >= 5) vibe = "mystic";
  else if (scores.extrovert + scores.resilience >= 4) vibe = "playful";

  return {
    dominantTraits,
    communicationStyle,
    emotionalState,
    workEnergy,
    relationshipStyle,
    vibe
  };
}