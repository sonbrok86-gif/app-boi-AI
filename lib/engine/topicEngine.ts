import type { Topic } from "../types";

export type TopicPack = {
  topicTitle: string;
  topicFlavor: string;
  opportunityLabel: string;
  cautionLabel: string;
  adviceLabel: string;
};

export function getTopicPack(topic: Topic): TopicPack {
  switch (topic) {
    case "tinh_cam":
      return {
        topicTitle: "Chuyện tình cảm 💘",
        topicFlavor: "Ở chủ đề này, quẻ sẽ ưu tiên đọc nhịp cảm xúc, sự rõ ràng và mức độ đồng điệu.",
        opportunityLabel: "Cửa sáng trong tình cảm",
        cautionLabel: "Điều dễ làm chuyện tình cảm lệch nhịp",
        adviceLabel: "Lời khuyên cho trái tim bạn"
      };

    case "gia_dao":
      return {
        topicTitle: "Chuyện gia đạo 🏠",
        topicFlavor: "Ở chủ đề này, quẻ sẽ nhìn vào hòa khí, khoảng cách, vai trò và cách mọi người giữ nhau.",
        opportunityLabel: "Điểm sáng trong gia đạo",
        cautionLabel: "Điều dễ làm không khí gia đình nặng thêm",
        adviceLabel: "Lời khuyên để trong nhà dễ thở hơn"
      };

    case "tien_tai":
      return {
        topicTitle: "Chuyện tiền tài 💰",
        topicFlavor: "Ở chủ đề này, quẻ sẽ nhìn vào nhịp kiếm tiền, giữ tiền, rủi ro và độ tỉnh của bạn.",
        opportunityLabel: "Cửa tiền đang mở ở đâu",
        cautionLabel: "Điều dễ làm tiền bạc trượt khỏi tay",
        adviceLabel: "Lời khuyên để tiền ở lại lâu hơn"
      };

    case "co_hoi":
      return {
        topicTitle: "Chuyện cơ hội 🚪",
        topicFlavor: "Ở chủ đề này, quẻ sẽ soi vào thời điểm, hướng đi, độ dám đổi và khả năng chớp thời cơ.",
        opportunityLabel: "Cơ hội sáng nhất lúc này",
        cautionLabel: "Điều dễ làm bạn lỡ nhịp",
        adviceLabel: "Lời khuyên để nắm đúng thời điểm"
      };
  }
}

export function getTopicExtraAdvice(
  topic: Topic,
  tone: "dark_careful" | "balanced_rising" | "bright_opening"
): string {
  const map = {
    tinh_cam: {
      dark_careful:
        "bạn nên bớt tự đoán lòng người và tập trung vào sự rõ ràng thực tế.",
      balanced_rising:
        "nếu muốn tình cảm sáng hơn, hãy nói điều cần nói thay vì chờ người khác tự hiểu.",
      bright_opening:
        "hãy giữ sự chân thành nhưng đừng để cảm xúc đẩy mọi thứ đi nhanh quá."
    },
    gia_dao: {
      dark_careful:
        "điều cần nhất lúc này là nói chuyện mềm nhưng thật, đừng dồn quá lâu rồi mới bùng ra.",
      balanced_rising:
        "một người mở lời trước có thể làm nhẹ cả không khí trong nhà.",
      bright_opening:
        "hãy tận dụng lúc mọi thứ đang dịu để gỡ những điều còn nghẹn."
    },
    tien_tai: {
      dark_careful:
        "bạn nên ưu tiên giữ nhịp tiền ổn định trước khi nghĩ tới bước lớn.",
      balanced_rising:
        "nếu đi theo kỷ luật và bớt quyết theo mood, tiền sẽ ở lại lâu hơn.",
      bright_opening:
        "đây là lúc nên chọn cơ hội có kiểm soát thay vì lao theo cái gì sáng nhất."
    },
    co_hoi: {
      dark_careful:
        "đừng chê những cơ hội nhỏ nhưng thật, vì nhiều khi đó mới là cửa mở đúng.",
      balanced_rising:
        "điều bạn cần nhất lúc này là chốt hướng rõ ràng rồi đi đều theo nó.",
      bright_opening:
        "nếu đã thấy đúng nhịp, hãy hành động gọn hơn và đừng để chần chừ kéo tụt vận."
    }
  };

  return map[topic][tone];
}