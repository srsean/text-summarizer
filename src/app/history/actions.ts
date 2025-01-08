import { getUserData } from "../actions";
import prisma from "../../helpers/db";
import { TextSummariesResponse } from "@/types/text-summary";

export async function getTextSummaryHistory(): Promise<TextSummariesResponse> {
  const userData = await getUserData();

  const page = 1; // You can replace this with the actual page number from the request
  const pageSize = 4; // You can replace this with the desired page size

  const textSummariesCount = await prisma.textSummary.count({
    where: {
      userId: userData?.id as number,
    },
  });

  const textSummaries = await prisma.textSummary.findMany({
    where: {
      userId: userData?.id as number,
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
