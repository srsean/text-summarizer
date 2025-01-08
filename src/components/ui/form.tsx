"use client";

// @ts-expect-error
import { useFormState } from "react-dom";
import Alert, { useAlert } from "./alert";
import React, { useEffect } from "react";

export function Form({
  action,
  initialState,
  children,
}: {
  action: any;
  initialState: any;
  children: React.ReactNode;
}) {
  const { showAlert } = useAlert();

  const [formState, formAction] = useFormState(action, initialState);

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
    }
  }, [formState]);

  return (
    <form className="space-y-4 md:space-y-6" action={formAction}>
      {children}
    </form>
  );
}
