"use server";
import { IoMdLogOut } from "react-icons/io";

import { getTextSummaryHistoryCount, getUserData } from "@/app/actions";
import { destroySession } from "@/helpers/session";
import { headers } from "next/headers";
import Link from "next/link";
import Avatar from "./avatar";
import Button from "./button";
import SidebarLinks from "./sidebar-links";

const Sidebar = async () => {
  const userData = await getUserData();
  const historyCount = await getTextSummaryHistoryCount();

  return (
    <div className="h-full w-[280px] bg-[#14151A] text-white flex flex-col">
      <div className="flex flex-col p-3">
        <div className="py-4 flex justify-between items-center">
          <div className="  flex items-center space-x-4">
            <Avatar name={`${userData?.firstName} ${userData?.lastName}`} />
            <div className="flex flex-col">
              <span className="font-semibold text-[14px]">
                {userData?.firstName} {userData?.lastName}
              </span>
              <span className="text-[12px] text-[#FFFFFF99]">{userData?.email}</span>
            </div>
          </div>
          <form action={destroySession as unknown as string}>
            <button type="submit" className="cursor-pointer text-[#FFFFFF99]">
              <IoMdLogOut size={20} />
            </button>
          </form>
        </div>
        <Link href="/">
          <Button className="p-4 bg-white !text-black rounded-xl">+ Summarize Text</Button>
        </Link>
      </div>
      <SidebarLinks historyCount={historyCount} />
    </div>
  );
};

export default Sidebar;
