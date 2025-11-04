"use client";

import { summaryText } from "@/app/actions";
import useHomeStore from "@/stores/home-store";
import { formatWithCommas } from "@/utils/format-number";
import useHistoryStore from "@/stores/history-store";
import useSidebarStore from "@/stores/sidebar-store";
import { TextSummaryResponse } from "@/types/text-summary";
import { useEffect, useState } from "react";
// @ts-ignore
import { useFormState } from "react-dom";
import { GoPaste } from "react-icons/go";
import { RiKeyboardFill } from "react-icons/ri";
import SummaryInputButtons from "./ui/summary-input-buttons";
import SummaryInputText from "./ui/summary-input-text";
import HomeInputContent from "./home-input-content";

const initialState: TextSummaryResponse = {
  error: false,
  messages: [],
};

interface HomeInputProps {
  guest?: string;
}

const HomeInput: React.FC<HomeInputProps> = ({ guest }) => {
  const {
    showMultiText,
    inputWordsCount,
    inputCharCount,
    setMultiText,
    setInputWords,
    setOutputWords,
  } = useHomeStore((state) => state);
  const { selectedTextSummary, mode } = useHistoryStore((state) => state);
  const { textSummaryHistoryCount, setTextSummaryHistoryCount } =
    useSidebarStore((state) => state);
  const [formState, formAction] = useFormState(summaryText, initialState);

  const [alert, setAlert] = useState<{
    type: "error" | "success";
    messages: string[];
  } | null>(null);

  useEffect(() => {
    // If the summary was generated successfully
    if (formState?.data?.input && !formState.error) {
      setInputWords(formState?.data?.input || "");
      setOutputWords(formState?.data?.output || "");
      if (!selectedTextSummary) {
        setTextSummaryHistoryCount(textSummaryHistoryCount + 1);
      }
      setAlert({ type: "success", messages: formState.messages });
    }

    // If there's an error
    if (formState?.error) {
      setAlert({ type: "error", messages: formState.messages });
    }
  }, [formState]);

  useEffect(() => {
    if (selectedTextSummary && mode === "edit") {
      setInputWords(selectedTextSummary.input);
      setOutputWords(selectedTextSummary.output);
    }
  }, [selectedTextSummary, mode]);

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
      {alert && (
        <div
          className={`p-3 mb-3 text-sm rounded-lg ${
            alert.type === "error"
              ? "bg-red-100 text-red-700 border border-red-300"
              : "bg-green-100 text-green-700 border border-green-300"
          }`}
        >
          {alert.messages.map((msg, idx) => (
            <p key={idx}>{msg}</p>
          ))}
        </div>
      )}
      <form action={formAction}>
        <div className="h-[25px] bg-black rounded-t-lg border border-black"></div>
        <div className="flex flex-row items-center justify-center gap-5 h-[200px] bg-white border border-black">
          {guest ? (
            <input type="text" name="guest" defaultValue={guest} hidden />
          ) : null}
          {selectedTextSummary && mode === "edit" ? (
            <input
              type="text"
              name="textSummaryId"
              defaultValue={selectedTextSummary.id}
              hidden
            />
          ) : null}
          {!showMultiText ? (
            <>
              <div
                className="flex flex-col gap-2 items-center justify-center border border-[#DEE0E3] group hover:border-black rounded-xl py-3 px-8 cursor-pointer ease-in-out"
                onClick={handleEnterText}
              >
                <RiKeyboardFill className="text-[#727374] group-hover:text-black text-[20px] m-auto mt-5" />
                <span className="text-[12px] group-hover:font-bold font-[500]">
                  Enter Text
                </span>
              </div>
              <div
                className="flex flex-col gap-2 items-center justify-center border border-[#DEE0E3] group hover:border-black rounded-xl py-3 px-8 cursor-pointer ease-in-out"
                onClick={handlePasteText}
              >
                <GoPaste className="text-[#727374] group-hover:text-black text-[20px] m-auto mt-5" />
                <span className="text-[12px] group-hover:font-bold font-[500]">
                  Paste Text
                </span>
              </div>
            </>
          ) : (
            <HomeInputContent />
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-5 lg:gap-0 items-center justify-between p-5 lg:h-[60px] bg-black rounded-b-lg border border-black">
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
