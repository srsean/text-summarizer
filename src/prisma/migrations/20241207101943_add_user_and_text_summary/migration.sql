-- CreateEnum
CREATE TYPE "TextSummaryStatus" AS ENUM ('PENDING', 'COMPLETED', 'ERROR');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TextSummary" (
    "id" SERIAL NOT NULL,
    "input" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "wordCount" INTEGER NOT NULL,
    "charCount" INTEGER NOT NULL,
    "status" "TextSummaryStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TextSummary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "TextSummary" ADD CONSTRAINT "TextSummary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
