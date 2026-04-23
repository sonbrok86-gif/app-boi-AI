import { FinalReading, FocusTopic, ToneMode } from "../types";

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function uniqueLines(lines: string[]) {
  return [...new Set(lines.map((x) => x.trim()).filter(Boolean))];
}

function shortText(text: string, max = 180) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, max).trimEnd() + "...";
}

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

function toneLine(serious: string, warm: string, funny: string, tone: ToneMode) {
  if (tone === "serious") return serious;
  if (tone === "warm") return warm;
  return funny;
}

function getTopLifeLines(lifeSections: FinalReading["lifeSections"]) {
  const lines: string[] = [];

  lifeSections.forEach((section) => {
    if (section.content?.[0]) lines.push(section.content[0]);
  });

  return uniqueLines(lines).slice(0, 3);
}

/* =========================
   LV5 PERSONALITY VOICE
========================= */

function getPersonalityVoice(tone: ToneMode) {
  const serious = [
    "Ta nói thẳng, không vòng vo. Phần dưới là chỗ cần đọc kỹ.",
    "Phần này nên đọc bằng đầu óc tỉnh, không nên né tránh.",
  ];

  const warm = [
    "Mình nói thật nhưng nhẹ nhàng thôi nhé.",
    "Phần dưới không cần căng, cứ đọc chậm là sẽ thấy rõ hơn.",
  ];

  const funny = [
    "Ok đạo hữu, nói nhẹ thôi chứ nói thật là dễ giật mình 😄",
    "Chuẩn bị tinh thần nha, có đoạn hơi trúng đó đạo hữu 😄",
  ];

  return pick(tone === "serious" ? serious : tone === "warm" ? warm : funny);
}

/* =========================
   LV4 EMOTION
========================= */

function detectEmotion(topics: FocusTopic[], visitCount: number, tone: ToneMode) {
  const lines: string[] = [];

  const love = topics.filter((t) => t === "tinh_yeu").length;
  const money = topics.filter((t) => t === "tai_chinh").length;
  const work = topics.filter((t) => t === "cong_viec").length;

  if (new Set(topics).size === 3) {
    lines.push(
      toneLine(
        "Có vẻ bạn đang đứng giữa nhiều hướng và chưa muốn quyết định vội.",
        "Mình thấy bạn đang nhìn nhiều hướng cùng lúc, nghĩa là trong lòng vẫn còn cân nhắc.",
        "Đạo hữu đang ngó nhiều cửa cùng lúc, kiểu này thường là chưa chốt được cửa nào 😄",
        tone
      )
    );
  }

  if (work >= 2 || money >= 2) {
    lines.push(
      toneLine(
        "Giai đoạn này bạn đang chịu áp lực về thực tế khá rõ.",
        "Có vẻ bạn đang gồng khá nhiều ở phần công việc hoặc tiền bạc.",
        "Nhìn là thấy đạo hữu đang bận chuyện đời thực nhiều hơn chuyện mây trời 😄",
        tone
      )
    );
  }

  if (love >= 2) {
    lines.push(
      toneLine(
        "Chuyện tình cảm đang ảnh hưởng khá rõ đến tâm trạng của bạn.",
        "Mình thấy cảm xúc đang dẫn bạn đi mạnh hơn bình thường.",
        "Đạo hữu có vẻ đang để tim chạy nhanh hơn não một chút 😄",
        tone
      )
    );
  }

  if (visitCount >= 3) {
    lines.push(
      toneLine(
        "Việc quay lại nhiều lần cho thấy bạn đang tìm một sự chắc chắn.",
        "Mình đoán bạn chưa thật sự yên tâm với điều đang nghĩ trong đầu.",
        "Quay lại mấy lần rồi thì rõ là đạo hữu đang muốn có câu trả lời chắc hơn 😄",
        tone
      )
    );
  }

  if (lines.length === 0) {
    lines.push(
      toneLine(
        "Bề ngoài có thể ổn, nhưng bên trong vẫn còn vài điều chưa thật sự khép lại.",
        "Nhìn chung bạn vẫn giữ được cân bằng, chỉ là trong lòng còn chút lăn tăn.",
        "Trông thì ổn đó, nhưng bên trong chắc vẫn còn vài nếp gấp chưa vuốt phẳng 😄",
        tone
      )
    );
  }

  return lines.join("\n\n");
}

/* =========================
   LV3 BEHAVIOR
========================= */

