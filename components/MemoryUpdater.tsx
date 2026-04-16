"use client";

import { useEffect } from "react";
import type { Topic } from "../lib/types";
import { updateVisitorMemory } from "../lib/engine/memoryEngine";

export default function MemoryUpdater({
  topic,
  styleTone
}: {
  topic: Topic;
  styleTone: "soft" | "sharp" | "mystic" | "playful";
}) {
  useEffect(() => {
    updateVisitorMemory({
      lastTopic: topic,
      lastStyleTone: styleTone,
      lastVisitAt: new Date().toISOString()
    });
  }, [topic, styleTone]);

  return null;
}