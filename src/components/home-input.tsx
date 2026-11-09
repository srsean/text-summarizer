"use client";

import useHomeStore, {
  SummaryStyle,
  SummaryTone,
} from "@/stores/home-store";
import { formatWithCommas } from "@/utils/format-number";
import useHistoryStore from "@/stores/history-store";
import { useEffect, useState } from "react";
import SummaryInputButtons from "./ui/summary-input-buttons";
import SummaryInputText from "./ui/summary-input-text";
import SummarySettings from "./ui/summary-settings";
import { useAlert } from "./ui/alert";

interface HomeInputProps {
  guest?: string;
  formAction: (payload: FormData) => void;
}

const HomeInput: React.FC<HomeInputProps> = ({ guest, formAction }) => {
  const { showAlert } = useAlert();
  const {
    showMultiText,
    inputWordsCount,
    inputCharCount,
    setMultiText,
    setInputWords,
    setOutputWords,
    setTone,
    setStyle,
    setOutputSettings,
  } = useHomeStore((state) => state);
  const { selectedTextSummary, mode } = useHistoryStore((state) => state);

  const [shouldFocus, setShouldFocus] = useState(false);

  const isEditing = Boolean(selectedTextSummary && mode === "edit");

  useEffect(() => {
    if (selectedTextSummary && mode === "edit") {
      const resultTone = selectedTextSummary.tone.toLowerCase() as SummaryTone;
      const resultStyle = selectedTextSummary.style.toLowerCase() as SummaryStyle;

      setInputWords(selectedTextSummary.input);
      setOutputWords(selectedTextSummary.output);
      setTone(resultTone);
      setStyle(resultStyle);
      setOutputSettings(
        resultTone,
        resultStyle,
        selectedTextSummary.styleHighlights ?? []
      );
    }
  }, [selectedTextSummary, mode]);

  const handleEnterText = () => {
    setShouldFocus(true);
    setMultiText(true);
  };

  const handlePasteText = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputWords(text);
    } catch {
      showAlert({
        title: "Clipboard unavailable",
        messages: [
          "Your browser blocked clipboard access. Paste directly into the editor with Ctrl/Cmd + V instead.",
        ],
        type: "error",
      });
    }
  };

  return (
    <section className="flex min-h-0 flex-col border-b border-line lg:border-b-0 lg:border-r">
      <form action={formAction} className="flex min-h-0 flex-1 flex-col">
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

        <div className="flex flex-col gap-3 border-b border-line px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h2 className="eyebrow">Source text</h2>
            {isEditing && (
              <span
                title="Editing saved summary"
                className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent"
              >
                Editing saved
              </span>
            )}
          </div>
          <SummarySettings />
        </div>

        <div className="flex min-h-[300px] flex-1 flex-col lg:min-h-0">
          {!showMultiText ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 py-14 text-center">
              <p className="max-w-[34ch] text-[13.5px] leading-relaxed text-ink-muted">
                Type or paste the text you want to condense — a paragraph, an
                article, or a full report.
              </p>
              <div className="flex w-full max-w-[320px] flex-col gap-2 sm:w-auto sm:max-w-none sm:flex-row">
                <button
                  type="button"
                  onClick={handleEnterText}
                  className="btn-primary"
                >
                  Type text
                </button>
                <button
                  type="button"
                  onClick={handlePasteText}
                  className="btn-secondary"
                >
                  Paste from clipboard
                </button>
              </div>
            </div>
          ) : (
            <SummaryInputText autoFocus={shouldFocus} />
          )}
        </div>

        <div className="flex flex-col gap-3 border-t border-line px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-muted">
            {formatWithCommas(inputWordsCount)} words
            <span aria-hidden="true" className="mx-2 text-line-strong">
              /
            </span>
            {formatWithCommas(inputCharCount)} characters
          </p>
          <SummaryInputButtons />
        </div>
      </form>
    </section>
  );
};

export default HomeInput;
