"use client";

type Props = {
  greeting: string;
  dailyCount: number;
  fullName: string;
};

export default function ReturningGreeting({
  greeting,
  dailyCount,
  fullName,
}: Props) {
  const remain = Math.max(0, 3 - dailyCount);

  return (
    <section className="panel returning-greeting">
      <div className="returning-greeting__top">
        <div className="returning-greeting__badge">KHÁCH CŨ QUAY LẠI</div>
        <div className="returning-greeting__count">
          Hôm nay bạn đã xem <strong>{dailyCount}</strong>/3 lần
        </div>
      </div>

      <h2 className="panel__title">👋 Chào lại {fullName}</h2>

      <p className="returning-greeting__text">{greeting}</p>

      <div className="returning-greeting__bottom">
        {remain > 0 ? (
          <div className="returning-greeting__hint">
            Bạn còn <strong>{remain}</strong> lượt xem hôm nay. Cứ bình tĩnh, số phận không chạy mất đâu 😄
          </div>
        ) : (
          <div className="returning-greeting__hint returning-greeting__hint--warning">
            Hôm nay bạn đã chạm ngưỡng rồi đó 😅 Mai quay lại mình xem tiếp cho đỡ “bội thực tâm linh”.
          </div>
        )}
      </div>
    </section>
  );
}