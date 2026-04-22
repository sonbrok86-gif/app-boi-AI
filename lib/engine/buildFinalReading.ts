import { FinalReading, FocusTopic, ToneMode } from "../types";

function topicLabel(topic: FocusTopic) {
  switch (topic) {
    case "tinh_yeu":
      return "tình yêu";
    case "gia_dao":
      return "gia đạo";
    case "kinh_doanh":
      return "kinh doanh";
    case "tai_chinh":
      return "tài chính";
    case "cong_viec":
      return "công việc";
    default:
      return "tổng quan";
  }
}

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

function uniqueLines(lines: string[]) {
  return [...new Set(lines.map((x) => x.trim()).filter(Boolean))];
}

function getTopLifeLines(lifeSections: FinalReading["lifeSections"]) {
  const lines: string[] = [];

  lifeSections.forEach((section) => {
    if (section.content?.[0]) lines.push(section.content[0]);
  });

  return uniqueLines(lines).slice(0, 3);
}

function shortText(text: string, max = 180) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, max).trimEnd() + "...";
}

function buildDirectionalAdvice(userFocus: FocusTopic, tone: ToneMode) {
  switch (userFocus) {
    case "kinh_doanh":
      return toneLine(
        "Đường làm ăn của bạn sáng nhất khi quyết nhanh nhưng không vội, mạnh nhưng vẫn giữ khuôn.",
        "Nếu dồn lực cho kinh doanh, bạn hợp kiểu đi chủ động nhưng cần kỷ luật.",
        "Kinh doanh thì có máu rồi, giờ chỉ cần bớt vài cú hứng lên là ví đỡ mệt 😄",
        tone
      );
    case "tai_chinh":
      return toneLine(
        "Tài chính của bạn đi đẹp khi giữ nhịp đều, không bị cảm xúc kéo lệch tay.",
        "Nếu đang soi tiền bạc, bạn nên ưu tiên độ bền hơn độ nhanh.",
        "Tiền hợp người tỉnh hơn người hưng phấn 😄",
        tone
      );
    case "tinh_yeu":
      return toneLine(
        "Tình cảm của bạn sáng khi rõ lòng mình trước, rồi mới mở cửa cho người khác.",
        "Nếu đang nhìn chuyện yêu đương, bạn cần sự rõ ràng hơn là cảm xúc thoáng qua.",
        "Yêu thì được, nhưng đừng để tim lái xe mà não ngủ gật 😄",
        tone
      );
    case "gia_dao":
      return toneLine(
        "Gia đạo của bạn yên khi lời nói mềm hơn một chút và nhịp sống đều hơn một chút.",
        "Nếu đang nghiêng về gia đạo, hãy giữ ổn bên trong trước.",
        "Nhà yên thì đầu đỡ xoắn, mà đầu đỡ xoắn thì vận đi cũng đẹp hơn 😄",
        tone
      );
    case "cong_viec":
      return toneLine(
        "Công việc của bạn thuận khi đứng đúng chỗ, không chỉ đứng lâu.",
        "Nếu đang soi công việc, vị trí đúng quan trọng không kém cố gắng.",
        "Chăm là tốt, nhưng chăm sai sân thì mệt lắm đạo hữu 😄",
        tone
      );
    default:
      return toneLine(
        "Giai đoạn này bạn cần gom lực vào một trục chính rồi đi đủ lâu.",
        "Tổng quan mà nói, bạn sáng hơn khi bớt phân tán.",
        "Chốt nhẹ: ôm ít việc đúng hơn ôm nhiều việc cho ngầu 😄",
        tone
      );
  }
}

function buildClosing(dailyVisitCount: number, tone: ToneMode) {
  const revisit =
    dailyVisitCount >= 2
      ? toneLine(
          "Việc bạn quay lại xem thêm cho thấy bạn đang thật sự muốn hiểu đường mình đi.",
          "Bạn quay lại lần này chứng tỏ bạn đang muốn soi rõ mình hơn.",
          "Quay lại lần này là có quan tâm thật, chứ không còn xem cho vui nữa 😄",
          tone
        )
      : "";

  const ending = toneLine(
    "Kết lại, bạn không thiếu lực. Điều quan trọng là chọn đúng trục và giữ đúng nhịp.",
    "Tóm lại, bạn có chất riêng. Việc còn lại là đi cho đều.",
    "Kết gọn: số không tệ, lực không yếu, chỉ cần bớt vài pha tự làm khó mình 😄",
    tone
  );

  return [ending, revisit].filter(Boolean).join("\n\n");
}

