"use server";

import { getSession } from "@/utils/session";
import { User } from "@prisma/client";
import prisma from "../utils/db";

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
