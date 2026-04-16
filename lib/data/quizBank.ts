import type { QuizQuestion } from "../types";

export const quizBank: QuizQuestion[] = [
  {
    id: "work_01",
    group: "work",
    text: "Hiện tại bạn thấy công việc của mình giống điều nào nhất?",
    options: [
      { value: "a", text: "Ổn nhưng hơi chán", effect: { boredom: 2, stability: 1 } },
      { value: "b", text: "Áp lực nhưng còn đáng cố", effect: { ambition: 2, resilience: 1 } },
      { value: "c", text: "Không hợp nữa, muốn đổi", effect: { boredom: 2, risk: 1, initiative: 1 } },
      { value: "d", text: "Mình vẫn còn lửa", effect: { ambition: 2, initiative: 2 } }
    ]
  },
  {
    id: "work_02",
    group: "work",
    text: "Nếu có cơ hội việc mới, bạn thường…",
    options: [
      { value: "a", text: "Muốn thử luôn nếu thấy hợp", effect: { risk: 2, initiative: 1 } },
      { value: "b", text: "Phải cân rất kỹ", effect: { logic: 2, stability: 1 } },
      { value: "c", text: "Hỏi thêm ý kiến người tin", effect: { comfortNeed: 1, emotion: 1 } },
      { value: "d", text: "Thường chần chừ vì sợ sai", effect: { sensitivity: 1, stability: 1 } }
    ]
  },
  {
    id: "stress_01",
    group: "stress",
    text: "Khi áp lực tăng, phản ứng đầu tiên của bạn là gì?",
    options: [
      { value: "a", text: "Im lặng, tự gánh", effect: { introvert: 2, sensitivity: 1 } },
      { value: "b", text: "Muốn nói chuyện với ai đó", effect: { extrovert: 1, comfortNeed: 2 } },
      { value: "c", text: "Tự lập kế hoạch xử lý", effect: { logic: 2, resilience: 1 } },
      { value: "d", text: "Lảng sang chuyện khác cho nhẹ đầu", effect: { boredom: 1, comfortNeed: 1 } }
    ]
  },
  {
    id: "stress_02",
    group: "stress",
    text: "Bạn thường mệt nhất vì điều gì?",
    options: [
      { value: "a", text: "Người khác không hiểu mình", effect: { emotion: 2, sensitivity: 1 } },
      { value: "b", text: "Tiến độ không như ý", effect: { ambition: 2, bluntNeed: 1 } },
      { value: "c", text: "Quá nhiều việc cùng lúc", effect: { logic: 1, stability: 1 } },
      { value: "d", text: "Không biết mình đang cố vì cái gì", effect: { boredom: 2, introvert: 1 } }
    ]
  },
  {
    id: "money_01",
    group: "money",
    text: "Tiền bạc với bạn hiện tại giống câu nào nhất?",
    options: [
      { value: "a", text: "Kiếm được nhưng giữ chưa tốt", effect: { risk: 1, boredom: 1 } },
      { value: "b", text: "Muốn chắc chắn hơn là bùng nổ", effect: { stability: 2, logic: 1 } },
      { value: "c", text: "Đang muốn bứt lên mạnh", effect: { ambition: 2, risk: 1 } },
      { value: "d", text: "Mình hay quyết theo cảm xúc", effect: { emotion: 2, sensitivity: 1 } }
    ]
  },
  {
    id: "money_02",
    group: "money",
    text: "Khi có một khoản tiền dư, bạn thường…",
    options: [
      { value: "a", text: "Giữ lại cho an tâm", effect: { stability: 2, logic: 1 } },
      { value: "b", text: "Muốn xoay sang cơ hội mới", effect: { ambition: 1, risk: 2 } },
      { value: "c", text: "Chi cho bản thân để đỡ áp lực", effect: { emotion: 1, comfortNeed: 1 } },
      { value: "d", text: "Để đó rồi tính tiếp", effect: { stability: 1, sensitivity: 1 } }
    ]
  },
  {
    id: "love_01",
    group: "love",
    text: "Trong tình cảm, bạn thường là người…",
    options: [
      { value: "a", text: "Yêu sâu nhưng khó nói", effect: { introvert: 2, emotion: 2 } },
      { value: "b", text: "Nói ra khá rõ", effect: { extrovert: 2, bluntNeed: 1 } },
      { value: "c", text: "Quan sát lâu mới tin", effect: { logic: 1, stability: 1 } },
      { value: "d", text: "Dễ rung động nếu hợp vibe", effect: { emotion: 1, risk: 1, sensitivity: 1 } }
    ]
  },
  {
    id: "love_02",
    group: "love",
    text: "Điều làm bạn sợ nhất trong một mối quan hệ là…",
    options: [
      { value: "a", text: "Bị phản bội", effect: { sensitivity: 2, emotion: 1 } },
      { value: "b", text: "Bị kiểm soát", effect: { initiative: 1, extrovert: 1 } },
      { value: "c", text: "Mập mờ quá lâu", effect: { bluntNeed: 2, logic: 1 } },
      { value: "d", text: "Mình yêu nhiều hơn người ta", effect: { comfortNeed: 2, emotion: 1 } }
    ]
  },
  {
    id: "social_01",
    group: "social",
    text: "Bạn nạp lại năng lượng bằng cách nào?",
    options: [
      { value: "a", text: "Ở một mình", effect: { introvert: 2 } },
      { value: "b", text: "Đi với bạn bè", effect: { extrovert: 2 } },
      { value: "c", text: "Làm việc mình thích", effect: { initiative: 1, stability: 1 } },
      { value: "d", text: "Ngủ hoặc nghỉ yên", effect: { comfortNeed: 1, stability: 1 } }
    ]
  },
  {
    id: "mindset_01",
    group: "mindset",
    text: "Bạn tin vào điều nào hơn?",
    options: [
      { value: "a", text: "Trực giác đầu tiên", effect: { emotion: 1, sensitivity: 1 } },
      { value: "b", text: "Phân tích logic", effect: { logic: 2 } },
      { value: "c", text: "Kinh nghiệm cũ", effect: { stability: 2 } },
      { value: "d", text: "Tín hiệu từ hoàn cảnh", effect: { sensitivity: 1, logic: 1 } }
    ]
  },
  {
    id: "ambition_01",
    group: "ambition",
    text: "Bạn muốn cuộc sống của mình đi theo hướng nào hơn?",
    options: [
      { value: "a", text: "Bình yên, đủ chắc", effect: { stability: 2, comfortNeed: 1 } },
      { value: "b", text: "Tiến lên nhanh, mạnh", effect: { ambition: 2, risk: 1 } },
      { value: "c", text: "Có ý nghĩa, hợp mình", effect: { emotion: 1, initiative: 1 } },
      { value: "d", text: "Vừa an toàn vừa có cơ hội", effect: { logic: 1, stability: 1, ambition: 1 } }
    ]
  },
  {
    id: "decision_01",
    group: "decision",
    text: "Khi phải quyết nhanh, bạn thường…",
    options: [
      { value: "a", text: "Tin vào cảm giác", effect: { emotion: 1, risk: 1 } },
      { value: "b", text: "Bám vào dữ kiện", effect: { logic: 2 } },
      { value: "c", text: "Hỏi thêm một người", effect: { comfortNeed: 2 } },
      { value: "d", text: "Quyết rồi mới tính tiếp", effect: { initiative: 2, risk: 1 } }
    ]
  },
  {
    id: "family_01",
    group: "family",
    text: "Với gia đình, bạn thường…",
    options: [
      { value: "a", text: "Thương nhiều nhưng ít nói", effect: { introvert: 2, emotion: 1 } },
      { value: "b", text: "Hay chia sẻ và hỏi han", effect: { extrovert: 2, comfortNeed: 1 } },
      { value: "c", text: "Lo bằng hành động hơn lời", effect: { logic: 1, stability: 1 } },
      { value: "d", text: "Né chuyện mệt để giữ hòa khí", effect: { sensitivity: 1, comfortNeed: 1 } }
    ]
  },
  {
    id: "intuition_01",
    group: "intuition",
    text: "Bạn thấy mình gần với kiểu nào hơn?",
    options: [
      { value: "a", text: "Người hay bắt sóng cảm xúc", effect: { emotion: 2, sensitivity: 1 } },
      { value: "b", text: "Người thực tế và tỉnh", effect: { logic: 2, bluntNeed: 1 } },
      { value: "c", text: "Người sâu nhưng khó đoán", effect: { introvert: 2, sensitivity: 1 } },
      { value: "d", text: "Người sáng năng lượng, thích niềm vui", effect: { extrovert: 1, resilience: 1 } }
    ]
  }
];