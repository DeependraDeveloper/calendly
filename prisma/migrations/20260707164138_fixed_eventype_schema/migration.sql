/*
  Warnings:

  - Made the column `bufferBeforeMinutes` on table `event_types` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bufferAfterMinutes` on table `event_types` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "event_types" ALTER COLUMN "bufferBeforeMinutes" SET NOT NULL,
ALTER COLUMN "bufferAfterMinutes" SET NOT NULL;
