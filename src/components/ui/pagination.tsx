"use client";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface PaginationProps {
  page: number;
  pageSize: number;
  itemsCount: number;
}

const Pagination: React.FC<PaginationProps> = ({ page, pageSize, itemsCount }) => {
  const router = useRouter();

  const handlePrevious = () => {
    if (page === 1) return;
    router.push(`/history/?page=${page - 1}`);
  };

  const handleNext = () => {
    if (page === Math.ceil(itemsCount / pageSize)) return;
    router.push(`/history/?page=${page + 1}`);
  };

  const activeStyle = "text-black bg-[#0A0F290A]";

  return (
    <div className="inline-flex gap-3 text-[#0F132499]">
      <button className="flex items-center justify-center w-8 h-8" onClick={handlePrevious}>
        <FaArrowLeft />
      </button>

      {Array.from({ length: Math.ceil(itemsCount / pageSize) }, (_, index) => {
        const pageNumber = index + 1;
        return (
          <a
            href={`history?page=${pageNumber}`}
            key={pageNumber}
            className={`flex items-center justify-center w-8 h-8 rounded-xl ${page === pageNumber ? activeStyle : ""}`}
          >
            {pageNumber}
          </a>
        );
      })}

      <button className="flex items-center justify-center w-8 h-8" onClick={handleNext}>
        <FaArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
