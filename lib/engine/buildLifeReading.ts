import { FocusTopic, LifeSection, ToneMode, UserForm } from "../types";
import {
  getLunarIdentityFromSolarText,
  isValidBirthDate as isValidSolarBirthDate,
} from "./lunar";
import { pickOne } from "../vibe/random";
import { elementData, ElementKey } from "../vibe/elements";
import { getZodiacFromYear, zodiacData } from "../vibe/zodiac";

export function isValidBirthDate(input: string) {
  return isValidSolarBirthDate(input);
}

export function getAge(input: string) {
  const parsed = input.split("/");
  const year = Number(parsed[2] || 0);
  if (!year) return 0;
  return new Date().getFullYear() - year;
}

export function getAgeGroup(input: string) {
  const age = getAge(input);
  if (age < 25) return "Tuổi trẻ mở vận";
  if (age < 35) return "Giai đoạn dựng nền";
  if (age < 45) return "Giai đoạn bứt phá";
  if (age < 60) return "Giai đoạn ổn định và tích lũy";
  return "Giai đoạn hậu vận";
}

export function getNguHanh(input: string) {
  return getLunarIdentityFromSolarText(input).nguHanh;
}

export function getCanChi(input: string) {
  return getLunarIdentityFromSolarText(input).canChiYear;
}

export function getNapAm(input: string) {
  return getLunarIdentityFromSolarText(input).napAm;
}

export function getLunarBirthText(input: string) {
  return getLunarIdentityFromSolarText(input).lunarText;
}

export function getCanChiMonth(input: string) {
  return getLunarIdentityFromSolarText(input).canChiMonth;
}

