"use client";

import { useEffect, useState } from "react";
import TarotFlipCard from "../../components/TarotFlipCard";
import RevealBlock from "../../components/RevealBlock";
import MysticLoading from "../../components/MysticLoading";
import MemoryUpdater from "../../components/MemoryUpdater";
import Link from "next/link";
import { buildBaseReading } from "../../lib/engine/profileEngine";
import {
  buildPersonalityProfile,
  calculateScores,
  selectQuizQuestions
} from "../../lib/engine/quizEngine";
import { generateReading } from "../../lib/engine/readingEngine";
import type { Topic, UserProfile } from "../../lib/types";

export default function KetQuaPage({
  searchParams
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const profile: UserProfile = {
    name: String(searchParams.name || ""),
    gender: String(searchParams.gender || "nam") as UserProfile["gender"],
    birth: String(searchParams.birth || ""),
    phone: String(searchParams.phone || "")
  };
const [loading, setLoading] = useState(true);

  const topic = String(searchParams.topic || "") as Topic;
  const question = "quẻ hiện tại";

  const invalid =
    !profile.name || !profile.birth || !profile.phone || !topic;

  if (invalid) {
    return (
      <main className="min-h-screen bg-[#080511] text-white px-4 py-6">
        <div className="mx-auto max-w-md rounded-[28px] border border-white/10 bg-white/10 p-5">
          Thiếu dữ liệu để xem quẻ.{" "}
          <Link href="/" className="underline">
            Quay lại từ đầu nhé
          </Link>
        </div>
      </main>
    );
  }
useEffect(() => {
  const t = setTimeout(() => {
    setLoading(false);
  }, 2200); // 2.2s

  return () => clearTimeout(t);
}, []);
if (loading) return <MysticLoading />;
  const seed = `${profile.name}|${profile.birth}`;
  const questions = selectQuizQuestions(seed);
  const answers: Record<string, string> = {};

  for (const q of questions) {
    const value = searchParams[q.id];
    if (typeof value === "string") answers[q.id] = value;
  }

  const baseReading = buildBaseReading(profile);
  const scores = calculateScores(questions, answers);
  const personality = buildPersonalityProfile(scores);
  const result = generateReading({
    name: profile.name,
    topic,
    question,
    baseReading,
    personality,
    scores
  });
const styleLabelMap = {
  soft: "Giọng nhẹ nhàng 🪷",
  sharp: "Giọng thẳng và rõ ⚔️",
  mystic: "Giọng sâu và ma mị 🌙",
  playful: "Giọng bạn thân dí dỏm 😏"
} as const;
const topicLabelMap = {
  tinh_cam: "💘 Chuyện tình cảm",
  gia_dao: "🏠 Chuyện gia đạo",
  tien_tai: "💰 Chuyện tiền tài",
  co_hoi: "🚪 Chuyện cơ hội"
} as const;

  return (
    <main className="min-h-screen bg-[#080511] text-white px-4 py-6">
      <div 
className="mx-auto max-w-md space-y-4">
<MemoryUpdater topic={topic} styleTone={result.styleTone} />
        <section className="rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur-md shadow-2xl">
          <div className="inline-flex rounded-full bg-fuchsia-500/10 border border-fuchsia-400/20 px-3 py-1 text-xs font-bold text-fuchsia-200">
            
🔮 Kết quả mở ra

          </div>
          <h1 className="mt-4 text-3xl font-black leading-tight">
            {profile.name},
            <span className="block text-fuchsia-300">quẻ của bạn đây</span>
          </h1>
        </section>

        <section className="rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur-md shadow-2xl">
          <div className="text-sm font-bold text-fuchsia-200">Tổng vận hiện tại</div>
          <p className="mt-2 text-sm leading-7 text-slate-100">{result.overview}</p>
<section className="rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur-md shadow-2xl">
  <div className="text-sm font-bold text-fuchsia-200">Cách quẻ đang nói với bạn</div>
  <p className="mt-2 text-sm leading-7 text-slate-100">
    {styleLabelMap[result.styleTone]}
  </p>
</section>
        </section>

        <RevealBlock delay={300}><section className="rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur-md shadow-2xl">
          <div className="text-sm font-bold text-fuchsia-200">Chân dung tính cách</div>
          <p className="mt-2 text-sm leading-7 text-slate-100">{result.personalitySummary}</p>
          <div className="mt-4 text-sm text-slate-300">
            <div>• Công việc: {personality.workEnergy}</div>
            <div>• Cảm xúc: {personality.emotionalState}</div>
            <div>• Tình cảm: {personality.relationshipStyle}</div>
          </div>
        </section></RevealBlock>
<RevealBlock delay={600}><section className="rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur-md shadow-2xl">
  <div className="text-sm font-bold text-fuchsia-200">
    {topicLabelMap[topic]}
  </div>
  <p className="mt-2 text-sm leading-7 text-slate-100">
    {result.topicFlavorText}
  </p>
</section>

        <section className="rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur-md shadow-2xl">
          <div className="text-sm font-bold text-fuchsia-200">
  {topicLabelMap[topic]}
</div>
          <p className="mt-2 text-sm leading-7 text-slate-100">{result.topicReading}</p>
        </section></RevealBlock>

      <RevealBlock delay={900}> <section className="rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur-md shadow-2xl">
  <div className="text-sm font-bold text-fuchsia-200">Cơ hội</div>
  <p className="mt-2 text-sm leading-7 text-slate-100">{result.opportunity}</p>

  <div className="mt-4 text-sm font-bold text-fuchsia-200">Điều cần tránh</div>
  <p className="mt-2 text-sm leading-7 text-slate-100">{result.caution}</p>

  <div className="mt-4 text-sm font-bold text-fuchsia-200">Lời khuyên riêng cho bạn</div>
  <p className="mt-2 text-sm leading-7 text-slate-100">{result.adviceText}</p>
</section>
        <section className="rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur-md shadow-2xl">
          <div className="text-sm font-bold text-fuchsia-200">Màu hợp & số may mắn</div>
          <div className="mt-2 text-sm text-slate-100">
            <div>🎨 Màu hợp: {result.luckyColors.join(", ")}</div>
            <div className="mt-2">🔢 Số may mắn: {result.luckyNumbers.join(", ")}</div>
          </div>
        </section></RevealBlock>

       <RevealBlock delay={1200}>
  <section className="rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur-md shadow-2xl">
    <div className="text-sm font-bold text-fuchsia-200">Lật lá bài bổ sung</div>
    <p className="mt-2 text-sm leading-6 text-slate-300">
      Mỗi lá bài là một lớp nghĩa phụ. Bấm vào từng lá để mở quẻ.
    </p>

    <div className="mt-4 grid gap-4">
      {result.tarotSupport.map((card) => (
        <TarotFlipCard
          key={card.id}
          title={card.title}
          meaning={card.meaning}
          icon={card.icon}
        />
      ))}
    </div>
  </section>
</RevealBlock>

        <RevealBlock delay={1500}><section className="rounded-[28px] border border-fuchsia-400/20 bg-fuchsia-500/10 p-5 backdrop-blur-md shadow-2xl">
          <div className="text-sm font-bold text-fuchsia-200">Chốt quẻ</div>
          <p className="mt-2 text-sm leading-7 text-slate-100">{result.closing}</p>
        </section></RevealBlock>

        <div className="grid grid-cols-2 gap-2">
          <Link
            href="/chu-de"
            className="text-center py-4 rounded-2xl border border-white/10 bg-white/10 font-black"
          >
            Xem chủ đề khác
          </Link>
          <Link
            href="/"
            className="text-center py-4 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-violet-600 to-indigo-600 font-black"
          >
            Xem lại từ đầu
          </Link>
        </div>
      </div>
    </main>
  );
}