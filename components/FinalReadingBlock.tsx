"use client";

import {
  FinalReading,
  LifeSection,
  PersonalitySummary,
  UserForm,
  FocusTopic,
} from "@/lib/types";

type Props = {
  profile: UserForm;
  lifeSections: LifeSection[];
  personality: PersonalitySummary;
  finalReading: FinalReading;
  loading?: boolean;
  onReadAgain: () => void;
};

function topicLabel(topic: FocusTopic) {
  switch (topic) {
    case "tinh_yeu":
      return "Tình yêu";
    case "gia_dao":
      return "Gia đạo";
    case "kinh_doanh":
      return "Kinh doanh";
    case "tai_chinh":
      return "Tài chính";
    case "cong_viec":
      return "Công việc";
    default:
      return "Tổng quan";
  }
}

export default function FinalReadingBlock({
  profile,
  lifeSections,
  personality,
  finalReading,
  loading,
  onReadAgain,
}: Props) {
  return (
    <section className="panel panel--big">
      <div className="panel__head">
        <h2 className="panel__title">✨ Kết luận quẻ dành cho bạn</h2>
        <p className="panel__desc">
          Phần này tổng hợp từ tử vi nền, khí chất MBTI và các lá tarot hôm nay.
        </p>
      </div>

      <div className="reading-meta">
        <div className="reading-meta__item">
          <span>👤 Họ tên</span>
          <strong>{profile.fullName}</strong>
        </div>

        <div className="reading-meta__item">
          <span>🎂 Ngày sinh</span>
          <strong>{profile.birthDate}</strong>
        </div>

        <div className="reading-meta__item">
          <span>💼 Công việc</span>
          <strong>{profile.job || "Chưa cập nhật"}</strong>
        </div>

        <div className="reading-meta__item">
          <span>🧭 Trọng tâm</span>
          <strong>{topicLabel(profile.mainFocus)}</strong>
        </div>

        <div className="reading-meta__item">
          <span>🧠 Nhóm tính cách</span>
          <strong>{personality.typeCode}</strong>
        </div>
      </div>

      <div className="reading-highlight">
        <div className="reading-highlight__title">🌈 Tóm quẻ ngắn</div>
        <div className="reading-highlight__content">
          <p>
            <strong>{personality.title}</strong>
            {personality.subtitle ? ` – ${personality.subtitle}` : ""}
          </p>
          <p>{personality.description}</p>
        </div>
      </div>

      <div className="reading-section">
        <h3>🪞 Tử vi nền</h3>
        <div className="card-message-list">
          {lifeSections.map((section, index) => (
            <div key={index} className="card-message-item">
              <div className="card-message-item__title">{section.title}</div>
              <div className="card-message-item__meaning">
                {section.content.map((line, lineIndex) => (
                  <p key={lineIndex}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="reading-section">
        <h3>💎 Điểm mạnh nổi bật</h3>
        <ul>
          {personality.strengths.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="reading-section">
        <h3>⚠️ Điều nên chú ý</h3>
        <ul>
          {personality.cautions.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="reading-section">
        <h3>💼 Phong cách làm việc</h3>
        <ul>
          {personality.workStyle.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="reading-section">
        <h3>❤️ Phong cách tình cảm</h3>
        <ul>
          {personality.loveStyle.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="reading-section">
        <h3>🌱 Lời khuyên phát triển</h3>
        <ul>
          {personality.growthAdvice.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="reading-section">
        <h3>🃏 Ý nghĩa từ các lá bài</h3>
        <div className="card-message-list">
          {finalReading.tarotDraws.map((draw, index) => (
            <div key={index} className="card-message-item">
              <div className="card-message-item__title">
                Lá {index + 1} – {topicLabel(draw.topic)} – {draw.card.name}
              </div>
              <div className="card-message-item__meaning">{draw.reading}</div>
              <div className="card-message-item__time">
                ⏳ {draw.mode === "upright" ? "Thế thuận" : "Thế ngược"}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="deep-conclusion">
        <div className="deep-conclusion__title">🔮 Kết luận sâu</div>
        <div className="deep-conclusion__text">
          Bạn có khí chất riêng và không hợp sống quá mờ nhạt. Khi đi đúng hướng,
          đúng trọng tâm và giữ được nhịp bền, vận của bạn sẽ sáng rõ hơn rất
          nhiều. Điều quan trọng không phải là làm thật nhiều, mà là chọn đúng
          trục để đi đủ lâu.
        </div>
      </div>

      <div className="reading-footer-note">
        Bạn đã xem {finalReading.dailyVisitCount} lần hôm nay. Nói ngắn gọn kiểu
        bạn bè: quẻ này có cửa, chỉ cần đừng tự làm khó mình quá sớm.
      </div>

      <button className="btn-primary" onClick={onReadAgain} disabled={loading}>
        {loading ? "Đang lưu lịch sử..." : "👉 Xem quẻ mới"}
      </button>
    </section>
  );
}