"use client";

import { debounce } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const SearchBar: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [value, setValue] = useState(searchQuery);
  const paramsRef = useRef(searchParams);

  useEffect(() => {
    paramsRef.current = searchParams;
  }, [searchParams]);

  useEffect(() => {
    if (document.activeElement?.id !== "history-search") {
      setValue(searchQuery);
    }
  }, [searchQuery]);

  const pushSearch = useRef(
    debounce((nextValue: string) => {
      const params = new URLSearchParams(paramsRef.current?.toString() || "");

      if (nextValue.trim()) {
        params.set("search", nextValue);
      } else {
        params.delete("search");
      }

      params.delete("page");
      router.push(`/history?${params.toString()}`);
    }, 400)
  ).current;

  useEffect(() => {
    return () => pushSearch.cancel();
  }, [pushSearch]);

  return (
    <div className="relative w-full sm:w-[280px]">
      <label htmlFor="history-search" className="sr-only">
        Search summaries
      </label>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <input
        id="history-search"
        type="search"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          pushSearch(event.target.value);
        }}
        placeholder="Search summaries"
        className="field-input h-9 pl-9 text-[13px]"
      />
    </div>
  );
};

export default SearchBar;
