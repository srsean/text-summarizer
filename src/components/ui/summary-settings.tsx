"use client";

import useHistoryStore from "@/stores/history-store";
import useHomeStore, {
  SummaryStyle,
  SummaryTone,
} from "@/stores/home-store";
import { useFormStatus } from "react-dom";

const tones: { value: SummaryTone; label: string }[] = [
  { value: "formal", label: "Formal" },
  { value: "casual", label: "Casual" },
  { value: "friendly", label: "Friendly" },
  { value: "professional", label: "Professional" },
];

const styles: { value: SummaryStyle; label: string }[] = [
  { value: "concise", label: "Concise" },
  { value: "persuasive", label: "Persuasive" },
];

const SummarySettings: React.FC = () => {
  const { pending } = useFormStatus();
  const { selectedTextSummary } = useHistoryStore((state) => state);
  const { tone, style, setTone, setStyle } = useHomeStore((state) => state);
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
          value={tone}
          onChange={(event) => setTone(event.target.value as SummaryTone)}
          disabled={pending}
          className="field-select pl-2.5 pr-7 sm:pl-3 sm:pr-8"
        >
          {tones.map((toneOption) => (
            <option key={toneOption.value} value={toneOption.value}>
              {toneOption.label}
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
          value={style}
          onChange={(event) => setStyle(event.target.value as SummaryStyle)}
          disabled={pending}
          className="field-select pl-2.5 pr-7 sm:pl-3 sm:pr-8"
        >
          {styles.map((styleOption) => (
            <option key={styleOption.value} value={styleOption.value}>
              {styleOption.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SummarySettings;
