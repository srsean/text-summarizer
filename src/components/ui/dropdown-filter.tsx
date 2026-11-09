"use client";

import { useRouter, useSearchParams } from "next/navigation";

const filters = [
  { value: "today", label: "Today" },
  { value: "last-7-days", label: "Last 7 days" },
  { value: "last-30-days", label: "Last 30 days" },
];

const DropdownFilter: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dateRange = searchParams.get("dateRange") || "last-7-days";

  const onFilterChange = (value: string) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("dateRange", value);
    params.delete("page");
    router.push(`/history?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2.5">
      <label htmlFor="history-period" className="eyebrow">
        Period
      </label>
      <select
        id="history-period"
        value={dateRange}
        onChange={(event) => onFilterChange(event.target.value)}
        className="field-select min-w-[132px]"
      >
        {filters.map((filter) => (
          <option key={filter.value} value={filter.value}>
            {filter.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownFilter;
