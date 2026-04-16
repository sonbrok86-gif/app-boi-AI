"use client";

import { useEffect, useState } from "react";

const loadingTexts = [
  "Đang đọc năng lượng của bạn...",
  "Đang nối quẻ với nhịp hiện tại...",
  "Đang lật lá bài phù hợp...",
  "Đang giải mã những điều chưa rõ...",
  "Đang soi đường vận của bạn...",
  "Đang tìm tín hiệu ẩn...",
  "Đang kết nối trực giác...",
  "Đang dò nhịp cảm xúc...",
  "Đang gom dữ liệu từ vũ trụ...",
  "Đang mở quẻ..."
];

export default function MysticLoading() {
  const [text, setText] = useState(loadingTexts[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const random =
        loadingTexts[Math.floor(Math.random() * loadingTexts.length)];
      setText(random);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#05030a] flex flex-col items-center justify-center text-white z-50">
      <div className="text-5xl animate-pulse mb-6">🔮</div>

      <div className="w-16 h-16 border-2 border-fuchsia-500 border-t-transparent rounded-full animate-spin mb-6"></div>

      <p className="text-sm text-fuchsia-300 animate-pulse">{text}</p>
    </div>
  );
}