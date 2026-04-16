import { tarotCards } from "../data/tarotData";
import { topicIntros } from "../data/topicIntros";
import { getTopicExtraAdvice, getTopicPack } from "./topicEngine";
import {
  detectStyleTone,
  getStyledSections,
  normalizeSentence,
  styleSentence
} from "./styleEngine";
import { closingTexts } from "../data/closingTexts";
import type {
  BaseReading,
  PersonalityProfile,
  ReadingResult,
  ScoreMap,
  Topic
} from "../types";

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function pickOne<T>(arr: T[], seed: string): T {
  return arr[hashString(seed) % arr.length];
}

function pickMany<T>(arr: T[], count: number, seed: string): T[] {
  const cloned = [...arr];
  const result: T[] = [];
  let local = seed;
  for (let i = 0; i < count && cloned.length > 0; i++) {
    const idx = hashString(local + i) % cloned.length;
    result.push(cloned[idx]);
    cloned.splice(idx, 1);
    local = String(hashString(local + "_n_" + i));
  }
  return result;
}

function getConsistencyTone(scores: ScoreMap): ReadingResult["consistencyTone"] {
  if (scores.boredom >= 2 || scores.sensitivity >= 3) return "dark_careful";
  if (scores.ambition >= 3 || scores.resilience >= 2) return "bright_opening";
  return "balanced_rising";
}

