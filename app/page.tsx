"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  FeedbackPayload,
  FocusTopic,
  LifeSection,
  PersonalitySummary,
  QuizQuestion,
  Step,
  TarotDraw,
  ToneMode,
  UserForm,
} from "../lib/types";

import { questionBank } from "../lib/content/questionBank";
import { tarotDeck } from "../lib/content/tarotDeck";

import { buildQuizProfile } from "../lib/engine/buildQuizProfile";
import { pickMbtiQuiz } from "../lib/engine/pickMbtiQuiz";

import {
  buildLifeReading,
  getAgeGroup,
  getNguHanh,
  getCanChi,
  getNapAm,
  getLunarBirthText,
  getCanChiMonth,
  getCanChiDay,
  isValidBirthDate,
} from "../lib/engine/buildLifeReading";

import { buildTarotReading } from "../lib/engine/buildTarotReading";
import { buildFinalReading } from "../lib/engine/buildFinalReading";

import {
  canViewToday,
  getDailyViewCount,
  getToneModeByVisit,
  registerView,
  saveUserProfile,
  getUserProfile,
} from "../lib/utils/storage";

/* =========================
   DATA / OPTIONS
========================= */

const TOPIC_OPTIONS: { value: FocusTopic; label: string }[] = [
  { value: "tinh_yeu", label: "❤️ Tình yêu" },
  { value: "gia_dao", label: "🏠 Gia đạo" },
  { value: "kinh_doanh", label: "💼 Kinh doanh" },
  { value: "tai_chinh", label: "💰 Tài chính" },
  { value: "cong_viec", label: "🧠 Công việc" },
  { value: "tong_quan", label: "🔮 Tổng quan" },
];

function getTopicLabel(topic: FocusTopic) {
  return TOPIC_OPTIONS.find((item) => item.value === topic)?.label || topic;
}

function getToneLabel(tone: ToneMode) {
  if (tone === "serious") return "Đạo hữu trầm ổn";
  if (tone === "warm") return "Đạo hữu ấm áp";
  return "Đạo hữu hài hước";
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* =========================
   LEVEL 2 MEMORY INLINE
========================= */

type UserMemory = {
  fullName: string;
  phone: string;
  birthDate: string;
  visitCount: number;
  lastVisit: string;
};

const MEMORY_PREFIX = "boiAI_memory_";

function saveMemory(data: UserMemory) {
  if (typeof window === "undefined") return;
  const key = `${MEMORY_PREFIX}${data.phone}_${data.birthDate}`;
  localStorage.setItem(key, JSON.stringify(data));
}

function getMemory(phone: string, birthDate: string): UserMemory | null {
  if (typeof window === "undefined") return null;
  const key = `${MEMORY_PREFIX}${phone}_${birthDate}`;
  const raw = localStorage.getItem(key);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as UserMemory;
  } catch {
    return null;
  }
}

/* =========================
   LEVEL 5 GREETING / TRANSITION INLINE
========================= */

