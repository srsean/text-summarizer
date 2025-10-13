import { PrismaClient } from "@prisma/client";
import { seedUsers } from "./users";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding users...");
  await seedUsers();
  console.log("Seeding users done.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seeding completed.");
  })
  .catch(async (e) => {
    console.error("Seeding failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
