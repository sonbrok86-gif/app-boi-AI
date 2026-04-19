import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const { fullName, birthDate, phone, currentJob } = await req.json();

    if (!fullName || !birthDate || !phone || !currentJob) {
      return NextResponse.json({ error: "Thiếu thông tin bắt buộc" }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const today = new Date().toISOString().slice(0, 10);

    const { data: userRows } = await supabase
      .from("users")
      .select("id, full_name, birth_date, phone, current_job, personality_summary")
      .eq("phone", phone)
      .limit(1);

    const existingUser = userRows?.[0];

    if (!existingUser) {
      const { data: inserted } = await supabase
        .from("users")
        .insert([
          {
            full_name: fullName,
            birth_date: birthDate,
            phone,
            current_job: currentJob,
          },
        ])
        .select("id, full_name, birth_date, phone, current_job, personality_summary")
        .single();

      return NextResponse.json({
        isReturning: false,
        dailyCount: 0,
        user: inserted,
      });
    }

    const { count } = await supabase
      .from("reading_history")
      .select("id", { count: "exact", head: true })
      .eq("phone", phone)
      .gte("created_at", `${today}T00:00:00`)
      .lte("created_at", `${today}T23:59:59`);

    const { data: lastReading } = await supabase
      .from("reading_history")
      .select("reading_summary")
      .eq("phone", phone)
      .order("created_at", { ascending: false })
      .limit(1);

    return NextResponse.json({
      isReturning: true,
      dailyCount: count || 0,
      user: existingUser,
      lastReadingSummary: lastReading?.[0]?.reading_summary || "",
    });
  } catch {
    return NextResponse.json({ error: "Không thể nhận diện người dùng" }, { status: 500 });
  }
}