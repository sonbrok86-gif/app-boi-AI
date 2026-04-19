"use client";

import { useState } from "react";
import { PersonalitySummary, Profile } from "@/lib/types";

type SpreadItem = {
  card: {
    name: string;
    icon: string;
  };
  reversed: boolean;
};

type Props = {
  profile: Profile;
  personality: PersonalitySummary;
  spread: SpreadItem[];
  onComplete: () => void;
};

export default function TarotStage({
  profile,
  personality,
  spread,
  onComplete,
}: Props) {
  const [flipped, setFlipped] = useState<boolean[]>([false, false, false]);

  function handleFlip(index: number) {
    setFlipped((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
  }

  const allFlipped = flipped.every(Boolean);

  return (
    <section className="panel panel--big">
      <div className="panel__head">
        <h2 className="panel__title">🃏 Rút bài Tarot</h2>
        <p className="panel__desc">
          Giờ là phần quan trọng nhất. Lật từng lá bài để xem vận của bạn hôm nay.
        </p>
      </div>

      <div className="tarot-intro">
        <p>
          {profile.fullName}, với khí chất <strong>{personality.label}</strong>, 
          cách bạn nhìn và phản ứng với cuộc đời không hề ngẫu nhiên.
        </p>
        <p>
          3 lá bài này sẽ phản ánh:
          <br />
          👉 Hiện tại của bạn  
          👉 Hướng đi gần  
          👉 Kết quả nếu giữ đúng nhịp
        </p>
      </div>

      <div className="tarot-grid">
        {spread.map((item, index) => {
          const isFlipped = flipped[index];

          return (
            <div key={index} className="tarot-card-wrap">
              <div
                className={`tarot-card ${isFlipped ? "is-flipped" : ""}`}
                onClick={() => handleFlip(index)}
              >
                <div className="tarot-card__inner">
                  {/* FRONT */}
                  <div className="tarot-card__front">
                    <div className="tarot-back">🔮</div>
                  </div>

                  {/* BACK */}
                  <div className="tarot-card__back">
                    <div className="tarot-icon">{item.card.icon}</div>
                    <div className="tarot-name">{item.card.name}</div>
                    {item.reversed && (
                      <div className="tarot-reversed">(ngược)</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="tarot-label">
                {index === 0 && "Hiện tại"}
                {index === 1 && "Xu hướng"}
                {index === 2 && "Kết quả"}
              </div>
            </div>
          );
        })}
      </div>

      {allFlipped ? (
        <button className="btn-primary" onClick={onComplete}>
          👉 Xem kết luận cuối cùng
        </button>
      ) : (
        <div className="tarot-hint">
          👉 Lật đủ 3 lá để xem kết quả
        </div>
      )}
    </section>
  );
}