"use client";

import useHistoryStore from "@/stores/history-store";
import React, { useEffect, useActionState } from "react";
import Modal from "./ui/modal";
import { deleteTextSummaryHistory } from "@/app/history/actions";
import { DeleteTextSummaryResponse } from "@/types/text-summary";
import { useRouter } from "next/navigation";
import { useAlert } from "./ui/alert";
import { useFormStatus } from "react-dom";

const initialState: DeleteTextSummaryResponse = {
  error: false,
  messages: [],
};

const ModalActions = ({ onClose }: { onClose: () => void }) => {
  const { pending } = useFormStatus();

  return (
    <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
      <button
        type="button"
        className="btn-secondary w-full sm:w-auto"
        onClick={onClose}
        disabled={pending}
      >
        Cancel
      </button>
      <button
        type="submit"
        className="btn-danger w-full sm:w-auto"
        disabled={pending}
      >
        {pending && <span className="spinner" aria-hidden="true" />}
        {pending ? "Deleting…" : "Delete summary"}
      </button>
    </div>
  );
};

const DeleteTextSummaryHistoryModal: React.FC = () => {
  const { showAlert } = useAlert();
  const router = useRouter();
  const [formState, formAction] = useActionState<
    DeleteTextSummaryResponse,
    FormData
  >(deleteTextSummaryHistory, initialState);
  const { selectedTextSummary, mode, setMode, setSelectedTextSummary } =
    useHistoryStore((state) => state);

  const isOpen = Boolean(selectedTextSummary && mode === "delete");

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
    <Modal width="420px" isOpen={isOpen} onClose={onHide}>
      <form action={formAction}>
        <input
          type="hidden"
          name="textSummaryId"
          value={selectedTextSummary?.id}
        />
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              className="font-serif text-[23px] leading-tight tracking-[-0.01em] text-ink"
              id="modal-title"
            >
              Delete this summary?
            </h2>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
              This entry will be permanently removed. You won&apos;t be able to
              recover it.
            </p>
          </div>
          <button
            type="button"
            onClick={onHide}
            aria-label="Close dialog"
            className="-mr-1 -mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded text-[20px] leading-none text-ink-muted transition-colors hover:bg-paper hover:text-ink focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <ModalActions onClose={onHide} />
      </form>
    </Modal>
  );
};

export default DeleteTextSummaryHistoryModal;
