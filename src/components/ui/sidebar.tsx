"use client";
import { IoMdLogOut, IoMdMenu, IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { getTextSummaryHistoryCount, getUserData } from "@/app/actions";
import { destroySession } from "@/helpers/session";
import Link from "next/link";
import Avatar from "./avatar";
import Button from "./button";
import SidebarLinks from "./sidebar-links";
import useSidebarStore from "@/stores/sidebar-store";

const Sidebar = () => {
  const { userData, setUserData, setTextSummaryHistoryCount } = useSidebarStore((state) => state);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUserData();
      setUserData(user);
    };
    fetchData();

    const fetchHistoryCount = async () => {
      const historyCount = await getTextSummaryHistoryCount();
      setTextSummaryHistoryCount(historyCount);
    };
    fetchHistoryCount();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/* Toggle Button - Visible only on mobile */}
      <button
        onClick={toggleSidebar}
        className="p-2 fixed top-4 left-4 z-50 bg-gray-800 text-white rounded-full lg:hidden"
      >
        {isSidebarOpen ? <IoMdClose size={24} /> : <IoMdMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[280px] bg-[#14151A] text-white flex flex-col transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-40 lg:translate-x-0 lg:relative lg:flex`}
      >
        <div className="flex flex-col p-3">
          <div className="py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
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
        <SidebarLinks />
      </div>

      {/* Overlay - Visible only on mobile */}
      {isSidebarOpen && (
        <div onClick={toggleSidebar} className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"></div>
      )}
    </div>
  );
};

export default Sidebar;
