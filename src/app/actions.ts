"use server";

import { generateSummary } from "@/helpers/openai";
import { getSession } from "@/helpers/session";
import { TextSummaryResponse } from "@/types/text-summary";
import { TextSummaryStatus, User } from "@prisma/client";
import { z } from "zod";
import prisma from "../helpers/db";

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

export async function getTextSummaryHistoryCount() {
  const userData = await getUserData();

  const historyCount = await prisma.textSummary.count({
    where: {
      userId: userData?.id as number,
    },
  });

  return historyCount;
}

const schema = z.object({
  inputWords: z.string().nonempty("Input text is required"),
  textSummaryId: z
    .string()
    .transform((val) => (val ? parseInt(val, 10) : undefined))
    .optional(),
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
  console.log(validatedFields.data.textSummaryId, "validatedFields.data.textSummaryId");

  var textSummary;
  if (validatedFields.data.textSummaryId) {
    textSummary = await prisma.textSummary.update({
      where: {
        id: validatedFields.data.textSummaryId,
      },
      data: {
        input: validatedFields.data.inputWords,
        inputWordCount: validatedFields.data.inputWords.split(" ").length,
        inputCharCount: validatedFields.data.inputWords.length,
        status: TextSummaryStatus.PENDING,
      },
    });
  } else {
    textSummary = await prisma.textSummary.create({
      data: {
        input: validatedFields.data.inputWords,
        userId: userData?.id as number,
        inputWordCount: validatedFields.data.inputWords.split(" ").length,
        inputCharCount: validatedFields.data.inputWords.length,
        status: TextSummaryStatus.PENDING,
      },
    });
  }

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
