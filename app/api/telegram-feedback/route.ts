import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, phone, mbtiType, feedback, rating } = body;

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return NextResponse.json(
        { ok: false, error: "Thiếu TELEGRAM_BOT_TOKEN hoặc TELEGRAM_CHAT_ID" },
        { status: 500 }
      );
    }

    const text = [
      "📩 FEEDBACK APP BÓI AI",
      `👤 Tên: ${fullName || "-"}`,
      `📱 SĐT: ${phone || "-"}`,
      `🧠 MBTI-like: ${mbtiType || "-"}`,
      `⭐ Đánh giá: ${rating || "-"}/5`,
      `💬 Ý kiến: ${feedback || "-"}`,
    ].join("\n");

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const res = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text,
      }),
    });

    const data = await res.json();

    if (!data.ok) {
      return NextResponse.json(
        { ok: false, error: data.description || "Gửi Telegram thất bại" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "Lỗi server khi gửi feedback" },
      { status: 500 }
    );
  }
}