"use client";

import React from "react";
// @ts-expect-error
import { useFormStatus } from "react-dom";
import Spinner from "./spinner";
import Image from "next/image";
import useHomeStore from "@/stores/home-store";

const SummaryInputText: React.FC = () => {
  const { pending } = useFormStatus();
  const { inputWords, setInputWords } = useHomeStore((state) => state);

  return (
    <textarea
      name="inputWords"
      rows={4}
      value={inputWords}
      onChange={(e) => setInputWords(e.target.value)}
      className="resize-none text-black h-full w-full px-4 py-2 border focus:outline-none focus:ring-0"
      disabled={pending}
    />
  );
};

export default SummaryInputText;
