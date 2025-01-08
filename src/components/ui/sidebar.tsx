"use server";
import React from "react";
import { RiHomeSmile2Fill } from "react-icons/ri";
import { HiClock } from "react-icons/hi2";
import { IoMdLogOut } from "react-icons/io";

import Button from "./button";
import { destroySession } from "@/helpers/session";
import Link from "next/link";
import Avatar from "./avatar";
import { getUserData } from "@/app/actions";
import type { NextRequest } from "next/server";
import { headers } from "next/headers";

const routes = [
  {
    title: "Home",
    icon: <RiHomeSmile2Fill size={15} />,
    route: "",
  },
  {
    title: "History",
    icon: <HiClock size={15} />,
    badge: 15,
    route: "/history",
  },
];

const Sidebar = async () => {
  const heads = headers();
  const pathname = heads.get("x-invoke-path") || "";
  const userData = await getUserData();

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
          {/* <IoMdLogOut className="cursor-pointer text-[#FFFFFF99]" size={20} onClick={handleLogout} /> */}
        </div>
        <Link href="/">
          <Button className="p-4 bg-white !text-black rounded-xl">+ Summarize Text</Button>
        </Link>
      </div>
      <ul className="flex-1 p-2 space-y-2">
        {routes.map((route) => (
          <li
            key={route.title}
            className={`flex items-center gap-3 p-2 rounded-xl ${
              pathname === route.route ? "bg-[#FFFFFF14]" : "hover:bg-[#FFFFFF14]"
            }`}
          >
            <Link href={route.route} className="flex items-center gap-3 w-full">
              {route.icon}
              <span>{route.title}</span>
              {route.badge && (
                <span className="bg-[#3368F04D] border border-[#FFFFFF24] text-xs rounded-sm px-1">{route.badge}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
