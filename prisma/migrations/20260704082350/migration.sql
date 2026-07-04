/*
  Warnings:

  - Made the column `slug` on table `event_types` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "event_types" ALTER COLUMN "slug" SET NOT NULL;
