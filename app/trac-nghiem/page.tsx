"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { selectQuizQuestions } from "../../lib/engine/quizEngine";

export default function TracNghiemPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "";
  const birth = searchParams.get("birth") || "";

  const seed = `${name}|${birth}`;
  const questions = useMemo(() => selectQuizQuestions(seed), [seed]);

  const [answers, setAnswers] = useState<Record<string, string>>({});

  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / questions.length) * 100);

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (answeredCount < questions.length) return;

    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(answers)) {
      params.set(key, value);
    }

    router.push(`/chu-de?${params.toString()}`);
  };

  return (
    <main className="min-h-screen bg-[#080511] text-white px-4 py-6">
      <div className="mx-auto max-w-md">
        <section className="rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur-md shadow-2xl">
          <h1 className="text-2xl font-black">Trắc nghiệm năng lượng ✨</h1>
          <p className="mt-2 text-sm text-slate-300">
            Trả lời 10 câu để mình đọc bạn kỹ hơn. Câu hỏi mỗi lần sẽ đổi nhịp nhẹ để đỡ nhàm.
          </p>

          <div className="mt-4 h-3 w-full rounded-full bg-black/20 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-fuchsia-500 to-violet-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 text-xs text-slate-300">{answeredCount}/10 câu</div>
        </section>

        <div className="mt-4 space-y-4">
          {questions.map((question, index) => (
            <section
              key={question.id}
              className="rounded-[28px] border border-white/10 bg-white/10 p-4 backdrop-blur-md shadow-2xl"
            >
              <div className="mb-3 text-sm font-black text-white">
                {index + 1}. {question.text}
              </div>

              <div className="grid gap-2">
                {question.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(question.id, option.value)}
                    className={`rounded-2xl px-3 py-3 text-left text-sm font-semibold ${
                      answers[question.id] === option.value
                        ? "border border-fuchsia-400 bg-fuchsia-500/20 text-white"
                        : "border border-white/10 bg-black/20 text-slate-200"
                    }`}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={answeredCount < questions.length}
          className={`mt-5 w-full py-4 rounded-2xl font-black ${
            answeredCount === questions.length
              ? "bg-gradient-to-r from-fuchsia-600 via-violet-600 to-indigo-600"
              : "bg-slate-600 text-slate-300 cursor-not-allowed"
          }`}
        >
          Chọn chủ đề muốn xem 🔮
        </button>
      </div>
    </main>
  );
}