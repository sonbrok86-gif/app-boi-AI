import { QuizQuestion } from "../types";

export const questionBank: QuizQuestion[] = [
  {
    id: 1,
    axis: "EI",
    question: "Trong một buổi gặp gỡ đông người, bạn thường thấy mình thế nào hơn?",
    options: [
      { label: "Nói chuyện càng lúc càng có năng lượng", trait: "lanh_dao" as any, letter: "E" as any },
      { label: "Một lúc là muốn lùi về khoảng riêng", trait: "thuc_te" as any, letter: "I" as any },
    ] as any,
  },
  {
    id: 2,
    axis: "EI",
    question: "Khi cần nghĩ ra hướng đi mới, bạn thường làm gì trước?",
    options: [
      { label: "Nói ra, trao đổi rồi nghĩ tiếp", trait: "lanh_dao" as any, letter: "E" as any },
      { label: "Tự ngẫm kỹ trong đầu trước", trait: "thuc_te" as any, letter: "I" as any },
    ] as any,
  },
  {
    id: 3,
    axis: "EI",
    question: "Sau một ngày mệt, cách hồi năng lượng tự nhiên nhất của bạn là:",
    options: [
      { label: "Gặp người hợp gu để nói chuyện", trait: "lanh_dao" as any, letter: "E" as any },
      { label: "Ở yên một mình cho đầu óc lắng xuống", trait: "thuc_te" as any, letter: "I" as any },
    ] as any,
  },
  {
    id: 4,
    axis: "SN",
    question: "Khi nghe một ý tưởng mới, bạn để ý điều gì hơn?",
    options: [
      { label: "Nó làm thực tế ra sao", trait: "thuc_te" as any, letter: "S" as any },
      { label: "Nó có thể mở thành điều gì lớn hơn", trait: "sang_tao" as any, letter: "N" as any },
    ] as any,
  },
  {
    id: 5,
    axis: "SN",
    question: "Bạn tin kiểu dữ liệu nào hơn?",
    options: [
      { label: "Thứ mình thấy rõ, kiểm được", trait: "thuc_te" as any, letter: "S" as any },
      { label: "Xu hướng, linh cảm, khả năng tương lai", trait: "sang_tao" as any, letter: "N" as any },
    ] as any,
  },
  {
    id: 6,
    axis: "SN",
    question: "Trong công việc, bạn thường mạnh ở:",
    options: [
      { label: "Giữ việc chạy đúng và chắc", trait: "tham_trong" as any, letter: "S" as any },
      { label: "Nhìn ra hướng mới, chỗ chưa ai thấy", trait: "sang_tao" as any, letter: "N" as any },
    ] as any,
  },
  {
    id: 7,
    axis: "TF",
    question: "Khi phải ra quyết định khó, bạn ưu tiên gì hơn?",
    options: [
      { label: "Hợp lý và công bằng", trait: "thuc_te" as any, letter: "T" as any },
      { label: "Phù hợp lòng người và cảm xúc", trait: "cam_xuc" as any, letter: "F" as any },
    ] as any,
  },
  {
    id: 8,
    axis: "TF",
    question: "Khi góp ý cho người khác, bạn thường:",
    options: [
      { label: "Nói thẳng điều cần sửa", trait: "thuc_te" as any, letter: "T" as any },
      { label: "Nói sao để họ đỡ tổn thương", trait: "cam_xuc" as any, letter: "F" as any },
    ] as any,
  },
  {
    id: 9,
    axis: "TF",
    question: "Bạn đánh giá một phương án tốt bằng cách nào?",
    options: [
      { label: "Nó logic và tối ưu", trait: "thuc_te" as any, letter: "T" as any },
      { label: "Nó đúng với giá trị con người", trait: "cam_xuc" as any, letter: "F" as any },
    ] as any,
  },
  {
    id: 10,
    axis: "JP",
    question: "Bạn dễ chịu hơn với kiểu sống nào?",
    options: [
      { label: "Có kế hoạch, có khung, đỡ biến động", trait: "tham_trong" as any, letter: "J" as any },
      { label: "Linh hoạt, tới đâu xoay tới đó", trait: "sang_tao" as any, letter: "P" as any },
    ] as any,
  },
  {
    id: 11,
    axis: "JP",
    question: "Khi có deadline, bạn thường:",
    options: [
      { label: "Muốn xử lý sớm cho nhẹ đầu", trait: "tham_trong" as any, letter: "J" as any },
      { label: "Để mở, gần tới nhịp mới bùng lực", trait: "sang_tao" as any, letter: "P" as any },
    ] as any,
  },
  {
    id: 12,
    axis: "JP",
    question: "Một kế hoạch đang chạy mà có cơ hội mới hấp dẫn xuất hiện, bạn sẽ:",
    options: [
      { label: "Ưu tiên kế hoạch đã chốt", trait: "tham_trong" as any, letter: "J" as any },
      { label: "Muốn để ngỏ để xem có gì hay hơn", trait: "sang_tao" as any, letter: "P" as any },
    ] as any,
  },
];