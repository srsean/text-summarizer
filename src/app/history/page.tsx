"use server";
import DropdownFilter from "@/components/ui/dropdown-filter";
import SearchBar from "@/components/ui/searchbar";
import SummaryItemActions from "@/components/ui/summary-item-actions";
import UserLayout from "@/components/user_layout";
import { FaCalendar } from "react-icons/fa6";
import { RiText } from "react-icons/ri";
import { getTextSummaryHistory } from "./actions";

import Pagination from "@/components/ui/pagination";
import { formatDateTime } from "@/utils/format-datetime";
import { RxTextAlignLeft } from "react-icons/rx";

import DeleteTextSummaryHistoryModal from "@/components/delete-history-modal";

export default async function History({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams?.page ? parseInt(searchParams.page as string) : 1;
  const search = (searchParams?.search ? searchParams.search : "") as string;
  const dateRange = (searchParams?.dateRange ? searchParams.dateRange : "") as string;

  const textSummaryHistory = await getTextSummaryHistory({ page, search, dateRange });

  return (
    <UserLayout>
      <DeleteTextSummaryHistoryModal />
      <div className="flex flex-col px-6 py-8 mx-auto lg:py-0 h-full w-full text-black">
        <div className="flex flex-col mb-5">
          <h1 className="font-bold text-[22px]">History</h1>
          <p className="text-[14px] text-[#0F132499]">View previously summarized texts</p>
        </div>
        <div className="flex flex-row items-center justify-between w-full mb-5">
          <DropdownFilter />
          <SearchBar />
        </div>
        <div className="flex flex-col flex-grow items-center justify-between w-full mb-5">
          {textSummaryHistory.data?.map((textSummary) => (
            <div
              key={textSummary.id}
              className="flex flex-col gap-5 items-center justify-between w-full p-5 mb-5 border border-lg rounded-xl"
            >
              <div className="flex flex-row w-full justify-between gap-5">
                <span className="line-clamp-3 overflow-hidden text-ellipsis text-[14px]">{textSummary.output}</span>
                <SummaryItemActions textSummary={textSummary} />
              </div>
              <div className="flex flex-row gap-5 w-full">
                <div className="bg-[#E9EAEC] px-3 py-2 text-[#0F132499] text-[14px] inline-flex items-center gap-2 rounded-xl">
                  <FaCalendar className="text-[#0F132499]" />
                  <span>{formatDateTime(textSummary.created_at)}</span>
                </div>
                <div className="bg-[#E9EAEC] px-3 py-2 text-[#0F132499] text-[14px] inline-flex items-center gap-2 rounded-xl">
                  <RxTextAlignLeft className="text-[#0F132499] text-[20px]" />
                  <span>{textSummary.outputWordCount} Words</span>
                </div>
                <div className="bg-[#E9EAEC] px-3 py-2 text-[#0F132499] text-[14px] inline-flex items-center gap-2 rounded-xl">
                  <RiText className="text-[#0F132499]" />
                  <span>{textSummary.outputCharCount} Characters</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-row items-center justify-between w-full mb-5">
          <span>
            Show 1 to {textSummaryHistory.data?.length} of {textSummaryHistory.totalCount} entries
          </span>
          <Pagination
            page={textSummaryHistory.page}
            pageSize={textSummaryHistory.pageSize}
            itemsCount={textSummaryHistory.totalCount || 0}
          />
        </div>
      </div>
    </UserLayout>
  );
}