function getGreeting(memory: UserMemory | null, tone: ToneMode, name: string) {
  if (!memory) {
    const serious = [
      `Chào đạo hữu ${name}. Hôm nay ta soi từ gốc trước, rồi mới nói phần sâu hơn.`,
      `Lần đầu gặp đạo hữu ${name}, ta xem nền trước để lời sau không bị lệch.`,
    ];
    const warm = [
      `Chào đạo hữu ${name}, hôm nay mình cùng soi nhẹ một quẻ cho rõ hơn nhé.`,
      `Đạo hữu ${name} cứ bình tĩnh, mình đi từng bước cho dễ thấm nha.`,
    ];
    const funny = [
      `Chào đạo hữu ${name}, hôm nay soi nhẹ thôi mà biết đâu trúng hơi mạnh 😄`,
      `Lần đầu gặp đạo hữu ${name}, mong lát nữa đừng kiểu “ủa sao giống mình vậy” 😄`,
    ];

    if (tone === "serious") return pick(serious);
    if (tone === "warm") return pick(warm);
    return pick(funny);
  }

  if (memory.visitCount === 2) {
    const serious = [
      `Đạo hữu ${memory.fullName} đã quay lại. Có vẻ vẫn còn điều cần soi rõ hơn.`,
      `Đạo hữu ${memory.fullName} lại trở lại. Chuyện này xem ra chưa dễ buông.`,
    ];
    const warm = [
      `Lại gặp đạo hữu ${memory.fullName} rồi, mình xem tiếp cho rõ hơn nhé.`,
      `Đạo hữu ${memory.fullName} quay lại rồi, chắc trong lòng vẫn còn chút lăn tăn.`,
    ];
    const funny = [
      `Lại quay lại rồi đó ${memory.fullName} 😄`,
      `Ta biết mà, kiểu gì đạo hữu ${memory.fullName} cũng quay lại đọc tiếp 😄`,
    ];

    if (tone === "serious") return pick(serious);
    if (tone === "warm") return pick(warm);
    return pick(funny);
  }

  if (memory.visitCount >= 3) {
    const serious = [
      `Hôm nay đạo hữu ${memory.fullName} đã xem khá nhiều. Có vẻ chuyện này chưa dễ yên.`,
      `Đạo hữu ${memory.fullName} quay lại nhiều lần. Ta đoán bạn đang cần một câu trả lời chắc hơn.`,
    ];
    const warm = [
      `Đạo hữu ${memory.fullName} quay lại mấy lần rồi, chắc trong lòng còn nhiều điều chưa yên.`,
      `Mình thấy đạo hữu ${memory.fullName} đang thật sự muốn soi rõ chuyện này hơn.`,
    ];
    const funny = [
      `Hôm nay đạo hữu ${memory.fullName} soi hơi nhiều rồi nha 😄`,
      `Xem nữa là thành nghiện app đó ${memory.fullName} 😄`,
    ];

    if (tone === "serious") return pick(serious);
    if (tone === "warm") return pick(warm);
    return pick(funny);
  }

  return `Chào lại đạo hữu ${memory.fullName}.`;
}

function getTransitionLine(stepKey: "life" | "quiz" | "tarotTopics" | "tarotDraw" | "final", tone: ToneMode) {
  const map = {
    life: {
      serious: [
        "Ta soi cái gốc trước. Gốc rõ thì phần sau mới đáng tin.",
        "Nền đã mở ra rồi. Giờ nhìn từ gốc mà đi tiếp.",
      ],
      warm: [
        "Mình xem phần nền trước nhé, để những đoạn sau khớp nhau hơn.",
        "Soi từ gốc trước cho chắc, rồi mình mới đi sâu hơn.",
      ],
      funny: [
        "Được rồi đạo hữu, soi cái gốc trước đã. Gốc mà lệch là dễ quay như chong chóng 😄",
        "Ta xem phần nền trước nha, chứ nhảy vào sâu liền dễ loạn quẻ lắm 😄",
      ],
    },
    quiz: {
      serious: [
        "Nền đã có. Giờ chuyển sang khí chất và cách phản ứng.",
        "Bước tiếp theo là nhìn rõ phần tính cách.",
      ],
      warm: [
        "Mình có nền rồi, giờ xem sâu hơn một chút về khí chất nhé.",
        "Giờ tới phần tính cách, để bức tranh rõ hơn.",
      ],
      funny: [
        "Nền đã thấy rồi. Giờ hỏi vài câu xem đạo hữu mạnh ở đâu, mềm ở đâu 😄",
        "Giờ tới đoạn dễ lộ bản chất hơn đó đạo hữu 😄",
      ],
    },
    tarotTopics: {
      serious: [
        "Tính cách đã mở ra. Giờ chọn đúng những cửa cần soi.",
        "Đã có khí chất, giờ đến lúc chọn hướng cần nhìn sâu.",
      ],
      warm: [
        "Mình đã có phần tính cách rồi, giờ chọn 3 cửa mà bạn muốn soi kỹ nhất nhé.",
        "Giờ mình chọn 3 chủ đề quan trọng nhất cho bạn nha.",
      ],
      funny: [
        "Khá lắm đạo hữu, giờ chọn đúng 3 cửa quan trọng nhất nha 😄",
        "Tới khúc chọn cửa rồi. Chọn kỹ nha đạo hữu, đừng chọn kiểu cảm hứng phút chót 😄",
      ],
    },
    tarotDraw: {
      serious: [
        "Ba cửa đã chọn xong. Giờ để biểu tượng lên tiếng.",
        "Chủ đề đã rõ. Giờ đến phần trực giác và hình tượng.",
      ],
      warm: [
        "Ba hướng đã chọn xong rồi, mình cùng lật bài nhé.",
        "Giờ tarot sẽ soi thêm một góc sâu hơn cho bạn.",
      ],
      funny: [
        "Chọn xong rồi đạo hữu. Giờ lật bài thôi, mong hôm nay bài hiền 😄",
        "Tới lúc rút bài rồi đạo hữu. Nếu lá nào nói thật quá thì cũng đừng lườm ta 😄",
      ],
    },
    final: {
      serious: [
        "Đủ dữ liệu rồi. Giờ ta ghép lại thành kết luận.",
        "Phần tổng hợp bắt đầu từ đây.",
      ],
      warm: [
        "Đủ mảnh ghép rồi, giờ mình ráp lại cho rõ hơn nhé.",
        "Mình đã có đủ dữ liệu rồi, giờ đến phần kết cho bạn.",
      ],
      funny: [
        "Đủ dữ liệu rồi đạo hữu. Giờ ta ráp lại thành bức tranh khá trúng 😄",
        "Tới đoạn ghép quẻ rồi đạo hữu. Có câu nào nhột thì cứ thở nhẹ rồi đọc tiếp 😄",
      ],
    },
  };

  return pick(map[stepKey][tone]);
}

