"use server";

import { generateSummary } from "@/helpers/summarizer";
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

  return userData;
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
  tone: z
    .enum(["formal", "casual", "friendly", "professional"])
    .default("formal"),
  style: z.enum(["concise", "persuasive"]).default("concise"),
});

export async function summaryText(
  prevState: TextSummaryResponse,
  formData: FormData
) {
  const inputData = Object.fromEntries(formData.entries()) as Record<
    string,
    string
  >;
  const validatedFields = schema.safeParse(inputData);

  if (!validatedFields.success) {
    return {
      error: true,
      title: "Summary failed",
      messages: validatedFields.error.errors.map((error) => error.message),
    };
  }

  const { textSummaryId, inputWords, tone, style } = validatedFields.data;

  const userData = await getUserData();

  const textSummary = await prisma.textSummary.upsert({
    where: { id: textSummaryId ?? 0 }, // 0 ensures create if undefined
    update: {
      input: inputWords,
      inputWordCount: inputWords.split(" ").length,
      inputCharCount: inputWords.length,
      status: TextSummaryStatus.PENDING,
    },
    create: {
      input: inputWords,
      userId: userData.id,
      inputWordCount: inputWords.split(" ").length,
      inputCharCount: inputWords.length,
      status: TextSummaryStatus.PENDING,
    },
  });

  const response = await generateSummary(inputWords, tone, style);

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
