/*
  Warnings:

  - Made the column `updatedAt` on table `availibility_exceptions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `availibility_rules` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `event_types` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `slots` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "availibility_exceptions" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "availibility_rules" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "event_types" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "slots" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "updatedAt" SET NOT NULL;

-- CreateTable
CREATE TABLE "bookings" (
    "id" SERIAL NOT NULL,
    "hostId" INTEGER NOT NULL,
    "eventType" INTEGER NOT NULL,
    "slotId" INTEGER NOT NULL,
    "inviteeEmail" TEXT NOT NULL,
    "inviteeNotes" TEXT NOT NULL,
    "inviteeName" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "meetingLink" TEXT,
    "calendarEventId" TEXT,
    "cancelledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "bookings_status_idx" ON "bookings"("status");

-- CreateIndex
CREATE INDEX "bookings_inviteeEmail_idx" ON "bookings"("inviteeEmail");

-- CreateIndex
CREATE INDEX "bookings_hostId_createdAt_idx" ON "bookings"("hostId", "createdAt");

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_eventType_fkey" FOREIGN KEY ("eventType") REFERENCES "event_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "slots"("id") ON DELETE CASCADE ON UPDATE CASCADE;