export function buildFinalReading(input: FinalReading) {
  const { user, tone, dailyVisitCount, lifeSections, personality, tarotDraws } = input;

  const topLifeLines = getTopLifeLines(lifeSections);

  const intro = toneLine(
    `${user.fullName} là kiểu người không hợp sống mờ. Đặt đúng chỗ là sáng rất rõ.`,
    `${user.fullName} càng đi đúng nhịp càng lộ bản sắc.`,
    `${user.fullName} không phải kiểu nhạt đâu, chỉ là đôi lúc tự làm mình rối thêm 😄`,
    tone
  );

  const lifeBlock = topLifeLines.length
    ? toneLine(
        `Tử vi nền đang nhấn vào mấy điểm chính:\n- ${topLifeLines.join("\n- ")}`,
        `Phần nền cho thấy mấy nét nổi bật:\n- ${topLifeLines.join("\n- ")}`,
        `Tử vi nền nói gọn là:\n- ${topLifeLines.join("\n- ")}`,
        tone
      )
    : "";

  const personalityBlock = toneLine(
    `Khí chất nổi bật của bạn là "${personality.title}". ${shortText(personality.description, 140)}`,
    `Phần trắc nghiệm cho thấy bạn mang nét "${personality.title}". ${shortText(
      personality.description,
      140
    )}`,
    `Quiz chốt khá rõ: bạn mang khí "${personality.title}".`,
    tone
  );

  const strengths = uniqueLines(personality.strengths).slice(0, 3);
  const cautions = uniqueLines(personality.cautions).slice(0, 2);

  const strengthsBlock = strengths.length
    ? toneLine(
        `Điểm mạnh đáng giữ:\n- ${strengths.join("\n- ")}`,
        `Điểm sáng của bạn:\n- ${strengths.join("\n- ")}`,
        `Điểm mạnh khá rõ:\n- ${strengths.join("\n- ")}`,
        tone
      )
    : "";

  const cautionBlock = cautions.length
    ? toneLine(
        `Điểm cần để ý:\n- ${cautions.join("\n- ")}`,
        `Điểm cần giữ nhịp thêm:\n- ${cautions.join("\n- ")}`,
        `Phần dễ tự làm khó mình:\n- ${cautions.join("\n- ")}`,
        tone
      )
    : "";

  const tarotHighlights = tarotDraws.map((draw, idx) => {
    const firstSentence = draw.reading.split(". ")[0]?.trim() || draw.reading;
    return `Lá ${idx + 1} · ${topicLabel(draw.topic)} · ${draw.card.name}: ${firstSentence}`;
  });

  const tarotBlock = toneLine(
    `Tarot chốt lại 3 cửa chính như sau:\n- ${tarotHighlights.join("\n- ")}`,
    `Ba lá bài đang phản chiếu các điểm này:\n- ${tarotHighlights.join("\n- ")}`,
    `Ba lá bài nói ngắn gọn thế này:\n- ${tarotHighlights.join("\n- ")}`,
    tone
  );

  const directionalAdvice = buildDirectionalAdvice(user.mainFocus, tone);

  const finalSynthesis = toneLine(
    "Ghép cả tử vi nền, tính cách và tarot lại, bạn mạnh nhất khi sống đúng chất thật của mình.",
    "Nhìn tổng thể, bạn sáng khi chọn đúng trục rồi đi bền.",
    "Gộp hết lại thì thấy rõ: bạn hợp sống đúng chất hơn là cố vừa lòng tất cả 😄",
    tone
  );

  const closing = buildClosing(dailyVisitCount, tone);

  return [
    intro,
    lifeBlock,
    personalityBlock,
    strengthsBlock,
    cautionBlock,
    tarotBlock,
    directionalAdvice,
    finalSynthesis,
    closing,
  ]
    .filter(Boolean)
    .join("\n\n");
}