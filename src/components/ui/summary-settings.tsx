"use client";

import useHistoryStore from "@/stores/history-store";
import useHomeStore, {
  SummaryStyle,
  SummaryTone,
} from "@/stores/home-store";
import { STYLE_THEMES } from "@/utils/style-theme";
import { useFormStatus } from "react-dom";

const tones: { value: SummaryTone; label: string }[] = [
  { value: "formal", label: "Formal" },
  { value: "casual", label: "Casual" },
  { value: "friendly", label: "Friendly" },
  { value: "professional", label: "Professional" },
];

const styles: SummaryStyle[] = ["concise", "persuasive"];

const SummarySettings: React.FC = () => {
  const { pending } = useFormStatus();
  const { selectedTextSummary } = useHistoryStore((state) => state);
  const { tone, style, setTone, setStyle } = useHomeStore((state) => state);
  const styleTheme = STYLE_THEMES[style];
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
          className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted"
        >
          <span
            aria-hidden="true"
            className={`h-1.5 w-1.5 rounded-full ${styleTheme.dotClass}`}
          />
          Style
        </label>
        <select
          key={`style-${summaryKey}`}
          id="style"
          name="style"
          value={style}
          onChange={(event) => setStyle(event.target.value as SummaryStyle)}
          disabled={pending}
          className={`field-select pl-2.5 pr-7 sm:pl-3 sm:pr-8 ${styleTheme.textClass}`}
        >
          {styles.map((styleOption) => {
            const optionTheme = STYLE_THEMES[styleOption];

            return (
              <option
                key={styleOption}
                value={styleOption}
                style={optionTheme.optionStyle}
              >
                {optionTheme.label}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default SummarySettings;
