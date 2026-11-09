import AuthShell from "@/components/auth-shell";
import { Form } from "@/components/ui/form";
import PasswordInput from "@/components/ui/password-input";
import SubmitButton from "@/components/ui/submit-button";
import TextInput from "@/components/ui/text-input";
import { UserLoginResponse } from "@/types/auth";
import type { Metadata } from "next";
import Link from "next/link";
import { loginUser } from "./actions";

const initialState: UserLoginResponse = {
  error: false,
  messages: [],
};

export const metadata: Metadata = {
  title: "Log in",
};

export default async function Login() {
  return (
    <AuthShell>
      <div>
        <p className="eyebrow">Account</p>
        <h1 className="mt-3 font-serif text-[32px] leading-[1.15] tracking-[-0.02em] text-ink sm:text-[36px]">
          Welcome back
        </h1>
        <p className="mt-3 text-[13.5px] leading-relaxed text-ink-soft">
          Sign in to continue to your summary workspace.
        </p>
      </div>

      <div className="mt-8">
        <Form initialState={initialState} action={loginUser}>
          <TextInput
            name="username"
            label="Username or email"
            autoComplete="username"
            required
          />
          <PasswordInput
            name="password"
            label="Password"
            autoComplete="current-password"
            required
          />
          <SubmitButton pendingLabel="Signing in…">Log in</SubmitButton>
        </Form>
      </div>

      <div className="mt-8 space-y-2.5 border-t border-line pt-5 text-[13px] text-ink-soft">
        <p>
          New here?{" "}
          <Link href="/register" className="link-underline">
            Create an account
          </Link>
        </p>
        <p className="text-ink-muted">
          Just exploring?{" "}
          <Link href="/?guest=true" className="link-underline text-ink-soft">
            Try a summary as a guest
          </Link>{" "}
          — one per visitor.
        </p>
      </div>
    </AuthShell>
  );
}
