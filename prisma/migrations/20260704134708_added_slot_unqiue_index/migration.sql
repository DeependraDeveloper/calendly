/*
  Warnings:

  - You are about to drop the column `eventType` on the `bookings` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slotId]` on the table `bookings` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `eventTypeId` to the `bookings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_eventType_fkey";

-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "eventType",
ADD COLUMN     "eventTypeId" INTEGER NOT NULL,
ADD COLUMN     "paymentStatus" TEXT NOT NULL DEFAULT 'UNPAID',
ALTER COLUMN "inviteeNotes" DROP NOT NULL;

-- AlterTable
ALTER TABLE "event_types" ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'USD',
ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "bookings_slotId_key" ON "bookings"("slotId");

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_eventTypeId_fkey" FOREIGN KEY ("eventTypeId") REFERENCES "event_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;
