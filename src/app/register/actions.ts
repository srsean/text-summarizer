"use server";

import { z } from "zod";
import prisma from "../../utils/db";
import { UserRegistrationRequest, UserRegistrationResponse } from "@/types/auth";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

const schema = z
  .object({
    firstName: z.string().nonempty("First name is required"),
    lastName: z.string().nonempty("Last name is required"),
    username: z.string().nonempty("Username is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export async function registerUser(
  prevState: UserRegistrationResponse,
  formData: FormData
): Promise<UserRegistrationResponse> {
  const inputData = Object.fromEntries(formData.entries()) as Record<string, string>;
  const validatedFields = schema.safeParse(inputData);

  if (!validatedFields.success) {
    return {
      error: true,
      title: "Registration failed",
      messages: validatedFields.error.errors.map((error) => error.message),
    };
  }

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: validatedFields.data.email }, { username: validatedFields.data.username }],
      },
    });

    if (existingUser) {
      return {
        error: true,
        title: "Registration failed",
        messages: ["User with this email or username already exists"],
      };
    }

    const hashedPassword = await bcrypt.hash(validatedFields.data.password, 10);

    const user = await prisma.user.create({
      data: {
        firstName: validatedFields.data.firstName,
        lastName: validatedFields.data.lastName,
        username: validatedFields.data.username,
        email: validatedFields.data.email,
        password: hashedPassword,
      },
    });

    return {
      error: false,
      title: "Registration successful",
      messages: ["User created successfully"],
      data: user,
      redirect_url: "/login",
    };
  } catch (error) {
    return {
      title: "There was an error during registration",
      error: true,
      messages: ["An error occurred while creating the user. Contact support."],
    };
  }
}
