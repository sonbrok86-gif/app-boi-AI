export type ZodiacKey =
  | "ty"
  | "suu"
  | "dan"
  | "mao"
  | "thin"
  | "ty2"
  | "ngo"
  | "mui"
  | "than"
  | "dau"
  | "tuat"
  | "hoi";

export const zodiacData: Record<
  ZodiacKey,
  {
    name: string;
    shortVibe: string[];
    positiveLines: string[];
    proverbs: string[];
    loveHints: string[];
    workHints: string[];
  }
> = {
  ty: {
    name: "Tý",
    shortVibe: [
      "nhanh, linh hoạt và không hợp đứng yên quá lâu",
      "nhạy thời, khéo xoay và thường thấy cơ hội sớm hơn người khác",
      "đầu óc lanh, vào việc nhanh và khó chịu khi nhịp sống quá chậm",
    ],
    positiveLines: [
      "Tuổi Tý thường sáng khi được đặt vào môi trường có chuyển động và cơ hội xoay thế.",
      "Người tuổi Tý có duyên với việc nhìn ra khe cửa nhỏ rồi biến nó thành đường đi lớn hơn.",
      "Khí của tuổi Tý hợp sự lanh và sự tỉnh, càng giữ đầu sáng càng dễ mở vận.",
    ],
    proverbs: [
      "Biết thời là khôn, biết dừng là bản lĩnh.",
      "Nhanh nhưng đúng nhịp mới là khéo.",
      "Thấy cửa mở là tốt, chọn đúng cửa mới là hay.",
    ],
    loveHints: [
      "Tình cảm của tuổi Tý đẹp nhất khi bớt đoán và nói rõ lòng mình hơn.",
      "Tuổi Tý hợp kiểu yêu có sự hiểu nhanh nhưng vẫn cần cảm giác an toàn.",
    ],
    workHints: [
      "Trong công việc, tuổi Tý mạnh ở phát hiện cơ hội và xoay bài nhanh.",
      "Tuổi Tý làm tốt khi có không gian chủ động và được tin để tự xử lý.",
    ],
  },
  suu: {
    name: "Sửu",
    shortVibe: [
      "bền, chắc và không hợp kiểu mọi thứ thay đổi quá thất thường",
      "đi chậm nhưng giữ lực rất tốt",
      "không ồn ào nhưng càng về lâu càng đáng tin",
    ],
    positiveLines: [
      "Tuổi Sửu sáng ở độ bền, càng đi lâu càng lộ lực.",
      "Người tuổi Sửu không phải kiểu lóe sáng chớp nhoáng, mà là kiểu giữ nền rồi đi lên chắc.",
      "Khí của tuổi Sửu hợp tích lũy, giữ nhịp và xây từ gốc.",
    ],
    proverbs: [
      "Chậm mà chắc, ít mà sâu.",
      "Giữ được nền thì không sợ đường dài.",
      "Bền đúng chỗ mới thành bản lĩnh.",
    ],
    loveHints: [
      "Tuổi Sửu yêu bền hơn yêu nhanh, đã mở lòng thì cần cảm giác chắc chắn.",
      "Trong tình cảm, tuổi Sửu hợp người đều nhịp và biết giữ lời.",
    ],
    workHints: [
      "Trong công việc, tuổi Sửu mạnh ở sự bền bỉ và đáng tin.",
      "Tuổi Sửu hợp môi trường có mục tiêu rõ và đường dài để đi.",
    ],
  },
  dan: {
    name: "Dần",
    shortVibe: [
      "mạnh, dám tiến và không hợp sống quá nhỏ",
      "có khí mở đường, càng bị bó càng muốn bung",
      "có độ quyết và thích cảm giác tự chủ",
    ],
    positiveLines: [
      "Tuổi Dần hợp mở đường, hợp đi trước hơn là đứng mãi ở vị trí chờ sai khiến.",
      "Người tuổi Dần sáng khi được tin và được trao không gian thể hiện bản lĩnh.",
      "Khí của tuổi Dần không hợp chỗ quá chật, càng đúng sân càng dễ bật lên.",
    ],
    proverbs: [
      "Có lực thì đi đúng hướng, đừng chỉ đi thật nhanh.",
      "Gan lớn là tốt, giữ nhịp còn tốt hơn.",
      "Mở đường được, nhưng đừng tự đốt sức quá sớm.",
    ],
    loveHints: [
      "Tuổi Dần trong tình cảm mạnh ở sự rõ ràng, nhưng cần thêm độ mềm để bền.",
      "Yêu với tuổi Dần đẹp nhất khi vừa tôn trọng vừa hiểu nhịp nhau.",
    ],
    workHints: [
      "Trong công việc, tuổi Dần hợp vai trò có quyền chủ động và trách nhiệm rõ.",
      "Tuổi Dần không hợp làm mãi ở chỗ không được phát khí.",
    ],
  },
  mao: {
    name: "Mão",
    shortVibe: [
      "mềm, tinh và có cảm nhận khá nhạy",
      "không thích va chạm quá gắt nhưng lại rất biết nhìn người",
      "hợp nhịp sống có sự tinh tế và độ yên vừa đủ",
    ],
    positiveLines: [
      "Tuổi Mão sáng ở sự mềm mà không yếu, càng tinh càng dễ tránh hao lực.",
      "Người tuổi Mão có duyên với những gì cần mắt nhìn tinh và cách xử lý khéo.",
      "Khí của tuổi Mão hợp điều hòa, hợp nhịp đều, không hợp chỗ quá xô bồ.",
    ],
    proverbs: [
      "Mềm đúng lúc là trí tuệ, không phải yếu.",
      "Tinh một chút thì đỡ va rất nhiều.",
      "Đi nhẹ mà đúng vẫn hơn ồn mà lệch.",
    ],
    loveHints: [
      "Tình cảm của tuổi Mão đẹp khi có sự yên và cảm giác được thấu hiểu.",
      "Tuổi Mão không hợp kiểu yêu quá gắt, quá ép hay quá đoán.",
    ],
    workHints: [
      "Trong công việc, tuổi Mão hợp môi trường có sự văn minh và ổn định tương đối.",
      "Tuổi Mão làm tốt khi có khoảng không để quan sát và xử lý theo cách riêng.",
    ],
  },
  thin: {
    name: "Thìn",
    shortVibe: [
      "có khí lớn, có tham vọng và không hợp sống mờ",
      "càng đúng chỗ càng dễ nổi bật",
      "có xu hướng muốn làm việc ra tầm, ra thế",
    ],
    positiveLines: [
      "Tuổi Thìn hợp đường rộng, càng có không gian càng dễ bộc lộ bản lĩnh.",
      "Người tuổi Thìn thường không hợp kiểu sống nhỏ hơn khí chất của mình.",
      "Khí của tuổi Thìn sáng khi giữ đúng trục, không tự phân tán lực.",
    ],
    proverbs: [
      "Có khí thì giữ trục, có lực thì giữ nhịp.",
      "Đường lớn không sợ chậm, chỉ sợ lệch.",
      "Sáng đúng chỗ mới thành vị thế.",
    ],
    loveHints: [
      "Trong tình cảm, tuổi Thìn cần người hiểu được khí chất và tôn trọng lòng tự trọng.",
      "Tuổi Thìn yêu đẹp khi bớt gồng mạnh và nói thật cảm xúc của mình.",
    ],
    workHints: [
      "Trong công việc, tuổi Thìn hợp vai trò có tầm nhìn và độ chủ động cao.",
      "Tuổi Thìn sáng nhất khi được dùng lực đúng chỗ, không bị ép nhỏ lại.",
    ],
  },
  ty2: {
    name: "Tỵ",
    shortVibe: [
      "sâu, kín và không dễ để người khác đọc hết",
      "quan sát kỹ rồi mới lộ bài",
      "có độ nhạy về người và thế cuộc",
    ],
    positiveLines: [
      "Tuổi Tỵ mạnh ở chiều sâu và khả năng nhìn dưới bề mặt.",
      "Người tuổi Tỵ không cần ồn để có sức nặng, càng tỉnh càng sáng.",
      "Khí của tuổi Tỵ hợp sự kín đáo có định hướng, không hợp nóng vội.",
    ],
    proverbs: [
      "Biết sâu mà không vội mới là cao tay.",
      "Thấy được nhiều, càng cần giữ đầu lạnh.",
      "Tỉnh một chút thì đường mở rõ hơn nhiều.",
    ],
    loveHints: [
      "Tình cảm của tuổi Tỵ đẹp khi lòng đủ tin mới mở, không nên ép nhanh.",
      "Tuổi Tỵ yêu sâu nhưng cần cảm giác an toàn thật sự.",
    ],
    workHints: [
      "Trong công việc, tuổi Tỵ mạnh ở phân tích, quan sát và đi đường kín mà chắc.",
      "Tuổi Tỵ hợp chỗ cần đầu óc sâu hơn là chỗ chỉ đòi ồn và nhanh.",
    ],
  },
  ngo: {
    name: "Ngọ",
    shortVibe: [
      "động, thoáng và không hợp bị kìm quá chặt",
      "có lửa, có tốc độ và thích cảm giác được tiến lên",
      "hợp môi trường có chuyển động và tinh thần tự do",
    ],
    positiveLines: [
      "Tuổi Ngọ sáng khi được chạy đúng hướng, không phải khi bị giữ quá chặt.",
      "Người tuổi Ngọ có lửa và có nhịp tiến, càng rõ đích càng mạnh.",
      "Khí của tuổi Ngọ hợp chủ động, hợp sống có đường ra phía trước.",
    ],
    proverbs: [
      "Nhanh là lợi thế, đúng nhịp mới là bản lĩnh.",
      "Có lửa thì giữ hướng, đừng chỉ giữ tốc độ.",
      "Đường mở cho người biết tiến mà không tự cháy mình.",
    ],
    loveHints: [
      "Tuổi Ngọ trong tình cảm cần vừa có cảm hứng vừa có khoảng thở.",
      "Tuổi Ngọ không hợp kiểu yêu quá bó và quá kiểm soát.",
    ],
    workHints: [
      "Trong công việc, tuổi Ngọ mạnh khi được tự chủ và nhìn thấy đà tiến rõ.",
      "Tuổi Ngọ hợp việc có nhịp, có mục tiêu và có đường mở.",
    ],
  },
  mui: {
    name: "Mùi",
    shortVibe: [
      "ấm, tinh và cần môi trường có sự yên để phát huy",
      "có chiều sâu cảm xúc và gu riêng",
      "không hợp chỗ quá gắt hay quá thô",
    ],
    positiveLines: [
      "Tuổi Mùi sáng ở sự tinh tế và lòng bền, không phải ở ồn ào.",
      "Người tuổi Mùi hợp nhịp sống có độ mềm, có gu và có sự nuôi dưỡng.",
      "Khí của tuổi Mùi đẹp khi được ở đúng môi trường hợp mình.",
    ],
    proverbs: [
      "Êm mà đúng vẫn hơn gắt mà lệch.",
      "Giữ lòng sáng thì vận tự mềm lại.",
      "Đi đúng gu của mình mới bền được.",
    ],
    loveHints: [
      "Tình cảm của tuổi Mùi đẹp nhất khi có sự dịu dàng và cảm giác được hiểu.",
      "Tuổi Mùi không hợp kiểu yêu quá lạnh hoặc quá cộc.",
    ],
    workHints: [
      "Trong công việc, tuổi Mùi làm tốt khi môi trường có sự tử tế và tôn trọng.",
      "Tuổi Mùi hợp việc có chiều sâu hơn là việc quá xô bồ.",
    ],
  },
  than: {
    name: "Thân",
    shortVibe: [
      "nhanh trí, linh hoạt và rất biết xoay bài",
      "hợp sự thay đổi thông minh hơn là đứng yên cứng nhắc",
      "đầu óc hoạt, bắt nhịp nhanh và thường thấy đường tắt hợp lý",
    ],
    positiveLines: [
      "Tuổi Thân sáng ở độ lanh và khả năng xoay chuyển tình thế.",
      "Người tuổi Thân hợp chỗ có chuyển động, có thử thách và cần đầu óc linh hoạt.",
      "Khí của tuổi Thân mạnh khi vừa nhanh vừa tỉnh, chứ không phải chỉ nhanh.",
    ],
    proverbs: [
      "Nhanh mà tỉnh thì thành tài.",
      "Khéo xoay là lợi thế, giữ trục là bản lĩnh.",
      "Biết biến thì tốt, đừng biến quá thành tự mỏi.",
    ],
    loveHints: [
      "Tình cảm của tuổi Thân đẹp khi bớt thử nhau và nói rõ hơn.",
      "Tuổi Thân hợp yêu có sự vui nhưng vẫn cần độ chắc.",
    ],
    workHints: [
      "Trong công việc, tuổi Thân rất hợp việc cần ứng biến và xử lý nhanh.",
      "Tuổi Thân sáng khi được tin để tự xoay cách làm phù hợp.",
    ],
  },
  dau: {
    name: "Dậu",
    shortVibe: [
      "rõ, kỹ và có tiêu chuẩn riêng",
      "không thích lộn xộn, làm gì cũng muốn ra khuôn",
      "có mắt nhìn chi tiết và độ chỉnh chu cao",
    ],
    positiveLines: [
      "Tuổi Dậu sáng ở sự rõ ràng và tinh thần làm việc có chuẩn.",
      "Người tuổi Dậu hợp nơi cần sự chỉn chu, đều nhịp và giữ chất lượng.",
      "Khí của tuổi Dậu mạnh khi dùng tiêu chuẩn đúng chỗ, không tự ép quá tay.",
    ],
    proverbs: [
      "Rõ một chút thì đỡ rối rất nhiều.",
      "Chỉnh chu là tốt, đừng tự siết mình quá tay.",
      "Có chuẩn là lợi thế, có mềm là bản lĩnh.",
    ],
    loveHints: [
      "Trong tình cảm, tuổi Dậu hợp người tôn trọng sự rõ ràng và thành thật.",
      "Tuổi Dậu yêu đẹp khi bớt soi quá mức và giữ lòng mềm hơn.",
    ],
    workHints: [
      "Trong công việc, tuổi Dậu mạnh ở tiêu chuẩn, chi tiết và sự đáng tin.",
      "Tuổi Dậu hợp môi trường có quy chuẩn, nhưng vẫn cần khoảng thở để đỡ mệt.",
    ],
  },
  tuat: {
    name: "Tuất",
    shortVibe: [
      "thẳng, bền và có tinh thần giữ nghĩa",
      "coi trọng sự thật và sự đáng tin",
      "không thích màu mè quá mức",
    ],
    positiveLines: [
      "Tuổi Tuất sáng ở lòng ngay và sự bền trong cách sống.",
      "Người tuổi Tuất hợp đi đường dài bằng độ tin cậy hơn là bằng chiêu trò.",
      "Khí của tuổi Tuất mạnh khi giữ được lòng sáng và chọn đúng nơi để trao lực.",
    ],
    proverbs: [
      "Bền lòng đúng chỗ thì vận mới bền theo.",
      "Thật là quý, nhưng biết mềm đúng lúc còn quý hơn.",
      "Giữ nghĩa là tốt, đừng giữ luôn cả phần mệt của mình.",
    ],
    loveHints: [
      "Tình cảm của tuổi Tuất đẹp khi có sự chân thành và cảm giác đồng hành thật.",
      "Tuổi Tuất yêu bền, nhưng cũng cần học cách nói phần mình cần.",
    ],
    workHints: [
      "Trong công việc, tuổi Tuất hợp chỗ đáng tin và có giá trị rõ.",
      "Tuổi Tuất làm tốt khi mục tiêu đủ thật để tin mà đi dài.",
    ],
  },
  hoi: {
    name: "Hợi",
    shortVibe: [
      "ấm, rộng và không hợp nhịp sống quá gắt",
      "có phúc khí khi giữ lòng sáng và nhịp đều",
      "nhìn hiền nhưng không hề yếu",
    ],
    positiveLines: [
      "Tuổi Hợi sáng khi sống đúng với lòng rộng và sự tử tế của mình.",
      "Người tuổi Hợi hợp đi đường bền, không cần quá gắt mà vẫn có lực riêng.",
      "Khí của tuổi Hợi đẹp khi giữ tâm yên và đừng tự cuốn mình vào quá nhiều sóng.",
    ],
    proverbs: [
      "Yên một chút thì thấy đường rõ hơn.",
      "Rộng lòng là tốt, giữ ranh giới còn tốt hơn.",
      "Đi đều mà sáng còn hơn nhanh mà hao.",
    ],
    loveHints: [
      "Tình cảm của tuổi Hợi đẹp khi được trân trọng và không bị ép gồng quá mức.",
      "Tuổi Hợi hợp người ấm và có độ ổn định.",
    ],
    workHints: [
      "Trong công việc, tuổi Hợi hợp môi trường đàng hoàng và ít drama.",
      "Tuổi Hợi làm tốt khi lòng yên và đường đi rõ ràng.",
    ],
  },
};

const zodiacOrder: ZodiacKey[] = [
  "ty",
  "suu",
  "dan",
  "mao",
  "thin",
  "ty2",
  "ngo",
  "mui",
  "than",
  "dau",
  "tuat",
  "hoi",
];

export function getZodiacFromYear(year: number): ZodiacKey {
  const normalized = ((year - 4) % 12 + 12) % 12;
  return zodiacOrder[normalized];
}