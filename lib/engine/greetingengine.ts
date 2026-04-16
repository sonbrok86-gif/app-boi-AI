import type { Topic } from "../types";
import type { VisitorMemory } from "./memoryEngine";
import { getDaysSinceLastVisit } from "./memoryEngine";
import {
  freshGreetings,
  longTimeNoSeeGreetings,
  returningGreetings,
  topicFollowupGreetings,
  vipGreetings
} from "../data/proGreetings";

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function pickOne(arr: string[], seed: string): string {
  if (!arr || arr.length === 0) {
    return "Chào bạn, vào đây để mình soi thử vận hôm nay nhé.";
  }
  return arr[hashString(seed) % arr.length];
}

function maybeTopicFollowup(topic?: Topic, seed?: string): string {
  if (!topic || !seed) return "";
  const arr = topicFollowupGreetings[topic];
  if (!arr || arr.length === 0) return "";
  return pickOne(arr, seed + "_topic");
}

export function buildGreeting(memory: VisitorMemory | null): string {
  const safeDefault = "Chào bạn, vào đây để mình soi thử vận hôm nay nhé.";

  if (!memory) {
    return pickOne(freshGreetings, "fresh_default");
  }

  const visitCount = memory.visitCount || 0;
  const daysSince = getDaysSinceLastVisit(memory.lastVisitAt);
  const name = memory.name?.trim();
  const seed = `${name || "guest"}|${visitCount}|${memory.lastVisitAt || ""}|${memory.lastTopic || ""}`;

  let mainGreeting = safeDefault;

  if (visitCount <= 1) {
    mainGreeting = pickOne(freshGreetings, seed + "_fresh");
  } else if (daysSince !== null && daysSince >= 10) {
    mainGreeting = pickOne(longTimeNoSeeGreetings, seed + "_long");
  } else if (visitCount >= 5) {
    mainGreeting = pickOne(vipGreetings, seed + "_vip");
  } else {
    mainGreeting = pickOne(returningGreetings, seed + "_return");
  }

  const followup = maybeTopicFollowup(memory.lastTopic, seed);

  if (name && followup) {
    return `${mainGreeting} ${name} à. ${followup}`;
  }

  if (name) {
    return `${mainGreeting} ${name} à, hôm nay muốn soi chuyện gì đây?`;
  }

  if (followup) {
    return `${mainGreeting} ${followup}`;
  }

  return mainGreeting;
}