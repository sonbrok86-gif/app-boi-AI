"use client";

import { useEffect, useState } from "react";

export default function RevealBlock({
  children,
  delay = 0
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      className={`transition-all duration-700 ${
        show
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6"
      }`}
    >
      {children}
    </div>
  );
}