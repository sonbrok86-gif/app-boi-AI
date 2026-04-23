export type CardMeaning = {
  core: string;
  shadow: string;
  love: string;
  work: string;
  business: string;
};

export const tarotMeaningMap: Record<string, CardMeaning> = {
  "The Emperor": {
    core: "kỷ luật, trật tự, ranh giới rõ ràng và khả năng giữ thế chủ động",
    shadow: "cứng, kiểm soát quá tay, khó mềm lại đúng lúc",
    love: "Trong chuyện tình cảm, lá này nhắc đến nhu cầu an toàn, sự ổn định và vai trò dẫn dắt. Nó không phải kiểu rung động chớp nhoáng mà là năng lượng muốn xây một thứ gì đó nghiêm túc, có khuôn phép và có tương lai.",
    work: "Trong công việc, lá này nói về cấu trúc, trách nhiệm, vị thế và năng lực điều phối. Đây là kiểu năng lượng của người muốn làm cho mọi thứ đi đúng hàng lối, không thích hỗn loạn, không thích hứa suông.",
    business: "Trong kinh doanh, lá này nghiêng về chiến lược, kiểm soát dòng việc, phân quyền, luật chơi và sự bền vững. Không hợp kiểu đánh hứng, mà hợp kiểu tính đường dài, có kỷ luật tài chính và nguyên tắc rõ ràng.",
  },
  "The Fool": {
    core: "khởi đầu mới, dám bước, tinh thần mở và khả năng đi vào vùng chưa biết",
    shadow: "non tay, hấp tấp, quá tin cảm hứng mà quên tính rủi ro",
    love: "Trong tình cảm, đây là lá của sự mở lòng, khởi đầu và cảm giác muốn thử một hành trình mới. Nó có thể mang lại sự tươi mới, nhưng cũng đòi hỏi tỉnh táo để không lý tưởng hóa người kia.",
    work: "Trong công việc, lá này thường báo hiệu một hướng đi mới, cơ hội mới, vai trò mới hoặc cách làm mới. Rất tốt cho tinh thần dấn thân, nhưng không tốt nếu chỉ hăng mà thiếu kế hoạch.",
    business: "Trong kinh doanh, lá này nói về thử nghiệm, mở ngách mới, sản phẩm mới, hoặc dám rẽ sang hướng chưa ai dám đi. Cơ hội có, nhưng cần tính đường vốn, đường lui và bài toán thực tế.",
  },
  "The Lovers": {
    core: "sự lựa chọn, sự hòa hợp, tính đồng thuận và liên kết giữa giá trị - cảm xúc - hành động",
    shadow: "phân vân, cảm tính quá mức, bị kéo giữa nhiều lựa chọn",
    love: "Trong tình yêu, đây là lá nói mạnh về kết nối, cảm xúc, sự đồng điệu và quyết định gắn bó. Nhưng nó cũng nhắc rằng yêu thôi chưa đủ, còn phải chọn nhau bằng sự trưởng thành.",
    work: "Trong công việc, lá này nói về cộng tác, lựa chọn hướng đi và việc phối hợp với người khác. Rất tốt cho teamwork, nhưng sẽ dễ mệt nếu cứ đứng giữa hai đường mà không dám chốt.",
    business: "Trong kinh doanh, lá này nhấn mạnh hợp tác, đàm phán, lựa chọn đối tác và sự minh bạch khi ra quyết định. Nó có duyên với thương lượng tốt, nhưng không hợp mập mờ quyền lợi.",
  },
  "Queen of Swords": {
    core: "trí óc, quyết định, phân tích, cắt rõ và nhìn thẳng vào sự thật",
    shadow: "căng, lạnh, áp lực, suy nghĩ nhiều hoặc cắt quá tay",
    love: "Trong tình cảm, lá này cho thấy sự tỉnh táo, cần rõ ràng và không muốn mập mờ cảm xúc quá lâu.",
    work: "Trong công việc, đây là lá rất mạnh về phân tích, nhìn thẳng vấn đề và ra quyết định sắc.",
    business: "Trong kinh doanh, lá này hợp với đàm phán, chiến lược, nhìn số liệu và cắt bỏ phần không hiệu quả.",
  },
  "Ten of Cups": {
    core: "cảm xúc, kết nối, lòng người, sự mềm và chiều sâu tình cảm",
    shadow: "phần mơ nhiều, cảm nhiều, dễ lệch vì tâm trạng hoặc kỳ vọng",
    love: "Trong tình cảm, lá này rất đẹp cho cảm giác đầy đủ, kết nối và ấm áp.",
    work: "Trong công việc, lá này nói về môi trường dễ chịu, phối hợp ổn và cảm xúc tích cực trong tập thể.",
    business: "Trong kinh doanh, lá này nghiêng về sự hài lòng của khách hàng, cộng đồng và mối quan hệ bền.",
  },
  "Four of Swords": {
    core: "nghỉ, chậm lại, hồi sức và nhìn lại trước khi đi tiếp",
    shadow: "căng, lạnh, áp lực, suy nghĩ nhiều hoặc cắt quá tay",
    love: "Trong tình cảm, lá này cho thấy cần nghỉ một nhịp, đừng ép cảm xúc chạy quá nhanh.",
    work: "Trong công việc, đây là dấu hiệu phải giảm tải, nhìn lại và hồi sức trước khi bung tiếp.",
    business: "Trong kinh doanh, lá này nhắc tạm chậm một nhịp để xem lại chiến lược và áp lực đang dồn ở đâu.",
  },
};