import { FocusTopic, ToneMode } from "../types";

function pick(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function analyzeBehavior(
  topics: FocusTopic[],
  visitCount: number,
  tone: ToneMode
) {
  const result: string[] = [];

  /* --------- 1. PHÂN TÍCH CHỦ ĐỀ --------- */

  const loveCount = topics.filter(t => t === "tinh_yeu").length;
  const moneyCount = topics.filter(t => t === "tai_chinh").length;
  const workCount = topics.filter(t => t === "cong_viec").length;

  if (loveCount >= 2) {
    result.push(
      pick([
        "Đạo hữu có vẻ đang để tâm khá nhiều vào chuyện tình cảm 😄",
        "Nhìn cách chọn thì tình cảm đang chiếm phần lớn suy nghĩ của bạn.",
      ])
    );
  }

  if (moneyCount >= 2) {
    result.push(
      pick([
        "Bạn đang khá tập trung vào tiền bạc và tài chính.",
        "Rõ ràng giai đoạn này bạn ưu tiên vấn đề tiền bạc.",
      ])
    );
  }

  if (workCount >= 2) {
    result.push(
      pick([
        "Công việc đang là trọng tâm lớn nhất của bạn lúc này.",
        "Bạn đang dồn nhiều năng lượng vào hướng phát triển bản thân.",
      ])
    );
  }

  /* --------- 2. PHÂN TÍCH SỐ LẦN XEM --------- */

  if (visitCount >= 3) {
    result.push(
      pick([
        "Hôm nay đạo hữu quay lại khá nhiều. Có vẻ đang tìm một câu trả lời chắc chắn 😏",
        "Việc quay lại nhiều lần cho thấy bạn chưa thật sự yên tâm với quyết định hiện tại.",
      ])
    );
  }

  /* --------- 3. PHÂN TÍCH KIỂU CHỌN --------- */

  const unique = new Set(topics);

  if (unique.size === 3) {
    result.push(
      pick([
        "Cách chọn của bạn khá cân bằng, chứng tỏ bạn nhìn vấn đề khá toàn diện.",
        "Bạn có xu hướng xem xét nhiều khía cạnh thay vì chỉ tập trung một điểm.",
      ])
    );
  }

  if (unique.size === 1) {
    result.push(
      pick([
        "Bạn đang tập trung cực mạnh vào một vấn đề duy nhất.",
        "Rõ ràng có một chuyện đang chi phối gần như toàn bộ suy nghĩ của bạn.",
      ])
    );
  }

  return result.join("\n\n");
}