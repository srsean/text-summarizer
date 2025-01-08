"use server";

import { z } from "zod";
import prisma from "../../helpers/db";
import { UserLoginRequest, UserLoginResponse } from "@/types/auth";
import bcrypt from "bcrypt";
import { createSession } from "@/helpers/session";

const schema = z.object({
  username: z.string().nonempty("Username is required"),
  password: z.string().nonempty("Password is required"),
});

export async function loginUser(prevState: UserLoginResponse, formData: FormData): Promise<UserLoginResponse> {
  const inputData = Object.fromEntries(formData.entries()) as Record<string, string>;
  const validatedFields = schema.safeParse(inputData);

  if (!validatedFields.success) {
    return {
      error: true,
      title: "Login failed",
      messages: validatedFields.error.errors.map((error) => error.message),
    };
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ username: validatedFields.data.username }, { email: validatedFields.data.username }],
      },
    });

    if (!user) {
      return {
        error: true,
        title: "Incorrect Username",
        messages: ["The username that you’ve entered doesn’t match any account. Sign up for an account."],
      };
    }

    const match = await bcrypt.compare(validatedFields.data.password, user.password);

    if (!match) {
      return {
        error: true,
        title: "Incorrect Password",
        messages: ["The password that you’ve entered is incorrect. Please try again."],
      };
    }

    await createSession(user);

    return {
      error: false,
      title: "Login successful",
      messages: ["You will be redirected shortly"],
      redirect_url: "/",
    };
  } catch (error) {
    console.log(error);

    return {
      title: "There was an error during login",
      error: true,
      messages: ["An error occurred while logging in. Contact support."],
    };
  }
}
