"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface PaginationProps {
  page: number;
  pageSize: number;
  itemsCount: number;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  pageSize,
  itemsCount,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalPages = Math.max(1, Math.ceil(itemsCount / pageSize));

  if (totalPages <= 1) {
    return null;
  }

  const goToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams?.toString() || "");

    if (newPage <= 1) {
      params.delete("page");
    } else {
      params.set("page", newPage.toString());
    }

    const query = params.toString();
    router.push(query ? `/history?${query}` : "/history");
  };

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => goToPage(page - 1)}
        disabled={page <= 1}
        className="btn-secondary h-8 px-3 text-[12px]"
      >
        Previous
      </button>
      <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-muted">
        Page {Math.min(page, totalPages)} of {totalPages}
      </span>
      <button
        type="button"
        onClick={() => goToPage(page + 1)}
        disabled={page >= totalPages}
        className="btn-secondary h-8 px-3 text-[12px]"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
