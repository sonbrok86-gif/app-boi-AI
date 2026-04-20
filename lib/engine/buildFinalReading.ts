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

function pickOne<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function getTopLifeLines(lifeSections: FinalReading["lifeSections"]) {
  const lines: string[] = [];

  lifeSections.forEach((section) => {
    if (section.content?.[0]) {
      lines.push(section.content[0]);
    }
  });

  return lines.slice(0, 3);
}

function buildOpening(userName: string, tone: ToneMode) {
  return toneLine(
    `${userName} là người không hợp sống mờ. Kiểu khí chất này nếu đặt đúng chỗ thì phát rất nhanh, mà đã phát thì không phải kiểu lóe lên một chút rồi tắt.`,
    `${userName} là kiểu người càng đi đúng nhịp càng lộ bản sắc. Bạn có chất riêng, chỉ cần đừng tự phân tán mình vào quá nhiều hướng.`,
    pickOne([
      `Đạo hữu ${userName}, nhìn một vòng thì thấy ngay: bạn không nhạt. Chỉ là đôi lúc tự làm mình bận hơn mức cần thiết 😄`,
      `Đạo hữu ${userName}, khí chất không nhỏ. Chỉ cần bớt vài pha ôm quá nhiều thứ cùng lúc là đường sáng liền 😄`,
      `Đạo hữu ${userName}, đặt đúng chỗ thì sáng rất nhanh. Đặt sai chỗ thì vẫn sáng… nhưng hơi thành pháo hoa 😄`,
    ]),
    tone
  );
}

function buildLifeBlock(
  lifeSections: FinalReading["lifeSections"],
  tone: ToneMode
) {
  const topLifeLines = getTopLifeLines(lifeSections);

  if (topLifeLines.length === 0) {
    return toneLine(
      "Phần tử vi nền chưa cho đủ dữ liệu để rút ra trục chính.",
      "Phần tử vi nền hiện chưa có đủ dòng nổi bật để tóm gọn.",
      "Phần tử vi nền hôm nay hơi kín tiếng, chắc đang đợi đạo hữu bình tâm thêm chút 😄",
      tone
    );
  }

  return toneLine(
    `Nếu nhìn phần nền khí số, có thể thấy trục đời của bạn đang hiện ra khá rõ:\n- ${topLifeLines.join("\n- ")}`,
    `Phần tử vi nền cho thấy bạn có mấy đường nổi bật sau:\n- ${topLifeLines.join("\n- ")}`,
    `Tử vi nền nói gọn về đạo hữu là:\n- ${topLifeLines.join("\n- ")}`,
    tone
  );
}

function buildPersonalityBlock(
  personality: FinalReading["personality"],
  tone: ToneMode
) {
  return toneLine(
    `Qua phần trắc nghiệm, khí chất nổi bật của bạn là "${personality.title}". ${personality.description}`,
    `Quiz cho thấy phần nổi bật nhất của bạn là "${personality.title}". ${personality.description}`,
    `Quiz chốt khá rõ: đạo hữu mang khí "${personality.title}". Nói dễ hiểu là có bài riêng, không phải kiểu copy-paste đại trà 😄`,
    tone
  );
}

function buildStrengthsBlock(strengths: string[], tone: ToneMode) {
  return toneLine(
    `Điểm mạnh nổi lên ở bạn là:\n- ${strengths.join("\n- ")}`,
    `Điểm sáng của bạn gồm:\n- ${strengths.join("\n- ")}`,
    `Điểm mạnh của đạo hữu khá rõ:\n- ${strengths.join("\n- ")}`,
    tone
  );
}

function buildCautionsBlock(cautions: string[], tone: ToneMode) {
  return toneLine(
    `Điểm cần giữ lại là:\n- ${cautions.join("\n- ")}`,
    `Điểm cần để ý thêm là:\n- ${cautions.join("\n- ")}`,
    `Phần đạo hữu dễ tự làm khó mình là:\n- ${cautions.join("\n- ")}`,
    tone
  );
}

