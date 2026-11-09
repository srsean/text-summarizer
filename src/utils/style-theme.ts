export type SummaryStyleKey = "concise" | "persuasive";

interface StyleTheme {
  label: string;
  textClass: string;
  dotClass: string;
  badgeClass: string;
  highlightClass: string;
  optionStyle: {
    color: string;
    backgroundColor: string;
  };
}

export const STYLE_THEMES: Record<SummaryStyleKey, StyleTheme> = {
  concise: {
    label: "Concise",
    textClass: "text-accent",
    dotClass: "bg-accent",
    badgeClass: "bg-accent-soft text-accent",
    highlightClass: "bg-accent-soft text-accent",
    optionStyle: {
      color: "#2F4B6B",
      backgroundColor: "#E7EBEF",
    },
  },
  persuasive: {
    label: "Persuasive",
    textClass: "text-warn",
    dotClass: "bg-warn",
    badgeClass: "bg-warn-soft text-warn",
    highlightClass: "bg-warn-soft text-warn",
    optionStyle: {
      color: "#8A5A18",
      backgroundColor: "#F4EDDF",
    },
  },
};
