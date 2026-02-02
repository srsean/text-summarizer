"use server";

import { generateSummary } from "@/helpers/summarizer";
import { getSession } from "@/helpers/session";
import { TextSummaryResponse } from "@/types/text-summary";
import {
  TextSummaryStatus,
  TextSummaryStyle,
  TextSummaryTone,
  User,
} from "@prisma/client";
import { z } from "zod";
import prisma from "../helpers/db";
import { headers } from "next/headers";

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
  guest: z.string().optional(),
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
  formData: FormData,
) {
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for") ||
    headersList.get("x-real-ip") ||
    "unknown";

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

  const { guest, textSummaryId, inputWords, tone, style } =
    validatedFields.data;

  // Determine if guest mode
  const isGuest = guest == "true";

  // Handle logged-in user or guest summary creation/updating
  let textSummary;
  if (!isGuest) {
    const userData = await getUserData();
    textSummary = await prisma.textSummary.upsert({
      where: { id: textSummaryId ?? 0 }, // 0 ensures create if undefined
      update: {
        input: inputWords,
        inputWordCount: inputWords.split(" ").length,
        inputCharCount: inputWords.length,
        tone: tone.toUpperCase() as TextSummaryTone,
        style: style.toUpperCase() as TextSummaryStyle,
        status: TextSummaryStatus.PENDING,
      },
      create: {
        input: inputWords,
        userId: userData.id,
        inputWordCount: inputWords.split(" ").length,
        inputCharCount: inputWords.length,
        tone: tone.toUpperCase() as TextSummaryTone,
        style: style.toUpperCase() as TextSummaryStyle,
        status: TextSummaryStatus.PENDING,
      },
    });
  } else {
    const guestTextSummary = await prisma.textSummary.findFirst({
      where: {
        guest: true,
        ip: ip,
      },
    });

    // Limit to one guest summary per IP
    if (guestTextSummary) {
      return {
        error: true,
        title: "Summary failed",
        messages: ["Guest users can only create one summary."],
      };
    }

    // Create new guest summary
    textSummary = await prisma.textSummary.create({
      data: {
        input: inputWords,
        inputWordCount: inputWords.split(" ").length,
        inputCharCount: inputWords.length,
        tone: tone.toUpperCase() as TextSummaryTone,
        style: style.toUpperCase() as TextSummaryStyle,
        status: TextSummaryStatus.PENDING,
        ip: ip,
        guest: true,
      },
    });
  }

  const { bartSummarization, finalSummary } = await generateSummary(
    inputWords,
    tone,
    style,
  );

  if (!bartSummarization || !finalSummary) {
    await prisma.textSummary.update({
      where: {
        id: textSummary.id,
      },
      data: {
        status: TextSummaryStatus.ERROR,
      },
    });

    return {
      error: true,
      title: "Summary failed",
      messages: ["Failed to generate summary. Please try again."],
    };
  }

  const updatedTextSummary = await prisma.textSummary.update({
    where: {
      id: textSummary.id,
    },
    data: {
      bartOutput: bartSummarization,
      bartWordCount: bartSummarization.split(" ").length,
      bartCharCount: bartSummarization.length,
      output: finalSummary,
      outputWordCount: finalSummary.split(" ").length,
      outputCharCount: finalSummary.length,
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
