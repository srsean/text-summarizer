import { STYLE_THEMES, type SummaryStyleKey } from "@/utils/style-theme";

interface HighlightedTextProps {
  text: string;
  highlights?: string[];
  style: SummaryStyleKey;
}

interface HighlightRange {
  start: number;
  end: number;
}

function findHighlightRanges(
  text: string,
  highlights: string[]
): HighlightRange[] {
  const ranges: HighlightRange[] = [];
  const lowerText = text.toLowerCase();
  const uniqueHighlights = Array.from(
    new Set(
      highlights
        .map((highlight) => highlight.trim())
        .filter((highlight) => highlight.length > 0)
    )
  ).sort((a, b) => b.length - a.length);

  for (const highlight of uniqueHighlights) {
    const start = lowerText.indexOf(highlight.toLowerCase());

    if (start === -1) {
      continue;
    }

    const end = start + highlight.length;
    const overlaps = ranges.some(
      (range) => start < range.end && end > range.start
    );

    if (!overlaps) {
      ranges.push({ start, end });
    }
  }

  return ranges.sort((a, b) => a.start - b.start);
}

const HighlightedText: React.FC<HighlightedTextProps> = ({
  text,
  highlights,
  style,
}) => {
  const ranges = findHighlightRanges(text, highlights ?? []);

  if (ranges.length === 0) {
    return <>{text}</>;
  }

  const styleTheme = STYLE_THEMES[style];
  const nodes: React.ReactNode[] = [];
  let cursor = 0;

  ranges.forEach((range, index) => {
    if (range.start > cursor) {
      nodes.push(text.slice(cursor, range.start));
    }

    nodes.push(
      <mark
        key={`${range.start}-${index}`}
        className={`rounded-sm px-0.5 font-medium ${styleTheme.highlightClass}`}
      >
        {text.slice(range.start, range.end)}
      </mark>
    );

    cursor = range.end;
  });

  if (cursor < text.length) {
    nodes.push(text.slice(cursor));
  }

  return <>{nodes}</>;
};

export default HighlightedText;
