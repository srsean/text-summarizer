"use client";
import React, { act, useEffect, useRef, useState } from "react";
import { IoIosMore } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { PiTrashFill } from "react-icons/pi";
import { RiFileCopy2Fill } from "react-icons/ri";
import { useAlert } from "./alert";
import { TextSummary } from "@prisma/client";
import useHistoryStore from "@/stores/history-store";
import { useRouter } from "next/navigation";

interface SummaryItemActionsProps {
  textSummary: TextSummary;
}

const SummaryItemActions: React.FC<SummaryItemActionsProps> = ({ textSummary }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { showAlert } = useAlert();
  const { setSelectedTextSummary, setMode } = useHistoryStore((state) => state);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(textSummary.output);
    showAlert({ messages: [], type: "success", title: "Copied to Clipboard!" });
    toggleDropdown();
  };

  const handleEdit = () => {
    setSelectedTextSummary(textSummary);
    setMode("edit");
    toggleDropdown();

    router.push("/");
  };

  const handleDelete = () => {
    setSelectedTextSummary(textSummary);
    setMode("delete");
    toggleDropdown();
  };

  const actions = [
    {
      id: 1,
      name: "Copy to Clipboard",
      icon: <RiFileCopy2Fill className="h-5 w-5 text-[#0F132499]" />,
      onClick: handleCopyToClipboard,
    },
    { id: 2, name: "Edit", icon: <MdEdit className="h-5 w-5 text-[#0F132499]" />, onClick: handleEdit },
    { id: 3, name: "Delete", icon: <PiTrashFill className="h-5 w-5 text-[#0F132499]" />, onClick: handleDelete },
  ];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          onClick={toggleDropdown}
          className="inline-flex gap-2 items-center justify-center w-full rounded-xl border border-gray-300 shadow-sm p-2 bg-white text-sm font-medium text-black hover:bg-gray-50 focus:outline-none"
        >
          <IoIosMore className="text-black" />
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 p-3 mt-2 w-56 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          role="menu"
        >
          {actions.map((action) => (
            <button key={action.id} className="flex items-center w-full hover:bg-gray-100" onClick={action.onClick}>
              {action.icon}
              <span className="block px-4 py-2 text-sm text-gray-700 " role="menuitem">
                {action.name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SummaryItemActions;
