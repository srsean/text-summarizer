"use client";

import { useRouter, useSearchParams } from "next/navigation";

const sortOptions = [
  { value: "desc", label: "Newest first" },
  { value: "asc", label: "Oldest first" },
];

const SortFilter: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") === "asc" ? "asc" : "desc";

  const onSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams?.toString() || "");

    if (value === "desc") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    params.delete("page");
    const query = params.toString();
    router.push(query ? `/history?${query}` : "/history");
  };

  return (
    <div className="flex items-center gap-2.5">
      <label htmlFor="history-sort" className="eyebrow">
        Sort
      </label>
      <select
        id="history-sort"
        value={sort}
        onChange={(event) => onSortChange(event.target.value)}
        className="field-select min-w-[132px]"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortFilter;
