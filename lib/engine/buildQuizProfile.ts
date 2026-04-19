import { MbtiLetter, MbtiScores, PersonalitySummary, ToneMode, TraitKey } from "../types";

function toneLine(serious: string, warm: string, funny: string, tone: ToneMode) {
  if (tone === "serious") return serious;
  if (tone === "warm") return warm;
  return funny;
}

function percent(a: number, b: number) {
  const total = a + b;
  if (total === 0) return 50;
  return Math.round((a / total) * 100);
}

function getMbtiType(scores: MbtiScores) {
  return [
    scores.E >= scores.I ? "E" : "I",
    scores.S >= scores.N ? "S" : "N",
    scores.T >= scores.F ? "T" : "F",
    scores.J >= scores.P ? "J" : "P",
  ].join("");
}

const PROFILE_MAP: Record<
  string,
  {
    title: string;
    subtitle: string;
    serious: string;
    warm: string;
    funny: string;
    strengths: string[];
    cautions: string[];
    workStyle: string[];
    loveStyle: string[];
    growthAdvice: string[];
  }
> = {
  ENTJ: {
    title: "Nhà điều hướng",
    subtitle: "Tầm nhìn lớn, thích cầm trục và mở đường",
    serious:
      "Bạn có xu hướng nhìn nhanh ra hướng đi, không thích đứng sau quá lâu và hợp vị trí ra quyết định.",
    warm:
      "Bạn mang khí chất dẫn đường, càng ở đúng sân càng bật rất mạnh.",
    funny:
      "Bạn kiểu thấy mọi thứ chạy chậm là trong đầu đã muốn đứng lên làm trưởng dự án 😄",
    strengths: [
      "Quyết đoán và có trục",
      "Nhìn được bức tranh lớn",
      "Dễ mở đường khi người khác còn lưỡng lự",
      "Hợp dẫn dắt và xây hệ",
      "Khá lì trước áp lực",
    ],
    cautions: [
      "Dễ sốt ruột với người chậm",
      "Có lúc quá cứng trong cách nói",
      "Ôm việc vì khó tin người",
      "Dễ ưu tiên mục tiêu hơn cảm xúc",
      "Khi mệt dễ trở nên kiểm soát quá mức",
    ],
    workStyle: [
      "Hợp vai trò quản lý, vận hành, kinh doanh, chiến lược",
      "Không hợp môi trường quá chậm hoặc thiếu quyền chủ động",
      "Làm tốt khi có mục tiêu rõ và thang đo kết quả",
    ],
    loveStyle: [
      "Yêu bằng hành động và định hướng",
      "Cần người có nội lực riêng, không quá phụ thuộc",
      "Học mềm lại thì tình cảm sẽ bền hơn",
    ],
    growthAdvice: [
      "Không phải cái gì nhanh cũng là cái gì đúng",
      "Lãnh đạo giỏi không chỉ chốt nhanh mà còn biết giữ người",
      "Thêm độ mềm vào bản lĩnh sẽ khiến bạn mạnh hơn, không yếu đi",
    ],
  },

  ENTP: {
    title: "Người khai mở",
    subtitle: "Nhanh đầu, nhiều ý tưởng, thích bẻ lối cũ",
    serious:
      "Bạn linh hoạt, thích khám phá khả năng mới và thường nhìn ra nhiều đường hơn một đường.",
    warm:
      "Bạn có chất mở đường bằng trí óc, ý tưởng và độ lanh.",
    funny:
      "Bạn kiểu đang nói chuyện này 2 phút sau đã nghĩ ra 4 dự án mới 😄",
    strengths: [
      "Ý tưởng phong phú",
      "Phản xạ nhanh",
      "Linh hoạt trước thay đổi",
      "Giỏi nhìn cơ hội",
      "Hợp môi trường cần sáng tạo và mở lối",
    ],
    cautions: [
      "Dễ chán khi mọi thứ lặp lại",
      "Mở nhiều hướng quá thành tản lực",
      "Đôi lúc nói nhanh hơn mức người khác bắt kịp",
      "Có thể thiếu bền ở giai đoạn đều việc",
      "Dễ bị hấp dẫn bởi cái mới hơn cái đang dang dở",
    ],
    workStyle: [
      "Hợp kinh doanh, sáng tạo, phát triển ý tưởng, truyền thông, startup",
      "Không hợp môi trường quá cứng và quá ít đất thử nghiệm",
      "Cần cộng sự giữ nhịp để biến ý tưởng thành kết quả",
    ],
    loveStyle: [
      "Cần người có chiều sâu và biết đối thoại",
      "Không hợp mối quan hệ quá kiểm soát",
      "Giữ được sự rõ ràng sẽ bền hơn cảm hứng nhất thời",
    ],
    growthAdvice: [
      "Ý tưởng hay chỉ thật sự có giá trị khi đi tới kết quả",
      "Bớt mở thêm nếu việc cũ chưa kịp ra quả",
      "Kỷ luật không giết sáng tạo, nó giúp sáng tạo sống lâu",
    ],
  },

  INFJ: {
    title: "Người thấu chiều sâu",
    subtitle: "Trực giác mạnh, nhìn người kỹ, sống có lớp bên trong",
    serious:
      "Bạn có chiều sâu, nhạy với con người và thường cảm được nhiều hơn những gì người khác nói ra.",
    warm:
      "Bạn sống không ồn nhưng có nội lực, càng hiểu mình càng sáng.",
    funny:
      "Bạn kiểu nhìn ngoài yên nhưng trong đầu đang phân tích luôn tầng 2 tầng 3 😄",
    strengths: [
      "Trực giác tốt",
      "Hiểu người khá sâu",
      "Sống có lý tưởng",
      "Tinh tế trong giao tiếp",
      "Giữ được chiều sâu trong mối quan hệ",
    ],
    cautions: [
      "Dễ suy nghĩ nhiều",
      "Dễ mệt vì ôm cảm xúc",
      "Có xu hướng tự chịu một mình",
      "Khó mở lòng hoàn toàn",
      "Khi thất vọng dễ im lặng quá lâu",
    ],
    workStyle: [
      "Hợp tư vấn, sáng tạo chiều sâu, chiến lược con người, thương hiệu, giáo dục",
      "Cần môi trường có ý nghĩa chứ không chỉ có tiền",
      "Làm tốt khi được tin và có không gian riêng",
    ],
    loveStyle: [
      "Yêu sâu, cần sự chân thật và tinh tế",
      "Không hợp kiểu hời hợt hoặc nửa vời kéo dài",
      "Một khi tin được thì rất bền",
    ],
    growthAdvice: [
      "Không phải ai cũng đọc được chiều sâu của bạn",
      "Nói ra đúng lúc sẽ tốt hơn là chờ người khác tự hiểu",
      "Giữ ranh giới cảm xúc là một loại trưởng thành",
    ],
  },

  INTJ: {
    title: "Người kiến tạo đường dài",
    subtitle: "Sâu, lạnh, có chiến lược và rất khó coi thường",
    serious:
      "Bạn có đầu óc hệ thống, thích nhìn xa và thường không tin hoàn toàn vào những gì quá cảm tính.",
    warm:
      "Bạn là kiểu người ít nói hơn nhưng nghĩ sâu hơn rất nhiều.",
    funny:
      "Bạn kiểu chưa chắc thích họp, nhưng nếu họp thì trong đầu đã sửa luôn mô hình hoạt động 😄",
    strengths: [
      "Tư duy chiến lược",
      "Khả năng tự học tốt",
      "Giữ được trục dài hạn",
      "Ít bị cuốn theo đám đông",
      "Giỏi tối ưu hệ thống",
    ],
    cautions: [
      "Dễ lạnh trong giao tiếp",
      "Khó tin người nhanh",
      "Kỳ vọng cao nên dễ thất vọng",
      "Có lúc quá độc lập",
      "Dễ bỏ qua cảm xúc của người khác",
    ],
    workStyle: [
      "Hợp chiến lược, hệ thống, công nghệ, đầu tư, phân tích, phát triển mô hình",
      "Cần môi trường có chiều sâu và quyền tự chủ",
      "Không hợp chỗ quá cảm tính và thiếu logic",
    ],
    loveStyle: [
      "Yêu không ồn nhưng không nông",
      "Cần người đủ tinh tế để hiểu phần ít nói của bạn",
      "Học bộc lộ mềm hơn sẽ khiến quan hệ dễ thở hơn",
    ],
    growthAdvice: [
      "Đúng chưa chắc đã đủ nếu cách nói làm người khác đóng lại",
      "Không cần ai cũng hiểu mình, nhưng người quan trọng nên được bước vào",
      "Sự mềm không làm bạn yếu đi, nó làm bạn đủ rộng để giữ đường dài",
    ],
  },
};

