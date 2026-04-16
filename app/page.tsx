"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getVisitorMemory,
  saveVisitorMemory
} from "../lib/engine/memoryEngine";
import { buildGreeting } from "../lib/engine/greetingEngine";

export default function Home() {
  const router = useRouter();
  const [greeting, setGreeting] = useState("Chào bạn, để mình soi thử vận hôm nay nhé.");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const memory = getVisitorMemory();
    const text = buildGreeting(memory);

    setGreeting(text);
    saveVisitorMemory({
      name: memory?.name,
      gender: memory?.gender,
      birth: memory?.birth,
      phone: memory?.phone,
      lastTopic: memory?.lastTopic,
      lastStyleTone: memory?.lastStyleTone
    });
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-[#080511] text-white flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute left-6 top-10 text-4xl animate-pulse">🔮</div>
        <div className="absolute right-8 top-20 text-3xl animate-bounce">✨</div>
        <div className="absolute left-10 bottom-20 text-3xl animate-pulse">🌙</div>
        <div className="absolute right-8 bottom-24 text-3xl animate-pulse">🕯️</div>
      </div>

      <div className="max-w-md w-full rounded-[28px] border border-white/10 bg-white/10 p-6 backdrop-blur-md shadow-2xl relative">
        <div className="inline-flex rounded-full bg-fuchsia-500/10 border border-fuchsia-400/20 px-3 py-1 text-xs font-bold text-fuchsia-200">
          🌌 Bói Vui AI
        </div>

        <h1 className="mt-4 text-3xl font-black leading-tight">
          Đọc năng lượng,
          <span className="block text-fuchsia-300">soi quẻ kiểu bạn thân</span>
        </h1>

        <p className="mt-4 text-sm leading-7 text-slate-300">
          {mounted ? greeting : "Chào bạn, để mình soi thử vận hôm nay nhé."}
        </p>

        <button
          onClick={() => router.push("/ho-so")}
          className="mt-6 w-full py-4 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-violet-600 to-indigo-600 font-black"
        >
          Bắt đầu xem 🔮
        </button>
      </div>
    </main>
  );
}