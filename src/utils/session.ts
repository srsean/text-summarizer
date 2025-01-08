import "server-only";
import { User } from "@prisma/client";
import { cookies } from "next/headers";
import path from "path";
import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { redirect } from "next/navigation";

const key = new TextEncoder().encode(process.env.SESSION_SECRET);

const cookie = {
  name: "session",
  options: {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: true,
    path: "/",
  },
  duration: 24 * 60 * 60 * 1000,
};

export async function encrypt(payload: JWTPayload | undefined) {
  return new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("1day").sign(key);
}

export async function decrypt(session: string) {
  try {
    const { payload } = await jwtVerify(session, key, { algorithms: ["HS256"] });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function createSession(user: User) {
  const expires = new Date(Date.now() + cookie.duration);
  const session = await encrypt({ user, expires });

  cookies().set(cookie.name, session, { ...cookie.options, expires });
}

export async function destroySession() {
  cookies().delete(cookie.name);
}
