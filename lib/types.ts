export type UserProfile = {
  name: string;
  gender: "nam" | "nu" | "khac";
  birth: string;
  phone: string;
};

export type Topic = "tinh_cam" | "gia_dao" | "tien_tai" | "co_hoi";

export type QuizGroup =
  | "work"
  | "stress"
  | "money"
  | "love"
  | "social"
  | "mindset"
  | "ambition"
  | "decision"
  | "family"
  | "intuition";

export type ScoreKey =
  | "emotion"
  | "logic"
  | "ambition"
  | "stability"
  | "risk"
  | "introvert"
  | "extrovert"
  | "sensitivity"
  | "resilience"
  | "initiative"
  | "boredom"
  | "comfortNeed"
  | "bluntNeed";

export type ScoreMap = Record<ScoreKey, number>;

export type QuizOption = {
  value: string;
  text: string;
  effect: Partial<ScoreMap>;
};

export type QuizQuestion = {
  id: string;
  group: QuizGroup;
  text: string;
  options: QuizOption[];
};

export type BaseReading = {
  energyType: string;
  element: "Kim" | "Mộc" | "Thủy" | "Hỏa" | "Thổ";
  luckyColors: string[];
  luckyNumbers: number[];
  lifePhase: string;
  currentFortune: string;
  summary: string;
};

export type PersonalityProfile = {
  dominantTraits: string[];
  communicationStyle: string;
  emotionalState: string;
  workEnergy: string;
  relationshipStyle: string;
  vibe: "soft" | "sharp" | "mystic" | "playful";
};

export type TarotCard = {
  id: string;
  title: string;
  meaning: string;
  toneTags: string[];
  icon: string;
};

export type ReadingResult = {
  overview: string;
  personalitySummary: string;
  topicReading: string;
  topicFlavorText: string;
  opportunity: string;
  caution: string;
  adviceText: string;
  luckyColors: string[];
  luckyNumbers: number[];
  tarotSupport: TarotCard[];
  closing: string;
  consistencyTone: "dark_careful" | "balanced_rising" | "bright_opening";
  styleTone: "soft" | "sharp" | "mystic" | "playful";
};