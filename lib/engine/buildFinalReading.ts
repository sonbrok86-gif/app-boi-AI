import {
  FinalReadingInput,
  FocusTopic,
  ToneMode,
} from "../types";

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

function getTopLifeLines(lifeSections: FinalReadingInput["lifeSections"]) {
  const lines: string[] = [];

  lifeSections.forEach((section) => {
    if (section.content?.[0]) lines.push(section.content[0]);
  });

  return lines.slice(0, 3);
}

function buildPersonalitySummary(
  title: string,
  description: string,
  tone: ToneMode
) {
  return toneLine(
    `Qua phần trắc nghiệm, khí chất nổi bật của bạn là "${title}". ${description}`,
    `Quiz cho thấy phần nổi bật nhất của bạn là "${title}". ${description}`,
    `Quiz chốt khá rõ: bạn mang khí "${title}". Tức là bạn có bài riêng, không phải kiểu copy-paste đại trà.`,
    tone
  );
}

function buildTarotSummary(
  tarotDraws: FinalReadingInput["tarotDraws"],
  tone: ToneMode
) {
  const topicText = tarotDraws
    .map((draw) => `- ${topicLabel(draw.topic)}: ${draw.card.name}`)
    .join("\n");

  const intro = toneLine(
    "Ba lá tarot hôm nay không đứng riêng lẻ, mà tạo thành một tam giác soi vào ba cửa quan trọng của đời bạn.",
    "Ba lá tarot lần này ghép lại thành một bức tranh khá rõ về nhịp hiện tại của bạn.",
    "Ba lá tarot này không phải bốc cho vui đâu, ghép lại là ra nguyên cái mood sống hiện tại luôn 😄",
    tone
  );

  return `${intro}\n${topicText}`;
}

function buildDirectionalAdvice(
  userFocus: FocusTopic,
  tone: ToneMode
) {
  switch (userFocus) {
    case "kinh_doanh":
      return toneLine(
        "Nếu lấy kinh doanh làm trục chính, bạn nên nhớ: đường tiền sáng nhất khi đầu óc không nóng hơn dữ liệu. Có khí mở đường là tốt, nhưng muốn đi xa phải thêm nhịp và kỷ luật.",
        "Nếu trọng tâm là kinh doanh, bạn hợp kiểu đi chủ động nhưng có kiểm soát.",
        "Nếu đang lấy kinh doanh làm trục thì nhớ: có máu làm ăn là lợi thế, nhưng đừng để máu lên não quá nhanh 😄",
        tone
      );

    case "tai_chinh":
      return toneLine(
        "Nếu lấy tài chính làm trọng tâm, bài học lớn không nằm ở kiếm nhanh mà ở giữ nhịp bền. Tài khí đẹp nhất khi tâm trí không bị cảm hứng nhất thời lôi đi.",
        "Nếu đang soi tài chính, bạn nên ưu tiên ổn nhịp hơn là đu cảm xúc.",
        "Nếu lấy tiền làm trục thì nhớ: ví thích kỷ luật hơn thích drama 😄",
        tone
      );

    case "tinh_yeu":
      return toneLine(
        "Nếu lấy tình yêu làm trọng tâm, điều quan trọng nhất là rõ lòng mình trước khi dò lòng người. Yêu đúng thì sáng, yêu vội thì mệt.",
        "Nếu đang nghiêng về tình cảm, bạn cần một mối quan hệ có nhịp hiểu nhau thật.",
        "Nếu lấy tình yêu làm trục thì nhớ: rung động là một chuyện, giữ được nhịp mới là chuyện lớn 😄",
        tone
      );

    case "gia_dao":
      return toneLine(
        "Nếu lấy gia đạo làm trọng tâm, điều nên giữ là sự mềm trong lời nói và sự đều trong cảm xúc. Nhà êm thì vận ngoài đời mới sáng hẳn.",
        "Nếu đang soi gia đạo, bạn nên ưu tiên ổn bên trong trước.",
        "Nếu lấy gia đạo làm trục thì nhớ: trong nhà yên một chút là ngoài đời đỡ mệt hẳn 😄",
        tone
      );

    case "cong_viec":
      return toneLine(
        "Nếu lấy công việc làm trọng tâm, bạn nên chọn đúng chỗ đứng hơn là chỉ cố đứng lâu. Đúng vị trí thì tài tự sáng.",
        "Nếu đang soi công việc, chọn chỗ đúng quan trọng không kém cố gắng.",
        "Nếu lấy công việc làm trục thì nhớ: chăm thôi chưa đủ, còn phải đúng sân 😄",
        tone
      );

    default:
      return toneLine(
        "Nếu nhìn toàn cục, điều cần nhất của bạn lúc này là gom lực vào một trục chính rồi đi đủ lâu. Đường mở cho người giữ được nhịp.",
        "Nếu nhìn tổng quan, bạn cần rõ thứ gì là trục chính trong giai đoạn này.",
        "Nếu nhìn tổng thể thì chốt gọn: bớt phân tán là đời đỡ phải nhắc bài 😄",
        tone
      );
  }
}

