import { FocusTopic, TarotCard, ToneMode } from "../types";

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

function toneLine(
  serious: string,
  warm: string,
  funny: string,
  tone: ToneMode
) {
  if (tone === "serious") return serious;
  if (tone === "warm") return warm;
  return funny;
}

function getBaseMeaning(topic: FocusTopic, card: TarotCard) {
  switch (topic) {
    case "tinh_yeu":
      return card.meaning.love;
    case "kinh_doanh":
    case "cong_viec":
      return card.meaning.work;
    case "gia_dao":
    case "tai_chinh":
    default:
      return card.meaning.life;
  }
}

function buildTopicIntro(topic: FocusTopic, tone: ToneMode) {
  switch (topic) {
    case "tinh_yeu":
      return toneLine(
        "Lá này đi vào cung tình cảm, nơi lòng người không chỉ cần rung động mà còn cần đúng nhịp.",
        "Lá này chạm vào chuyện tình cảm, nơi cảm xúc cần đi cùng sự tỉnh táo.",
        "Lá này soi vào tình yêu — chỗ mà tim thường chạy nhanh hơn não một nhịp 😄",
        tone
      );

    case "gia_dao":
      return toneLine(
        "Lá này soi về gia đạo, nội khí trong nhà và sự yên ổn phía sau lưng bạn.",
        "Lá này chạm tới chuyện gia đình, gốc rễ tinh thần và nhịp nhà của bạn.",
        "Lá này soi vào gia đạo — nơi chỉ cần trong nhà hơi rung là đầu óc cũng rung theo 😄",
        tone
      );

    case "kinh_doanh":
      return toneLine(
        "Lá này đi vào cung kinh doanh, cơ hội, thế đi và độ tỉnh trong lúc ra quyết định.",
        "Lá này soi chuyện làm ăn, thời điểm và cách xoay bài của bạn.",
        "Lá này soi vào kinh doanh — nơi chỉ cần hứng quá là tiền cũng biết chạy bộ 😄",
        tone
      );

    case "tai_chinh":
      return toneLine(
        "Lá này đi vào cung tài chính, nhịp tiền vào ra và cách giữ tài khí.",
        "Lá này chạm tới tiền bạc, cách kiếm và cách giữ của bạn.",
        "Lá này soi vào ví tiền — chỗ mà nhiều người kiếm được nhưng giữ chưa chắc 😄",
        tone
      );

    case "cong_viec":
      return toneLine(
        "Lá này soi cung công việc, vai trò, vị thế và đường tiến thân của bạn.",
        "Lá này chạm đến công việc, cách bạn đứng trong tập thể và đi đường dài.",
        "Lá này soi công việc — nơi chăm thôi chưa đủ, còn phải đúng chỗ mới sáng 😄",
        tone
      );

    default:
      return toneLine(
        "Lá này soi đại cục, giúp nhìn rõ nhịp chung của vận hiện tại.",
        "Lá này giúp gom lại bức tranh chung, để bạn nhìn rõ mình hơn.",
        "Lá này giống như đời gửi voice note cho bạn vậy 😄",
        tone
      );
  }
}

