"use client";

import useHistoryStore from "@/stores/history-store";
import useHomeStore from "@/stores/home-store";
import Link from "next/link";

interface NewSummaryLinkProps {
  className?: string;
  children: React.ReactNode;
}

const NewSummaryLink = ({ className, children }: NewSummaryLinkProps) => {
  const { setSelectedTextSummary, setMode } = useHistoryStore((state) => state);
  const { setInputWords, setOutputWords } = useHomeStore((state) => state);

  return (
    <Link
      href="/"
      className={className}
      onClick={() => {
        setSelectedTextSummary(null);
        setMode(null);
        setInputWords("");
        setOutputWords("");
      }}
    >
      {children}
    </Link>
  );
};

export default NewSummaryLink;
