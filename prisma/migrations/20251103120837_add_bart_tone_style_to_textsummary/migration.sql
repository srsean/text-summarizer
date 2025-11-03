-- CreateEnum
CREATE TYPE "TextSummaryTone" AS ENUM ('FORMAL', 'CASUAL', 'FRIENDLY', 'PROFESSIONAL');

-- CreateEnum
CREATE TYPE "TextSummaryStyle" AS ENUM ('CONCISE', 'PERSUASIVE');

-- AlterTable
ALTER TABLE "TextSummary" ADD COLUMN     "bartCharCount" INTEGER DEFAULT 0,
ADD COLUMN     "bartOutput" TEXT DEFAULT '',
ADD COLUMN     "bartWordCount" INTEGER DEFAULT 0,
ADD COLUMN     "style" "TextSummaryStyle" NOT NULL DEFAULT 'CONCISE',
ADD COLUMN     "tone" "TextSummaryTone" NOT NULL DEFAULT 'FORMAL';
