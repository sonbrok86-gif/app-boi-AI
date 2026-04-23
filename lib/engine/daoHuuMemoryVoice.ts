import { ToneMode } from "../types";
import { UserMemory } from "./userMemory";

function pick(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getGreeting(memory: UserMemory | null, tone: ToneMode) {
  // chưa có memory → lần đầu
  if (!memory) {
    return pick([
      "Chào đạo hữu, hôm nay ta cùng soi một quẻ nhẹ 😄",
      "Lần đầu gặp đạo hữu, để ta xem thử đường đi của bạn ra sao 😄",
    ]);
  }

  const visit = memory.visitCount;

  // lần 2
  if (visit === 2) {
    return pick([
      "Lại quay lại rồi đó đạo hữu 😄",
      "Ta biết mà, đọc xong kiểu gì cũng quay lại 😄",
    ]);
  }

  // lần 3+
  if (visit >= 3) {
    return pick([
      "Hôm nay đạo hữu soi hơi nhiều rồi nha 😏",
      "Coi chừng xem nhiều quá lại nghiện đó 😄",
    ]);
  }

  return "Chào lại đạo hữu 😄";
}