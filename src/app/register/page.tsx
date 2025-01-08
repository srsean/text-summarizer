"use server";

import Button from "@/components/ui/button";
import PasswordInput from "@/components/ui/password_input";
import TextInput from "@/components/ui/text_input";
import Image from "next/image";
import Link from "next/link";

export default async function Login() {
  return (
    <section className="bg-white">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 text-center">
            {/* <img className="w-8 h-8 mr-2" src="/images/logo.png" alt="logo" /> */}
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

            <form className="space-y-4 md:space-y-6" action="#">
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
                <PasswordInput name="confirm_password" placeholder="Confirm Password" />
              </div>
              <Button className="rounded-xl" type="submit">
                Create Account
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
