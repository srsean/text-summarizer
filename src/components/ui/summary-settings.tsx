"use client";

import useHistoryStore from "@/stores/history-store";
import { useFormStatus } from "react-dom";

const tones = [
  { value: "formal", label: "Formal" },
  { value: "casual", label: "Casual" },
  { value: "friendly", label: "Friendly" },
  { value: "professional", label: "Professional" },
];

const styles = [
  { value: "concise", label: "Concise" },
  { value: "persuasive", label: "Persuasive" },
];

const SummarySettings: React.FC = () => {
  const { pending } = useFormStatus();
  const { selectedTextSummary, mode } = useHistoryStore((state) => state);
  const isEditing = Boolean(selectedTextSummary && mode === "edit");
  const summaryKey = selectedTextSummary?.id ?? "new";

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 sm:gap-x-4">
      <div className="flex items-center gap-1.5 sm:gap-2">
        <label
          htmlFor="tone"
          className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted"
        >
          Tone
        </label>
        <select
          key={`tone-${summaryKey}`}
          id="tone"
          name="tone"
          defaultValue={
            isEditing ? selectedTextSummary?.tone.toLowerCase() : "formal"
          }
          disabled={pending}
          className="field-select pl-2.5 pr-7 sm:pl-3 sm:pr-8"
        >
          {tones.map((tone) => (
            <option key={tone.value} value={tone.value}>
              {tone.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2">
        <label
          htmlFor="style"
          className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted"
        >
          Style
        </label>
        <select
          key={`style-${summaryKey}`}
          id="style"
          name="style"
          defaultValue={
            isEditing ? selectedTextSummary?.style.toLowerCase() : "concise"
          }
          disabled={pending}
          className="field-select pl-2.5 pr-7 sm:pl-3 sm:pr-8"
        >
          {styles.map((style) => (
            <option key={style.value} value={style.value}>
              {style.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SummarySettings;
