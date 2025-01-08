"use server";

import { getSession } from "@/helpers/session";
import { TextSummaryStatus, User } from "@prisma/client";
import prisma from "../helpers/db";
import { generateSummary } from "@/helpers/openai";
import { z } from "zod";
import { TextSummaryResponse } from "@/types/text-summary";

export async function getUserData() {
  const session = await getSession();

  const userData = session?.user as User;

  if (!userData) {
    throw new Error("User data not found");
  }

  const user = await prisma.user.findUnique({
    where: { id: userData.id as number },
  });

  return user;
}

const schema = z.object({
  inputWords: z.string().nonempty("Input text is required"),
});

export async function summaryText(prevState: TextSummaryResponse, formData: FormData) {
  const inputData = Object.fromEntries(formData.entries()) as Record<string, string>;
  const validatedFields = schema.safeParse(inputData);

  if (!validatedFields.success) {
    return {
      error: true,
      title: "Summary failed",
      messages: validatedFields.error.errors.map((error) => error.message),
    };
  }

  const userData = await getUserData();

  const textSummary = await prisma.textSummary.create({
    data: {
      input: validatedFields.data.inputWords,
      userId: userData?.id as number,
      inputWordCount: validatedFields.data.inputWords.split(" ").length,
      inputCharCount: validatedFields.data.inputWords.length,
      status: TextSummaryStatus.PENDING,
    },
  });

  const response = await generateSummary(validatedFields.data.inputWords);

  const updatedTextSummary = await prisma.textSummary.update({
    where: {
      id: textSummary.id,
    },
    data: {
      output: response,
      outputWordCount: response.split(" ").length,
      outputCharCount: response.length,
      status: TextSummaryStatus.COMPLETED,
    },
  });

  return {
    error: false,
    title: "Summary generated",
    messages: ["Summary generated successfully"],
    data: updatedTextSummary,
  };
}
