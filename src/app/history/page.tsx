import DropdownFilter from "@/components/ui/dropdown-filter";
import Pagination from "@/components/ui/pagination";
import SearchBar from "@/components/ui/searchbar";
import SummaryItemActions from "@/components/ui/summary-item-actions";
import UserLayout from "@/components/user_layout";
import { formatDateTime } from "@/utils/format-datetime";
import { formatWithCommas } from "@/utils/format-number";
import { TextSummaryStatus } from "@prisma/client";
import type { Metadata } from "next";
import Link from "next/link";
import DeleteTextSummaryHistoryModal from "@/components/delete-history-modal";
import NewSummaryLink from "@/components/new-summary-link";
import { getTextSummaryHistory } from "./actions";

export const metadata: Metadata = {
  title: "History",
};

export default async function History({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = (await searchParams) ?? {};
  const pageParam = typeof params.page === "string" ? params.page : undefined;
  const parsedPage = pageParam ? parseInt(pageParam, 10) : 1;
  const page = Number.isNaN(parsedPage) ? 1 : Math.max(1, parsedPage);
  const search = typeof params.search === "string" ? params.search : "";
  const dateRange =
    typeof params.dateRange === "string" ? params.dateRange : "last-7-days";

  const textSummaryHistory = await getTextSummaryHistory({
    page,
    search,
    dateRange,
  });

  const items = textSummaryHistory.data ?? [];
  const totalCount = textSummaryHistory.totalCount ?? 0;
  const pageSize = textSummaryHistory.pageSize;
  const start = items.length > 0 ? (page - 1) * pageSize + 1 : 0;
  const end = items.length > 0 ? start + items.length - 1 : 0;
  const hasSearch = search.trim().length > 0;

  return (
    <UserLayout>
      <DeleteTextSummaryHistoryModal />

      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Archive</p>
          <h1 className="mt-3 font-serif text-[36px] leading-[1.05] tracking-[-0.02em] text-ink sm:text-[44px]">
            History
          </h1>
          <p className="mt-3.5 max-w-[56ch] text-[14.5px] leading-relaxed text-ink-soft">
            Revisit, reuse, and manage the summaries you&apos;ve created.
          </p>
        </div>
        <NewSummaryLink className="btn-secondary self-start sm:self-auto">
          New summary
        </NewSummaryLink>
      </div>

      <div className="mt-8 sm:mt-10">
        <div className="flex flex-col gap-3 border-y border-line py-3.5 sm:flex-row sm:items-center sm:justify-between">
          <DropdownFilter />
          <SearchBar />
        </div>

        {items.length === 0 ? (
          <div className="border-b border-line py-16 sm:py-20">
            <div className="max-w-[46ch]">
              <h2 className="font-serif text-[26px] leading-tight tracking-[-0.01em] text-ink">
                {hasSearch
                  ? "No matching summaries."
                  : "No summaries in this period."}
              </h2>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-soft">
                {hasSearch
                  ? "Try a different search term, or clear the search to see everything in this period."
                  : "Choose a wider period above, or create a new summary from your workspace."}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
                {hasSearch ? (
                  <Link
                    href={`/history?dateRange=${encodeURIComponent(dateRange)}`}
                    className="btn-secondary"
                  >
                    Clear search
                  </Link>
                ) : null}
                <NewSummaryLink className="link-underline text-[13px]">
                  Open the workspace
                </NewSummaryLink>
              </div>
            </div>
          </div>
        ) : (
          <ul className="divide-y divide-line">
            {items.map((textSummary) => {
              const hasError =
                textSummary.status === TextSummaryStatus.ERROR;

              return (
                <li
                  key={textSummary.id}
                  className="transition-colors hover:bg-surface/80"
                >
                  <div className="flex items-start justify-between gap-4 py-5">
                    <div className="min-w-0 flex-1">
                      {hasError ? (
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <p className="text-[13.5px] font-medium text-error">
                            Summary generation failed
                          </p>
                          <p className="text-[12.5px] text-ink-muted">
                            Retry from the actions menu.
                          </p>
                        </div>
                      ) : (
                        <p className="line-clamp-2 font-serif text-[16.5px] leading-[1.6] text-ink">
                          {textSummary.output}
                        </p>
                      )}

                      <div className="mt-2.5 flex flex-col gap-1 font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-muted sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2.5">
                        <time dateTime={textSummary.created_at.toISOString()}>
                          {formatDateTime(textSummary.created_at)}
                        </time>
                        <span
                          aria-hidden="true"
                          className="hidden text-line-strong sm:inline"
                        >
                          ·
                        </span>
                        <span>
                          {textSummary.tone}
                          <span
                            aria-hidden="true"
                            className="mx-1.5 text-line-strong"
                          >
                            ·
                          </span>
                          {textSummary.style}
                        </span>
                        <span
                          aria-hidden="true"
                          className="hidden text-line-strong sm:inline"
                        >
                          ·
                        </span>
                        <span>
                          {formatWithCommas(textSummary.outputWordCount)} words
                          <span
                            aria-hidden="true"
                            className="mx-1.5 text-line-strong"
                          >
                            ·
                          </span>
                          {formatWithCommas(textSummary.outputCharCount)}{" "}
                          characters
                        </span>
                      </div>
                    </div>

                    <SummaryItemActions textSummary={textSummary} />
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-muted">
            {items.length === 0
              ? "No entries"
              : `Showing ${start}–${end} of ${totalCount} entries`}
          </p>
          <Pagination
            page={page}
            pageSize={pageSize}
            itemsCount={totalCount}
          />
        </div>
      </div>
    </UserLayout>
  );
}
