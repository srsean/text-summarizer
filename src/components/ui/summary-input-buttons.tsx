"use client";

import React from "react";
// @ts-expect-error
import { useFormStatus } from "react-dom";
import Spinner from "./spinner";
import Image from "next/image";
import { GrPowerReset } from "react-icons/gr";
import useHomeStore from "@/stores/home-store";
import useHistoryStore from "@/stores/history-store";

const SummaryInputButtons: React.FC = () => {
  const { pending } = useFormStatus();
  const { showMultiText, setInputWords, setOutputWords } = useHomeStore((state) => state);
  const { setSelectedTextSummary, setMode } = useHistoryStore((state) => state);

  const reset = () => {
    setInputWords("");
    setOutputWords("");
    setSelectedTextSummary(null);
    setMode(null);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-3">
      {showMultiText && !pending && (
        <button
          className="flex flex-row gap-2 items-center justify-center h-10 lg:!w-[100px]  text-white border border-white rounded-xl"
          onClick={reset}
        >
          <GrPowerReset className="text-[#FFFFFF52] text-[20px]" />
          Reset
        </button>
      )}
      <button
        type="submit"
        className={`flex flex-row h-10 gap-3 items-center justify-center bg-white !text-black border border-[#FFFFFF52] rounded-xl disabled:bg-gray-900 disabled:!text-white py-2 px-5`}
        disabled={pending || !showMultiText}
      >
        {pending ? (
          <Image
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/11407/throbber.gif"
            width={20}
            height={20}
            alt="asdsa"
          />
        ) : null}

        {pending ? <span>Summarizing your text...</span> : <span>Summarize My Text</span>}
      </button>
    </div>
  );
};

export default SummaryInputButtons;
