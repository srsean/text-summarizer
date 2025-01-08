"use client";

// @ts-expect-error
import { useFormState } from "react-dom";
import Alert, { useAlert } from "./alert";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

type FormProps = {
  action: any;
  initialState: any;
  children: React.ReactNode;
};

export function Form({ action, initialState, children }: FormProps) {
  const { showAlert } = useAlert();
  const router = useRouter();

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

      if (formState.redirect_url) {
        router.push(formState.redirect_url);
      }
    }
  }, [formState]);

  return (
    <form className="space-y-4 md:space-y-6" action={formAction}>
      {children}
    </form>
  );
}
