export type Step =
  | "form"
  | "life"
  | "quiz"
  | "tarotTopics"
  | "tarotDraw"
  | "final";

export type ToneMode = "serious" | "warm" | "funny";

export type FocusTopic =
  | "tinh_yeu"
  | "gia_dao"
  | "kinh_doanh"
  | "tai_chinh"
  | "cong_viec"
  | "tong_quan";

export type UserForm = {
  fullName: string;
  birthDate: string; // dd/mm/yyyy
  phone: string;
  job: string;
  gender: string;
  mainFocus: FocusTopic;
};

export type MbtiAxis = "EI" | "SN" | "TF" | "JP";
export type MbtiLetter = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

export type QuizOption = {
  label: string;
  letter: MbtiLetter;
};

export type QuizQuestion = {
  id: number;
  axis: MbtiAxis;
  question: string;
  options: [QuizOption, QuizOption];
};

export type MbtiScores = {
  E: number;
  I: number;
  S: number;
  N: number;
  T: number;
  F: number;
  J: number;
  P: number;
};

export type PersonalitySummary = {
  typeCode: string;
  title: string;
  subtitle: string;
  description: string;
  strengths: string[];
  cautions: string[];
  workStyle: string[];
  loveStyle: string[];
  growthAdvice: string[];
  scorePercent: Record<MbtiLetter, number>;
};

export type TarotCard = {
  id: number;
  name: string;
  meaningUpright: string;
  meaningReverse: string;
};

export type LifeSection = {
  title: string;
  content: string[];
};

export type TarotDraw = {
  topic: FocusTopic;
  card: TarotCard;
  mode: "upright" | "reverse";
  reading: string;
};

export type FinalReadingInput = {
  user: UserForm;
  tone: ToneMode;
  dailyVisitCount: number;
  lifeSections: LifeSection[];
  personality: PersonalitySummary;
  tarotDraws: TarotDraw[];
};

export type StoredUserProfile = {
  fullName: string;
  birthDate: string;
  phone: string;
  job: string;
  gender: string;
  mainFocus: FocusTopic;
  lastViewedAt?: string;
  dailyVisitCount?: number;
};

export type FeedbackPayload = {
  fullName: string;
  phone: string;
  mbtiType: string;
  feedback: string;
  rating: number;
};