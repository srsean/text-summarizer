// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function seedUsers() {
  // Example: create initial user

  const password = "password123";
  const hashedPassword = await bcrypt.hash(password, 10);

  const user1 = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      email: "user@example.com",
      firstName: "User",
      lastName: "One",
      username: "user1",
      password: hashedPassword,
    },
  });

  console.log({ user1 });
}
