"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { saveVisitorMemory } from "../../lib/engine/memoryEngine";

export default function HoSoPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [gender, setGender] = useState<"nam" | "nu" | "khac">("nam");
  const [birth, setBirth] = useState("");
  const [phone, setPhone] = useState("");

  const canSubmit = name.trim() && birth.trim() && phone.trim();

  const handleNext = () => {
  if (!canSubmit) return;

  saveVisitorMemory({
    name: name.trim(),
    gender,
    birth,
    phone
  });

  const params = new URLSearchParams({
    name: name.trim(),
    gender,
    birth,
    phone
  });

  router.push(`/so-bo?${params.toString()}`);
};
  return (
    <main className="min-h-screen bg-[#080511] text-white px-4 py-6">
      <div className="mx-auto max-w-md rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur-md shadow-2xl">
        <h1 className="text-2xl font-black">Hồ sơ nền của bạn 🪞</h1>
        <p className="mt-2 text-sm text-slate-300">
          Nhập vài thông tin cơ bản để mình dựng hồ sơ số mệnh sơ bộ trước nhé.
        </p>

        <label className="block mt-5 mb-2 text-sm font-bold text-fuchsia-100">Tên</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ví dụ: Sơn"
          className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
        />

        <label className="block mt-4 mb-2 text-sm font-bold text-fuchsia-100">Giới tính</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value as "nam" | "nu" | "khac")}
          className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
        >
          <option value="nam">Nam</option>
          <option value="nu">Nữ</option>
          <option value="khac">Khác</option>
        </select>

        <label className="block mt-4 mb-2 text-sm font-bold text-fuchsia-100">Ngày sinh</label>
        <input
          type="date"
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
        />

        <label className="block mt-4 mb-2 text-sm font-bold text-fuchsia-100">Số điện thoại</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Ví dụ: 09..."
          className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
        />

        <button
          onClick={handleNext}
          disabled={!canSubmit}
          className={`mt-6 w-full py-4 rounded-2xl font-black ${
            canSubmit
              ? "bg-gradient-to-r from-fuchsia-600 via-violet-600 to-indigo-600"
              : "bg-slate-600 text-slate-300 cursor-not-allowed"
          }`}
        >
          Xem hồ sơ số mệnh
        </button>
      </div>
    </main>
  );
}