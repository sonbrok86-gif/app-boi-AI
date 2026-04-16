import type { TarotCard } from "../types";

export const tarotCards: TarotCard[] = [
  {
    id: "moon",
    title: "The Moon",
    meaning: "Có nhiễu cảm xúc và vài thứ chưa rõ. Hợp quan sát thêm hơn là quyết gấp.",
    toneTags: ["dark_careful", "balanced_rising"],
    icon: "🌙"
  },
  {
    id: "star",
    title: "The Star",
    meaning: "Cửa sáng vẫn có, nhất là khi bạn giữ được niềm tin và nhịp ổn định.",
    toneTags: ["balanced_rising", "bright_opening"],
    icon: "⭐"
  },
  {
    id: "justice",
    title: "Justice",
    meaning: "Điều gì không rõ thì phải làm rõ. Quẻ này thắng nhờ minh bạch và tỉnh táo.",
    toneTags: ["dark_careful", "balanced_rising"],
    icon: "⚖️"
  },
  {
    id: "sun",
    title: "The Sun",
    meaning: "Vận khí có ánh sáng. Nếu đi đúng nhịp, kết quả dễ tốt hơn mong đợi.",
    toneTags: ["bright_opening", "balanced_rising"],
    icon: "☀️"
  },
  {
    id: "hermit",
    title: "The Hermit",
    meaning: "Lùi một nhịp để nhìn rõ sẽ tốt hơn là tiến liên tục trong mơ hồ.",
    toneTags: ["dark_careful", "balanced_rising"],
    icon: "🕯️"
  },
  {
    id: "wheel",
    title: "Wheel of Fortune",
    meaning: "Có đổi vận, nhưng phải biết chớp đúng thời điểm.",
    toneTags: ["balanced_rising", "bright_opening"],
    icon: "🎡"
  },
  {
    id: "strength",
    title: "Strength",
    meaning: "Bạn chịu được nhiều hơn bạn nghĩ, miễn là đừng tự làm mình rối thêm.",
    toneTags: ["dark_careful", "balanced_rising", "bright_opening"],
    icon: "🦁"
  }
];