function buildFallbackProfile(typeCode: string, tone: ToneMode): PersonalitySummary {
  return {
    typeCode,
    title: `Khí chất ${typeCode}`,
    subtitle: "Bản phối riêng giữa lý trí, cảm xúc, nhịp sống và cách mở năng lượng",
    description: toneLine(
      "Bạn là kiểu người có bản sắc riêng, không hợp bị ép thành phiên bản giống số đông.",
      "Bạn có một kiểu đi riêng, càng đúng chỗ càng sáng.",
      "Bạn không phải kiểu nhạt, chỉ là chưa phải ai cũng bắt sóng kịp 😄",
      tone
    ),
    strengths: [
      "Có bản sắc riêng",
      "Có nhịp nghĩ và nhịp sống rõ",
      "Dễ phát huy khi đúng môi trường",
      "Không dễ bị hòa tan hoàn toàn",
      "Có chiều sâu để phát triển lâu dài",
    ],
    cautions: [
      "Dễ lệch nhịp khi ở sai chỗ",
      "Có lúc tự làm mình rối",
      "Cần thêm kỷ luật ở đoạn quyết định",
      "Không nên ôm quá nhiều thứ cùng lúc",
      "Cần chọn đúng trục để đi xa",
    ],
    workStyle: [
      "Hợp môi trường cho phép phát huy chất riêng",
      "Cần đúng vai hơn là chỉ đúng lương",
      "Làm tốt khi thấy rõ ý nghĩa và hướng đi",
    ],
    loveStyle: [
      "Cần sự hiểu nhịp hơn là bề nổi",
      "Không hợp quan hệ hời hợt kéo dài",
      "Yêu bền hơn khi được là chính mình",
    ],
    growthAdvice: [
      "Đi đúng quan trọng hơn đi nhanh",
      "Bớt phân tán thì lực sẽ tụ",
      "Hiểu mình là bước đầu để vận mở rõ hơn",
    ],
    scorePercent: {
      E: 50, I: 50, S: 50, N: 50, T: 50, F: 50, J: 50, P: 50,
    },
  };
}

export function buildQuizProfile(
  answers: TraitKey[],
  tone: ToneMode = "serious"
): PersonalitySummary {
  const scores: MbtiScores = {
    E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0,
  };

  answers.forEach((a) => {
    const key = a as unknown as MbtiLetter;
    if (scores[key] !== undefined) scores[key] += 1;
  });

  const typeCode = getMbtiType(scores);

  const scorePercent: Record<MbtiLetter, number> = {
    E: percent(scores.E, scores.I),
    I: percent(scores.I, scores.E),
    S: percent(scores.S, scores.N),
    N: percent(scores.N, scores.S),
    T: percent(scores.T, scores.F),
    F: percent(scores.F, scores.T),
    J: percent(scores.J, scores.P),
    P: percent(scores.P, scores.J),
  };

  const base = PROFILE_MAP[typeCode];

  if (!base) {
    return buildFallbackProfile(typeCode, tone);
  }

  return {
    typeCode,
    title: base.title,
    subtitle: base.subtitle,
    description: toneLine(base.serious, base.warm, base.funny, tone),
    strengths: base.strengths,
    cautions: base.cautions,
    workStyle: base.workStyle,
    loveStyle: base.loveStyle,
    growthAdvice: base.growthAdvice,
    scorePercent,
  };
}