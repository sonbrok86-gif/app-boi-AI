"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  FeedbackPayload,
  FocusTopic,
  LifeSection,
  PersonalitySummary,
  QuizQuestion,
  Step,
  TarotCard,
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
  if (tone === "serious") return "Sâu & nghiêm túc";
  if (tone === "warm") return "Mềm & đời thường";
  return "Hài hước nhẹ";
}

export default function Page() {
  const [step, setStep] = useState<Step>("form");

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
  }, [
    personalityReady,
    tarotDraws,
    form,
    tone,
    dailyVisitCount,
    lifeSections,
    personality,
  ]);

  const lunarBirthText = form.birthDate ? getLunarBirthText(form.birthDate) : "";
  const canChiYear = form.birthDate ? getCanChi(form.birthDate) : "";
  const canChiMonth = form.birthDate ? getCanChiMonth(form.birthDate) : "";
  const canChiDay = form.birthDate ? getCanChiDay(form.birthDate) : "";
  const napAm = form.birthDate ? getNapAm(form.birthDate) : "";
  const nguHanh = form.birthDate ? getNguHanh(form.birthDate) : "";
  const ageGroup = form.birthDate ? getAgeGroup(form.birthDate) : "";

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
          ? "Hôm nay bạn đã xem đủ 3 lần rồi nha. Để mai xem tiếp cho đỡ 'lệch vận' 😌"
          : "Bạn đang xem hơi nhiều đó nha 😏"
      );
      return;
    }

    const count = registerView(phone, birthDate);
    const toneMode = getToneModeByVisit(count);

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
    setStep("life");
  }

  function handleContinueToQuiz() {
    const picked = pickMbtiQuiz(questionBank, 3);
    setQuizQuestions(picked);
    setAnswers([]);
    setQuizIndex(0);
    setPersonalityReady(false);
    setSelectedTopics([]);
    setTarotDraws([]);
    setStep("quiz");
  }

  function handleAnswer(letter: string) {
    const newAnswers = [...answers, letter];
    setAnswers(newAnswers);

    if (quizIndex + 1 >= quizQuestions.length) {
      setPersonalityReady(true);
      setStep("tarotTopics");
      return;
    }

    setQuizIndex((prev) => prev + 1);
  }

  function toggleTopic(topic: FocusTopic) {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics((prev) => prev.filter((item) => item !== topic));
      return;
    }

    if (selectedTopics.length >= 3) return;
    setSelectedTopics((prev) => [...prev, topic]);
  }

  function handleGoTarotDraw() {
    if (selectedTopics.length !== 3) {
      alert("Vui lòng chọn đúng 3 chủ đề.");
      return;
    }
    setStep("tarotDraw");
  }

  function handleDrawCards() {
    const deckCopy = [...tarotDeck];
    const draws: TarotDraw[] = selectedTopics.map((topic) => {
      const index = Math.floor(Math.random() * deckCopy.length);
      const card = deckCopy.splice(index, 1)[0] as TarotCard;
      const mode = Math.random() > 0.5 ? "upright" : "reverse";
      const reading = buildTarotReading(topic, card, mode, tone);

      return {
        topic,
        card,
        mode,
        reading,
      };
    });

    setTarotDraws(draws);
    setStep("final");
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
    setBlockMessage("");
    setFeedback("");
    setFeedbackStatus("");
  }

  return (
    <main className="page-shell">
      <div className="container">
        <div className="hero">
          <p className="eyebrow">APP BÓI AI · FLOW FINAL V3 MBTI PRO</p>
          <h1 className="title">Tử vi nền trước, MBTI-like pro sau, tarot 3 lá cuối cùng</h1>
          <p className="subtitle">
            Bản nâng cấp này đi sâu hơn vào khí chất, kiểu nhận thức, cách yêu,
            cách làm việc và nhịp phát triển của người xem.
          </p>

          <div className="stepbar">
            <span className={step === "form" ? "active" : ""}>1. Thông tin</span>
            <span className={step === "life" ? "active" : ""}>2. Tử vi nền</span>
            <span className={step === "quiz" ? "active" : ""}>3. MBTI-like</span>
            <span
              className={step === "tarotTopics" || step === "tarotDraw" ? "active" : ""}
            >
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
            <h2>📝 Thông tin người xem</h2>
            <p className="muted">
              Mỗi người xem tối đa <strong>3 lần/ngày</strong>. Hồ sơ sẽ được lưu lại theo
              số điện thoại + ngày sinh để lần sau nạp nhanh hơn.
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
            <h2>🔮 Tử vi nền của bạn</h2>
            <p className="muted">
              Bản đọc nền này đi theo khí vận, lịch âm, can chi, nạp âm và khuynh hướng nổi bật.
            </p>

            <div className="info-grid">
              <div>👤 Người xem: <strong>{form.fullName}</strong></div>
              <div>🗓️ Ngày sinh dương: <strong>{form.birthDate}</strong></div>
              <div>🌙 Ngày sinh âm: <strong>{lunarBirthText}</strong></div>
              <div>📱 SĐT: <strong>{form.phone}</strong></div>
              <div>💼 Nghề nghiệp: <strong>{form.job}</strong></div>
              <div>🧭 Nhóm tuổi: <strong>{ageGroup}</strong></div>
              <div>🧿 Can chi năm: <strong>{canChiYear}</strong></div>
              <div>📜 Can chi tháng: <strong>{canChiMonth}</strong></div>
              <div>🪶 Can chi ngày: <strong>{canChiDay}</strong></div>
              <div>🔥 Nạp âm: <strong>{napAm}</strong></div>
              <div>🌿 Ngũ hành: <strong>{nguHanh}</strong></div>
              <div>🎯 Trọng tâm: <strong>{getTopicLabel(form.mainFocus)}</strong></div>
              <div>🎭 Văn phong lần này: <strong>{getToneLabel(tone)}</strong></div>
              <div>📌 Lượt hôm nay: <strong>{dailyVisitCount}/3</strong></div>
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

            <button className="primary-btn" onClick={handleContinueToQuiz}>
              👉 Tiếp tục làm MBTI-like pro
            </button>
          </section>
        )}

        {step === "quiz" && quizQuestions.length > 0 && (
          <section className="card">
            <h2>🧠 MBTI-like Pro</h2>
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
            <h2>🃏 Chọn 3 chủ đề cho tarot</h2>
            <p className="muted">
              MBTI-like đã xong. Giờ chọn 3 chủ đề để tarot soi sâu từng mặt.
            </p>

            <div className="section-block">
              <h3>🧬 Profile của bạn: {personality.typeCode}</h3>
              <p><strong>{personality.title}</strong></p>
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
            <h2>✨ Tổng kết cuối cùng</h2>

            <div className="section-block">
              <h3>Chân dung MBTI-like nổi bật</h3>
              <p><strong>{personality.typeCode}</strong> · <strong>{personality.title}</strong></p>
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
                <div>E: <strong>{personality.scorePercent.E}%</strong></div>
                <div>I: <strong>{personality.scorePercent.I}%</strong></div>
                <div>S: <strong>{personality.scorePercent.S}%</strong></div>
                <div>N: <strong>{personality.scorePercent.N}%</strong></div>
                <div>T: <strong>{personality.scorePercent.T}%</strong></div>
                <div>F: <strong>{personality.scorePercent.F}%</strong></div>
                <div>J: <strong>{personality.scorePercent.J}%</strong></div>
                <div>P: <strong>{personality.scorePercent.P}%</strong></div>
              </div>
            </div>

            <div className="tarot-grid">
              {tarotDraws.map((draw, idx) => (
                <div className="tarot-card" key={idx}>
                  <div className="tarot-badge">{getTopicLabel(draw.topic)}</div>
                  <h3>{draw.card.name}</h3>
                  <p className="muted">{draw.mode === "upright" ? "Thuận" : "Ngược"}</p>
                  <p>{draw.reading}</p>
                </div>
              ))}
            </div>

            <div className="section-block">
              <h3>🔍 Bài đọc tổng hợp</h3>
              <p style={{ whiteSpace: "pre-line" }}>{finalReading}</p>
            </div>

            <div className="card" style={{ marginTop: 20 }}>
              <h2>📩 Gửi cảm nhận / góp ý</h2>
              <p className="muted">
                Phần này sẽ gửi về Telegram của bạn để theo dõi phản hồi người dùng.
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
                      style={{
                        width: "100%",
                        padding: "14px 16px",
                        borderRadius: 14,
                        border: "1px solid #334155",
                        background: "#0f172a",
                        color: "white",
                        fontSize: 16,
                        resize: "vertical",
                      }}
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
    </main>
  );
}