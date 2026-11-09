import Link from "next/link";

interface WordmarkProps {
  className?: string;
}

const Wordmark = ({ className = "" }: WordmarkProps) => {
  return (
    <Link
      href="/"
      className={`whitespace-nowrap font-serif text-[18px] font-medium leading-none tracking-[-0.01em] text-ink sm:text-[21px] ${className}`}
    >
      Text Summarizer<span className="text-accent">.</span>
    </Link>
  );
};

export default Wordmark;
