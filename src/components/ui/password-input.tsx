"use client";

import React, { useState } from "react";

interface PasswordInputProps {
  name: string;
  label: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  name,
  label,
  placeholder,
  autoComplete,
  required = false,
}) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const id = name;

  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          name={name}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="field-input pr-[64px]"
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
        />
        <button
          type="button"
          onClick={() => setShowPassword((show) => !show)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          aria-pressed={showPassword}
          className="absolute inset-y-0 right-0 flex items-center px-3 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-accent"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
