"use client";

import React, { useState } from "react";

interface TextInputProps {
  label: string;
  name: string;
  type?: "text" | "email";
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
  required = false,
}) => {
  const [text, setText] = useState("");
  const id = name;

  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="field-input"
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
      />
    </div>
  );
};

export default TextInput;
