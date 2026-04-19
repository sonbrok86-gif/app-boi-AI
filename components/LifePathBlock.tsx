"use client";

import { LifePathReading, Profile } from "@/lib/types";

type Props = {
  profile: Profile;
  lifePath: LifePathReading;
  onContinue: () => void;
};

export default function LifePathBlock({
  profile,
  lifePath,
  onContinue,
}: Props) {
  function renderList(list: string[]) {
    return list.map((item, index) => (
      <li key={index}>{item}</li>
    ));
  }

  return (
    <section className="panel panel--big">
      <div className="panel__head">
        <h2 className="panel__title">🔮 Tử vi trọn đời</h2>
        <p className="panel__desc">
          Đây là phần nền — đọc theo tuổi, ngũ hành và khí vận tổng thể của bạn.
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
          <strong>{profile.currentJob}</strong>
        </div>

        <div>
          <span>🧭 Nhóm tuổi:</span>
          <strong>{lifePath.ageGroup}</strong>
        </div>

        <div>
          <span>🌿 Ngũ hành:</span>
          <strong>{lifePath.element.toUpperCase()}</strong>
        </div>
      </div>

      <div className="life-section">
        <h3>📌 Tổng quan vận mệnh</h3>
        <ul>{renderList(lifePath.generalDestiny)}</ul>
      </div>

      <div className="life-section">
        <h3>👁️ Tướng số & khí chất</h3>
        <ul>{renderList(lifePath.appearanceReading)}</ul>
      </div>

      <div className="life-section">
        <h3>📈 Hậu vận & đường dài</h3>
        <ul>{renderList(lifePath.longTermLuck)}</ul>
      </div>

      <div className="life-highlight">
        👉 Phần này là nền chung. Phần tiếp theo sẽ soi sâu hơn theo tính cách và quẻ bài riêng của bạn.
      </div>

      <button className="btn-primary" onClick={onContinue}>
        👉 Tiếp tục xem bài chi tiết
      </button>
    </section>
  );
}