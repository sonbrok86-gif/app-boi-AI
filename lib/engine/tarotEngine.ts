import { tarotDeck } from "@/data/tarotDeck";

type TarotDirection = "upright" | "reversed";

type TarotDrawItem = {
  name: string;
  image: string;
  focus: string;
  direction: TarotDirection;
};

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function randomDirection(): TarotDirection {
  return Math.random() < 0.5 ? "upright" : "reversed";
}

export function drawTarot(): TarotDrawItem[] {
  const shuffled = shuffleArray(tarotDeck);

  return [
    {
      name: shuffled[0].name,
      image: `/tarot/${shuffled[0].slug}.jpg`,
      focus: "tinh_yeu",
      direction: randomDirection(),
    },
    {
      name: shuffled[1].name,
      image: `/tarot/${shuffled[1].slug}.jpg`,
      focus: "cong_viec",
      direction: randomDirection(),
    },
    {
      name: shuffled[2].name,
      image: `/tarot/${shuffled[2].slug}.jpg`,
      focus: "kinh_doanh",
      direction: randomDirection(),
    },
  ];
}