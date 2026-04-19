import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error } = await supabase.from("reading_history").insert([body]);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (body.personality_summary) {
      await supabase
        .from("users")
        .update({ personality_summary: body.personality_summary })
        .eq("phone", body.phone);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Lưu lịch sử thất bại" }, { status: 500 });
  }
}