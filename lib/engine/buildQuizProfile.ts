import { MbtiLetter, MbtiScores, PersonalitySummary, ToneMode } from "../types";

function toneLine(
  serious: string,
  warm: string,
  funny: string,
  tone: ToneMode
) {
  if (tone === "serious") return serious;
  if (tone === "warm") return warm;
  return funny;
}

function emptyScores(): MbtiScores {
  return {
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0,
  };
}

function percentPair(a: number, b: number) {
  const total = a + b;
  if (total === 0) return [50, 50];
  return [Math.round((a / total) * 100), Math.round((b / total) * 100)];
}

function getTypeCode(scores: MbtiScores) {
  return [
    scores.E >= scores.I ? "E" : "I",
    scores.S >= scores.N ? "S" : "N",
    scores.T >= scores.F ? "T" : "F",
    scores.J >= scores.P ? "J" : "P",
  ].join("") as `${MbtiLetter}${MbtiLetter}${MbtiLetter}${MbtiLetter}`;
}

function getProfileContent(typeCode: string, tone: ToneMode) {
  switch (typeCode) {
    case "ENTJ":
      return {
        title: toneLine("Người dẫn đường", "Người có lực dẫn dắt", "Sếp hệ có aura", tone),
        subtitle: "Quyết đoán, chiến lược, thích tạo chuyển động",
        description: toneLine(
          "Bạn có xu hướng nhìn xa, ra quyết định nhanh và thích chủ động cầm nhịp.",
          "Bạn là kiểu người có nội lực lãnh đạo khá rõ, thường nhìn ra hướng đi trước người khác.",
          "Bạn là kiểu người bước vào phòng là năng lượng tự động đổi mode 😄",
          tone
        ),
        strengths: [
          "Ra quyết định khá nhanh khi đã thấy hướng",
          "Có tư duy hệ thống và thích tối ưu",
          "Hợp vai trò dẫn dắt hoặc mở đường",
        ],
        cautions: [
          "Dễ sốt ruột với người chậm nhịp",
          "Có lúc hơi cứng khi đã tin mình đúng",
          "Cần thêm độ mềm trong giao tiếp cảm xúc",
        ],
        workStyle: [
          "Hợp môi trường có mục tiêu rõ",
          "Làm tốt khi được quyền chủ động",
          "Thích xây cấu trúc hơn là chạy việc vụn vặt",
        ],
        loveStyle: [
          "Yêu theo kiểu rõ ràng và thực tế",
          "Thể hiện bằng hành động hơn là lời hoa mỹ",
          "Cần học cách mềm hơn trong lúc người kia yếu lòng",
        ],
        growthAdvice: [
          "Bớt gồng làm người mạnh mọi lúc",
          "Lắng nghe cảm xúc trước khi sửa vấn đề",
          "Giữ tốc độ nhưng đừng quên nhịp của người khác",
        ],
      };

    case "ENFP":
      return {
        title: toneLine("Người truyền lửa", "Người mang cảm hứng", "Hệ nhiều mood nhưng cuốn", tone),
        subtitle: "Sáng tạo, giàu cảm xúc, thích tự do và kết nối",
        description: toneLine(
          "Bạn thường mang năng lượng mở, nhiều ý tưởng và dễ truyền cảm hứng cho người khác.",
          "Bạn là kiểu người ấm, nhanh bắt sóng và có khả năng khiến không khí sáng lên.",
          "Bạn là hệ nghĩ nhanh, cảm nhanh, thích nhiều thứ cùng lúc 😄",
          tone
        ),
        strengths: [
          "Sáng tạo và giàu ý tưởng",
          "Dễ kết nối, tạo thiện cảm",
          "Có khả năng truyền lửa cho tập thể",
        ],
        cautions: [
          "Dễ phân tán nếu quá nhiều hướng mở ra",
          "Có lúc cảm hứng mạnh nhưng thiếu đều nhịp",
          "Cần thêm kỷ luật để đi đường dài",
        ],
        workStyle: [
          "Hợp môi trường sáng tạo, linh hoạt",
          "Làm tốt khi có không gian tự chủ",
          "Phù hợp vai trò kết nối, ý tưởng, phát triển",
        ],
        loveStyle: [
          "Yêu bằng cảm xúc thật và sự hứng khởi",
          "Thích mối quan hệ có chiều sâu lẫn tự do",
          "Dễ chán nếu tình cảm quá khô cứng",
        ],
        growthAdvice: [
          "Chọn ít hướng nhưng đi sâu hơn",
          "Đừng để cảm hứng thay thế kỷ luật",
          "Giữ lửa tốt, nhưng cần giữ cả nhịp",
        ],
      };

    case "INFJ":
      return {
        title: toneLine("Người thấu cảm sâu", "Người nhìn xa bằng trực giác", "Hệ trầm nhưng sâu", tone),
        subtitle: "Sâu sắc, tinh tế, trực giác mạnh",
        description: toneLine(
          "Bạn thường cảm được lớp nghĩa bên dưới bề mặt và có xu hướng nhìn đời bằng chiều sâu.",
          "Bạn là người có trực giác mạnh, sống nội tâm nhưng không hề yếu.",
          "Bạn là kiểu ngoài im mà bên trong đang chạy nguyên hệ phân tích tầng sâu 😄",
          tone
        ),
        strengths: [
          "Tinh tế và đọc được cảm xúc người khác",
          "Có chiều sâu và lý tưởng sống",
          "Hợp vai trò dẫn đường bằng sự thấu hiểu",
        ],
        cautions: [
          "Dễ mệt nếu ôm cảm xúc quá nhiều",
          "Có xu hướng tự chịu đựng một mình",
          "Cần rạch ròi hơn về ranh giới cá nhân",
        ],
        workStyle: [
          "Hợp công việc có ý nghĩa",
          "Làm tốt khi có không gian tập trung",
          "Phù hợp tư vấn, viết, định hướng, chăm sóc chiều sâu",
        ],
        loveStyle: [
          "Yêu sâu và cần sự chân thành thật sự",
          "Không hợp mối quan hệ hời hợt",
          "Cần cảm giác an toàn tinh thần",
        ],
        growthAdvice: [
          "Đừng gánh hết tâm trạng của người khác",
          "Nói nhu cầu của mình rõ hơn",
          "Giữ lòng tốt, nhưng thêm giới hạn",
        ],
      };

    default:
      return {
        title: toneLine("Người có bản sắc riêng", "Người mang khí chất riêng", "Hệ không hề nhạt", tone),
        subtitle: "Mỗi người có một nhịp mạnh riêng",
        description: toneLine(
          "Bạn có tổ hợp tính cách riêng, không cần giống số đông mới là đúng.",
          "Bạn có chất riêng rõ ràng; điều quan trọng là đi đúng môi trường hợp mình.",
          "Bạn không phải bản sao của ai cả, nên cứ sống đúng chất mình 😄",
          tone
        ),
        strengths: [
          "Có nét riêng trong cách nghĩ và cách sống",
          "Có tiềm năng phát triển theo hướng rất cá nhân",
          "Khi đúng môi trường sẽ bật lên rõ",
        ],
        cautions: [
          "Dễ tự nghi ngờ nếu đi sai chỗ",
          "Cần hiểu mình để chọn đúng nhịp",
          "Không nên ép bản thân theo khuôn người khác",
        ],
        workStyle: [
          "Hiệu quả hơn khi đúng vai trò",
          "Cần môi trường phù hợp để phát huy",
          "Nên chọn cách làm việc hợp bản chất của mình",
        ],
        loveStyle: [
          "Cần được hiểu đúng hơn là chỉ được chú ý",
          "Hợp người biết tôn trọng nhịp riêng",
          "Tình cảm bền khi có sự chân thành và ổn định",
        ],
        growthAdvice: [
          "Hiểu rõ mình trước khi ép mình thay đổi",
          "Chọn đúng môi trường quan trọng không kém nỗ lực",
          "Đi chậm mà đúng còn hơn nhanh mà lệch",
        ],
      };
  }
}

export function buildQuizProfile(
  answers: MbtiLetter[],
  tone: ToneMode = "warm"
): PersonalitySummary {
  const scores = emptyScores();

  answers.forEach((letter) => {
    if (letter && letter in scores) {
      scores[letter as keyof MbtiScores] += 1;
    }
  });

  const typeCode = getTypeCode(scores);
  const content = getProfileContent(typeCode, tone);

  const [ePct, iPct] = percentPair(scores.E, scores.I);
  const [sPct, nPct] = percentPair(scores.S, scores.N);
  const [tPct, fPct] = percentPair(scores.T, scores.F);
  const [jPct, pPct] = percentPair(scores.J, scores.P);

  return {
    typeCode,
    title: content.title,
    subtitle: content.subtitle,
    description: content.description,
    strengths: content.strengths,
    cautions: content.cautions,
    workStyle: content.workStyle,
    loveStyle: content.loveStyle,
    growthAdvice: content.growthAdvice,
    scorePercent: {
      E: ePct,
      I: iPct,
      S: sPct,
      N: nPct,
      T: tPct,
      F: fPct,
      J: jPct,
      P: pPct,
    },
  };
}