/* =========================
   COMPONENT
========================= */

export default function Page() {
  const [step, setStep] = useState<Step>("form");
  const [transitioning, setTransitioning] = useState(false);
  const [transitionText, setTransitionText] = useState("");
  const [greeting, setGreeting] = useState("");

  const [form, setForm] = useState<UserForm>({
    fullName: "",
    birthDate: "",
    phone: "",
    job: "",
    gender: "",
    mainFocus: "tong_quan",
  });

  const [dailyVisitCount, setDailyVisitCount] = useState(0);
  const [tone, setTone] = useState<ToneMode>("serious");
  const [blockMessage, setBlockMessage] = useState("");
  const [profileLoadedMessage, setProfileLoadedMessage] = useState("");

  const [lifeSections, setLifeSections] = useState<LifeSection[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [personalityReady, setPersonalityReady] = useState(false);

  const [selectedTopics, setSelectedTopics] = useState<FocusTopic[]>([]);
  const [tarotDraws, setTarotDraws] = useState<TarotDraw[]>([]);
  const [openedCards, setOpenedCards] = useState<number[]>([]);

  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(5);
  const [sendingFeedback, setSendingFeedback] = useState(false);
  const [feedbackStatus, setFeedbackStatus] = useState("");

  const personality: PersonalitySummary = useMemo(() => {
    return buildQuizProfile(answers as any, tone);
  }, [answers, tone]);

  const finalReading = useMemo(() => {
    if (!personalityReady || tarotDraws.length !== 3) return "";
    return buildFinalReading({
      user: form,
      tone,
      dailyVisitCount,
      lifeSections,
      personality,
      tarotDraws,
    });
  }, [personalityReady, tarotDraws, form, tone, dailyVisitCount, lifeSections, personality]);

  const lunarBirthText = form.birthDate ? getLunarBirthText(form.birthDate) : "";
  const canChiYear = form.birthDate ? getCanChi(form.birthDate) : "";
  const canChiMonth = form.birthDate ? getCanChiMonth(form.birthDate) : "";
  const canChiDay = form.birthDate ? getCanChiDay(form.birthDate) : "";
  const napAm = form.birthDate ? getNapAm(form.birthDate) : "";
  const nguHanh = form.birthDate ? getNguHanh(form.birthDate) : "";
  const ageGroup = form.birthDate ? getAgeGroup(form.birthDate) : "";

  function gotoStep(next: Step, text?: string) {
    if (text) setTransitionText(text);
    setTransitioning(true);

    setTimeout(() => {
      setStep(next);
      setTransitioning(false);
    }, 320);

    if (text) {
      setTimeout(() => {
        setTransitionText("");
      }, 2200);
    }
  }

  function toggleTopic(topic: FocusTopic) {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics((prev) => prev.filter((item) => item !== topic));
      return;
    }

    if (selectedTopics.length >= 3) return;

    setSelectedTopics((prev) => [...prev, topic]);
  }

  function handleLoadSavedProfile() {
    const phone = form.phone.trim();
    const birthDate = form.birthDate.trim();

    if (!phone || !birthDate) {
      alert("Nhập số điện thoại và ngày sinh trước để tìm hồ sơ đã lưu.");
      return;
    }

    const saved = getUserProfile(phone, birthDate);

    if (!saved) {
      setProfileLoadedMessage("Chưa tìm thấy hồ sơ cũ cho số điện thoại + ngày sinh này.");
      return;
    }

    setForm({
      fullName: saved.fullName || "",
      birthDate: saved.birthDate || "",
      phone: saved.phone || "",
      job: saved.job || "",
      gender: saved.gender || "",
      mainFocus: saved.mainFocus || "tong_quan",
    });

    setProfileLoadedMessage("Đã nạp lại hồ sơ đã lưu của người xem.");
  }

  function handleStartReading() {
    const fullName = form.fullName.trim();
    const birthDate = form.birthDate.trim();
    const phone = form.phone.trim();
    const job = form.job.trim();

    if (!fullName || !birthDate || !phone || !job) {
      alert("Vui lòng nhập đầy đủ họ tên, ngày sinh, số điện thoại và nghề nghiệp.");
      return;
    }

    if (!isValidBirthDate(birthDate)) {
      alert("Ngày sinh phải đúng dạng dd/mm/yyyy.");
      return;
    }

    if (!canViewToday(phone, birthDate, 3)) {
      const current = getDailyViewCount(phone, birthDate);
      setBlockMessage(
        current >= 3
          ? "Hôm nay đạo hữu đã xem đủ 3 lần rồi nha. Để mai xem tiếp cho đỡ lệch nhịp 😄"
          : "Đạo hữu đang xem hơi nhiều đó nha 😏"
      );
      return;
    }

    const existingMemory = getMemory(phone, birthDate);

    const count = registerView(phone, birthDate);
    const toneMode = getToneModeByVisit(count);

    saveMemory({
      fullName,
      phone,
      birthDate,
      visitCount: count,
      lastVisit: new Date().toISOString(),
    });

    setGreeting(getGreeting(existingMemory, toneMode, fullName));
    setDailyVisitCount(count);
    setTone(toneMode);
    setBlockMessage("");
    setProfileLoadedMessage("");
    setFeedback("");
    setFeedbackStatus("");

    saveUserProfile(phone, birthDate, {
      ...form,
      lastViewedAt: new Date().toISOString(),
      dailyVisitCount: count,
    });

    const builtLife = buildLifeReading(form, toneMode);
    setLifeSections(builtLife);

    gotoStep("life", getTransitionLine("life", toneMode));
  }

  function handleContinueToQuiz() {
    const picked = pickMbtiQuiz(questionBank, 3);
    setQuizQuestions(picked);
    setAnswers([]);
    setQuizIndex(0);
    setPersonalityReady(false);
    setSelectedTopics([]);
    setTarotDraws([]);
    setOpenedCards([]);
    gotoStep("quiz", getTransitionLine("quiz", tone));
  }

  function handleAnswer(letter: string) {
    const newAnswers = [...answers, letter];
    setAnswers(newAnswers);

    if (quizIndex + 1 >= quizQuestions.length) {
      setPersonalityReady(true);
      gotoStep("tarotTopics", getTransitionLine("tarotTopics", tone));
      return;
    }

    setQuizIndex((prev) => prev + 1);
  }

  function handleGoTarotDraw() {
    if (selectedTopics.length !== 3) {
      alert("Vui lòng chọn đúng 3 chủ đề.");
      return;
    }

    gotoStep("tarotDraw", getTransitionLine("tarotDraw", tone));
  }

  function handleDrawCards() {
    const deckCopy = [...tarotDeck];

    const draws = selectedTopics.map((topic) => {
      const index = Math.floor(Math.random() * deckCopy.length);
      const card = deckCopy.splice(index, 1)[0];
      const mode = Math.random() > 0.5 ? "upright" : "reverse";

      const reading = buildTarotReading(topic, card, mode, tone, form.birthDate, nguHanh);

      return {
        topic,
        card,
        mode,
        reading,
      };
    });

    setTarotDraws(draws as TarotDraw[]);
    setOpenedCards([]);
    gotoStep("final", getTransitionLine("final", tone));
  }

  async function handleSubmitFeedback(e: FormEvent) {
    e.preventDefault();

    if (!feedback.trim()) {
      alert("Bạn hãy nhập cảm nhận hoặc góp ý trước khi gửi.");
      return;
    }

    const payload: FeedbackPayload = {
      fullName: form.fullName,
      phone: form.phone,
      mbtiType: personality?.typeCode || "-",
      feedback: feedback.trim(),
      rating,
    };

    try {
      setSendingFeedback(true);
      setFeedbackStatus("");

      const res = await fetch("/api/telegram-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setFeedbackStatus(data?.error || "Gửi feedback thất bại.");
        return;
      }

      setFeedbackStatus("Đã gửi feedback qua Telegram thành công.");
      setFeedback("");
      setRating(5);
    } catch (error) {
      setFeedbackStatus("Có lỗi khi gửi feedback. Kiểm tra lại API Telegram.");
    } finally {
      setSendingFeedback(false);
    }
  }

  function resetAll() {
    setStep("form");
    setLifeSections([]);
    setQuizQuestions([]);
    setAnswers([]);
    setQuizIndex(0);
    setPersonalityReady(false);
    setSelectedTopics([]);
    setTarotDraws([]);
    setOpenedCards([]);
    setBlockMessage("");
    setProfileLoadedMessage("");
    setFeedback("");
    setFeedbackStatus("");
    setTransitionText("");
  }

  return (
    <main className="page-shell">
      <div className="container">
        {greeting && (
          <div className="dao-transition">
            <p>{greeting}</p>
          </div>
        )}

        {transitionText && (
          <div className="dao-transition">
            <p>{transitionText}</p>
          </div>
        )}

        <div className={transitioning ? "fade-out" : "fade-in"}>
          <div className="hero">
            <p className="eyebrow">APP BÓI AI · FLOW LV5</p>

            <h1 className="title">Tử vi nền trước, khí chất hiện ra, rồi mới để tarot chốt nhịp</h1>

            <p className="subtitle">
              Bản này không chỉ xem cho vui. Nó soi cái gốc, nhìn khí chất, đọc cách chọn,
              đoán trạng thái, rồi ghép lại để đạo hữu thấy mình đang mạnh ở đâu, lệch ở đâu,
              và nên giữ trục nào cho đời đỡ rối hơn.
            </p>

            <div className="stepbar">
              <span className={step === "form" ? "active" : ""}>1. Thông tin</span>
              <span className={step === "life" ? "active" : ""}>2. Tử vi nền</span>
              <span className={step === "quiz" ? "active" : ""}>3. MBTI-like</span>
              <span className={step === "tarotTopics" || step === "tarotDraw" ? "active" : ""}>
                4. Tarot 3 lá
              </span>
              <span className={step === "final" ? "active" : ""}>5. Tổng kết</span>
            </div>
          </div>

          {blockMessage && (
            <section className="card warning-card">
              <h2>⛔ Tạm dừng xem</h2>
              <p>{blockMessage}</p>
            </section>
          )}

          {step === "form" && (
            <section className="card">
              <h2>📝 Thông tin của đạo hữu</h2>
              <p className="muted">
                Điền vài dòng cơ bản để ta soi đúng nhịp hơn cho đạo hữu. Mỗi người xem tối đa{" "}
                <strong>3 lần/ngày</strong>.
              </p>

              <div className="grid">
                <label>
                  <span>Họ và tên</span>
                  <input
                    value={form.fullName}
                    onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
                    placeholder="Ví dụ: Nguyễn Văn A"
                  />
                </label>

                <label>
                  <span>Ngày sinh (dd/mm/yyyy)</span>
                  <input
                    value={form.birthDate}
                    onChange={(e) => setForm((prev) => ({ ...prev, birthDate: e.target.value }))}
                    placeholder="15/08/1992"
                  />
                </label>

                <label>
                  <span>Số điện thoại</span>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="09xxxxxxxx"
                  />
                </label>

                <label>
                  <span>Nghề nghiệp</span>
                  <input
                    value={form.job}
                    onChange={(e) => setForm((prev) => ({ ...prev, job: e.target.value }))}
                    placeholder="Kinh doanh, kỹ thuật, văn phòng..."
                  />
                </label>

                <label>
                  <span>Giới tính (tuỳ chọn)</span>
                  <input
                    value={form.gender}
                    onChange={(e) => setForm((prev) => ({ ...prev, gender: e.target.value }))}
                    placeholder="Nam / Nữ / Khác"
                  />
                </label>

                <label>
                  <span>Chủ đề muốn soi kỹ</span>
                  <select
                    value={form.mainFocus}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, mainFocus: e.target.value as FocusTopic }))
                    }
                  >
                    {TOPIC_OPTIONS.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 18 }}>
                <button className="secondary-btn" type="button" onClick={handleLoadSavedProfile}>
                  📂 Nạp hồ sơ đã lưu
                </button>

                <button className="primary-btn" type="button" onClick={handleStartReading}>
                  🔮 Xem tử vi nền
                </button>
              </div>

              {profileLoadedMessage && (
                <p className="muted" style={{ marginTop: 16 }}>
                  {profileLoadedMessage}
                </p>
              )}
            </section>
          )}

          {step === "life" && (
            <section className="card">
              <h2>🔮 Tử vi nền của đạo hữu</h2>
              <p className="muted">
                Soi nền trước đã đạo hữu. Gốc rõ thì những phần sau mới không nói kiểu mỗi nơi một quẻ 😄
              </p>

              <div className="info-grid">
                <div>
                  👤 Người xem: <strong>{form.fullName}</strong>
                </div>
                <div>
                  🗓️ Ngày sinh dương: <strong>{form.birthDate}</strong>
                </div>
                <div>
                  🌙 Ngày sinh âm: <strong>{lunarBirthText}</strong>
                </div>
                <div>
                  📱 SĐT: <strong>{form.phone}</strong>
                </div>
                <div>
                  💼 Nghề nghiệp: <strong>{form.job}</strong>
                </div>
                <div>
                  🧭 Nhóm tuổi: <strong>{ageGroup}</strong>
                </div>
                <div>
                  🧿 Can chi năm: <strong>{canChiYear}</strong>
                </div>
                <div>
                  📜 Can chi tháng: <strong>{canChiMonth}</strong>
                </div>
                <div>
                  🪶 Can chi ngày: <strong>{canChiDay}</strong>
                </div>
                <div>
                  🔥 Nạp âm: <strong>{napAm}</strong>
                </div>
                <div>
                  🌿 Ngũ hành: <strong>{nguHanh}</strong>
                </div>
                <div>
                  🎯 Trọng tâm: <strong>{getTopicLabel(form.mainFocus)}</strong>
                </div>
                <div>
                  🎭 Văn phong lần này: <strong>{getToneLabel(tone)}</strong>
                </div>
                <div>
                  📌 Lượt hôm nay: <strong>{dailyVisitCount}/3</strong>
                </div>
              </div>

              {lifeSections.map((section, index) => (
                <div className="section-block" key={index}>
                  <h3>{section.title}</h3>
                  <ul>
                    {section.content.map((line, idx) => (
                      <li key={idx}>{line}</li>
                    ))}
                  </ul>
                </div>
              ))}

              <div style={{ marginTop: 18 }}>
                <button className="primary-btn" onClick={handleContinueToQuiz}>
                  👉 Tiếp tục làm MBTI-like pro
                </button>
              </div>
            </section>
          )}

          {step === "quiz" && quizQuestions.length > 0 && (
            <section className="card">
              <h2>🧠 MBTI-like của đạo hữu</h2>
              <p className="muted">
                Hỏi ngắn thôi, nhưng đủ để lộ khí chất, kiểu phản ứng và vài chỗ đạo hữu hay tự làm khó mình 😄
              </p>
              <p className="muted">
                Câu {quizIndex + 1}/{quizQuestions.length} · Trục {quizQuestions[quizIndex].axis}
              </p>

              <div className="question-box">
                <h3>{quizQuestions[quizIndex].question}</h3>

                <div className="options">
                  {quizQuestions[quizIndex].options.map((option, idx) => (
                    <button
                      key={idx}
                      className="option-btn"
                      onClick={() => handleAnswer((option as any).letter)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </section>
          )}

          {step === "tarotTopics" && personalityReady && (
            <section className="card">
              <h2>🃏 Chọn 3 chủ đề cho đạo hữu</h2>
              <p className="muted">
                MBTI-like đã xong. Giờ chọn đúng 3 cửa mà đạo hữu muốn soi sâu nhất.
              </p>

              <div className="section-block">
                <h3>🧬 Profile của đạo hữu: {personality.typeCode}</h3>
                <p>
                  <strong>{personality.title}</strong>
                </p>
                <p>{personality.subtitle}</p>
                <p>{personality.description}</p>
              </div>

              <div className="topic-grid">
                {TOPIC_OPTIONS.map((item) => {
                  const active = selectedTopics.includes(item.value);
                  return (
                    <button
                      key={item.value}
                      className={`topic-btn ${active ? "topic-active" : ""}`}
                      onClick={() => toggleTopic(item.value)}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>

              <p className="muted">Đã chọn: {selectedTopics.length}/3</p>

              <button className="primary-btn" onClick={handleGoTarotDraw}>
                👉 Sang bước rút 3 lá
              </button>
            </section>
          )}

          {step === "tarotDraw" && (
            <section className="card">
              <h2>🃏 Tarot 3 lá</h2>
              <p className="muted">
                Chọn kỹ nha đạo hữu. Mỗi lá mở ra một góc, chứ bài không có trách nhiệm đỡ hộ những pha chọn bừa đâu 😄
              </p>
              <p className="muted">
                Bạn đã chọn: {selectedTopics.map((item) => getTopicLabel(item)).join(" · ")}
              </p>

              <div className="section-block">
                <h3>Ba cửa cần soi</h3>
                <ul>
                  {selectedTopics.map((topic, idx) => (
                    <li key={idx}>{getTopicLabel(topic)}</li>
                  ))}
                </ul>
              </div>

              <div className="section-block">
                <p>
                  Tử vi nền đã có, profile MBTI-like đã có. Giờ tarot sẽ làm phần kết luận có chiều sâu hơn.
                </p>
              </div>

              <button className="primary-btn" onClick={handleDrawCards}>
                ✨ Rút 3 lá ngay
              </button>
            </section>
          )}

          {step === "final" && tarotDraws.length === 3 && (
            <section className="card">
              <h2>✨ Tổng kết cho đạo hữu</h2>

              <div className="section-block">
                <h3>Chân dung MBTI-like nổi bật</h3>
                <p>
                  <strong>{personality.typeCode}</strong> · <strong>{personality.title}</strong>
                </p>
                <p>{personality.subtitle}</p>
                <p>{personality.description}</p>

                <div className="two-col-list">
                  <div>
                    <h4>Điểm mạnh</h4>
                    <ul>
                      {personality.strengths.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4>Điểm cần giữ</h4>
                    <ul>
                      {personality.cautions.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="two-col-list" style={{ marginTop: 16 }}>
                  <div>
                    <h4>Phong cách làm việc</h4>
                    <ul>
                      {personality.workStyle.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4>Phong cách tình cảm</h4>
                    <ul>
                      {personality.loveStyle.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="section-block" style={{ marginTop: 16 }}>
                  <h4>Hướng phát triển</h4>
                  <ul>
                    {personality.growthAdvice.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="section-block">
                <h3>📊 Tỷ lệ thiên hướng</h3>
                <div className="info-grid">
                  <div>
                    E: <strong>{personality.scorePercent.E}%</strong>
                  </div>
                  <div>
                    I: <strong>{personality.scorePercent.I}%</strong>
                  </div>
                  <div>
                    S: <strong>{personality.scorePercent.S}%</strong>
                  </div>
                  <div>
                    N: <strong>{personality.scorePercent.N}%</strong>
                  </div>
                  <div>
                    T: <strong>{personality.scorePercent.T}%</strong>
                  </div>
                  <div>
                    F: <strong>{personality.scorePercent.F}%</strong>
                  </div>
                  <div>
                    J: <strong>{personality.scorePercent.J}%</strong>
                  </div>
                  <div>
                    P: <strong>{personality.scorePercent.P}%</strong>
                  </div>
                </div>
              </div>

              <div className="tarot-grid">
                {tarotDraws.map((draw, idx) => {
                  const opened = openedCards.includes(idx);

                  return (
                    <button
                      type="button"
                      key={idx}
                      className={`tarot-card tarot-flip ${opened ? "is-open" : ""}`}
                      onClick={() => {
                        setOpenedCards((prev) =>
                          prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
                        );
                      }}
                    >
                      <div className="tarot-inner">
                        <div className="tarot-face tarot-back">
                          <div className="tarot-back-content">
                            <div className="tarot-back-icon">🃏</div>
                            <div className="tarot-hidden-title">Lá bài {idx + 1}</div>
                            <div className="tarot-hidden-topic">{getTopicLabel(draw.topic)}</div>
                            <div className="tarot-hidden-sub">Chạm để lật bài</div>
                          </div>
                        </div>

                        <div className="tarot-face tarot-front">
                          <div className="tarot-badge">{getTopicLabel(draw.topic)}</div>
                          <h3 className="tarot-name">{draw.card.name}</h3>
                          <p className="muted tarot-mode">
                            {draw.mode === "upright" ? "Thuận" : "Ngược"}
                          </p>

                          <p className="tarot-reading">
                            {draw.reading.split(". ").slice(0, 2).join(". ")}
                          </p>

                          <p className="tarot-tap-hint">Chạm để úp lại</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="section-block">
                <h3>🔍 Lời kết dành cho đạo hữu</h3>
                <p className="muted">
                  Đọc chậm thôi đạo hữu. Có câu nào trúng tim thì gật nhẹ, có câu nào hơi nhột thì cứ xem như vũ trụ nhắc khéo 😄
                </p>
                <p style={{ whiteSpace: "pre-line" }}>{finalReading}</p>
              </div>

              <div className="card" style={{ marginTop: 20 }}>
                <h2>📩 Đạo hữu thấy quẻ này ổn không?</h2>
                <p className="muted">
                  Nếu thấy đúng, hay, hoặc còn chỗ nào cần nâng cấp, đạo hữu nhắn lại một câu để ta còn luyện công tiếp 😄
                </p>

                <form onSubmit={handleSubmitFeedback}>
                  <div className="grid">
                    <label>
                      <span>Đánh giá</span>
                      <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                        <option value={5}>5 sao</option>
                        <option value={4}>4 sao</option>
                        <option value={3}>3 sao</option>
                        <option value={2}>2 sao</option>
                        <option value={1}>1 sao</option>
                      </select>
                    </label>

                    <label>
                      <span>MBTI-like của bạn</span>
                      <input value={personality.typeCode} readOnly />
                    </label>

                    <label style={{ gridColumn: "1 / -1" }}>
                      <span>Ý kiến / cảm nhận</span>
                      <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Ví dụ: bài đọc khá đúng, muốn thêm phần tình duyên sâu hơn..."
                        rows={5}
                        style={{ resize: "vertical" }}
                      />
                    </label>
                  </div>

                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 18 }}>
                    <button className="primary-btn" type="submit" disabled={sendingFeedback}>
                      {sendingFeedback ? "Đang gửi..." : "📨 Gửi feedback qua Telegram"}
                    </button>

                    <button className="secondary-btn" type="button" onClick={resetAll}>
                      🔄 Xem lại từ đầu
                    </button>
                  </div>
                </form>

                {feedbackStatus && (
                  <p className="muted" style={{ marginTop: 16 }}>
                    {feedbackStatus}
                  </p>
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}