import { FocusTopic, LifeSection, ToneMode, UserForm } from "../types";
import {
  getLunarIdentityFromSolarText,
  isValidBirthDate as isValidSolarBirthDate,
} from "./lunar";

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

function toneLine(serious: string, warm: string, funny: string, tone: ToneMode) {
  if (tone === "serious") return serious;
  if (tone === "warm") return warm;
  return funny;
}

function buildFocusLine(focus: FocusTopic, tone: ToneMode) {
  switch (focus) {
    case "kinh_doanh":
      return toneLine(
        "Mệnh này hợp khai lộ, hợp xoay thế, hợp chuyện mở đường làm ăn. Ở nơi quá hẹp, khí dễ bức mà tài khó tụ.",
        "Bạn có duyên với chuyện làm ăn, miễn là đừng tản sức vào quá nhiều cửa cùng lúc.",
        "Bạn có máu kinh doanh đó. Chỉ cần bớt mấy pha đang hứng là mở thêm cửa mới."
      , tone);
    case "tai_chinh":
      return toneLine(
        "Tài khí không yếu, điều cần là giữ nhịp. Có tiền mà tâm không định thì của vào rồi cũng dễ tán.",
        "Bạn kiếm được, nhưng giữ tốt hơn khi bớt cảm hứng và tăng kỷ luật.",
        "Ví của bạn không ghét bạn. Nó chỉ hơi stress khi thấy chủ nhân đổi chiến thuật liên tục."
      , tone);
    case "tinh_yeu":
      return toneLine(
        "Tình cảm của bạn không hợp kiểu nửa nóng nửa lạnh. Đã chọn thì cần chân thành, đã thương thì cần đúng nhịp.",
        "Bạn cần mối quan hệ có chiều sâu và hiểu nhau thật.",
        "Tim bạn không hợp kiểu chơi game đoán ý mỗi ngày."
      , tone);
    case "gia_dao":
      return toneLine(
        "Gia đạo là nền của vận. Trong ấm thì ngoài mới sáng; trong rối thì mọi việc khác cũng dễ hao lực.",
        "Nhà yên thì bạn lên tinh thần rõ rệt.",
        "Nhà mà êm là bạn sáng. Nhà mà loạn là trong đầu mở nguyên dàn tab."
      , tone);
    case "cong_viec":
      return toneLine(
        "Công việc hợp nhất là nơi có đất cho bản lĩnh và vị thế, chứ không phải nơi chỉ bắt làm đều mà không cho phát khí.",
        "Bạn hợp môi trường có quyền chủ động và có khoảng không để thể hiện năng lực.",
        "Bạn không hợp làm cây cảnh công sở."
      , tone);
    default:
      return toneLine(
        "Đại cục đời bạn không sợ thiếu cơ hội, chỉ sợ sai nhịp và tự phân tán mình.",
        "Bạn có đường đi, cái cần là giữ lực và rõ hướng.",
        "Đời không chặn bạn nhiều như bạn tự mở thêm việc cho mình đâu."
      , tone);
  }
}

