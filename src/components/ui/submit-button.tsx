"use client";

import React from "react";
import { useFormStatus } from "react-dom";

interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  pendingLabel?: string;
}

const SubmitButton: React.FC<ButtonProps> = ({
  className = "",
  children,
  pendingLabel = "Please wait…",
}) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`btn-primary w-full ${className}`}
      disabled={pending}
    >
      {pending && <span className="spinner" aria-hidden="true" />}
      {pending ? pendingLabel : children}
    </button>
  );
};

export default SubmitButton;
