"use client";
import React, { useState } from "react";
import { LuEye } from "react-icons/lu";

interface PasswordInputProps {
  name: string;
  placeholder?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ name, placeholder = "Enter your password" }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="text-black w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl"
        placeholder={placeholder}
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute inset-y-0 right-0 px-3 py-2 text-gray-600 focus:outline-none"
      >
        <LuEye color={showPassword ? "#0D1126" : "#0D112666 "} width={18} height={15} />
      </button>
    </div>
  );
};

export default PasswordInput;