function buildTarotSummary(
  tarotDraws: FinalReading["tarotDraws"],
  tone: ToneMode
) {
  const topicText = tarotDraws
    .map((draw) => `- ${topicLabel(draw.topic)}: ${draw.card.name}`)
    .join("\n");

  const intro = toneLine(
    "Ba lá tarot hôm nay không đứng riêng lẻ, mà tạo thành một tam giác soi vào ba cửa quan trọng của đời bạn.",
    "Ba lá tarot lần này ghép lại thành một bức tranh khá rõ về nhịp hiện tại của bạn.",
    "Ba lá tarot này không phải bốc cho vui đâu. Ghép lại là ra nguyên cái mood sống hiện tại của đạo hữu luôn 😄",
    tone
  );

  return `${intro}\n${topicText}`;
}

function buildEachTarotBlock(tarotDraws: FinalReading["tarotDraws"]) {
  return tarotDraws
    .map(
      (draw, idx) =>
        `Lá ${idx + 1} – ${topicLabel(draw.topic)} – ${draw.card.name}:\n${draw.reading}`
    )
    .join("\n\n");
}

function buildDirectionalAdvice(userFocus: FocusTopic, tone: ToneMode) {
  switch (userFocus) {
    case "kinh_doanh":
      return toneLine(
        "Nếu lấy kinh doanh làm trục chính, điều cần nhớ là: đường tiền sáng nhất khi đầu óc không nóng hơn dữ liệu. Có khí mở đường là tốt, nhưng muốn đi xa phải thêm nhịp và kỷ luật.",
        "Nếu trọng tâm là kinh doanh, bạn hợp kiểu đi chủ động nhưng có kiểm soát.",
        "Nếu đang lấy kinh doanh làm trục thì nhớ: đạo hữu có máu làm ăn là lợi thế, nhưng đừng để máu lên não quá nhanh 😄",
        tone
      );

    case "tai_chinh":
      return toneLine(
        "Nếu lấy tài chính làm trọng tâm, bài học lớn không nằm ở kiếm nhanh mà ở giữ nhịp bền. Tài khí đẹp nhất khi tâm trí không bị cảm hứng nhất thời lôi đi.",
        "Nếu đang soi tài chính, bạn nên ưu tiên ổn nhịp hơn là đu theo cảm xúc.",
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
        "Nếu lấy công việc làm trục thì nhớ: đạo hữu chăm thôi chưa đủ, còn phải đúng sân 😄",
        tone
      );

    default:
      return toneLine(
        "Nếu nhìn toàn cục, điều cần nhất lúc này là gom lực vào một trục chính rồi đi đủ lâu. Đường mở cho người giữ được nhịp.",
        "Nếu nhìn tổng quan, bạn cần rõ thứ gì là trục chính trong giai đoạn này.",
        "Nếu nhìn tổng thể thì chốt gọn: bớt phân tán là đời đỡ phải nhắc bài 😄",
        tone
      );
  }
}

function buildFinalSynthesis(input: FinalReading, tone: ToneMode) {
  const { personality, tarotDraws } = input;

  const focusList = tarotDraws.map((draw) => topicLabel(draw.topic));
  const uniqueFocus = Array.from(new Set(focusList));
  const focusText =
    uniqueFocus.length > 0 ? uniqueFocus.join(", ") : "những mặt quan trọng";

  return toneLine(
    `Nếu ghép tử vi nền, tính cách và ba lá bài lại, có thể nói bạn là kiểu người càng đi đúng khí chất thật của mình càng mở vận mạnh. Bạn không hợp đường giả, không hợp chỗ chật, cũng không hợp kiểu sống nhỏ hơn bản thân. Những gì đang hiện ra ở ${focusText} đều nhắc cùng một điều: khi bạn rõ mình là ai và giữ đúng nhịp, vận sẽ sáng.`,
    `Gom cả ba phần lại, bạn sáng nhất khi sống đúng khí chất và chọn đúng trục chính. Phần tính cách "${personality.title}" của bạn không phải để giấu đi cho vừa mắt người khác, mà là để dùng đúng chỗ cho những mặt như ${focusText} cùng sáng lên.`,
    `Ghép cả ba phần lại, ta nói thẳng với đạo hữu một câu: đạo hữu hợp sống đúng chất của mình hơn là cố làm phiên bản vừa lòng tất cả mọi người 😄 Nhìn từ ${focusText}, càng cố gồng thành người khác thì càng mệt; càng sống đúng khí chất của mình thì đường càng mở.`,
    tone
  );
}

