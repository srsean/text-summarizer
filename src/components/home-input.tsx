"use client";

import { summaryText } from "@/app/actions";
import useHomeStore, {
  SummaryStyle,
  SummaryTone,
} from "@/stores/home-store";
import { formatWithCommas } from "@/utils/format-number";
import useHistoryStore from "@/stores/history-store";
import { TextSummaryResponse } from "@/types/text-summary";
import { useEffect, useState, useActionState } from "react";
import SummaryInputButtons from "./ui/summary-input-buttons";
import SummaryInputText from "./ui/summary-input-text";
import SummarySettings from "./ui/summary-settings";
import { useAlert } from "./ui/alert";

const initialState: TextSummaryResponse = {
  error: false,
  messages: [],
};

interface HomeInputProps {
  guest?: string;
}

const HomeInput: React.FC<HomeInputProps> = ({ guest }) => {
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
  const [formState, formAction] = useActionState<
    TextSummaryResponse,
    FormData
  >(summaryText, initialState);

  const [shouldFocus, setShouldFocus] = useState(false);

  const [alert, setAlert] = useState<{
    type: "error" | "success";
    messages: string[];
  } | null>(null);

  const isEditing = Boolean(selectedTextSummary && mode === "edit");

  useEffect(() => {
    if (formState?.data?.input && !formState.error) {
      const { input, output, tone, style } = formState.data;
      const resultTone = tone.toLowerCase() as SummaryTone;
      const resultStyle = style.toLowerCase() as SummaryStyle;

      setInputWords(input || "");
      setOutputWords(output || "");
      setTone(resultTone);
      setStyle(resultStyle);
      setOutputSettings(resultTone, resultStyle);
      setAlert({ type: "success", messages: formState.messages });
    }

    if (formState?.error) {
      setAlert({ type: "error", messages: formState.messages });
    }
  }, [formState]);

  useEffect(() => {
    if (selectedTextSummary && mode === "edit") {
      const resultTone = selectedTextSummary.tone.toLowerCase() as SummaryTone;
      const resultStyle = selectedTextSummary.style.toLowerCase() as SummaryStyle;

      setInputWords(selectedTextSummary.input);
      setOutputWords(selectedTextSummary.output);
      setTone(resultTone);
      setStyle(resultStyle);
      setOutputSettings(resultTone, resultStyle);
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
      {alert && (
        <div
          role={alert.type === "error" ? "alert" : "status"}
          aria-live={alert.type === "error" ? "assertive" : "polite"}
          className={`flex items-start justify-between gap-3 border-b px-5 py-3 sm:px-6 ${
            alert.type === "error" ? "bg-error-soft" : "bg-success-soft"
          }`}
        >
          <div className="flex min-w-0 gap-2.5">
            <span
              aria-hidden="true"
              className={`mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full ${
                alert.type === "error" ? "bg-error" : "bg-success"
              }`}
            />
            <div className="min-w-0">
              <p className="text-[12.5px] font-medium text-ink">
                {alert.type === "error" ? "Summary failed" : "Summary generated"}
              </p>
              {alert.messages.map((msg, idx) => (
                <p key={idx} className="mt-0.5 text-[12.5px] leading-relaxed text-ink-soft">
                  {msg}
                </p>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setAlert(null)}
            aria-label="Dismiss message"
            className="-mr-1 flex h-7 w-7 shrink-0 items-center justify-center rounded text-[18px] leading-none text-ink-muted transition-colors hover:bg-white/60 hover:text-ink focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
      )}

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
