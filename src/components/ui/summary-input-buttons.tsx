"use client";

import { useFormStatus } from "react-dom";
import useHomeStore from "@/stores/home-store";
import useHistoryStore from "@/stores/history-store";

const SummaryInputButtons: React.FC = () => {
  const { pending } = useFormStatus();
  const { showMultiText, inputWords, setInputWords, setOutputWords } =
    useHomeStore((state) => state);
  const { setSelectedTextSummary, setMode } = useHistoryStore((state) => state);

  const reset = () => {
    setInputWords("");
    setOutputWords("");
    setSelectedTextSummary(null);
    setMode(null);
  };

  return (
    <div className="flex w-full items-center gap-2 sm:w-auto">
      {showMultiText && !pending && (
        <button
          type="button"
          onClick={reset}
          className="btn-quiet flex-1 sm:flex-none"
        >
          Reset
        </button>
      )}
      <button
        type="submit"
        disabled={pending || !inputWords.trim()}
        className="btn-primary flex-1 sm:flex-none"
      >
        {pending && <span className="spinner" aria-hidden="true" />}
        {pending ? "Summarizing…" : "Summarize"}
      </button>
    </div>
  );
};

export default SummaryInputButtons;