function analyzeBehavior(topics: FocusTopic[], visitCount: number, tone: ToneMode) {
  const lines: string[] = [];

  const love = topics.filter((t) => t === "tinh_yeu").length;
  const money = topics.filter((t) => t === "tai_chinh").length;
  const work = topics.filter((t) => t === "cong_viec").length;
  const unique = new Set(topics);

  if (love >= 2) {
    lines.push(
      toneLine(
        "Bạn đang dành khá nhiều tâm trí cho chuyện tình cảm.",
        "Mình thấy phần tình cảm đang chiếm một phần lớn suy nghĩ của bạn.",
        "Nhìn cách chọn là biết đạo hữu đang để tâm khá nhiều vào chuyện tình cảm 😄",
        tone
      )
    );
  }

  if (money >= 2) {
    lines.push(
      toneLine(
        "Tiền bạc đang là trọng tâm thực tế của bạn lúc này.",
        "Rõ ràng giai đoạn này bạn ưu tiên phần tài chính.",
        "Dạo này đạo hữu đang soi ví tiền kỹ hơn soi mây trời đó 😄",
        tone
      )
    );
  }

  if (work >= 2) {
    lines.push(
      toneLine(
        "Công việc đang là trục chính bạn quan tâm nhất.",
        "Bạn đang dồn khá nhiều năng lượng vào hướng phát triển bản thân.",
        "Nhìn là biết đoạn này đạo hữu đang nặng phần công việc rồi 😄",
        tone
      )
    );
  }

  if (visitCount >= 3) {
    lines.push(
      toneLine(
        "Việc quay lại nhiều lần cho thấy bạn chưa muốn chốt vội với điều đang nghĩ.",
        "Mình thấy bạn đang thật sự muốn soi kỹ chứ không còn xem cho vui nữa.",
        "Hôm nay đạo hữu quay lại khá nhiều. Có vẻ chuyện này chưa dễ buông 😏",
        tone
      )
    );
  }

  if (unique.size === 3) {
    lines.push(
      toneLine(
        "Cách chọn của bạn khá cân bằng, chứng tỏ bạn nhìn vấn đề theo nhiều mặt.",
        "Bạn có xu hướng xem xét nhiều khía cạnh thay vì bám vào một điểm duy nhất.",
        "Chọn kiểu này là đạo hữu đang nhìn khá toàn diện chứ không lao đầu vào một cửa 😄",
        tone
      )
    );
  }

  if (unique.size === 1) {
    lines.push(
      toneLine(
        "Có một vấn đề đang chi phối gần như toàn bộ suy nghĩ của bạn.",
        "Rõ ràng bạn đang dồn tâm trí rất mạnh vào một chuyện duy nhất.",
        "Kiểu chọn này là thấy một chuyện đang chiếm sóng toàn bộ trong đầu đạo hữu rồi 😄",
        tone
      )
    );
  }

  return lines.join("\n\n");
}

/* =========================
   FOCUS / DIRECTION
========================= */

function buildDirectionalAdvice(userFocus: FocusTopic, tone: ToneMode) {
  switch (userFocus) {
    case "kinh_doanh":
      return toneLine(
        "Đường làm ăn của bạn sáng nhất khi quyết nhanh nhưng không vội, mạnh nhưng vẫn giữ khuôn.",
        "Nếu đang dồn lực cho kinh doanh, bạn hợp kiểu đi chủ động nhưng cần kỷ luật.",
        "Kinh doanh thì có máu rồi, giờ chỉ cần bớt vài cú hứng lên là ví đỡ mệt 😄",
        tone
      );
    case "tai_chinh":
      return toneLine(
        "Tài chính của bạn đi đẹp khi giữ nhịp đều, không để cảm xúc kéo lệch tay.",
        "Nếu đang soi tiền bạc, bạn nên ưu tiên độ bền hơn độ nhanh.",
        "Tiền hợp người tỉnh hơn người hưng phấn đó đạo hữu 😄",
        tone
      );
    case "tinh_yeu":
      return toneLine(
        "Tình cảm của bạn sáng khi rõ lòng mình trước, rồi mới mở cửa cho người khác.",
        "Nếu đang nhìn chuyện yêu đương, bạn cần sự rõ ràng hơn là cảm xúc thoáng qua.",
        "Yêu thì được, nhưng đừng để tim lái xe mà não ngủ gật nha đạo hữu 😄",
        tone
      );
    case "gia_dao":
      return toneLine(
        "Gia đạo yên hơn khi lời nói mềm hơn một chút và nhịp sống đều hơn một chút.",
        "Nếu đang nghiêng về gia đạo, hãy giữ ổn bên trong trước.",
        "Nhà yên thì đầu đỡ xoắn, mà đầu đỡ xoắn thì vận cũng đi đẹp hơn 😄",
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
        "Ôm ít việc đúng còn hơn ôm nhiều việc cho ngầu đó đạo hữu 😄",
        tone
      );
  }
}
function buildClosing(dailyVisitCount: number, tone: ToneMode) {
  const revisit =
    dailyVisitCount >= 2
      ? toneLine(
          "Việc bạn quay lại cho thấy bạn thật sự muốn hiểu đường mình đi.",
          "Bạn quay lại lần này chứng tỏ bạn đang muốn soi rõ mình hơn.",
          "Quay lại lần này là có quan tâm thật chứ không còn xem cho vui nữa 😄",
          tone
        )
      : "";

  const ending = toneLine(
    "Kết lại, bạn không thiếu lực. Điều quan trọng là chọn đúng trục và giữ đúng nhịp.",
    "Tóm lại, bạn có chất riêng. Việc còn lại là đi cho đều và đừng tự kéo mình lệch nhịp.",
    "Chốt gọn cho đạo hữu: lực không yếu, số không tệ, chỉ cần bớt vài pha tự làm khó mình 😄",
    tone
  );
const hook = toneLine(
  "Nếu đọc lại lần nữa vào thời điểm khác, bạn sẽ thấy ý nghĩa khác.",
  "Mỗi lần quay lại, góc nhìn sẽ khác đi một chút.",
  "Mai quay lại đọc lại thử, kiểu gì cũng thấy câu khác trúng hơn 😄",
  tone
);

  return [ending, revisit, hook].filter(Boolean).join("\n\n");
}