function buildTopicBody(
  topic: FocusTopic,
  mode: "upright" | "reverse",
  tone: ToneMode
) {
  const positive = mode === "upright";

  switch (topic) {
    case "tinh_yeu":
      return positive
        ? toneLine(
            `Về ${topicLabel(topic)}, đây là dấu hiệu cho thấy lòng bạn có thể mở đúng chỗ. Nếu đã có người trong tâm, mối quan hệ này cần sự thẳng thắn và bền nhịp hơn là những rung động chớp nhoáng.`,
            `Trong ${topicLabel(topic)}, lá này khá sáng. Cảm xúc có cửa mở, nhưng muốn bền thì phải thật và đều.`,
            `Về ${topicLabel(topic)}, tín hiệu khá ổn. Yêu được, nhưng đừng vừa rung động 5 phút đã tưởng tới đám cưới 😄`,
            tone
          )
        : toneLine(
            `Về ${topicLabel(topic)}, lá này nhắc rằng cảm xúc đang có chỗ vướng. Không phải vô duyên, mà là lòng còn chưa thật thông. Muốn yên thì phải rõ.`,
            `Trong ${topicLabel(topic)}, hiện có chỗ chưa trọn. Càng mơ hồ càng mệt.`,
            `Về ${topicLabel(topic)}, lá này nói nhẹ thôi: tim đang hơi rối. Đừng vừa buồn 1 cái là kết luận “duyên số khắc tôi” 😄`,
            tone
          );

    case "gia_dao":
      return positive
        ? toneLine(
            `Về ${topicLabel(topic)}, đây là lá của sự ổn dần. Nếu trong nhà có chuyện, cục diện vẫn có cửa hòa. Điều quan trọng là giữ lời nói êm hơn cái tôi.`,
            `Trong ${topicLabel(topic)}, tín hiệu thiên về hóa mềm và ổn lại.`,
            `Về ${topicLabel(topic)}, nhà cửa có cửa êm. Miễn là bớt mỗi người đúng một tí thì yên rất nhanh 😄`,
            tone
          )
        : toneLine(
            `Về ${topicLabel(topic)}, lá này cho thấy trong ngoài chưa thật đồng nhịp. Gia đạo cần sự nhẫn và sự lắng hơn là phân thắng thua.`,
            `Trong ${topicLabel(topic)}, hiện có độ căng ngầm. Nói ít đúng hơn nói nhiều.`,
            `Về ${topicLabel(topic)}, không phải nhà xấu đâu, chỉ là ai cũng đang hơi muốn mình đúng nhất 😄`,
            tone
          );

    case "kinh_doanh":
      return positive
        ? toneLine(
            `Về ${topicLabel(topic)}, lá này khá tốt cho thế tiến. Có cơ hội, có đường mở, nhưng thắng ở đây là thắng bằng nhịp tỉnh chứ không phải bằng độ hăng.`,
            `Trong ${topicLabel(topic)}, đây là tín hiệu có thể tiến được nếu biết chọn thời điểm.`,
            `Về ${topicLabel(topic)}, cửa mở khá đẹp. Chỉ cần đừng thấy thơm quá là phóng to vị thế ngay 😄`,
            tone
          )
        : toneLine(
            `Về ${topicLabel(topic)}, lá này nhắc phải giữ đầu lạnh. Cửa chưa hẳn đóng, nhưng nếu vội thì dễ tự làm lệch thế.`,
            `Trong ${topicLabel(topic)}, chưa phải lúc bung quá mạnh.`,
            `Về ${topicLabel(topic)}, lá này nói: có mùi cơ hội, nhưng đừng ngửi một cái rồi all-in bằng cảm xúc 😄`,
            tone
          );

    case "tai_chinh":
      return positive
        ? toneLine(
            `Về ${topicLabel(topic)}, lá này là dấu hiệu tài khí có cửa tụ. Điều nên nhớ: tiền đến bằng năng lực, ở lại bằng kỷ luật.`,
            `Trong ${topicLabel(topic)}, đây là lá khá sáng cho chuyện giữ nhịp tiền bạc.`,
            `Về ${topicLabel(topic)}, tiền có cửa vào. Giờ phần khó là đừng tiễn nó đi quá nhanh 😄`,
            tone
          )
        : toneLine(
            `Về ${topicLabel(topic)}, lá này nhắc về sự thất thoát do cảm hứng hoặc quyết định chưa đủ chín. Tài không xấu, chỉ là nhịp giữ chưa ổn.`,
            `Trong ${topicLabel(topic)}, cần siết lại cách tiêu và cách quyết.`,
            `Về ${topicLabel(topic)}, kiếm được chưa chắc giữ được — câu này lá đang nhắc khá rõ 😄`,
            tone
          );

    case "cong_viec":
      return positive
        ? toneLine(
            `Về ${topicLabel(topic)}, lá này cho thấy bạn có cửa đứng lên hoặc ít nhất là được nhìn thấy rõ hơn. Năng lực không nên để nằm mãi ở vùng khuất.`,
            `Trong ${topicLabel(topic)}, tín hiệu khá tốt cho chuyện vị trí và sự công nhận.`,
            `Về ${topicLabel(topic)}, đây là lá có mùi “được sáng mặt” đó. Miễn là đừng tự thu nhỏ mình lại 😄`,
            tone
          )
        : toneLine(
            `Về ${topicLabel(topic)}, lá này nhắc rằng bạn đang cần chọn đúng chỗ đứng hơn là cố gồng ở một vị trí không còn hợp khí.`,
            `Trong ${topicLabel(topic)}, có dấu hiệu chững hoặc lệch nhịp.`,
            `Về ${topicLabel(topic)}, không hẳn bạn yếu — chỉ là chỗ này có thể chưa phải sân khấu của bạn 😄`,
            tone
          );

    default:
      return positive
        ? toneLine(
            `Ở mặt ${topicLabel(topic)}, lá này nghiêng về sự mở đường, sáng dần và rõ dần.`,
            `Tổng thể, lá này khá sáng cho nhịp chung hiện tại.`,
            `Tổng thể, lá này kiểu “đời chưa phụ bạn đâu, bình tĩnh đi” 😄`,
            tone
          )
        : toneLine(
            `Ở mặt ${topicLabel(topic)}, lá này nghiêng về sự nhắc nhở: chậm lại, nhìn kỹ lại, chỉnh lại nhịp.`,
            `Tổng thể, lá này không xấu, nhưng là tín hiệu phải tỉnh.`,
            `Tổng thể, lá này kiểu “đừng hăng quá, cuộc đời chưa tới đoạn cần chạy nước rút” 😄`,
            tone
          );
  }
}

