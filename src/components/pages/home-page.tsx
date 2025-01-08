"use client";

import Button from "@/components/ui/button";
import useHomeStore from "@/stores/home-store";
import { GoPaste } from "react-icons/go";
import { RiKeyboardFill } from "react-icons/ri";
import { GrPowerReset } from "react-icons/gr";
import { RiFileTextLine } from "react-icons/ri";
import { RiFileCopy2Fill } from "react-icons/ri";
import { formatWithCommas } from "@/helpers/format_number";

export default function HomePage() {
  const {
    showMultiText,
    inputWords,
    inputWordsCount,
    inputCharCount,
    outputWords,
    outputWordsCount,
    outputCharCount,
    setMultiText,
    setInputWords,
    setOutputWords,
  } = useHomeStore((state) => state);

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
    <div className="flex flex-col px-6 py-8 mx-auto lg:py-0 h-full w-full text-black">
      <div className="flex flex-col mb-5">
        <h1 className="font-bold text-[22px]">Text Summarizer</h1>
        <p className="text-[14px] text-[#0F132499]">Summarize and manage text with ease</p>
      </div>
      <div className="flex flex-col">
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
            <textarea
              rows={4}
              value={inputWords}
              onChange={(e) => setInputWords(e.target.value)}
              className="resize-none text-black h-full w-full px-4 py-2 border focus:outline-none focus:ring-0  "
            />
          )}
        </div>
        <div className="flex flex-row items-center justify-between p-5 h-[60px] bg-black rounded-b-lg border border-black">
          <div className="flex flex-row gap-3 text-white">
            <span className="text-[#727374]">Words</span>
            <span>{formatWithCommas(inputWordsCount)}</span>
            <span className="text-[#727374]">Characters</span>
            <span>{formatWithCommas(inputCharCount)}</span>
          </div>
          <div className="flex flex-row gap-3">
            {showMultiText && (
              <Button
                className="flex flex-row gap-2 !w-[100px]  text-white border border-white rounded-xl"
                onClick={() => {
                  setInputWords("");
                }}
              >
                <GrPowerReset className="text-[#FFFFFF52] text-[20px]" />
                Reset
              </Button>
            )}
            <Button
              className="!w-[180px] bg-white !text-black border border-[#FFFFFF52] rounded-xl disabled:bg-gray-900 disabled:!text-white"
              disabled={!showMultiText}
            >
              Summarize My Text
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-[#F7F7F8] flex flex-col flex-grow items-center justify-center w-full mt-5 rounded-xl border border-[#0A0F2914]">
        {outputWordsCount === 0 ? (
          <>
            <RiFileTextLine className="text-[#0F132499] text-[50px]" />
            <span className="text-[#0F132499] text-[18px] mt-5">Your summarized text will appear here</span>
          </>
        ) : (
          <textarea
            rows={4}
            value={outputWords}
            disabled
            className="resize-none text-black h-full w-full px-4 py-2 border focus:outline-none focus:ring-0 disabled:bg-[#F7F7F8] disabled:!text-black"
          />
        )}
      </div>
      <div className="flex flex-row items-center justify-between mt-5">
        <div className="flex flex-row gap-3">
          <span className="text-[#727374] text-[14px]">Words</span>
          <span className="text-[#727374] text-[14px]">{formatWithCommas(outputWordsCount)}</span>
          <span className="text-[#727374] text-[14px]">Characters</span>
          <span className="text-[#727374] text-[14px]">{formatWithCommas(outputCharCount)}</span>
        </div>
        <Button
          className="flex flex-row gap-2 !w-[200px] justify-center !bg-[#0A0F2914] !text-black border border-none disabled:!text-[#0A0F2940] disabled:bg-white disabled:border-[#E9EAEC] rounded-xl px-2"
          disabled={outputWordsCount === 0}
        >
          <RiFileCopy2Fill className="text-[20px]" />
          <span>Copy to Clipboard</span>
        </Button>
      </div>
    </div>
  );
}
