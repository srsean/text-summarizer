import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ type = "button", className = "", children, onClick }) => {
  return (
    <button
      type={type}
      className={`w-full text-white bg-gray-900 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
