import { PrismaClient } from "@prisma/client";

const prismaSingleton = new PrismaClient();

declare global {
  var prismaGlobal: undefined | PrismaClient;
}

const prisma = globalThis.prismaGlobal ?? prismaSingleton;

export default prisma;

if (process.env.NODE_ENV === "development") {
  globalThis.prismaGlobal = prisma;
}