function buildClosing(
  dailyVisitCount: number,
  tone: ToneMode
) {
  const revisit =
    dailyVisitCount >= 2
      ? toneLine(
          "Việc bạn quay lại xem thêm cho thấy bên trong bạn đang thực sự muốn soi rõ đường đi của mình. Đó không phải yếu đuối, mà là dấu hiệu của người muốn sống có ý thức hơn.",
          "Bạn quay lại lần này chứng tỏ bạn đang thật sự muốn hiểu mình hơn.",
          "Bạn quay lại lần này chứng tỏ hoặc rất quan tâm vận mình, hoặc rất thích bị app nói trúng tim đen 😄",
          tone
        )
      : "";

  const ending = toneLine(
    "Kết lại, bạn không thiếu cơ hội, cũng không thiếu khí. Điều đáng quý nhất lúc này là chọn đúng đường, giữ đúng nhịp, rồi để thời gian đứng về phía mình.",
    "Tóm lại, bạn có lực. Việc còn lại là đi đúng đường và đừng tự phân tán mình.",
    "Kết gọn nha: bạn không thiếu số, không thiếu lực. Chỉ cần bớt vài pha tự làm khó mình là đời sẽ dễ thở hơn nhiều 😄",
    tone
  );

  return [ending, revisit].filter(Boolean).join("\n\n");
}

export function buildFinalReading(input: FinalReadingInput) {
  const {
    user,
    tone,
    dailyVisitCount,
    lifeSections,
    personality,
    tarotDraws,
  } = input;

  const topLifeLines = getTopLifeLines(lifeSections);

  const intro = toneLine(
    `${user.fullName} mang nền khí không hợp sống mờ. Người như bạn nếu đặt đúng chỗ thì rất sáng, mà đã sáng thì không phải kiểu sáng lấp ló, mà là sáng thành vị thế.`,
    `${user.fullName} là kiểu người càng đi đúng nhịp càng lộ bản sắc. Bạn có khí riêng, chỉ cần đừng tự tản mình ra quá nhiều hướng.`,
    `${user.fullName} nhìn chung không phải kiểu tầm thường. Có điều đôi lúc chính bạn lại tự làm khó mình bằng vài pha nghĩ thêm, mở thêm, ôm thêm 😄`,
    tone
  );

  const lifeBlock = toneLine(
    `Tử vi nền mở ra cho bạn một trục khí khá rõ:\n- ${topLifeLines.join("\n- ")}`,
    `Phần tử vi nền cho thấy bạn có mấy đường nổi bật:\n- ${topLifeLines.join("\n- ")}`,
    `Tử vi nền nói gọn về bạn là:\n- ${topLifeLines.join("\n- ")}`,
    tone
  );

  const personalityBlock = buildPersonalitySummary(
    personality.title,
    personality.description,
    tone
  );

  const strengthsBlock = toneLine(
    `Điểm mạnh nổi lên ở bạn là:\n- ${personality.strengths.join("\n- ")}`,
    `Điểm sáng của bạn gồm:\n- ${personality.strengths.join("\n- ")}`,
    `Điểm mạnh của bạn khá rõ:\n- ${personality.strengths.join("\n- ")}`,
    tone
  );

  const cautionBlock = toneLine(
    `Điểm cần giữ lại là:\n- ${personality.cautions.join("\n- ")}`,
    `Điểm cần để ý thêm là:\n- ${personality.cautions.join("\n- ")}`,
    `Phần dễ tự làm khó mình là:\n- ${personality.cautions.join("\n- ")}`,
    tone
  );

  const tarotBlock = buildTarotSummary(tarotDraws, tone);

  const eachTarotReading = tarotDraws
    .map(
      (draw, idx) =>
        `Lá ${idx + 1} – ${topicLabel(draw.topic)} – ${draw.card.name}:\n${draw.reading}`
    )
    .join("\n\n");

  const directionalAdvice = buildDirectionalAdvice(user.mainFocus, tone);

  const finalSynthesis = toneLine(
    "Nếu ghép tử vi nền, tính cách và ba lá bài lại, có thể nói bạn là kiểu người càng đi đúng khí chất thật của mình càng mở vận mạnh. Bạn không hợp đường giả, không hợp chỗ chật, cũng không hợp kiểu sống nhỏ hơn bản thân.",
    "Gom cả ba phần lại, bạn sáng nhất khi sống đúng khí chất và chọn đúng trục chính.",
    "Ghép cả ba phần lại thì ra một câu khá rõ: bạn hợp sống đúng chất của mình hơn là cố làm phiên bản vừa lòng tất cả mọi người 😄",
    tone
  );

  const closing = buildClosing(dailyVisitCount, tone);

  return [
    intro,
    "",
    lifeBlock,
    "",
    personalityBlock,
    "",
    strengthsBlock,
    "",
    cautionBlock,
    "",
    tarotBlock,
    "",
    eachTarotReading,
    "",
    directionalAdvice,
    "",
    finalSynthesis,
    "",
    closing,
  ].join("\n");
}