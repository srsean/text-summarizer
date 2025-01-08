"use client";
import { useEffect } from "react";
import { HiClock } from "react-icons/hi2";
import { RiHomeSmile2Fill } from "react-icons/ri";

import useSidebarStore from "@/stores/sidebar-store";
import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = (historyCount: number) => [
  {
    title: "Home",
    icon: <RiHomeSmile2Fill size={15} />,
    route: "",
  },
  {
    title: "History",
    icon: <HiClock size={15} />,
    badge: historyCount,
    route: "/history",
  },
];

const SidebarLinks = ({ historyCount }: { historyCount: number }) => {
  const pathname = usePathname();
  const { textSummaryHistoryCount, setTextSummaryHistoryCount } = useSidebarStore((state) => state);

  useEffect(() => {
    setTextSummaryHistoryCount(historyCount);
  }, [historyCount]);

  return (
    <ul className="flex-1 p-2 space-y-2">
      {routes(textSummaryHistoryCount).map((route) => (
        <li
          key={route.title}
          className={`flex items-center gap-3 p-2 rounded-xl ${
            pathname === route.route ? "bg-[#FFFFFF14]" : "hover:bg-[#FFFFFF14]"
          }`}
        >
          <Link href={route.route} className="flex items-center gap-3 w-full">
            {route.icon}
            <span>{route.title}</span>
            {route.badge !== undefined && (
              <span className="bg-[#3368F04D] border border-[#FFFFFF24] text-xs rounded-sm px-1">{route.badge}</span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarLinks;
