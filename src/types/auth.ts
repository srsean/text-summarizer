import { User } from "@prisma/client";
import { ActionResponse } from "./action";

export interface UserRegistrationRequest {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type UserRegistrationResponse = ActionResponse<User>;

export interface UserLoginRequest {
  username: string;
  password: string;
}

export type UserLoginResponse = ActionResponse<{ user: User; token: string }>;
