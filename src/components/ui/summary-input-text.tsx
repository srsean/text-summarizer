"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import useHomeStore from "@/stores/home-store";

interface SummaryInputTextProps {
  autoFocus?: boolean;
}

const SummaryInputText: React.FC<SummaryInputTextProps> = ({ autoFocus }) => {
  const { pending } = useFormStatus();
  const { inputWords, setInputWords } = useHomeStore((state) => state);

  return (
    <textarea
      name="inputWords"
      value={inputWords}
      onChange={(e) => setInputWords(e.target.value)}
      aria-label="Source text"
      placeholder="Paste or type your text here…"
      autoFocus={autoFocus}
      className="h-full min-h-[280px] w-full flex-1 resize-none border-0 bg-transparent px-5 py-5 text-[14.5px] leading-[1.75] text-ink outline-none placeholder:text-ink-muted/80 disabled:opacity-60 sm:px-6"
      disabled={pending}
      spellCheck
    />
  );
};

export default SummaryInputText;
