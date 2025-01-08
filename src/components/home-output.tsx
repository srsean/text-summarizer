"use client";

import Button from "@/components/ui/button";
import useHomeStore from "@/stores/home-store";
import { formatWithCommas } from "@/utils/format-number";

import { RiFileCopy2Fill, RiFileTextLine } from "react-icons/ri";

const HomeOutput: React.FC = () => {
  const { outputWords, outputWordsCount, outputCharCount } = useHomeStore((state) => state);

  return (
    <>
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
    </>
  );
};

export default HomeOutput;
