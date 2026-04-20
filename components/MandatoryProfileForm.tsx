"use client";

import { useState } from "react";
import { Profile } from "@/lib/types";

type Props = {
  profile: Profile;
  loading?: boolean;
  onSubmit: (profile: Profile) => void;
};

export default function MandatoryProfileForm({
  profile,
  loading,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<Profile>(profile);

  function updateField(key: keyof Profile, value: string) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function validate(): string | null {
    if (!form.fullName.trim()) return "Bạn chưa nhập họ tên";
    if (!form.birthDate.trim()) return "Bạn chưa nhập ngày sinh";
    if (!form.phone.trim()) return "Bạn chưa nhập số điện thoại";
    if (!form.job.trim()) return "Bạn chưa nhập công việc";
    return null;
  }

  function handleSubmit() {
    const error = validate();
    if (error) {
      alert(error);
      return;
    }

    onSubmit(form);
  }

  return (
    <section className="panel panel--big">
      <div className="panel__head">
        <h2 className="panel__title">🔮 Nhập thông tin để xem quẻ</h2>
        <p className="panel__desc">
          Nhập đúng thông tin để hệ thống đọc vận chính xác hơn. (Không spam nha 😄)
        </p>
      </div>

      <div className="form-grid">
        <input
          className="input"
          placeholder="Họ và tên *"
          value={form.fullName}
          onChange={(e) => updateField("fullName", e.target.value)}
        />

        <input
          className="input"
          placeholder="Ngày sinh (vd: 12/03/1995)"
          value={form.birthDate}
          onChange={(e) => updateField("birthDate", e.target.value)}
        />

        <input
          className="input"
          placeholder="Số điện thoại *"
          value={form.phone}
          onChange={(e) => updateField("phone", e.target.value)}
        />

        <input
          className="input"
          placeholder="Công việc hiện tại *"
          value={form.job}
          onChange={(e) => updateField("job", e.target.value)}
        />
      </div>

      <button
        className="btn-primary"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Đang xem vận..." : "👉 Xem tử vi"}
      </button>
    </section>
  );
}