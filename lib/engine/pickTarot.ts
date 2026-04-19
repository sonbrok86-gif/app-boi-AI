import { tarotDeck } from "../content/tarotDeck";

export function pick3Tarot() {
  const shuffled = [...tarotDeck].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}