import type { PersonalityProfile } from "../types";

export type StyleTone = "soft" | "sharp" | "mystic" | "playful";

export type StyledSections = {
  overviewIntro: string;
  personalityIntro: string;
  topicIntro: string;
  opportunityIntro: string;
  cautionIntro: string;
  adviceIntro: string;
  closingIntro: string;
};

export function detectStyleTone(personality: PersonalityProfile): StyleTone {
  return personality.vibe;
}

export function getStyledSections(tone: StyleTone): StyledSections {
  switch (tone) {
    case "soft":
      return {
        overviewIntro: "Mình nhìn nhẹ cho bạn nhé: ",
        personalityIntro: "Bạn là kiểu người ",
        topicIntro: "Về chuyện này thì ",
        opportunityIntro: "Điểm sáng là ",
        cautionIntro: "Điều bạn nên để ý là ",
        adviceIntro: "Lời khuyên riêng cho bạn là ",
        closingIntro: "Chốt nhẹ một câu nhé: "
      };

    case "sharp":
      return {
        overviewIntro: "Nói thẳng luôn nha: ",
        personalityIntro: "Bạn là kiểu người ",
        topicIntro: "Đi thẳng vào chuyện này thì ",
        opportunityIntro: "Cửa sáng nằm ở chỗ ",
        cautionIntro: "Cái cần tránh là ",
        adviceIntro: "Lời khuyên thực tế là ",
        closingIntro: "Chốt hạ: "
      };

    case "mystic":
      return {
        overviewIntro: "Nếu nhìn theo nhịp năng lượng hiện tại thì ",
        personalityIntro: "Bên trong bạn là kiểu người ",
        topicIntro: "Ở tầng sâu hơn, chuyện này cho thấy ",
        opportunityIntro: "Tín hiệu sáng nằm ở chỗ ",
        cautionIntro: "Điều dễ làm lệch quẻ là ",
        adviceIntro: "Thông điệp dành riêng cho bạn là ",
        closingIntro: "Khép lại quẻ này bằng một câu: "
      };

    case "playful":
      return {
        overviewIntro: "Nói kiểu bạn thân cho dễ nuốt nha: ",
        personalityIntro: "Bạn đúng kiểu người ",
        topicIntro: "Còn vụ này thì mình thấy ",
        opportunityIntro: "Tin vui là ",
        cautionIntro: "Còn chỗ dễ tự làm mình mệt là ",
        adviceIntro: "Mình khuyên thật lòng là ",
        closingIntro: "Chốt câu cuối cho gọn nè: "
      };
  }
}

export function normalizeSentence(text: string): string {
  if (!text) return text;
  const trimmed = text.trim();
  return trimmed.charAt(0).toLowerCase() + trimmed.slice(1);
}

export function styleSentence(text: string, tone: StyleTone): string {
  let result = text.trim();

  switch (tone) {
    case "soft":
      break;

    case "sharp":
      result = result
        .replace("không hẳn", "không phải")
        .replace("hơi ", "")
        .replace("nên", "cần");
      break;

    case "mystic":
      break;

    case "playful":
      result = result
        .replace("không hẳn", "chưa hẳn")
        .replace("đừng", "nhớ đừng")
        .replace("thận trọng", "giữ đầu lạnh");
      break;
  }

  return result;
}