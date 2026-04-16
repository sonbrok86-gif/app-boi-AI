"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Topic } from "../../lib/types";

const topics: { key: Topic; label: string; desc: string }[] = [
  {
    key: "tinh_cam",
    label: "💘 Tình cảm",
    desc: "Yêu đương, mối quan hệ, người đang nghĩ tới"
  },
  {
    key: "gia_dao",
    label: "🏠 Gia đạo",
    desc: "Gia đình, người thân, không khí trong nhà"
  },
  {
    key: "tien_tai",
    label: "💰 Tiền tài",
    desc: "Tiền bạc, dòng tiền, vận tiền"
  },
  {
    key: "co_hoi",
    label: "🚪 Cơ hội",
    desc: "Công việc, hướng đi, cửa mở sắp tới"
  }
];

export default function ChuDePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChoose = (topic: Topic) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("topic", topic);
    router.push(`/ket-qua?${params.toString()}`);
  };

  return (
    <main className="min-h-screen bg-[#080511] text-white px-4 py-6">
      <div className="mx-auto max-w-md">
        <section className="rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur-md shadow-2xl">
          <h1 className="text-2xl font-black">Bạn muốn soi chuyện gì?</h1>
          <p className="mt-2 text-sm text-slate-300">
            Chọn một chủ đề chính. Mình sẽ giữ quẻ theo cùng một mạch, không nói trước sau đá nhau.
          </p>
        </section>

        <div className="mt-4 space-y-3">
          {topics.map((topic) => (
            <button
              key={topic.key}
              onClick={() => handleChoose(topic.key)}
              className="w-full rounded-[28px] border border-white/10 bg-white/10 p-4 text-left backdrop-blur-md shadow-2xl"
            >
              <div className="text-lg font-black">{topic.label}</div>
              <div className="mt-1 text-sm text-slate-300">{topic.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}