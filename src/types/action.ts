export interface ActionResponse<T = unknown> {
  title?: string;
  messages: string[];
  data?: T;
  error?: boolean;
  redirect_url?: string;
}
