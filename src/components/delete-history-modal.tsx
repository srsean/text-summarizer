"use client";
import useHistoryStore from "@/stores/history-store";
import React, { useEffect } from "react";
import Modal from "./ui/modal";
// @ts-ignore
import { useFormState } from "react-dom";
import { deleteTextSummaryHistory } from "@/app/history/actions";
import { IoIosClose } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useAlert } from "./ui/alert";

const initialState = {
  error: false,
  messages: [],
};

const DeleteTextSummaryHistoryModal: React.FC = () => {
  const { showAlert } = useAlert();
  const router = useRouter();
  const [formState, formAction] = useFormState(deleteTextSummaryHistory, initialState);
  const { selectedTextSummary, mode, setMode, setSelectedTextSummary } = useHistoryStore((state) => state);

  const isOpen = (selectedTextSummary && mode === "delete") ?? false;

  useEffect(() => {
    if (formState.error && formState.messages.length > 0) {
      showAlert({
        title: formState.title || "Error",
        messages: formState.messages,
        type: "error",
      });
    } else if (!formState.error && formState.messages.length > 0) {
      showAlert({
        title: formState.title || "Success",
        messages: formState.messages,
        type: "success",
      });

      setTimeout(() => {
        router.refresh();
      }, 500);

      setMode(null);
      setSelectedTextSummary(null);
    }
  }, [formState]);

  const onHide = () => {
    setMode(null);
    setSelectedTextSummary(null);
  };

  return (
    <Modal width="400px" isOpen={isOpen} onClose={onHide}>
      <form action={formAction}>
        <input type="hidden" name="textSummaryId" value={selectedTextSummary?.id} />
        <div className="flex items-start">
          <div>
            <h3 className="text-base font-semibold text-gray-900" id="modal-title">
              Delete summarized text?
            </h3>
            <div className="my-2">
              <p className="text-sm text-gray-500">You will not be able to recover it.</p>
            </div>
            <div>
              <button
                type="button"
                className="absolute top-0 right-0 m-4 text-gray-400 hover:text-gray-500 rounded-full bg-[#0A0F290A]"
                onClick={onHide}
              >
                <span className="sr-only">Close</span>
                <IoIosClose className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-row">
          <button
            type="button"
            className="mt-3 flex flex-grow justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            onClick={onHide}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex flex-grow justify-center rounded-xl bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          >
            Delete
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default DeleteTextSummaryHistoryModal;