export function buildLifeReading(form: UserForm, tone: ToneMode): LifeSection[] {
  const canChi = getCanChi(form.birthDate);
  const napAm = getNapAm(form.birthDate);
  const nguHanh = getNguHanh(form.birthDate);
  const ageGroup = getAgeGroup(form.birthDate);

  function toneLine(s: string, w: string, f: string) {
    if (tone === "serious") return s;
    if (tone === "warm") return w;
    return f;
  }

  // ================== TỔNG QUAN ==================
  const tongQuan: LifeSection = {
    title: "📌 Tổng quan khí số",
    content: [
      toneLine(
        `${canChi} – ${napAm}.
火在其位 – khí tại kỳ vị.
Mệnh này không hợp sống mờ, càng không hợp ở lâu nơi nhỏ mà tự mài mòn chí khí.`,
        
        `${canChi} – ${napAm}.
Bạn là kiểu người càng đặt đúng chỗ càng sáng rất nhanh.`,
        
        `${canChi} – ${napAm}.
Bạn không phải kiểu “bình bình”.
Đặt đúng chỗ thì bật, đặt sai chỗ thì vẫn bật… nhưng hơi cháy 😄`
      ),

      toneLine(
        `Cổ ngữ có câu: “Hổ hành sơn lâm, bất dữ khuyển tranh lộ.”
→ Cọp đi rừng, không tranh đường với loài nhỏ.`,
        
        `Người có khí thì nên chọn đường có tầm.
Không cần hơn ai, chỉ cần đúng vị trí.`,
        
        `Nói đơn giản:
Bạn không hợp chơi chung mấy game “so đo nhỏ nhỏ” 😄`
      ),

      toneLine(
        `Hiện bạn ở "${ageGroup}" — giai đoạn chuyển lực.
Nếu giữ được trục, rất dễ bật.`,
        
        `Bạn đang ở "${ageGroup}" – đoạn rất quan trọng để đi xa hơn.`,
        
        `Đang ở "${ageGroup}".
Hiểu nôm na: đời đang bảo “bớt lan man lại đi là lên” 😄`
      ),
    ],
  };

  // ================== NGŨ HÀNH ==================
  const nguHanhSection: LifeSection = {
    title: "🌿 Ngũ hành & bản mệnh",
    content:
      nguHanh === "Hỏa"
        ? [
            toneLine(
              `Mệnh Hỏa – Lư Trung Hỏa.
火在爐中 – lửa trong lò.
Không phải lửa bùng bừa, mà là lửa có thể tôi luyện.`,
              
              `Bạn thuộc hệ Hỏa – có lực, có nhiệt, có độ bật.`,
              
              `Bạn thuộc hệ Hỏa – trong người có sẵn “turbo tăng áp” 😄`
            ),

            toneLine(
              `Lửa quý không ở chỗ cháy lớn,
mà ở chỗ cháy đúng.`,
              
              `Điểm mạnh là nhiệt.
Điểm cần giữ là đừng để cảm xúc chạy trước.`,
              
              `Bạn không thiếu lửa.
Chỉ cần thêm… bộ điều nhiệt 😄`
            ),
          ]

        : nguHanh === "Mộc"
        ? [
            toneLine(
              `Mệnh Mộc – sinh trưởng.
木成於養 – cây lớn nhờ dưỡng.`,
              `Bạn thuộc hệ Mộc – hợp đi đường dài.`,
              `Bạn kiểu “đầu game không ồn, cuối game hơi đáng sợ” 😄`
            ),

            toneLine(
              `Mộc mạnh ở bền, không phải ở nhanh.`,
              `Bạn hợp xây nền hơn là ăn xổi.`,
              `Bạn đi đường dài ok, miễn đừng “chuẩn bị 3 năm chưa đi” 😄`
            ),
          ]

        : nguHanh === "Kim"
        ? [
            toneLine(
              `Mệnh Kim – sắc và chuẩn.
金以鍛成 – kim loại phải qua rèn.`,
              `Bạn có tiêu chuẩn rõ ràng.`,
              `Bạn không khó… chỉ là ghét lộn xộn 😄`
            ),

            toneLine(
              `Kim mạnh khi có khuôn.`,
              `Bạn hợp môi trường có luật.`,
              `Đừng biến mình thành “thanh tra cuộc đời 24/7” là đẹp 😄`
            ),
          ]

        : nguHanh === "Thủy"
        ? [
            toneLine(
              `Mệnh Thủy – linh động.
水隨勢行 – nước đi theo thế.`,
              `Bạn có độ xoay tốt.`,
              `Bạn kiểu “khó bị kẹt, nhưng dễ bị loạn nếu suy nghĩ nhiều” 😄`
            ),

            toneLine(
              `Thủy mạnh ở mềm mà không yếu.`,
              `Bạn hợp thích nghi.`,
              `Mềm ok, đừng mềm quá thành… không còn bờ 😄`
            ),
          ]

        : [
            toneLine(
              `Mệnh Thổ – giữ nền.
土厚生萬物 – đất nuôi vạn vật.`,
              `Bạn hợp đi chắc.`,
              `Bạn kiểu “xây móng trước, rồi mới tính xây nhà” 😄`
            ),

            toneLine(
              `Thổ mạnh ở ổn định.`,
              `Bạn hợp tích lũy.`,
              `Đừng bền luôn với thứ đáng ra phải bỏ sớm 😄`
            ),
          ],
  };

  // ================== CÔNG VIỆC ==================
  const congViec: LifeSection = {
    title: "💼 Công việc & tiền bạc",
    content: [
      toneLine(
        `Tài khí không yếu.
Nhưng “tài đa bất tụ” – nhiều hướng quá thì khó gom.`,
        
        `Bạn kiếm được.
Nhưng giữ tốt hơn khi bớt tản.`,
        
        `Bạn không nghèo vì không kiếm được.
Mà vì… mở hơi nhiều cửa 😄`
      ),

      toneLine(
        `Người có khí nên đi đường có trục.`,
        
        `Bạn mạnh nhất khi tập trung.`,
        
        `Làm 10 thứ chưa chắc giàu.
Làm đúng 1–2 thứ có khi giàu thật 😄`
      ),
    ],
  };

  // ================== TÌNH CẢM ==================
  const tinhCam: LifeSection = {
    title: "❤️ Tình cảm & gia đạo",
    content: [
      toneLine(
        `Ngoài cứng – trong mềm.
Tâm cần đúng người hơn là nhiều người.`,
        
        `Bạn cần mối quan hệ hiểu nhịp.`,
        
        `Bạn có thể giả vờ ổn,
nhưng tim thì không đơn giản 😄`
      ),

      toneLine(
        `Gia đạo ảnh hưởng vận.`,
        
        `Nhà yên → bạn lên.`,
        
        `Nhà mà căng → đầu mở 12 tab 😄`
      ),
    ],
  };

  // ================== HẬU VẬN ==================
  const hauVan: LifeSection = {
    title: "☀️ Hậu vận & đường dài",
    content: [
      toneLine(
        `Hậu vận không xấu.
Chỉ cần giữ trục.`,
        
        `Càng lớn càng mạnh nếu đi đúng.`,
        
        `Bạn không yếu.
Chỉ là đôi lúc tự làm mình mệt 😄`
      ),

      toneLine(
        `Đường dài mở khi tâm yên.`,
        
        `Bạn có đường đi xa.`,
        
        `Đời không chặn bạn.
Bạn tự mở thêm việc thôi 😄`
      ),
    ],
  };

  // ================== LỜI NHẮC ==================
  const loiNhan: LifeSection = {
    title: "🪞 Lời nhắc riêng",
    content: [
      toneLine(
        `Người có khí → nên đi đúng chỗ.`,
        
        `Bạn mạnh khi rõ hướng.`,
        
        `Bạn không cần chạy nhanh.
Bạn cần chạy đúng 😄`
      ),

      toneLine(
        `Khi rối → quay về trục chính.`,
        
        `Tập trung lại.`,
        
        `Đang rối mà mở thêm việc là toang 😄`
      ),
    ],
  };

  return [tongQuan, nguHanhSection, congViec, tinhCam, hauVan, loiNhan];
}