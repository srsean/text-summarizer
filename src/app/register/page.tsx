import Button from "@/components/ui/button";
import PasswordInput from "@/components/ui/password-input";
import TextInput from "@/components/ui/text-input";
import Image from "next/image";
import { registerUser } from "./actions";
// @ts-ignore
import { UserRegistrationResponse } from "@/types/auth";
import Alert from "@/components/ui/alert";
import { Form } from "@/components/ui/form";
import SubmitButton from "@/components/ui/submit-button";

const initialState: UserRegistrationResponse = {
  error: false,
  messages: [],
};

export default async function Register() {
  return (
    <section className="bg-white flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg lg:shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 text-center">
          <div className="flex justify-center">
            <Image
              src="/images/logo.png" // Route of the image file
              height={60} // Desired size with correct aspect ratio
              width={60} // Desired size with correct aspect ratio
              alt="logo"
            />
          </div>
          <h1 className="text-[22px] font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Register to Undetectable AI
          </h1>
          <h3 className="text-[16px] text-[#14151A]"> Please fill in all fields to create your account</h3>

          <Form initialState={initialState} action={registerUser}>
            <div>
              <TextInput name="firstName" placeholder="First Name" />
            </div>
            <div>
              <TextInput name="lastName" placeholder="Last Name" />
            </div>
            <div>
              <TextInput name="email" placeholder="Email" />
            </div>
            <div>
              <TextInput name="username" placeholder="Username" />
            </div>
            <div>
              <PasswordInput name="password" />
            </div>
            <div>
              <PasswordInput name="confirmPassword" placeholder="Confirm Password" />
            </div>
            <SubmitButton className="rounded-xl">Create Account</SubmitButton>
          </Form>
        </div>
      </div>
    </section>
  );
}
