import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#F4F1EA",
          deep: "#EBE6DB",
        },
        surface: "#FCFAF6",
        ink: {
          DEFAULT: "#1D1B17",
          soft: "#4F4B44",
          muted: "#6A645B",
        },
        line: {
          DEFAULT: "#DED8CC",
          strong: "#C6BEAF",
        },
        accent: {
          DEFAULT: "#2F4B6B",
          soft: "#E7EBEF",
        },
        error: {
          DEFAULT: "#A33A2E",
          soft: "#F6E8E4",
        },
        success: {
          DEFAULT: "#2E6047",
          soft: "#E8EEE9",
        },
        warn: {
          DEFAULT: "#8A5A18",
          soft: "#F4EDDF",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        serif: [
          "var(--font-serif)",
          "Iowan Old Style",
          "Palatino Linotype",
          "Book Antiqua",
          "Georgia",
          "serif",
        ],
        mono: [
          "var(--font-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      maxWidth: {
        shell: "1180px",
      },
      boxShadow: {
        pop: "0 16px 40px -20px rgba(29, 27, 23, 0.28)",
      },
    },
  },
  plugins: [],
};
export default config;
