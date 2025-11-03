"use client";

import { useState } from "react";
import { FiArrowLeft, FiSettings } from "react-icons/fi";
import SummaryInputText from "./ui/summary-input-text";

const HomeInputContent: React.FC = () => {
  const [showSelectors, setShowSelectors] = useState(false);

  return (
    <div className="flex flex-col md:flex-row flex-1 h-full gap-2 relative">
      {/* Input Text Area */}
      <div className="flex-1">
        <SummaryInputText />

        {/* Mobile toggle button */}
        <button
          type="button"
          className="md:hidden absolute z-10 top-2 right-2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 shadow-sm transition"
          onClick={() => setShowSelectors(!showSelectors)}
        >
          {showSelectors ? (
            <FiArrowLeft className="text-gray-700" />
          ) : (
            <FiSettings className="text-gray-700" />
          )}
        </button>
      </div>

      {/* Tone and Style Selectors */}
      <div
        className={`flex flex-col gap-3 md:gap-5 h-full w-full md:w-64 p-4 border-t md:border-t-0 md:border-l border-gray-300  transition-all duration-300 bg-white
        ${showSelectors ? "block absolute" : "hidden md:block"}
        `}
      >
        <div className="flex flex-col">
          <label
            htmlFor="tone"
            className="text-[12px] font-semibold text-gray-700 mb-1"
          >
            Tone
          </label>
          <select
            id="tone"
            name="tone"
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            defaultValue="formal"
          >
            <option value="formal">Formal</option>
            <option value="casual">Casual</option>
            <option value="friendly">Friendly</option>
            <option value="professional">Professional</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="style"
            className="text-[12px] font-semibold text-gray-700 mb-1"
          >
            Style
          </label>
          <select
            id="style"
            name="style"
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            defaultValue="concise"
          >
            <option value="concise">Concise</option>
            <option value="persuasive">Persuasive</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default HomeInputContent;
