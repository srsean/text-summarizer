"use client";

import useHomeStore from "@/stores/home-store";
import { STYLE_THEMES } from "@/utils/style-theme";
import { formatWithCommas } from "@/utils/format-number";
import { useAlert } from "./ui/alert";

const HomeOutput: React.FC = () => {
  const { showAlert } = useAlert();
  const {
    outputWords,
    outputWordsCount,
    outputCharCount,
    outputTone,
    outputStyle,
  } = useHomeStore((state) => state);
  const styleTheme = outputStyle ? STYLE_THEMES[outputStyle] : null;

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(outputWords);
    showAlert({ messages: [], type: "success", title: "Copied to clipboard" });
  };

  return (
    <section className="flex min-h-[320px] flex-col bg-paper lg:min-h-0">
      <div className="flex min-h-[57px] items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-6">
        <h2 className="eyebrow">Summary</h2>
        {outputWordsCount > 0 && outputTone && outputStyle ? (
          <div
            title="Tone and style used for this summary"
            className="flex items-center gap-1.5"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted">
              {outputTone}
            </span>
            <span aria-hidden="true" className="text-line-strong">
              ·
            </span>
            <span
              className={`rounded px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] ${
                styleTheme ? styleTheme.badgeClass : ""
              }`}
            >
              {outputStyle}
            </span>
          </div>
        ) : null}
      </div>

      {outputWordsCount === 0 ? (
        <div className="flex flex-1 items-center justify-center px-6 py-12">
          <div className="max-w-[30ch] text-center">
            <p className="font-serif text-[22px] leading-[1.3] text-ink-soft">
              Your summary will appear here.
            </p>
            <p className="mt-2.5 text-[12.5px] leading-relaxed text-ink-muted">
              It keeps the key facts and leaves the rest behind.
            </p>
          </div>
        </div>
      ) : (
        <div
          className="fade-in flex-1 overflow-y-auto px-5 py-5 sm:px-6"
          aria-live="polite"
        >
          <div
            role="region"
            aria-label="Generated summary"
            className="whitespace-pre-wrap break-words font-serif text-[17px] leading-[1.75] text-ink"
          >
            {outputWords}
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-4 sm:px-6">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-muted">
          {formatWithCommas(outputWordsCount)} words
          <span aria-hidden="true" className="mx-2 text-line-strong">
            /
          </span>
          {formatWithCommas(outputCharCount)} characters
        </p>
        <button
          type="button"
          onClick={handleCopyToClipboard}
          disabled={outputWordsCount === 0}
          className="btn-secondary h-9 w-full px-3.5 sm:w-auto"
        >
          Copy summary
        </button>
      </div>
    </section>
  );
};

export default HomeOutput;
