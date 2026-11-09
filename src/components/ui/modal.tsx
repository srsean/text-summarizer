"use client";

import React, { useEffect } from "react";

interface ModalProps {
  width?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  width = "420px",
  isOpen,
  onClose,
  children,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-ink/40"
        aria-hidden="true"
        onClick={onClose}
      ></div>
      <div className="relative flex min-h-full items-center justify-center p-4">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="relative w-full rounded-lg border border-line bg-surface shadow-pop"
          style={{ maxWidth: width }}
        >
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