/* =========================
   MAIN
========================= */

export function buildFinalReading(input: FinalReading) {
  const { user, tone, dailyVisitCount, lifeSections, personality, tarotDraws } = input;

  const personalityVoice = Math.random() > 0.3 ? getPersonalityVoice(tone) : "";
const personalCallout =
  Math.random() > 0.5
    ? toneLine(
        `${user.fullName}, đoạn này nếu bạn đọc kỹ sẽ thấy có phần đang nói thẳng vào mình.`,
        `${user.fullName}, có thể bạn sẽ thấy có câu hơi chạm vào đúng suy nghĩ hiện tại.`,
        `${user.fullName}, đoạn này nếu thấy hơi “trúng trúng” thì cứ giả vờ không biết cũng được 😄`,
        tone
      )
    : "";
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
        `Tử vi nền nói gọn với đạo hữu là:\n- ${topLifeLines.join("\n- ")}`,
        tone
      )
    : "";

  const personalityBlock = toneLine(
    `Khí chất nổi bật của bạn là "${personality.title}". ${shortText(personality.description, 140)}`,
    `Phần trắc nghiệm cho thấy bạn mang nét "${personality.title}". ${shortText(personality.description, 140)}`,
    `Quiz chốt khá rõ: đạo hữu mang khí "${personality.title}".`,
    tone
  );

  const strengths = uniqueLines(personality.strengths).slice(0, 3);
  const cautions = uniqueLines(personality.cautions).slice(0, 2);

  const strengthsBlock = strengths.length
    ? toneLine(
        `Điểm mạnh đáng giữ:\n- ${strengths.join("\n- ")}`,
        `Điểm sáng của bạn:\n- ${strengths.join("\n- ")}`,
        `Điểm mạnh khá rõ của đạo hữu:\n- ${strengths.join("\n- ")}`,
        tone
      )
    : "";

  const cautionBlock = cautions.length
    ? toneLine(
        `Điểm cần để ý:\n- ${cautions.join("\n- ")}`,
        `Điểm cần giữ nhịp thêm:\n- ${cautions.join("\n- ")}`,
        `Phần đạo hữu dễ tự làm khó mình:\n- ${cautions.join("\n- ")}`,
        tone
      )
    : "";

  const emotionBlock = detectEmotion(
    tarotDraws.map((t) => t.topic),
    dailyVisitCount,
    tone
  );

  const behaviorBlock = analyzeBehavior(
    tarotDraws.map((t) => t.topic),
    dailyVisitCount,
    tone
  );

  const tarotHighlights = tarotDraws.map((draw, idx) => {
    const firstSentence = draw.reading.split(". ")[0]?.trim() || draw.reading;
    return `Lá ${idx + 1} · ${topicLabel(draw.topic)} · ${draw.card.name}: ${firstSentence}`;
  });

  const tarotBlock = toneLine(
    `Tarot chốt lại 3 cửa chính như sau:\n- ${tarotHighlights.join("\n- ")}`,
    `Ba lá bài đang phản chiếu các điểm này:\n- ${tarotHighlights.join("\n- ")}`,
    `Ba lá bài nói ngắn gọn với đạo hữu thế này:\n- ${tarotHighlights.join("\n- ")}`,
    tone
  );

  const directionalAdvice = buildDirectionalAdvice(user.mainFocus, tone);

  const finalSynthesis = toneLine(
    "Ghép cả tử vi nền, tính cách và tarot lại, bạn mạnh nhất khi sống đúng chất thật của mình.",
    "Nhìn tổng thể, bạn sáng khi chọn đúng trục rồi đi bền.",
    "Gộp hết lại thì thấy rõ: đạo hữu hợp sống đúng chất hơn là cố vừa lòng tất cả 😄",
    tone
  );

  const closing = buildClosing(dailyVisitCount, tone);

  return [
    personalityVoice,
personalCallout,
    intro,
    lifeBlock,
    personalityBlock,
    strengthsBlock,
    cautionBlock,
    emotionBlock,
    behaviorBlock,
    tarotBlock,
    directionalAdvice,
    finalSynthesis,
    closing,
  ]
    .filter(Boolean)
    .join("\n\n");
}