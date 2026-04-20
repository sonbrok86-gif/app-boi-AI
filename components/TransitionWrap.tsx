"use client";
import { useEffect, useState } from "react";

export default function TransitionWrap({ text }: { text: string }) {
  const [display, setDisplay] = useState("");
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setDisplay(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(id);
    }, 18);
    return () => clearInterval(id);
  }, [text]);

  return <p className="typing">{display}</p>;
}