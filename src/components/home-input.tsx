"use client";

import { summaryText } from "@/app/actions";
import Button from "@/components/ui/button";
import useHomeStore from "@/stores/home-store";
import { formatWithCommas } from "@/utils/format-number";

// @ts-ignore
import { useFormStatus, useFormState } from "react-dom";
import { GoPaste } from "react-icons/go";
import { GrPowerReset } from "react-icons/gr";
import { RiKeyboardFill } from "react-icons/ri";
import SubmitButton from "./ui/submit-button";
import SummarySubmitButton from "./ui/summary-input-buttons";
import SummaryInputText from "./ui/summary-input-text";
import SummaryInputButtons from "./ui/summary-input-buttons";
import { useEffect } from "react";
import { TextSummaryResponse } from "@/types/text-summary";

const initialState: TextSummaryResponse = {
  error: false,
  messages: [],
};

const HomeInput: React.FC = () => {
  const { showMultiText, inputWordsCount, inputCharCount, setMultiText, setInputWords, setOutputWords } = useHomeStore(
    (state) => state
  );
  const [formState, formAction] = useFormState(summaryText, initialState);

  useEffect(() => {
    setOutputWords(formState?.data?.output || "");
  }, [formState]);

  const handleEnterText = () => {
    setMultiText(true);
  };

  const handlePasteText = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputWords(text);
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
    }
  };

  return (
    <div className="flex flex-col">
      <form action={formAction}>
        <div className="h-[25px] bg-black rounded-t-lg border border-black"></div>
        <div className="flex flex-row items-center justify-center gap-5 h-[140px] bg-white border border-black">
          {!showMultiText ? (
            <>
              <div
                className="flex flex-col gap-2 items-center justify-center border border-[#DEE0E3] group hover:border-black rounded-xl py-3 px-8 cursor-pointer ease-in-out"
                onClick={handleEnterText}
              >
                <RiKeyboardFill className="text-[#727374] group-hover:text-black text-[20px] m-auto mt-5" />
                <span className="text-[12px] group-hover:font-bold font-[500]">Enter Text</span>
              </div>
              <div
                className="flex flex-col gap-2 items-center justify-center border border-[#DEE0E3] group hover:border-black rounded-xl py-3 px-8 cursor-pointer ease-in-out"
                onClick={handlePasteText}
              >
                <GoPaste className="text-[#727374] group-hover:text-black text-[20px] m-auto mt-5" />
                <span className="text-[12px] group-hover:font-bold font-[500]">Paste Text</span>
              </div>
            </>
          ) : (
            <SummaryInputText />
          )}
        </div>
        <div className="flex flex-row items-center justify-between p-5 h-[60px] bg-black rounded-b-lg border border-black">
          <div className="flex flex-row gap-3 text-white">
            <span className="text-[#727374]">Words</span>
            <span>{formatWithCommas(inputWordsCount)}</span>
            <span className="text-[#727374]">Characters</span>
            <span>{formatWithCommas(inputCharCount)}</span>
          </div>
          <SummaryInputButtons />
        </div>
      </form>
    </div>
  );
};

export default HomeInput;
