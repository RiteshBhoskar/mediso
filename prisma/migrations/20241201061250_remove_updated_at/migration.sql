/*
  Warnings:

  - You are about to drop the column `date` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the `Availability` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `appointmentDate` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `concernId` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `concernTitle` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doctorName` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Availability" DROP CONSTRAINT "Availability_doctorId_fkey";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "date",
ADD COLUMN     "appointmentDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "concernId" INTEGER NOT NULL,
ADD COLUMN     "concernTitle" TEXT NOT NULL,
ADD COLUMN     "doctorName" TEXT NOT NULL,
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Availability";

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_concernId_fkey" FOREIGN KEY ("concernId") REFERENCES "Concerns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
