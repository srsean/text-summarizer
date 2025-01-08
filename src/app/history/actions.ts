"use server";

import { getUserData } from "../actions";
import prisma from "../../helpers/db";
import { DeleteTextSummaryRequest, DeleteTextSummaryResponse, TextSummariesResponse } from "@/types/text-summary";
import { z } from "zod";
import { getGteDate } from "@/utils/get_date_query";
// export const dynamic = "force-dynamic"; // If you want no caching at all

interface TextSummaryHistoryRequest {
  page?: number;
  dateRange?: "today" | "last-7-days" | "last-30-days" | string;
  search?: string;
}

export async function getTextSummaryHistory(request: TextSummaryHistoryRequest): Promise<TextSummariesResponse> {
  const { page = 1, dateRange, search } = request;

  const pageSize = 4; // You can replace this with the desired page size

  const userData = await getUserData();

  const gteDate = getGteDate(dateRange || "");
  gteDate.setHours(0, 0, 0, 0);

  const lteDate = new Date();
  lteDate.setHours(23, 59, 59, 999);

  const textSummariesCount = await prisma.textSummary.count({
    where: {
      userId: userData?.id as number,
      output: {
        contains: search,
      },
      created_at: {
        gte: gteDate,
        lte: lteDate,
      },
    },
  });

  const textSummaries = await prisma.textSummary.findMany({
    where: {
      userId: userData?.id as number,
      output: {
        contains: search,
      },
      created_at: {
        gte: gteDate,
        lte: lteDate,
      },
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return {
    data: textSummaries,
    page,
    pageSize,
    totalCount: textSummariesCount,
  };
}

const schema = z.object({
  textSummaryId: z
    .string()
    .transform((val) => (val ? parseInt(val, 10) : undefined))
    .optional(),
});

export async function deleteTextSummaryHistory(
  prevState: DeleteTextSummaryRequest,
  formData: FormData
): Promise<DeleteTextSummaryResponse> {
  const inputData = Object.fromEntries(formData.entries()) as Record<string, string>;
  const validatedFields = schema.safeParse(inputData);

  if (!validatedFields.success) {
    return {
      error: true,
      title: "Text Summary Deletion Failed",
      messages: validatedFields.error.errors.map((error) => error.message),
    };
  }

  try {
    const textSummary = await prisma.textSummary.delete({
      where: {
        id: validatedFields.data?.textSummaryId,
      },
    });

    return {
      error: false,
      title: "Text Summary Deleted",
      messages: ["Text summary deleted successfully"],
    };
  } catch (error) {
    console.log("Error deleting text summary: ", error);

    return {
      error: true,
      title: "Text Summary Deletion Failed",
      messages: ["Failed to delete text summary"],
    };
  }
}
