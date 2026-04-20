"use client";

import { LifeSection, UserForm } from "@/lib/types";

type Props = {
  profile: UserForm;
  lifeSections: LifeSection[];
  onContinue: () => void;
};

export default function LifePathBlock({
  profile,
  lifeSections,
  onContinue,
}: Props) {
  return (
    <section className="panel panel--big">
      <div className="panel__head">
        <h2 className="panel__title">🔮 Tử vi trọn đời</h2>
        <p className="panel__desc">
          Đây là phần nền — đọc theo hướng tổng quan cuộc sống và khí vận của bạn.
        </p>
      </div>

      <div className="life-meta">
        <div>
          <span>👤 Người xem:</span>
          <strong>{profile.fullName}</strong>
        </div>

        <div>
          <span>📅 Ngày sinh:</span>
          <strong>{profile.birthDate}</strong>
        </div>

        <div>
          <span>💼 Công việc:</span>
          <strong>{profile.job || "Chưa cập nhật"}</strong>
        </div>

        <div>
          <span>🧭 Trọng tâm:</span>
          <strong>{profile.mainFocus}</strong>
        </div>
      </div>

      {lifeSections.map((section, index) => (
        <div className="life-section" key={index}>
          <h3>{section.title}</h3>
          <ul>
            {section.content.map((item, itemIndex) => (
              <li key={itemIndex}>{item}</li>
            ))}
          </ul>
        </div>
      ))}

      <div className="life-highlight">
        👉 Phần này là nền chung. Phần tiếp theo sẽ soi sâu hơn theo tính cách và quẻ bài riêng của bạn.
      </div>

      <button className="btn-primary" onClick={onContinue}>
        👉 Tiếp tục xem bài chi tiết
      </button>
    </section>
  );
}