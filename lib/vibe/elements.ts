export type ElementKey = "Kim" | "Mộc" | "Thủy" | "Hỏa" | "Thổ";

export const elementData: Record<
  ElementKey,
  {
    name: string;
    vibe: string[];
    colors: string[];
    luckyNumbers: number[];
    supportive: string[];
    caution: string[];
    reminders: string[];
  }
> = {
  Kim: {
    name: "Kim",
    vibe: [
      "mạnh ở độ chuẩn, sự rõ và khả năng giữ tiêu chuẩn",
      "hợp môi trường có quy tắc, khuôn và độ minh bạch",
      "đẹp khi cứng đúng chỗ, mềm đúng lúc",
    ],
    colors: ["trắng", "ánh kim", "xám bạc"],
    luckyNumbers: [4, 6, 9],
    supportive: ["Thổ"],
    caution: ["Hỏa"],
    reminders: [
      "Kim sáng khi qua rèn, nhưng quá cứng thì tự làm mình mệt.",
      "Có chuẩn là lợi thế, có mềm là bản lĩnh.",
      "Đúng khuôn là tốt, đừng biến mình thành người tự siết mình cả ngày.",
    ],
  },
  Mộc: {
    name: "Mộc",
    vibe: [
      "mạnh ở sinh trưởng, đi đường dài và phát triển đều",
      "hợp nhịp tích lũy hơn là bứt kiểu ăn xổi",
      "đẹp khi giữ gốc mà vẫn dám vươn lên",
    ],
    colors: ["xanh lá", "xanh rêu", "xanh ngọc"],
    luckyNumbers: [3, 8],
    supportive: ["Thủy"],
    caution: ["Kim"],
    reminders: [
      "Mộc mạnh ở bền, không mạnh ở hấp tấp.",
      "Nuôi đúng gốc thì vận sẽ lên rất đều.",
      "Đi đường dài hợp với mệnh này hơn là nóng vội vài pha rồi mệt.",
    ],
  },
  Thủy: {
    name: "Thủy",
    vibe: [
      "mạnh ở độ linh hoạt, độ xoay và khả năng thích nghi",
      "hợp thế mềm mà không yếu",
      "đẹp khi biết giữ bờ trong lúc xoay theo thế",
    ],
    colors: ["đen", "xanh dương", "xanh biển"],
    luckyNumbers: [1, 6],
    supportive: ["Kim"],
    caution: ["Thổ"],
    reminders: [
      "Thủy mạnh ở mềm mà không yếu.",
      "Biết xoay là lợi thế, giữ bờ là bản lĩnh.",
      "Đừng để mình quá trôi mà quên mất trục chính.",
    ],
  },
  Hỏa: {
    name: "Hỏa",
    vibe: [
      "mạnh ở nhiệt, lực và khả năng bật lên rất nhanh",
      "hợp hành động, quyết đoán và chủ động",
      "đẹp khi có lửa nhưng vẫn giữ được điều nhiệt",
    ],
    colors: ["đỏ", "cam", "hồng", "tím"],
    luckyNumbers: [2, 7],
    supportive: ["Mộc"],
    caution: ["Thủy"],
    reminders: [
      "Hỏa quý ở chỗ cháy đúng, không phải cháy lớn.",
      "Có lửa là tốt, có điều nhiệt còn tốt hơn.",
      "Bật rất nhanh là lợi thế, đừng để nóng quá rồi tự hao.",
    ],
  },
  Thổ: {
    name: "Thổ",
    vibe: [
      "mạnh ở độ chắc, nền tảng và khả năng giữ nhịp ổn định",
      "hợp tích lũy, hợp dựng nền rồi mới bung lực",
      "đẹp khi bền đúng chỗ, không giữ mãi thứ nên bỏ",
    ],
    colors: ["vàng đất", "nâu", "be"],
    luckyNumbers: [2, 5, 8],
    supportive: ["Hỏa"],
    caution: ["Mộc"],
    reminders: [
      "Thổ mạnh ở giữ nền và đi chắc.",
      "Bền là hay, bền với cái sai thì thành tự khổ.",
      "Có móng tốt thì lên chậm một chút vẫn đáng giá.",
    ],
  },
};