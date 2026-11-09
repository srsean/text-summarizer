"use client";

import { summaryText } from "@/app/actions";
import useHomeStore, {
  SummaryStyle,
  SummaryTone,
} from "@/stores/home-store";
import { TextSummaryResponse } from "@/types/text-summary";
import { useActionState, useEffect, useState } from "react";
import HomeInput from "./home-input";
import HomeOutput from "./home-output";

const initialState: TextSummaryResponse = {
  error: false,
  messages: [],
};

interface SummaryWorkspaceProps {
  guest?: string;
}

const SummaryWorkspace: React.FC<SummaryWorkspaceProps> = ({ guest }) => {
  const {
    setInputWords,
    setOutputWords,
    setTone,
    setStyle,
    setOutputSettings,
  } = useHomeStore((state) => state);
  const [formState, formAction] = useActionState<
    TextSummaryResponse,
    FormData
  >(summaryText, initialState);
  const [alert, setAlert] = useState<{
    type: "error" | "success";
    messages: string[];
  } | null>(null);

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

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-line bg-surface lg:h-[calc(100dvh-21rem)] lg:min-h-[520px] lg:max-h-[760px]">
      {alert && (
        <div
          role={alert.type === "error" ? "alert" : "status"}
          aria-live={alert.type === "error" ? "assertive" : "polite"}
          className={`flex shrink-0 items-start justify-between gap-3 border-b px-5 py-3 sm:px-6 ${
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

      <div className="grid min-h-0 flex-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <HomeInput guest={guest} formAction={formAction} />
        <HomeOutput />
      </div>
    </div>
  );
};

export default SummaryWorkspace;
