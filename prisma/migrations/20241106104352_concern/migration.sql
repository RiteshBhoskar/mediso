/*
  Warnings:

  - You are about to drop the column `patientId` on the `Concerns` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Concerns` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Concerns" DROP CONSTRAINT "Concerns_patientId_fkey";

-- AlterTable
ALTER TABLE "Concerns" DROP COLUMN "patientId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Concerns" ADD CONSTRAINT "Concerns_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