export function generateReading(params: {
  name: string;
  topic: Topic;
  question: string;
  baseReading: BaseReading;
  personality: PersonalityProfile;
  scores: ScoreMap;
}): ReadingResult {
  const { name, topic, question, baseReading, personality, scores } = params;
  const seed = `${name}|${topic}|${question}|${JSON.stringify(scores)}`;
  const consistencyTone = getConsistencyTone(scores);
const styleTone = detectStyleTone(personality);
const stylePack = getStyledSections(styleTone);
const topicPack = getTopicPack(topic);
const topicExtraAdvice = getTopicExtraAdvice(topic, consistencyTone);

  const overviewMap = {
    dark_careful: [
      "Dạo này vận của bạn không hẳn đen, nhưng đang hơi lệch nhịp. Làm gì cũng có cửa, chỉ là nóng quá thì dễ hỏng nhịp đẹp.",
      "Quẻ hiện tại thiên về thận trọng. Không phải hết cửa, nhưng rõ ràng chưa phải lúc bung tay theo cảm xúc."
    ],
    balanced_rising: [
      "Vận hiện tại của bạn ở pha lưng chừng nhưng có tín hiệu sáng lên. Nếu đi đúng nhịp thì kết quả sẽ ổn hơn tưởng tượng.",
      "Đây là quẻ kiểu chưa đẹp hẳn nhưng có đường lên, miễn là bạn giữ được sự tỉnh táo."
    ],
    bright_opening: [
      "Nhịp vận của bạn đang có cửa mở. Không phải kiểu may mắn tự rơi xuống, mà là kiểu có cơ hội nếu bạn chịu nắm đúng lúc.",
      "Quẻ này sáng hơn mức bạn đang nghĩ. Chỉ cần bớt tự ngờ vực là đã đỡ mất nửa phần vận."
    ]
  };

  const personalitySummaryTemplates = [
  `${personality.dominantTraits.join(", ")}. Trong giao tiếp, bạn ${personality.communicationStyle}.`,
  `${personality.dominantTraits.join(", ")} và hiện tại ${personality.emotionalState}.`,
  `${personality.dominantTraits.join(", ")}, nên nhiều lúc ngoài mặt ổn mà bên trong lại nghĩ nhiều hơn người khác tưởng.`,
  `${personality.dominantTraits.join(", ")}. Bên ngoài có thể bình thường, nhưng bên trong không hề đơn giản.`,
  `${personality.dominantTraits.join(", ")}. Bạn không phải kiểu dễ buông, nhưng cũng hay tự tạo áp lực.`,
  `${personality.dominantTraits.join(", ")}. Điểm mạnh là có chiều sâu, điểm yếu là đôi lúc nghĩ quá nhiều.`,
  `${personality.dominantTraits.join(", ")}. Khi ổn thì rất sáng, khi mệt thì lại thu mình khá nhanh.`,
  `${personality.dominantTraits.join(", ")}. Bạn có cái khó là không dễ nói hết những gì đang giữ trong lòng.`,
  `${personality.dominantTraits.join(", ")}. Nhịp sống của bạn thường bị ảnh hưởng khá mạnh bởi cảm giác bên trong.`,
  `${personality.dominantTraits.join(", ")}. Bạn có chất riêng, chỉ là đôi lúc tự nghi ngờ mình hơi nhiều.`,
  `${personality.dominantTraits.join(", ")}. Bạn không hẳn yếu, chỉ là nhạy hơn người khác một nhịp.`,
  `${personality.dominantTraits.join(", ")}. Một khi đã tin thì rất bền, còn chưa tin thì khá khó mở lòng.`,
  `${personality.dominantTraits.join(", ")}. Bạn vừa có tham vọng vừa cần cảm giác an toàn.`,
  `${personality.dominantTraits.join(", ")}. Điều bạn cần không chỉ là cơ hội, mà còn là đúng nhịp.`,
  `${personality.dominantTraits.join(", ")}. Có lúc bạn rất rõ mình muốn gì, có lúc lại tự làm nhiễu chính mình.`
];
  const topicReadings: Record<Topic, string[]> = {
   tinh_cam: [
  "bạn không phải kiểu không có duyên, chỉ là duyên đến thường đi kèm bài test về sự rõ ràng.",
  "chuyện tình cảm hiện tại chưa tới mức toang, nhưng nếu để mập mờ quá lâu thì tự mệt là chính.",
  "vận tình cảm đang ở pha cần thật lòng nhưng vẫn phải tỉnh.",
  "bạn hợp kiểu chậm mà chắc hơn là rung động nhanh rồi hụt.",
  "cảm xúc có, kết nối có, nhưng chưa hợp với kiểu nóng vội.",
  "điều tình cảm cần nhất lúc này là rõ ràng, không phải đoán nhau mãi.",
  "nếu cứ để lòng mình đi trước quá xa, bạn sẽ tự mệt nhiều hơn vui.",
  "quẻ này không xấu về tình, chỉ là chưa hợp với nhịp quá gấp.",
  "có người hoặc có cơ hội kết nối, nhưng để đi xa thì phải bớt mơ hồ.",
  "bạn đang cần một mối quan hệ đủ thật hơn là một cảm giác quá đẹp lúc đầu.",
  "quẻ tình cảm này sáng ở chiều sâu, không sáng ở sự ồn ào.",
  "nếu đã có cảm xúc thì nên nhìn thêm bằng lý trí, đừng chỉ nhìn bằng tim.",
  "đây là quẻ có thể nở, miễn là bạn không ép nó lớn quá nhanh.",
  "tình cảm của bạn hợp sự nhất quán hơn là những màn thể hiện rực rỡ.",
  "nếu biết giữ nhịp, chuyện tình cảm có thể đi xa hơn bạn nghĩ."
],
    gia_dao: [
  "thương nhau thì có nhưng không phải ai cũng nói ra đúng cách.",
  "vấn đề lớn không nằm ở thiếu tình, mà ở thiếu nhịp hiểu nhau.",
  "gia đạo hiện tại thiên về giữ hòa khí hơn là bùng nổ mâu thuẫn.",
  "không khí trong nhà không xấu, chỉ hơi nặng ở chỗ mỗi người giữ một kiểu suy nghĩ riêng.",
  "nếu né mãi chuyện cần nói, trong lòng sẽ tích lại thành mệt.",
  "quẻ gia đạo này không tối, chỉ cần một nhịp mềm mà thật.",
  "điều nhà bạn đang cần không phải thêm lý lẽ, mà là cách nói dễ nghe hơn.",
  "có vài khoảng cách âm thầm, nhưng chưa tới mức không gỡ được.",
  "gia đạo của bạn ổn ở nền, chỉ lệch ở cách thể hiện.",
  "mỗi người trong nhà đều có cái đúng riêng, nên càng cần một người giữ nhịp.",
  "quẻ này hợp mở lời từng chút hơn là dồn nén rồi bùng ra.",
  "nếu có thể nói sớm một chút, nhiều chuyện sẽ nhẹ đi nhiều.",
  "gia đình vẫn là chỗ dựa, chỉ là đôi lúc đang nói sai tần số với nhau.",
  "cái mệt trong gia đạo hiện tại là chuyện nhỏ tích lâu chứ không phải chuyện lớn ngay trước mắt.",
  "trong nhà vẫn còn nhiều tình hơn vẻ ngoài bạn đang thấy."
    ],
   tien_tai: [
  "bạn không hẳn thiếu lộc, vấn đề là giữ nhịp chưa chắc.",
  "lộc đến lúc tâm chưa vững thì dễ thành kiếm được mà giữ không được.",
  "quẻ tiền nghiêng về có cơ hội nhưng không dành cho kiểu làm vội.",
  "tiền bạc đang có cửa vào, nhưng giữ nhịp quan trọng hơn ham bước lớn.",
  "bạn có khả năng xoay tiền, nhưng chưa phải lúc đi quá tay.",
  "quẻ này hợp tích hơn là bung mạnh theo hứng.",
  "tiền của bạn đang ở pha cần tỉnh chứ không chỉ cần gan.",
  "cửa tiền vẫn có, nhưng đi theo kỷ luật sẽ đẹp hơn đi theo cảm giác.",
  "nếu bớt quyết theo mood, tài lộc sẽ đỡ trôi hơn nhiều.",
  "bạn không nghèo quẻ, chỉ là dễ hao nếu lòng chưa yên.",
  "quẻ tiền tài này sáng ở sự đều đặn hơn là cú nổ lớn.",
  "tiền có thể đến từ hướng cũ tưởng đã qua, miễn là bạn còn nhìn ra giá trị của nó.",
  "đây là quẻ kiếm được nếu đi đúng nhịp, chứ không phải quẻ thắng vì liều.",
  "vấn đề tiền bạc hiện tại nằm ở cách giữ hơn là cách kiếm.",
  "nếu biết chọn ít mà chắc, quẻ này sẽ ổn lên khá nhanh."
],
  co_hoi: [
  "cửa sáng vẫn có, nhưng không tới theo kiểu quá ồn ào.",
  "bạn đang ở giai đoạn có thể đổi nhịp, miễn là bỏ bớt vài thứ không còn hợp.",
  "quẻ cơ hội không tối, nó chỉ ghét sự chần chừ kéo dài.",
  "cơ hội đang mở ra theo kiểu không quá rực rỡ bên ngoài nhưng khá đáng để nắm.",
  "bạn không thiếu cửa đi, chỉ là đang đứng giữa quá nhiều khả năng nên dễ chậm nhịp.",
  "quẻ này hợp kiểu chọn đúng hơn là chọn nhiều.",
  "hiện tại có tín hiệu mở đường, nhất là với những thứ bạn từng nghĩ là đã qua.",
  "cơ hội đến không phải kiểu gõ cửa ầm ầm, mà là kiểu thử xem bạn có đủ tinh để nhận ra không.",
  "nếu bớt tự nghi ngờ, quẻ này có thể sáng lên khá nhanh.",
  "đây là giai đoạn có thể đổi vận nhẹ, miễn là bạn không đứng yên quá lâu.",
  "cơ hội của bạn đang nghiêng về chất lượng hơn số lượng.",
  "điểm mở của quẻ này nằm ở một quyết định rõ chứ không nằm ở quá nhiều phương án.",
  "nếu đã thấy một hướng đủ sáng, bạn nên đi đều thay vì đứng cân mãi.",
  "quẻ cơ hội này đẹp ở timing, không đẹp ở hấp tấp.",
  "điều bạn thiếu không phải vận, mà là một cú chốt đủ dứt."
],  };

  const opportunitiesMap = {
  dark_careful: [
    "vẫn còn đường xoay, miễn là bạn đừng để cảm xúc nắm tay lái.",
    "cửa sáng nằm ở sự kiên nhẫn chứ không nằm ở cú liều đẹp mắt.",
    "bạn vẫn có lợi thế, chỉ là nó không đến theo kiểu quá ồn ào.",
    "nếu chịu chậm lại để nhìn kỹ, bạn sẽ thấy quẻ này chưa hề hết cửa.",
    "điểm sáng là có thể sửa hướng trước khi mọi thứ đi quá xa.",
    "quẻ này vẫn để lại một cửa đẹp cho người đủ tỉnh và đủ bền.",
    "bạn chưa mất vận, chỉ là cần đi đúng thay vì đi nhanh.",
    "thứ đáng giá nhất lúc này là giữ đầu lạnh để nhận đúng cơ hội thật.",
    "đường sáng chưa đóng, chỉ đang thử xem bạn có đủ kiên nhẫn không.",
    "cơ hội vẫn còn, nhưng nó ưu tiên người biết giữ nhịp."
  ],
  balanced_rising: [
    "cơ hội đến theo kiểu vừa đủ rõ để nắm, vừa đủ thử thách để lọc người hấp tấp.",
    "nếu bạn giữ được nhịp đều, quẻ này có khả năng chuyển từ trung bình sang đẹp.",
    "điểm sáng là bạn đang ở khá gần một nhịp mở rõ hơn trước.",
    "quẻ này có thể lên, miễn là bạn đừng tự làm phân tán mình.",
    "bạn đang có một khoảng trống đủ để xoay chuyển thế cờ.",
    "nếu chịu chốt một hướng chính, cơ hội sẽ sáng hơn hẳn.",
    "vận không bùng nổ ngay, nhưng đang lên theo hướng khá lành.",
    "cửa đẹp nằm ở việc chọn đúng trọng tâm hơn là ôm nhiều thứ cùng lúc.",
    "đây là quẻ có thể đi lên bền nếu bạn bớt nửa tin nửa ngờ.",
    "bạn đang ở vị trí không tệ, chỉ cần đi chắc hơn một chút."
  ],
  bright_opening: [
    "cửa sáng đang gõ cửa khá rõ, việc của bạn là đừng tự nghi ngờ quá lâu.",
    "điểm hay là có động lực và có cửa mở cùng lúc, chỉ cần chọn đúng trọng tâm.",
    "vận của bạn đang có tín hiệu bật, nhất là ở thứ bạn đã âm thầm chuẩn bị trước đó.",
    "đây là quẻ có cơ hội rõ hơn mức bạn đang nghĩ.",
    "nếu bạn chịu hành động gọn, kết quả có thể đến nhanh hơn dự kiến.",
    "điểm sáng là bạn không chỉ có vận mà còn có lực để theo nó.",
    "quẻ này mở cửa cho người biết chớp thời điểm.",
    "cơ hội đang tới khá gần, chỉ cần bạn đừng chần chừ thêm.",
    "vận sáng ở chỗ bạn có thể xoay thế chủ động hơn trước.",
    "nếu đi đúng nhịp, quẻ này cho kết quả đẹp hơn tưởng tượng."
  ]
};
  const cautionMap = {
  dark_careful: [
    "đừng quyết trong lúc mệt hoặc thấy cô đơn.",
    "tránh ôm quá nhiều thứ rồi tự kiệt sức.",
    "đừng để nỗi sợ làm bạn bỏ lỡ điều vẫn còn cứu được.",
    "cái làm quẻ xấu đi lúc này không phải vận, mà là sự nóng lòng.",
    "tránh tin hoàn toàn vào cảm xúc khi lòng đang nhiễu.",
    "đừng cố gồng ở tất cả mọi mặt cùng lúc.",
    "thứ dễ làm bạn sai nhịp nhất là vội chứng minh điều gì đó.",
    "đừng thấy mệt mà chọn bừa một hướng cho xong.",
    "tránh đưa ra quyết định lớn khi đầu chưa yên.",
    "điều nguy nhất lúc này là tự làm mình rối thêm."
  ],
  balanced_rising: [
    "đừng để sự nửa tin nửa ngờ làm lỡ mất nhịp đẹp.",
    "tránh làm nhiều hướng cùng lúc vì sẽ khó giữ được lực.",
    "đừng đổi ý liên tục chỉ vì một cảm xúc thoáng qua.",
    "thứ dễ làm quẻ hụt là thiếu nhất quán.",
    "tránh phân tán quá nhiều vào chuyện không còn giá trị chính.",
    "đừng vì chưa thấy kết quả ngay mà quay đầu quá sớm.",
    "điều cần tránh là đứng giữa quá lâu mà không chốt gì cả.",
    "bạn không nên để người khác kéo lệch quyết định của mình quá nhiều.",
    "tránh ôm kỳ vọng quá lớn trong một nhịp quá ngắn.",
    "đừng coi nhẹ những tín hiệu nhỏ đang nhắc bạn chỉnh hướng."
  ],
  bright_opening: [
    "đừng tự tin quá tay rồi quên kiểm tra chi tiết.",
    "đừng thấy cửa mở mà lao hết lực ngay.",
    "quẻ sáng nhưng không ủng hộ chủ quan.",
    "thứ dễ làm hỏng nhịp đẹp này là hấp tấp.",
    "đừng vì đang có vận mà coi nhẹ rủi ro.",
    "tránh quyết quá nhanh chỉ vì thấy mọi thứ đang thuận.",
    "có cửa sáng không có nghĩa là cửa nào cũng nên bước vào.",
    "điều cần tránh là tưởng mình đã chắc thắng.",
    "quẻ này ghét kiểu thắng sớm rồi lơ là.",
    "đừng bỏ qua phần kiểm tra cuối chỉ vì đang quá hứng."
  ]
}; 
 const overview =
  stylePack.overviewIntro +
  normalizeSentence(
    styleSentence(
      pickOne(overviewMap[consistencyTone], seed + "overview"),
      styleTone
    )
  );

const personalitySummary =
  stylePack.personalityIntro +
  normalizeSentence(
    styleSentence(
      pickOne(personalitySummaryTemplates, seed + "personality"),
      styleTone
    )
  );

const topicIntroText =
  pickOne(topicIntros[topic][styleTone], seed + "topicIntro");

const topicReading =
  normalizeSentence(
    styleSentence(topicIntroText, styleTone)
  );

const topicFlavorText = topicPack.topicFlavor;

const opportunity =
  stylePack.opportunityIntro +
  normalizeSentence(
    styleSentence(
      pickOne(opportunitiesMap[consistencyTone], seed + "opportunity"),
      styleTone
    )
  );

const caution =
  stylePack.cautionIntro +
  normalizeSentence(
    styleSentence(
      pickOne(cautionMap[consistencyTone], seed + "caution"),
      styleTone
    )
  );

const adviceText =
  stylePack.adviceIntro +
  normalizeSentence(
    styleSentence(topicExtraAdvice, styleTone)
  );

const closing =
  stylePack.closingIntro +
  normalizeSentence(
    styleSentence(
      pickOne(closingTexts, seed + "closing"),
      styleTone
    )
  );
 const tarotPool = (tarotCards ?? []).filter((c) =>
  c.toneTags.includes(consistencyTone)
);

const tarotSupport = pickMany(
  tarotPool.length > 0 ? tarotPool : (tarotCards ?? []),
  2,
  seed + "tarot"
);

 return {
  overview,
  personalitySummary,
  topicReading,
  topicFlavorText,
  opportunity,
  caution,
  adviceText,
  luckyColors: baseReading.luckyColors,
  luckyNumbers: baseReading.luckyNumbers,
  tarotSupport,
  closing,
  consistencyTone,
  styleTone
};}