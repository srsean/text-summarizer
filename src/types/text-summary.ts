import { TextSummary, User } from "@prisma/client";
import { ActionResponse } from "./action";

export interface TextSummaryRequest {
  inputWords: string;
}

export type TextSummaryResponse = ActionResponse<TextSummary>;
