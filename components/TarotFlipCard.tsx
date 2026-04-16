"use client";

import { useState } from "react";

export default function TarotFlipCard({
  title,
  meaning,
  icon
}: {
  title: string;
  meaning: string;
  icon: string;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-full [perspective:1000px] cursor-pointer"
      onClick={() => setFlipped((v) => !v)}
    >
      <div
        className={`relative h-56 w-full rounded-3xl transition-transform duration-700 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Mặt sau */}
        <div className="absolute inset-0 rounded-3xl border border-fuchsia-400/20 bg-gradient-to-br from-[#1a1028] via-[#120b1f] to-[#09060f] p-5 shadow-2xl [backface-visibility:hidden]">
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="text-5xl mb-4 animate-pulse">🂠</div>
            <div className="text-lg font-black text-fuchsia-200">
              Lá bài ẩn
            </div>
            <div className="mt-2 text-sm text-slate-300 leading-6">
              Chạm để lật bài 🔮
            </div>
          </div>
        </div>

        {/* Mặt trước */}
        <div className="absolute inset-0 rounded-3xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-md [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="flex h-full flex-col">
            <div className="text-4xl">{icon}</div>
            <div className="mt-3 text-lg font-black text-white">{title}</div>
            <div className="mt-3 text-sm leading-6 text-slate-200">
              {meaning}
            </div>
            <div className="mt-auto pt-4 text-xs text-fuchsia-200">
              Chạm để úp lại
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}