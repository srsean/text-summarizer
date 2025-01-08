import React from "react";
import { IoIosClose } from "react-icons/io";

interface ModalProps {
  width?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ width, isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg`}
            style={{ width: width ? width : "500px" }}
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
