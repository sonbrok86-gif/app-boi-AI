import { FocusTopic, ToneMode } from "../types";

function topicLabel(topic: FocusTopic) {
  switch (topic) {
    case "tinh_yeu":
      return "tình yêu";
    case "gia_dao":
      return "gia đạo";
    case "kinh_doanh":
      return "kinh doanh";
    case "tai_chinh":
      return "tài chính";
    case "cong_viec":
      return "công việc";
    default:
      return "tổng quan";
  }
}

function toneLine(serious: string, warm: string, funny: string, tone: ToneMode) {
  if (tone === "serious") return serious;
  if (tone === "warm") return warm;
  return funny;
}

type SimpleTarotCard = {
  name: string;
};

export function buildTarotReading(
  topic: FocusTopic,
  card: SimpleTarotCard,
  mode: "upright" | "reverse",
  tone: ToneMode,
  birthDate?: string,
  nguHanh?: string
) {
  const topicName = topicLabel(topic);
  const reversed = mode === "reverse";

  const openLine = reversed
    ? toneLine(
        `${card.name} đi theo chiều ngược, báo hiệu phần ${topicName} đang có điểm nghẽn cần nhìn thẳng.`,
        `${card.name} ngược cho thấy chuyện ${topicName} chưa thật sự trôi mượt.`,
        `${card.name} ngược rồi đạo hữu, nghĩa là cửa ${topicName} đang hơi vướng đó 😄`,
        tone
      )
    : toneLine(
        `${card.name} đi theo chiều thuận, cho thấy phần ${topicName} đang có cửa mở.`,
        `${card.name} thuận cho thấy chuyện ${topicName} có tín hiệu khá sáng.`,
        `${card.name} thuận nha đạo hữu, cửa ${topicName} nhìn khá ổn đó 😄`,
        tone
      );

  const topicLine = (() => {
    switch (topic) {
      case "tinh_yeu":
        return reversed
          ? toneLine(
              "Tình cảm dễ có hiểu lầm, lệch nhịp hoặc kỳ vọng chưa khớp.",
              "Chuyện tình cảm có thể đang khiến bạn nghĩ nhiều hơn mức cần thiết.",
              "Yêu đương đoạn này hơi dễ suy bụng ta ra bụng người đó đạo hữu 😄",
              tone
            )
          : toneLine(
              "Tình cảm có cơ hội rõ hơn nếu bạn nói thật lòng và giữ nhịp ổn định.",
              "Nếu mở lòng đúng cách, phần tình cảm sẽ sáng hơn khá nhiều.",
              "Tình cảm đoạn này có cửa sáng, miễn là đạo hữu đừng tự làm rối thêm 😄",
              tone
            );

      case "gia_dao":
        return reversed
          ? toneLine(
              "Gia đạo cần mềm lời hơn, nếu không chuyện nhỏ dễ thành nặng lòng.",
              "Không khí gia đạo có thể đang hơi căng ở phần nói chuyện và cảm thông.",
              "Trong nhà đoạn này dễ kiểu không ai sai hẳn, mà ai cũng cứng một chút 😄",
              tone
            )
          : toneLine(
              "Gia đạo êm hơn khi có người chủ động giữ nhịp và nói chuyện tử tế.",
              "Năng lượng gia đạo đang thiên về hòa giải và ổn định lại.",
              "Nhà cửa đoạn này có thể êm lên nhanh nếu bớt hơn thua vài câu 😄",
              tone
            );

      case "kinh_doanh":
        return reversed
          ? toneLine(
              "Kinh doanh cần tránh hấp tấp; có dấu hiệu quyết nhanh hơn nghĩ.",
              "Việc làm ăn đang cần thêm kiểm soát và nhìn kỹ rủi ro.",
              "Làm ăn đoạn này đừng để hưng phấn cầm lái nha đạo hữu 😄",
              tone
            )
          : toneLine(
              "Kinh doanh có tín hiệu mở nếu bạn giữ kỷ luật và nhìn đúng thời điểm.",
              "Đường làm ăn đang sáng hơn khi bạn đi chủ động nhưng không vội.",
              "Cửa làm ăn có đó, miễn đạo hữu đừng bẻ lái theo cảm xúc phút chót 😄",
              tone
            );

      case "tai_chinh":
        return reversed
          ? toneLine(
              "Tiền bạc cần siết nhịp lại; dễ có khoản ra vào thiếu kiểm soát.",
              "Tài chính đang nhắc bạn ưu tiên an toàn hơn tốc độ.",
              "Ví tiền đang bảo đạo hữu bình tĩnh bớt một chút đó 😄",
              tone
            )
          : toneLine(
              "Tài chính có thể đi đẹp khi bạn đều tay và bớt quyết định cảm tính.",
              "Tiền bạc đang hợp với cách đi chắc hơn đi nhanh.",
              "Tiền đoạn này khá nghe lời, miễn đạo hữu đừng tiêu theo cảm hứng 😄",
              tone
            );

      case "cong_viec":
        return reversed
          ? toneLine(
              "Công việc dễ có cảm giác bí hoặc chưa được đặt đúng chỗ.",
              "Bạn có thể đang cố nhiều nhưng chưa chắc đúng hướng.",
              "Đạo hữu chăm thì có chăm, chỉ sợ chăm nhầm sân thôi 😄",
              tone
            )
          : toneLine(
              "Công việc có cửa tiến nếu bạn giữ vững vị trí mạnh nhất của mình.",
              "Đây là giai đoạn hợp để làm rõ vai trò và đi chắc tay hơn.",
              "Công việc đang có cửa đẹp đó, miễn là đạo hữu đừng tự nghi ngờ quá nhiều 😄",
              tone
            );

      default:
        return reversed
          ? toneLine(
              "Tổng quan cho thấy nhịp sống đang có vài điểm lệch cần chỉnh lại.",
              "Bạn có thể đang ôm nhiều hướng cùng lúc nên hơi phân tán.",
              "Tổng quan thì không xấu, chỉ là đạo hữu đang hơi tự làm mình rối 😄",
              tone
            )
          : toneLine(
              "Tổng quan cho thấy nếu giữ trục ổn, nhiều chuyện sẽ tự sáng dần.",
              "Năng lượng chung đang nghiêng về mở đường hơn là bế tắc.",
              "Tổng quan khá ổn nha đạo hữu, giữ nhịp đều là đẹp 😄",
              tone
            );
    }
  })();

  const personalLine =
    birthDate || nguHanh
      ? toneLine(
          `Lá bài này khi đặt cạnh nền cá nhân của bạn cho thấy chuyện ${topicName} không nên xử lý quá cảm tính.`,
          `Khi ghép với nền cá nhân hiện tại, phần ${topicName} cần đi theo hướng tỉnh và đều.`,
          `Ghép với nền riêng của đạo hữu thì cửa ${topicName} nên xử lý tỉnh táo hơn một chút 😄`,
          tone
        )
      : "";

  const closing = reversed
    ? toneLine(
        "Điều cần làm lúc này là chậm lại, nhìn đúng nút thắt rồi gỡ từng phần.",
        "Bạn không cần ép nhanh; chỉ cần nhìn đúng chỗ đang lệch.",
        "Khúc này không cần lao mạnh, chỉ cần gỡ đúng chỗ là ổn nha đạo hữu 😄",
        tone
      )
    : toneLine(
        "Nếu giữ nhịp ổn và hành động rõ ràng, lá bài này nghiêng về kết quả tích cực.",
        "Bạn chỉ cần đi đều và giữ đầu óc sáng là phần này sẽ mở hơn.",
        "Giữ nhịp ổn là cửa này sáng đó đạo hữu 😄",
        tone
      );

  return [openLine, topicLine, personalLine, closing].filter(Boolean).join(" ");
}