function buildClosing(topic: FocusTopic, tone: ToneMode) {
  switch (topic) {
    case "tinh_yeu":
      return toneLine(
        "Tình cảm đẹp khi lòng rõ và nhịp đều.",
        "Yêu đúng người thì lòng yên trước rồi mọi thứ mới sáng sau.",
        "Yêu thì cứ yêu, nhưng đừng để tim lái xe lúc não đang ngủ 😄",
        tone
      );
    case "gia_dao":
      return toneLine(
        "Gia đạo yên là nền của mọi vận khác.",
        "Nhà êm thì lòng bạn cũng sáng hơn rất nhiều.",
        "Nhà mà yên là đời đỡ phải chạy deadline cảm xúc 😄",
        tone
      );
    case "kinh_doanh":
      return toneLine(
        "Buôn bán hơn nhau ở thời điểm và cái đầu lạnh.",
        "Làm ăn đẹp nhất khi vừa có gan vừa có nhịp.",
        "Làm ăn không sợ thiếu cơ hội, chỉ sợ hứng lên quá tay 😄",
        tone
      );
    case "tai_chinh":
      return toneLine(
        "Giữ tiền là một loại bản lĩnh không kém kiếm tiền.",
        "Tiền đẹp nhất khi đi cùng kỷ luật.",
        "Tiền không ghét bạn, chỉ ghét sự bốc đồng thôi 😄",
        tone
      );
    case "cong_viec":
      return toneLine(
        "Đúng vị trí thì tài mới phát hết ánh.",
        "Chọn đúng chỗ đứng quan trọng không kém chăm chỉ.",
        "Chăm là tốt, nhưng chăm sai chỗ thì chỉ giỏi… mệt 😄",
        tone
      );
    default:
      return toneLine(
        "Đại cục sáng lên khi bạn giữ được trục chính.",
        "Nhịp sống rõ thì vận cũng rõ.",
        "Bớt tự làm rối đội hình là đời dễ thương hơn nhiều 😄",
        tone
      );
  }
}

export function buildTarotReading(
  topic: FocusTopic,
  card: TarotCard,
  mode: "upright" | "reverse",
  tone: ToneMode
) {
  const baseMeaning = getBaseMeaning(topic, card);
  const intro = buildTopicIntro(topic, tone);
  const body = buildTopicBody(topic, mode, tone);
  const closing = buildClosing(topic, tone);

  return [
    intro,
    `Lá "${card.name}" ${
      mode === "upright" ? "ở thế thuận" : "ở thế ngược"
    } cho thấy: ${baseMeaning}`,
    body,
    closing,
  ].join(" ");
}