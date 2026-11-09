"use client";

import useHistoryStore from "@/stores/history-store";
import { TextSummary, TextSummaryStatus } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useAlert } from "./alert";

interface SummaryAction {
  id: number;
  name: string;
  onClick: () => void;
  destructive?: boolean;
}

interface SummaryItemActionsProps {
  textSummary: TextSummary;
}

const SummaryItemActions: React.FC<SummaryItemActionsProps> = ({
  textSummary,
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { showAlert } = useAlert();
  const { setSelectedTextSummary, setMode } = useHistoryStore((state) => state);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(textSummary.output);
    showAlert({ messages: [], type: "success", title: "Copied to clipboard" });
    setIsOpen(false);
  };

  const handleEdit = () => {
    setSelectedTextSummary(textSummary);
    setMode("edit");
    setIsOpen(false);
    router.push("/");
  };

  const handleDelete = () => {
    setSelectedTextSummary(textSummary);
    setMode("delete");
    setIsOpen(false);
  };

  const actions: SummaryAction[] =
    textSummary.status === TextSummaryStatus.ERROR
      ? [
          { id: 1, name: "Try again", onClick: handleEdit },
          { id: 2, name: "Delete", onClick: handleDelete, destructive: true },
        ]
      : [
          { id: 1, name: "Copy summary", onClick: handleCopyToClipboard },
          { id: 2, name: "Edit and resummarize", onClick: handleEdit },
          { id: 3, name: "Delete", onClick: handleDelete, destructive: true },
        ];

  return (
    <div className="relative shrink-0" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={`Actions for summary ${textSummary.id}`}
        className="flex h-8 w-8 items-center justify-center rounded-md text-[18px] leading-none text-ink-muted transition-colors hover:bg-paper-deep hover:text-ink focus-visible:ring-2 focus-visible:ring-accent"
      >
        <span aria-hidden="true">⋯</span>
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-full z-20 mt-1 w-48 rounded-md border border-line bg-surface p-1 shadow-pop"
        >
          {actions.map((action) => (
            <button
              key={action.id}
              type="button"
              role="menuitem"
              onClick={action.onClick}
              className={`w-full rounded px-3 py-2 text-left text-[13px] transition-colors hover:bg-paper focus-visible:ring-2 focus-visible:ring-accent ${
                action.destructive ? "text-error" : "text-ink-soft hover:text-ink"
              }`}
            >
              {action.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SummaryItemActions;
