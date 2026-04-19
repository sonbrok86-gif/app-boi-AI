"use client";

import {
  FinalReading,
  LifePathReading,
  PersonalitySummary,
  Profile,
} from "@/lib/types";

type Props = {
  profile: Profile;
  lifePath: LifePathReading;
  personality: PersonalitySummary;
  finalReading: FinalReading;
  loading?: boolean;
  onReadAgain: () => void;
};

export default function FinalReadingBlock({
  profile,
  lifePath,
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
          Phần này tổng hợp từ tử vi nền, nhóm tuổi, công việc, khí chất và 3 lá tarot hôm nay.
        </p>
      </div>

      <div className="reading-meta">
        <div className="reading-meta__item">
          <span>👤 Họ tên</span>
          <strong>{profile.fullName}</strong>
        </div>

        <div className="reading-meta__item">
          <span>🌿 Ngũ hành</span>
          <strong>{lifePath.element.toUpperCase()}</strong>
        </div>

        <div className="reading-meta__item">
          <span>🧭 Nhóm tuổi</span>
          <strong>{lifePath.ageGroup}</strong>
        </div>

        <div className="reading-meta__item">
          <span>🧠 Tính cách</span>
          <strong>{personality.label}</strong>
        </div>

        <div className="reading-meta__item">
          <span>💼 Công việc</span>
          <strong>{profile.currentJob}</strong>
        </div>
      </div>

      <div className="reading-highlight">
        <div className="reading-highlight__title">🌈 Tóm quẻ ngắn</div>
        <div className="reading-highlight__content">
          {finalReading.shortSummary.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
      </div>

      <div className="reading-section">
        <h3>🚪 Cơ hội đang mở ra</h3>
        <ul>
          {finalReading.opportunities.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="reading-section">
        <h3>⚠️ Điều nên chú ý</h3>
        <ul>
          {finalReading.warnings.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="reading-section">
        <h3>🧭 Lời khuyên dành riêng cho bạn</h3>
        <ul>
          {finalReading.advice.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="reading-section">
        <h3>🃏 Ý nghĩa từ 3 lá bài</h3>
        <div className="card-message-list">
          {finalReading.cardMessages.map((card, index) => (
            <div key={index} className="card-message-item">
              <div className="card-message-item__title">
                {card.icon} {card.name}
              </div>
              <div className="card-message-item__meaning">{card.meaning}</div>
              <div className="card-message-item__time">⏳ {card.timing}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="reading-section">
        <h3>🎨 Màu hợp & số may mắn</h3>
        <p>
          <strong>Màu hợp:</strong> {finalReading.luckyColors.join(", ")}
        </p>
        <p>
          <strong>Số may mắn:</strong> {finalReading.luckyNumbers.join(", ")}
        </p>
      </div>

      <div className="deep-conclusion">
        <div className="deep-conclusion__title">🔮 Kết luận sâu</div>
        <div className="deep-conclusion__text">{finalReading.longConclusion}</div>
      </div>

      <div className="reading-footer-note">
        Nói ngắn gọn kiểu bạn bè một câu nhé: quẻ này khá có cửa, chỉ cần bạn đừng tự làm khó mình quá sớm.
      </div>

      <button className="btn-primary" onClick={onReadAgain} disabled={loading}>
        {loading ? "Đang lưu lịch sử..." : "👉 Xem quẻ mới"}
      </button>
    </section>
  );
}