function buildSoftTruth(userFocus: FocusTopic, tone: ToneMode) {
  if (tone !== "funny") return "";

  switch (userFocus) {
    case "kinh_doanh":
      return "Nói thật nhẹ một câu nha đạo hữu: có lúc không phải thiếu cơ hội, mà là thấy cơ hội nào cũng muốn mở cửa chào 😄";
    case "tai_chinh":
      return "Nói thật nhẹ một câu nha đạo hữu: kiếm được là một chuyện, giữ được để khỏi tự tiếc mới là chuyện dài 😄";
    case "tinh_yeu":
      return "Nói thật nhẹ một câu nha đạo hữu: đôi khi không phải thiếu duyên, chỉ là tim mở hơi nhanh còn lòng thì chưa kịp chắc 😄";
    case "gia_dao":
      return "Nói thật nhẹ một câu nha đạo hữu: trong nhà mà chưa yên thì đầu óc khó mà giả vờ yên được 😄";
    case "cong_viec":
      return "Nói thật nhẹ một câu nha đạo hữu: có lúc mệt không phải vì yếu, mà vì đang cố sáng ở chỗ không phản chiếu được mình 😄";
    default:
      return "Nói thật nhẹ một câu nha đạo hữu: nhiều khi đời chưa làm khó bạn, chỉ là bạn đang tự mở thêm chế độ khó 😄";
  }
}

function buildClosing(dailyVisitCount: number, tone: ToneMode) {
  const revisit =
    dailyVisitCount >= 2
      ? toneLine(
          "Việc bạn quay lại xem thêm cho thấy bên trong bạn đang thực sự muốn soi rõ đường đi của mình. Đó không phải yếu đuối, mà là dấu hiệu của người muốn sống có ý thức hơn.",
          "Bạn quay lại lần này chứng tỏ bạn đang thật sự muốn hiểu mình hơn.",
          "Đạo hữu quay lại lần này chứng tỏ hoặc rất quan tâm vận mình, hoặc rất thích bị app nói trúng tim đen 😄",
          tone
        )
      : "";

  const ending = toneLine(
    "Kết lại, bạn không thiếu cơ hội, cũng không thiếu khí. Điều đáng quý nhất lúc này là chọn đúng đường, giữ đúng nhịp, rồi để thời gian đứng về phía mình.",
    "Tóm lại, bạn có lực. Việc còn lại là đi đúng đường và đừng tự phân tán mình.",
    `Kết gọn cho đạo hữu:

Bạn không thiếu số, không thiếu lực.

Chỉ cần bớt vài pha tự làm khó mình là đời sẽ dễ thở hơn rất nhiều 😄`,
    tone
  );

  return [ending, revisit].filter(Boolean).join("\n\n");
}

function buildAftertaste(tone: ToneMode) {
  return toneLine(
    "Đi đúng nhịp thì đường sẽ tự sáng dần.",
    "Không cần gấp. Chỉ cần đúng trục là được.",
    "Chốt nhẹ nha đạo hữu: bớt tự làm khó mình, đời sẽ dễ thương hơn thấy rõ 😄",
    tone
  );
}

export function buildFinalReading(input: FinalReading) {
  const {
    user,
    tone,
    dailyVisitCount,
    lifeSections,
    personality,
    tarotDraws,
  } = input;

  const intro = buildOpening(user.fullName, tone);
  const lifeBlock = buildLifeBlock(lifeSections, tone);
  const personalityBlock = buildPersonalityBlock(personality, tone);
  const strengthsBlock = buildStrengthsBlock(personality.strengths, tone);
  const cautionBlock = buildCautionsBlock(personality.cautions, tone);
  const tarotBlock = buildTarotSummary(tarotDraws, tone);
  const eachTarotReading = buildEachTarotBlock(tarotDraws);
  const directionalAdvice = buildDirectionalAdvice(user.mainFocus, tone);
  const finalSynthesis = buildFinalSynthesis(input, tone);
  const softTruth = buildSoftTruth(user.mainFocus, tone);
  const closing = buildClosing(dailyVisitCount, tone);
  const aftertaste = buildAftertaste(tone);

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
    softTruth ? "\n" + softTruth : "",
    "",
    closing,
    "",
    aftertaste,
  ].join("\n");
}