export type TarotCard = {
  name: string;
  slug: string;
  arcana: "major" | "minor";
  suit?: "wands" | "cups" | "swords" | "pentacles";
};

const majorArcana: TarotCard[] = [
  { name: "The Fool", slug: "the-fool", arcana: "major" },
  { name: "The Magician", slug: "the-magician", arcana: "major" },
  { name: "The High Priestess", slug: "the-high-priestess", arcana: "major" },
  { name: "The Empress", slug: "the-empress", arcana: "major" },
  { name: "The Emperor", slug: "the-emperor", arcana: "major" },
  { name: "The Hierophant", slug: "the-hierophant", arcana: "major" },
  { name: "The Lovers", slug: "the-lovers", arcana: "major" },
  { name: "The Chariot", slug: "the-chariot", arcana: "major" },
  { name: "Strength", slug: "strength", arcana: "major" },
  { name: "The Hermit", slug: "the-hermit", arcana: "major" },
  { name: "Wheel of Fortune", slug: "wheel-of-fortune", arcana: "major" },
  { name: "Justice", slug: "justice", arcana: "major" },
  { name: "The Hanged Man", slug: "the-hanged-man", arcana: "major" },
  { name: "Death", slug: "death", arcana: "major" },
  { name: "Temperance", slug: "temperance", arcana: "major" },
  { name: "The Devil", slug: "the-devil", arcana: "major" },
  { name: "The Tower", slug: "the-tower", arcana: "major" },
  { name: "The Star", slug: "the-star", arcana: "major" },
  { name: "The Moon", slug: "the-moon", arcana: "major" },
  { name: "The Sun", slug: "the-sun", arcana: "major" },
  { name: "Judgement", slug: "judgement", arcana: "major" },
  { name: "The World", slug: "the-world", arcana: "major" },
];

const ranks = [
  "Ace","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten",
  "Page","Knight","Queen","King"
] as const;

const suits = [
  { key: "wands", label: "Wands" },
  { key: "cups", label: "Cups" },
  { key: "swords", label: "Swords" },
  { key: "pentacles", label: "Pentacles" },
] as const;

const minorArcana: TarotCard[] = suits.flatMap(suit =>
  ranks.map(rank => ({
    name: `${rank} of ${suit.label}`,
    slug: `${rank.toLowerCase()}-of-${suit.key}`,
    arcana: "minor" as const,
    suit: suit.key,
  }))
);

export const tarotDeck: TarotCard[] = [...majorArcana, ...minorArcana];