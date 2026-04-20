import { QuizQuestion } from "../types";

export const mbtiQuestionBank: QuizQuestion[] = [
  {
    id: 1,
    axis: "EI",
    question: "Sau một ngày bận rộn, cách nào giúp bạn hồi lại năng lượng nhanh hơn?",
    options: [
      { label: "Ra ngoài gặp người, nói chuyện, đổi không khí", letter: "E" },
      { label: "Ở yên một mình, tự nạp lại pin", letter: "I" },
    ],
  },
  {
    id: 2,
    axis: "EI",
    question: "Khi vào một nhóm mới, bạn thường thế nào?",
    options: [
      { label: "Bắt chuyện khá nhanh, nhập cuộc sớm", letter: "E" },
      { label: "Quan sát trước rồi mới mở lời", letter: "I" },
    ],
  },
  {
    id: 3,
    axis: "EI",
    question: "Khi nghĩ về ý tưởng mới, bạn thích làm gì hơn?",
    options: [
      { label: "Nói ra để thử phản ứng của người khác", letter: "E" },
      { label: "Giữ lại, tự nghiền kỹ trước", letter: "I" },
    ],
  },
  {
    id: 4,
    axis: "EI",
    question: "Trong cuộc trò chuyện dài, bạn thường là người nào?",
    options: [
      { label: "Nói ra để nghĩ rõ hơn", letter: "E" },
      { label: "Nghĩ rõ rồi mới nói", letter: "I" },
    ],
  },

  {
    id: 5,
    axis: "SN",
    question: "Khi đánh giá một cơ hội, bạn chú ý điều gì trước?",
    options: [
      { label: "Dữ liệu thật, chi tiết thật, làm được ngay không", letter: "S" },
      { label: "Tiềm năng xa hơn, viễn cảnh lớn hơn", letter: "N" },
    ],
  },
  {
    id: 6,
    axis: "SN",
    question: "Bạn học nhanh hơn bằng cách nào?",
    options: [
      { label: "Ví dụ cụ thể, từng bước rõ ràng", letter: "S" },
      { label: "Hiểu ý lớn và tự nối các mảnh lại", letter: "N" },
    ],
  },
  {
    id: 7,
    axis: "SN",
    question: "Trong công việc, bạn thấy mình hợp kiểu nào hơn?",
    options: [
      { label: "Bám thực tế, chỉnh đúng việc đang diễn ra", letter: "S" },
      { label: "Nhìn mô hình, dự đoán hướng đi tiếp", letter: "N" },
    ],
  },
  {
    id: 8,
    axis: "SN",
    question: "Bạn bị thu hút bởi điều gì hơn?",
    options: [
      { label: "Điều chắc tay, kiểm chứng được", letter: "S" },
      { label: "Điều mới, có thể bứt phá", letter: "N" },
    ],
  },

  {
    id: 9,
    axis: "TF",
    question: "Khi phải quyết định khó, bạn dựa vào gì nhiều hơn?",
    options: [
      { label: "Logic, công bằng, đúng sai rõ", letter: "T" },
      { label: "Con người, cảm xúc, sự phù hợp", letter: "F" },
    ],
  },
  {
    id: 10,
    axis: "TF",
    question: "Khi góp ý cho ai đó, bạn thường nghiêng về kiểu nào?",
    options: [
      { label: "Nói thẳng vào vấn đề để sửa nhanh", letter: "T" },
      { label: "Lựa lời để người ta dễ tiếp nhận", letter: "F" },
    ],
  },
  {
    id: 11,
    axis: "TF",
    question: "Điều nào khiến bạn khó chịu hơn?",
    options: [
      { label: "Thiếu logic, làm việc cảm tính", letter: "T" },
      { label: "Lạnh lùng, không để ý cảm xúc người khác", letter: "F" },
    ],
  },
  {
    id: 12,
    axis: "TF",
    question: "Khi tranh luận, điều bạn ưu tiên là gì?",
    options: [
      { label: "Đi tới kết luận đúng", letter: "T" },
      { label: "Giữ được sự hòa hợp giữa các bên", letter: "F" },
    ],
  },

  {
    id: 13,
    axis: "JP",
    question: "Bạn thấy dễ chịu hơn khi ngày của mình thế nào?",
    options: [
      { label: "Có kế hoạch rõ ràng, mọi thứ nằm trong kiểm soát", letter: "J" },
      { label: "Linh hoạt, để mọi thứ diễn ra tự nhiên", letter: "P" },
    ],
  },
  {
    id: 14,
    axis: "JP",
    question: "Bạn làm việc hiệu quả hơn khi nào?",
    options: [
      { label: "Có deadline rõ, có kế hoạch trước", letter: "J" },
      { label: "Tùy hứng, có cảm hứng là làm mạnh", letter: "P" },
    ],
  },
  {
    id: 15,
    axis: "JP",
    question: "Bạn thích kiểu môi trường nào hơn?",
    options: [
      { label: "Ổn định, có cấu trúc rõ ràng", letter: "J" },
      { label: "Linh hoạt, thay đổi liên tục", letter: "P" },
    ],
  },
  {
    id: 16,
    axis: "JP",
    question: "Khi đi du lịch, bạn thường?",
    options: [
      { label: "Lên lịch sẵn, biết đi đâu làm gì", letter: "J" },
      { label: "Tới đâu tính tới đó, thích khám phá ngẫu nhiên", letter: "P" },
    ],
  },
];