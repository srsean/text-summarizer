"use client";

import { useAlert } from "./alert";
import React, { useEffect, useActionState } from "react";
import { useRouter } from "next/navigation";

type FormProps = {
  action: any;
  initialState: any;
  children: React.ReactNode;
};

export function Form({ action, initialState, children }: FormProps) {
  const { showAlert } = useAlert();
  const router = useRouter();

  const [formState, formAction] = useActionState(action, initialState);

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
        setTimeout(() => {
          router.push(formState.redirect_url);
        }, 500);
      }
    }
  }, [formState]);

  return (
    <form className="space-y-5" action={formAction}>
      {children}
    </form>
  );
}
