"use client";

import React from "react";
// @ts-expect-error
import { useFormStatus } from "react-dom";

interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const SubmitButton: React.FC<ButtonProps> = ({ className = "", children, onClick }) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`w-full text-white bg-gray-900 hover:bg-gray-400 disabled:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${className}`}
      onClick={onClick}
      disabled={pending}
    >
      {children}
    </button>
  );
};

export default SubmitButton;
