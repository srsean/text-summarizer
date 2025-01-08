/*
  Warnings:

  - You are about to drop the column `charCount` on the `TextSummary` table. All the data in the column will be lost.
  - You are about to drop the column `summary` on the `TextSummary` table. All the data in the column will be lost.
  - You are about to drop the column `wordCount` on the `TextSummary` table. All the data in the column will be lost.
  - Added the required column `inputCharCount` to the `TextSummary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inputWordCount` to the `TextSummary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `output` to the `TextSummary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `outputCharCount` to the `TextSummary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `outputWordCount` to the `TextSummary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TextSummary" DROP COLUMN "charCount",
DROP COLUMN "summary",
DROP COLUMN "wordCount",
ADD COLUMN     "inputCharCount" INTEGER NOT NULL,
ADD COLUMN     "inputWordCount" INTEGER NOT NULL,
ADD COLUMN     "output" TEXT NOT NULL,
ADD COLUMN     "outputCharCount" INTEGER NOT NULL,
ADD COLUMN     "outputWordCount" INTEGER NOT NULL;
