import { TextSummary, User } from "@prisma/client";
import { ActionResponse } from "./action";
import { PaginationResponse } from "./pagination";

export interface TextSummaryRequest {
  inputWords: string;
}

export type TextSummaryResponse = ActionResponse<TextSummary>;

export interface TextSummariesRequest {
  inputWords: string;
}

export type TextSummariesResponse = PaginationResponse<TextSummary[]>;
