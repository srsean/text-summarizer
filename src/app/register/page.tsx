import AuthShell from "@/components/auth-shell";
import { Form } from "@/components/ui/form";
import PasswordInput from "@/components/ui/password-input";
import SubmitButton from "@/components/ui/submit-button";
import TextInput from "@/components/ui/text-input";
import { UserRegistrationResponse } from "@/types/auth";
import type { Metadata } from "next";
import Link from "next/link";
import { registerUser } from "./actions";

const initialState: UserRegistrationResponse = {
  error: false,
  messages: [],
};

export const metadata: Metadata = {
  title: "Create account",
};

export default async function Register() {
  return (
    <AuthShell>
      <div>
        <p className="eyebrow">Account</p>
        <h1 className="mt-3 font-serif text-[32px] leading-[1.15] tracking-[-0.02em] text-ink sm:text-[36px]">
          Create your account
        </h1>
        <p className="mt-3 text-[13.5px] leading-relaxed text-ink-soft">
          Set up a workspace to summarize text and keep a record of everything
          you&apos;ve condensed.
        </p>
      </div>

      <div className="mt-8">
        <Form initialState={initialState} action={registerUser}>
          <div className="grid gap-5 sm:grid-cols-2">
            <TextInput
              name="firstName"
              label="First name"
              autoComplete="given-name"
              required
            />
            <TextInput
              name="lastName"
              label="Last name"
              autoComplete="family-name"
              required
            />
          </div>
          <TextInput
            name="email"
            type="email"
            label="Email"
            autoComplete="email"
            required
          />
          <TextInput
            name="username"
            label="Username"
            autoComplete="username"
            required
          />
          <PasswordInput
            name="password"
            label="Password"
            autoComplete="new-password"
            required
          />
          <PasswordInput
            name="confirmPassword"
            label="Confirm password"
            autoComplete="new-password"
            required
          />
          <SubmitButton pendingLabel="Creating account…">
            Create account
          </SubmitButton>
        </Form>
      </div>

      <div className="mt-8 border-t border-line pt-5 text-[13px] text-ink-soft">
        <p>
          Already have an account?{" "}
          <Link href="/login" className="link-underline">
            Log in
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
