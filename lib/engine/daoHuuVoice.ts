import { ToneMode, FocusTopic } from "../types";

function pick(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ================= INTRO ================= */

export function getIntroLine(name: string, tone: ToneMode) {
  const serious = [
    `${name}, ta không xem kiểu đoán mò. Phần này là soi gốc.`,
    `Đạo hữu ${name}, ta nhìn vào nền trước rồi mới nói tiếp.`,
  ];

  const warm = [
    `${name}, mình cùng nhìn lại bản thân một chút nhé.`,
    `Đạo hữu ${name}, phần này giúp bạn hiểu mình rõ hơn.`,
  ];

  const funny = [
    `${name}, chuẩn bị soi chính mình nha 😄`,
    `Đạo hữu ${name}, coi chừng đọc xong thấy "sao giống mình vậy trời" 😄`,
  ];

  if (tone === "serious") return pick(serious);
  if (tone === "warm") return pick(warm);
  return pick(funny);
}

/* ================= TRANSITION ================= */

export function getTransitionLine(step: string, tone: ToneMode) {
  const map: Record<string, any> = {
    life: {
      funny: [
        "Soi nền xong rồi. Giờ tới phần dễ 'lộ bản chất' hơn 😄",
        "Nền thấy rồi, giờ coi đạo hữu phản ứng thế nào 😄",
      ],
      serious: [
        "Nền đã rõ. Chuyển sang phân tích tính cách.",
      ],
      warm: [
        "Mình đã có nền rồi, giờ xem sâu hơn một chút nhé.",
      ],
    },

    tarot: {
      funny: [
        "Giờ tới tarot. Mong hôm nay bài hiền 😄",
        "Lật bài thôi đạo hữu. Đừng run 😄",
      ],
      serious: [
        "Giờ đến phần trực giác và biểu tượng.",
      ],
      warm: [
        "Giờ mình xem thêm một góc nhìn khác nhé.",
      ],
    },
  };

  return pick(map[step]?.[tone] || map[step]?.funny || ["Tiếp tục..."]);
}

/* ================= FINAL ================= */

export function getFinalIntro(tone: ToneMode, visit: number) {
  const funny = [
    "Đọc chậm thôi đạo hữu. Có câu nào trúng thì đừng giật mình 😄",
    "Đoạn này dễ 'thấm' nhất, đọc từ từ nha 😄",
  ];

  const serious = [
    "Phần dưới là tổng hợp toàn bộ dữ liệu.",
    "Đây là kết quả sau khi ghép tất cả yếu tố lại.",
  ];

  const warm = [
    "Phần này là tổng kết cho bạn.",
    "Đây là bức tranh tổng thể về bạn.",
  ];

  let base =
    tone === "serious" ? pick(serious) : tone === "warm" ? pick(warm) : pick(funny);

  if (visit >= 2) {
    base +=
      tone === "funny"
        ? " Lần này đọc kỹ hơn chút nha 😄"
        : " Đây là lần bạn quay lại, nên góc nhìn sẽ rõ hơn.";
  }

  return base;
}

/* ================= DIRECTION ================= */

export function getFocusLine(focus: FocusTopic, tone: ToneMode) {
  const map: any = {
    tinh_yeu: [
      "Tình cảm của bạn không tệ, chỉ là đôi lúc tự làm rối 😄",
      "Bạn hợp yêu rõ ràng hơn là yêu theo cảm xúc thoáng qua.",
    ],
    tai_chinh: [
      "Tiền của bạn đi ổn khi giữ kỷ luật.",
      "Không phải thiếu tiền, mà là thiếu nhịp đều 😄",
    ],
    kinh_doanh: [
      "Bạn hợp làm chủ hơn làm theo.",
      "Có tố chất, chỉ cần bớt vài pha quyết định cảm tính 😄",
    ],
  };

  return pick(map[focus] || ["Bạn cần giữ nhịp ổn định hơn."]);
}