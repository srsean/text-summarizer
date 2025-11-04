-- DropForeignKey
ALTER TABLE "public"."TextSummary" DROP CONSTRAINT "TextSummary_userId_fkey";

-- AlterTable
ALTER TABLE "TextSummary" ADD COLUMN     "guest" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "ip" TEXT,
ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "TextSummary" ADD CONSTRAINT "TextSummary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
