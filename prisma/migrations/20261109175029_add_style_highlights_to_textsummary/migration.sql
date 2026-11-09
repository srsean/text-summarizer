-- AlterTable
ALTER TABLE "TextSummary" ADD COLUMN     "styleHighlights" TEXT[] DEFAULT ARRAY[]::TEXT[];
