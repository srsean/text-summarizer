"use client";
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface PaginationProps {
  page: number;
  pageSize: number;
  itemsCount: number;
}

const Pagination: React.FC<PaginationProps> = ({ page, pageSize, itemsCount }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    console.log("Searching for:", query);
    // Add your search logic here
  };

  const activeStyle = "text-black bg-[#0A0F290A]";

  return (
    <div className="inline-flex gap-3 text-[#0F132499]">
      <button className="flex items-center justify-center w-8 h-8" onClick={handleSearch}>
        <FaArrowLeft />
      </button>

      {Array.from({ length: Math.ceil(itemsCount / pageSize) }, (_, index) => {
        const pageNumber = index + 1;
        return (
          <button
            key={pageNumber}
            className={`flex items-center justify-center w-8 h-8 rounded-xl ${page === pageNumber ? activeStyle : ""}`}
            onClick={() => console.log("Go to page:", pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}

      <button className="flex items-center justify-center w-8 h-8" onClick={handleSearch}>
        <FaArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