export function getCanChiDay(input: string) {
  return getLunarIdentityFromSolarText(input).canChiDay;
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

function getBirthYear(input: string) {
  const parsed = input.split("/");
  return Number(parsed[2] || 0);
}

function buildFocusLine(focus: FocusTopic, tone: ToneMode) {
  switch (focus) {
    case "kinh_doanh":
      return toneLine(
        "Mệnh này hợp khai lộ, hợp xoay thế, hợp chuyện mở đường làm ăn. Ở nơi quá hẹp, khí dễ bức mà tài khó tụ.",
        "Bạn có duyên với chuyện làm ăn, miễn là đừng tản sức vào quá nhiều cửa cùng lúc.",
        "Đạo hữu có máu kinh doanh đó. Chỉ cần bớt mấy pha đang hứng là mở thêm cửa mới 😄",
        tone
      );

    case "tai_chinh":
      return toneLine(
        "Tài khí không yếu, điều cần là giữ nhịp. Có tiền mà tâm không định thì của vào rồi cũng dễ tán.",
        "Bạn kiếm được, nhưng giữ tốt hơn khi bớt cảm hứng và tăng kỷ luật.",
        "Ví của đạo hữu không ghét đạo hữu đâu. Nó chỉ hơi stress khi thấy chủ nhân đổi chiến thuật liên tục 😄",
        tone
      );

    case "tinh_yeu":
      return toneLine(
        "Tình cảm của bạn không hợp kiểu nửa nóng nửa lạnh. Đã chọn thì cần chân thành, đã thương thì cần đúng nhịp.",
        "Bạn cần mối quan hệ có chiều sâu và hiểu nhau thật.",
        "Tim của đạo hữu không hợp kiểu chơi game đoán ý mỗi ngày 😄",
        tone
      );

    case "gia_dao":
      return toneLine(
        "Gia đạo là nền của vận. Trong ấm thì ngoài mới sáng; trong rối thì mọi việc khác cũng dễ hao lực.",
        "Nhà yên thì bạn lên tinh thần rõ rệt.",
        "Nhà mà êm là đạo hữu sáng. Nhà mà loạn là trong đầu mở nguyên dàn tab 😄",
        tone
      );

    case "cong_viec":
      return toneLine(
        "Công việc hợp nhất là nơi có đất cho bản lĩnh và vị thế, chứ không phải nơi chỉ bắt làm đều mà không cho phát khí.",
        "Bạn hợp môi trường có quyền chủ động và có khoảng không để thể hiện năng lực.",
        "Đạo hữu không hợp làm cây cảnh công sở 😄",
        tone
      );

    default:
      return toneLine(
        "Đại cục đời bạn không sợ thiếu cơ hội, chỉ sợ sai nhịp và tự phân tán mình.",
        "Bạn có đường đi, cái cần là giữ lực và rõ hướng.",
        "Đời không chặn đạo hữu nhiều như đạo hữu tự mở thêm việc cho mình đâu 😄",
        tone
      );
  }
}

function buildZodiacSection(
  birthYear: number,
  tone: ToneMode
): LifeSection {
  const zodiacKey = getZodiacFromYear(birthYear);
  const zodiac = zodiacData[zodiacKey];

  return {
    title: "🐾 Khí chất theo con giáp",
    content: [
      toneLine(
        `Tuổi ${zodiac.name} mang một nhịp khí khá rõ: ${pickOne(zodiac.shortVibe)}.`,
        `Tuổi ${zodiac.name} của bạn có nét nổi bật là ${pickOne(zodiac.shortVibe)}.`,
        `Tuổi ${zodiac.name} nói gọn là: ${pickOne(zodiac.shortVibe)} 😄`,
        tone
      ),
      toneLine(
        pickOne(zodiac.positiveLines),
        pickOne(zodiac.positiveLines),
        `${pickOne(zodiac.positiveLines)} 😄`,
        tone
      ),
      toneLine(
        `Một câu hợp với tuổi ${zodiac.name}: ${pickOne(zodiac.proverbs)}`,
        `Một câu dành riêng cho nhịp tuổi ${zodiac.name}: ${pickOne(zodiac.proverbs)}`,
        `🧠 Một câu dành cho đạo hữu: ${pickOne(zodiac.proverbs)}`,
        tone
      ),
      toneLine(
        pickOne(zodiac.workHints),
        pickOne(zodiac.workHints),
        `${pickOne(zodiac.workHints)} 😄`,
        tone
      ),
      toneLine(
        pickOne(zodiac.loveHints),
        pickOne(zodiac.loveHints),
        `${pickOne(zodiac.loveHints)} 😄`,
        tone
      ),
    ],
  };
}

function buildElementSection(
  nguHanh: string,
  tone: ToneMode
): LifeSection {
  const element = elementData[(nguHanh as ElementKey) || "Thổ"] || elementData.Thổ;

  return {
    title: "🎨 Mệnh ngũ hành, màu hợp & số hợp",
    content: [
      toneLine(
        `Xét theo mệnh ${element.name}, khí vận của bạn ${pickOne(element.vibe)}.`,
        `Mệnh ${element.name} của bạn cho thấy bạn ${pickOne(element.vibe)}.`,
        `Mệnh ${element.name} của đạo hữu ${pickOne(element.vibe)} 😄`,
        tone
      ),
      toneLine(
        `Màu hợp mệnh gồm: ${element.colors.join(", ")}.`,
        `Bạn hợp các màu: ${element.colors.join(", ")}.`,
        `Màu hợp mệnh của đạo hữu là: ${element.colors.join(", ")} 😄`,
        tone
      ),
      toneLine(
        `Số dễ đem lại cảm giác thuận nhịp là: ${element.luckyNumbers.join(", ")}.`,
        `Những con số hợp mệnh gồm: ${element.luckyNumbers.join(", ")}.`,
        `Số may mắn của đạo hữu gồm: ${element.luckyNumbers.join(", ")} 😄`,
        tone
      ),
      toneLine(
        `Mệnh này thường được trợ lực bởi hành ${element.supportive.join(", ")} và nên cẩn trọng khi va nhiều với hành ${element.caution.join(", ")}.`,
        `Bạn thường hợp nhịp với hành ${element.supportive.join(", ")} và nên để ý hơn với hành ${element.caution.join(", ")}.`,
        `Mệnh ${element.name} của đạo hữu hợp ${element.supportive.join(", ")}. Nhớ né ${element.caution.join(", ")} cho đỡ “va chạm năng lượng” 😄`,
        tone
      ),
      toneLine(
        pickOne(element.reminders),
        pickOne(element.reminders),
        `${pickOne(element.reminders)} 😄`,
        tone
      ),
    ],
  };
}

export function buildLifeReading(form: UserForm, tone: ToneMode): LifeSection[] {
  const canChi = getCanChi(form.birthDate);
  const napAm = getNapAm(form.birthDate);
  const nguHanh = getNguHanh(form.birthDate);
  const ageGroup = getAgeGroup(form.birthDate);
  const birthYear = getBirthYear(form.birthDate);

  const tongQuan: LifeSection = {
    title: "📌 Tổng quan khí số",
    content: [
      toneLine(
        `${canChi} – ${napAm}. Mệnh này không hợp sống mờ, càng không hợp ở lâu nơi nhỏ mà tự mài mòn chí khí.`,
        `${canChi} – ${napAm}. Bạn là kiểu người càng đặt đúng chỗ càng sáng rất nhanh.`,
        `${canChi} – ${napAm}. Đạo hữu không phải kiểu “bình bình”. Đặt đúng chỗ thì bật sáng, đặt sai chỗ thì vẫn bật… nhưng cháy hơi mạnh 😄`,
        tone
      ),
      toneLine(
        "Cổ ngữ có câu: “Hổ hành sơn lâm, bất dữ khuyển tranh lộ.” Cọp đi rừng, không tranh đường với loài nhỏ.",
        "Người có khí thì nên chọn đường có tầm. Không cần hơn ai, chỉ cần đúng vị trí.",
        "Nói đơn giản: đạo hữu không hợp chơi chung mấy game so đo nhỏ nhỏ cả ngày 😄",
        tone
      ),
      toneLine(
        `Hiện bạn ở "${ageGroup}" — giai đoạn chuyển lực. Nếu giữ được trục, rất dễ bật.`,
        `Bạn đang ở "${ageGroup}" – đoạn khá quan trọng để đi xa hơn.`,
        `Đạo hữu đang ở "${ageGroup}". Hiểu nôm na: đời đang nhắc “bớt lan man lại đi là lên” 😄`,
        tone
      ),
      buildFocusLine(form.mainFocus, tone),
    ],
  };

  const zodiacSection = buildZodiacSection(birthYear, tone);
  const elementSection = buildElementSection(nguHanh, tone);

  const nguHanhSection: LifeSection = {
    title: "🌿 Ngũ hành & bản mệnh",
    content:
      nguHanh === "Hỏa"
        ? [
            toneLine(
              "Mệnh Hỏa – lửa quý ở chỗ cháy đúng, không phải cháy lớn.",
              "Bạn thuộc hệ Hỏa – có lực, có nhiệt, có độ bật.",
              "Đạo hữu thuộc hệ Hỏa – trong người có sẵn turbo. Chỉ cần đừng đạp ga lúc chưa nhìn đường là ổn 😄",
              tone
            ),
            toneLine(
              "Điểm mạnh là động lực. Điều cần giữ là đừng để cảm xúc chạy trước lý trí.",
              "Bạn không thiếu lửa, điều cần là điều nhiệt.",
              "Đạo hữu không thiếu lửa. Chỉ cần thêm bộ điều nhiệt là đẹp 😄",
              tone
            ),
          ]
        : nguHanh === "Mộc"
        ? [
            toneLine(
              "Mệnh Mộc – sinh trưởng nhờ dưỡng. Mạnh ở bền, không mạnh ở hấp tấp.",
              "Bạn thuộc hệ Mộc – hợp đi đường dài, bền và chắc.",
              "Đạo hữu kiểu đầu game không ồn, cuối game hơi đáng sợ 😄",
              tone
            ),
            toneLine(
              "Đi đúng nhịp sẽ lên rất đều. Ép nhanh quá dễ lệch gốc.",
              "Bạn hợp xây nền hơn là ăn xổi.",
              "Đi đường dài rất ổn, miễn đừng chuẩn bị ba năm mà chưa chịu bước 😄",
              tone
            ),
          ]
        : nguHanh === "Kim"
        ? [
            toneLine(
              "Mệnh Kim – mạnh ở độ chuẩn và sự sắc. Kim tốt là kim qua rèn.",
              "Bạn có tiêu chuẩn khá rõ và không dễ chấp nhận sự lộn xộn.",
              "Đạo hữu không khó đâu. Chỉ là ghét mọi thứ lộn xộn thôi 😄",
              tone
            ),
            toneLine(
              "Kim sáng khi có khuôn. Nhưng quá cứng thì dễ thành tự làm khó mình.",
              "Bạn hợp môi trường có nguyên tắc rõ ràng.",
              "Đừng biến mình thành thanh tra cuộc đời 24/7 là đẹp 😄",
              tone
            ),
          ]
        : nguHanh === "Thủy"
        ? [
            toneLine(
              "Mệnh Thủy – linh động, giỏi xoay theo thế nhưng không vì thế mà mất bản chất.",
              "Bạn có độ mềm và độ xoay tốt, khá hợp thích nghi.",
              "Đạo hữu kiểu khó bị kẹt, nhưng dễ loạn nếu nghĩ quá nhiều 😄",
              tone
            ),
            toneLine(
              "Thủy mạnh ở mềm mà không yếu. Điều cần giữ là có bờ.",
              "Bạn linh hoạt, nhưng vẫn cần nguyên tắc nền.",
              "Mềm thì tốt, đừng mềm quá thành không còn bờ nhé đạo hữu 😄",
              tone
            ),
          ]
        : [
            toneLine(
              "Mệnh Thổ – giữ nền, dưỡng lực, bền mà chắc.",
              "Bạn hợp đi chắc, xây nền rồi mới bung lực.",
              "Đạo hữu kiểu xây móng trước rồi mới tính xây nhà, vậy là ổn 😄",
              tone
            ),
            toneLine(
              "Thổ mạnh ở ổn định. Nhưng bền quá với cái sai cũng là tự khổ.",
              "Bạn hợp tích lũy theo kiểu vững và đều.",
              "Đừng bền luôn với thứ đáng ra phải bỏ sớm nha đạo hữu 😄",
              tone
            ),
          ],
  };

  const congViec: LifeSection = {
    title: "💼 Công việc & tiền bạc",
    content: [
      toneLine(
        "Tài khí không yếu. Nhưng tài đa bất tụ — quá nhiều hướng thì khó gom lực thành quả lớn.",
        "Bạn kiếm được, nhưng giữ tốt hơn khi bớt tản và đi có trục hơn.",
        "Đạo hữu không nghèo vì không kiếm được. Chủ yếu là đôi lúc mở hơi nhiều cửa 😄",
        tone
      ),
      toneLine(
        "Người có khí nên đi đường có trục. Làm nhiều chưa chắc hơn làm đúng.",
        "Bạn mạnh nhất khi tập trung vào thứ thật sự hợp khí chất.",
        "Làm mười thứ chưa chắc giàu. Làm đúng một hai thứ có khi giàu thật 😄",
        tone
      ),
      toneLine(
        "Nếu cố đứng lâu ở nơi không hợp, lực sẽ hao mà khí cũng mòn.",
        "Chọn đúng chỗ đứng quan trọng không kém chăm chỉ.",
        "Chăm là tốt, nhưng chăm sai chỗ thì giỏi… mệt thôi đạo hữu 😄",
        tone
      ),
    ],
  };

  const tinhCam: LifeSection = {
    title: "❤️ Tình cảm & gia đạo",
    content: [
      toneLine(
        "Ngoài cứng trong mềm. Tâm của bạn cần đúng người hơn là nhiều người.",
        "Bạn cần mối quan hệ hiểu nhịp và có chiều sâu thật.",
        "Đạo hữu có thể giả vờ ổn, nhưng tim thì không đơn giản đâu 😄",
        tone
      ),
      toneLine(
        "Gia đạo ảnh hưởng trực tiếp đến vận lực. Nhà yên thì đường ngoài cũng sáng hơn.",
        "Nhà yên thì bạn lên tinh thần rất rõ.",
        "Nhà mà căng là đầu của đạo hữu mở mười hai tab liền 😄",
        tone
      ),
      toneLine(
        "Tình đẹp nhất khi lòng rõ, không phải khi cảm xúc lên cao nhất.",
        "Yêu đúng người thì lòng yên trước rồi mọi thứ mới sáng sau.",
        "Yêu thì cứ yêu, nhưng đừng để tim lái xe lúc não đang ngủ nha đạo hữu 😄",
        tone
      ),
    ],
  };

  const hauVan: LifeSection = {
    title: "☀️ Hậu vận & đường dài",
    content: [
      toneLine(
        "Hậu vận không xấu. Chỉ cần giữ được trục chính và đừng tự lệch nhịp.",
        "Càng lớn bạn càng mạnh nếu đi đúng đường của mình.",
        "Đạo hữu không yếu. Chỉ là đôi lúc tự làm mình mệt trước thôi 😄",
        tone
      ),
      toneLine(
        "Đường dài mở ra rõ nhất khi tâm yên và hướng đi không bị chia nhỏ quá mức.",
        "Bạn có đường đi xa, miễn là giữ lực đều.",
        "Đời không chặn đạo hữu nhiều đâu. Chủ yếu đạo hữu tự mở thêm nhiệm vụ phụ 😄",
        tone
      ),
    ],
  };

  const loiNhan: LifeSection = {
    title: "🪞 Lời nhắc riêng",
    content: [
      toneLine(
        "Người có khí thì nên đi đúng chỗ. Sai chỗ, mạnh mấy cũng thành hao.",
        "Bạn mạnh khi rõ hướng và giữ được trục.",
        "Đạo hữu không cần chạy nhanh. Đạo hữu cần chạy đúng 😄",
        tone
      ),
      toneLine(
        "Khi rối, quay về trục chính. Đừng vì lo mà mở thêm việc.",
        "Tập trung lại, bớt tản lực thì đường sẽ sáng dần.",
        "Đang rối mà mở thêm việc là tự làm khó mình đó đạo hữu 😄",
        tone
      ),
      toneLine(
        "Có lúc vận chưa xấu, chỉ là người chưa chịu gom lực lại.",
        "Giữ nhịp đều và giữ lòng sáng thì đường sẽ thoáng dần.",
        pickOne([
          "Đạo hữu không cần hơn ai cả. Chỉ cần đừng tự làm khó mình quá là đủ sáng rồi 😄",
          "Có lúc đời chưa làm khó đạo hữu đâu, chỉ là đạo hữu mở hơi nhiều cửa cùng lúc 😄",
          "Đi đúng nhịp thì chậm một chút cũng không sao. Lệch nhịp mới là thứ làm mình mệt 😄",
        ]),
        tone
      ),
    ],
  };

  return [
    tongQuan,
    zodiacSection,
    elementSection,
    nguHanhSection,
    congViec,
    tinhCam,
    hauVan,
    loiNhan,
  ];
}