import { FocusTopic, ToneMode } from "../types";

function pick(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function detectEmotion(
  topics: FocusTopic[],
  visitCount: number,
  tone: ToneMode
) {
  const lines: string[] = [];

  const love = topics.filter(t => t === "tinh_yeu").length;
  const money = topics.filter(t => t === "tai_chinh").length;
  const work = topics.filter(t => t === "cong_viec").length;

  /* -------- CASE 1: PHÂN VÂN -------- */
  if (new Set(topics).size === 3) {
    lines.push(
      pick([
        "Có vẻ bạn đang đứng giữa nhiều lựa chọn và chưa muốn quyết định vội.",
        "Bạn đang nhìn nhiều hướng cùng lúc, điều này thường xảy ra khi chưa thật sự chắc chắn.",
      ])
    );
  }

  /* -------- CASE 2: ÁP LỰC -------- */
  if (work >= 2 || money >= 2) {
    lines.push(
      pick([
        "Giai đoạn này bạn đang chịu áp lực về thực tế khá nhiều.",
        "Có vẻ bạn đang gồng khá nhiều, nhưng vẫn cố giữ mọi thứ ổn định.",
      ])
    );
  }

  /* -------- CASE 3: TÌNH CẢM -------- */
  if (love >= 2) {
    lines.push(
      pick([
        "Chuyện tình cảm đang ảnh hưởng khá rõ đến tâm trạng của bạn.",
        "Bạn đang để cảm xúc dẫn dắt nhiều hơn bình thường.",
      ])
    );
  }

  /* -------- CASE 4: XEM NHIỀU -------- */
  if (visitCount >= 3) {
    lines.push(
      pick([
        "Việc quay lại nhiều lần cho thấy bạn đang tìm một sự chắc chắn.",
        "Bạn có vẻ chưa thật sự yên tâm với điều mình đang nghĩ.",
      ])
    );
  }

  /* -------- CASE 5: TỔNG QUÁT -------- */
  if (lines.length === 0) {
    lines.push(
      pick([
        "Tâm trạng của bạn khá cân bằng, nhưng vẫn có chút lăn tăn bên trong.",
        "Bề ngoài ổn, nhưng bên trong vẫn còn vài điều chưa rõ ràng.",
      ])
    );
  }

  return lines.join("\n\n");
}