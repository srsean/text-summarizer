"use client";
import React, { useState } from "react";

interface TextInputProps {
  placeholder?: string;
  name?: string;
}

const TextInput: React.FC<TextInputProps> = ({ placeholder = "Enter text", name }) => {
  const [text, setText] = useState("");

  return (
    <div className="relative">
      <input
        type="text"
        name={name}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl"
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextInput;
