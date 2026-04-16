import Link from "next/link";
import { buildBaseReading } from "../../lib/engine/profileEngine";
import type { UserProfile } from "../../lib/types";

export default function SoBoPage({
  searchParams
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const profile: UserProfile = {
    name: String(searchParams.name || ""),
    gender: (String(searchParams.gender || "nam") as UserProfile["gender"]),
    birth: String(searchParams.birth || ""),
    phone: String(searchParams.phone || "")
  };

  const invalid = !profile.name || !profile.birth || !profile.phone;

  if (invalid) {
    return (
      <main className="min-h-screen bg-[#080511] text-white px-4 py-6">
        <div className="mx-auto max-w-md rounded-[28px] border border-white/10 bg-white/10 p-5">
          Thiếu thông tin hồ sơ.{" "}
          <Link href="/ho-so" className="underline">
            Quay lại nhập nhé
          </Link>
        </div>
      </main>
    );
  }

  const base = buildBaseReading(profile);
  const params = new URLSearchParams({
    name: profile.name,
    gender: profile.gender,
    birth: profile.birth,
    phone: profile.phone
  });

  return (
    <main className="min-h-screen bg-[#080511] text-white px-4 py-6">
      <div className="mx-auto max-w-md space-y-4">
        <section className="rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur-md shadow-2xl">
          <div className="inline-flex rounded-full bg-fuchsia-500/10 border border-fuchsia-400/20 px-3 py-1 text-xs font-bold text-fuchsia-200">
            👁️ Hồ sơ sơ bộ
          </div>
          <h1 className="mt-4 text-3xl font-black leading-tight">
            {profile.name},
            <span className="block text-fuchsia-300">quẻ nền của bạn đây</span>
          </h1>
          <p className="mt-4 text-sm leading-7 text-slate-200">{base.summary}</p>
        </section>

        <section className="rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur-md shadow-2xl">
          <div className="space-y-3 text-sm">
            <div><span className="font-bold text-fuchsia-200">Nhóm năng lượng:</span> {base.energyType}</div>
            <div><span className="font-bold text-fuchsia-200">Ngũ hành:</span> {base.element}</div>
            <div><span className="font-bold text-fuchsia-200">Giai đoạn tuổi:</span> {base.lifePhase}</div>
            <div><span className="font-bold text-fuchsia-200">Tổng vận hiện tại:</span> {base.currentFortune}</div>
            <div><span className="font-bold text-fuchsia-200">Màu hợp:</span> {base.luckyColors.join(", ")}</div>
            <div><span className="font-bold text-fuchsia-200">Số may mắn:</span> {base.luckyNumbers.join(", ")}</div>
          </div>

          <Link
            href={`/trac-nghiem?${params.toString()}`}
            className="mt-6 block text-center py-4 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-violet-600 to-indigo-600 font-black"
          >
            Xem kỹ hơn về mình ✨
          </Link>
        </section>
      </div>
    </main>
  );
}