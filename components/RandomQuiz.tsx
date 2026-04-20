"use client";

import { useMemo, useState } from "react";
import { QuizQuestion } from "@/lib/types";

type Props = {
  questions: QuizQuestion[];
  onFinish: (answerTraits: string[]) => void;
};

export default function RandomQuiz({ questions, onFinish }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const currentQuestion = questions[currentIndex];

  const progress = useMemo(() => {
    if (!questions.length) return 0;
    return Math.round(((currentIndex + 1) / questions.length) * 100);
  }, [currentIndex, questions.length]);

  function handleSelect(trait: string) {
    const nextAnswers = {
      ...answers,
      [currentQuestion.id]: trait,
    };

    setAnswers(nextAnswers);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      return;
    }

    const orderedTraits = questions.map((q) => nextAnswers[q.id]);
    onFinish(orderedTraits);
  }

  if (!questions.length) {
    return (
      <section className="panel panel--big">
        <h2 className="panel__title">🧠 Trắc nghiệm tính cách</h2>
        <div className="notice-box">
          Chưa có bộ câu hỏi để hiển thị.
        </div>
      </section>
    );
  }

  return (
    <section className="panel panel--big">
      <div className="panel__head">
        <h2 className="panel__title">🧠 Câu hỏi đọc tính cách</h2>
        <p className="panel__desc">
          Trả lời nhanh theo cảm giác thật của bạn. Bộ câu hỏi sẽ thay đổi để không bị nhàm chán.
        </p>
      </div>

      <div className="quiz-progress-wrap">
        <div className="quiz-progress-top">
          <span>
            Câu {currentIndex + 1}/{questions.length}
          </span>
          <strong>{progress}%</strong>
        </div>

        <div className="quiz-progress-bar">
          <div
            className="quiz-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="quiz-card">
        <div className="quiz-card__category">
         {currentQuestion.axis === "EI"
  ? "NĂNG LƯỢNG"
  : currentQuestion.axis === "SN"
  ? "NHẬN THỨC"
  : currentQuestion.axis === "TF"
  ? "RA QUYẾT ĐỊNH"
  : "LỐI SỐNG"}
        </div>

        <h3 className="quiz-card__question">{currentQuestion.question}</h3>

        <div className="quiz-options">
  {currentQuestion.options.map((option, index) => (
    <button
      key={`${currentQuestion.id}-${index}`}
      className="quiz-option"
      onClick={() => handleSelect(option.letter)}
    >
      {option.label}
    </button>
  ))}
</div>
      </div>

      <div className="quiz-note">
        Chọn theo bản năng đầu tiên thường cho kết quả thật hơn 😄
      </div>
    </section>
  );
}