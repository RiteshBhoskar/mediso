-- CreateEnum
CREATE TYPE "VoteType" AS ENUM ('UPVOTE', 'DOWNVOTE');

-- CreateEnum
CREATE TYPE "Speciality" AS ENUM ('ALLERGY_IMMUNOLOGY', 'ANESTHESIOLOGY', 'CARDIOLOGY', 'DERMATOLOGY', 'ENDOCRINOLOGY', 'GASTROENTEROLOGY', 'GENERAL_MEDICINE', 'GERIATRICS', 'HEMATOLOGY', 'INFECTIOUS_DISEASE', 'INTERNAL_MEDICINE', 'NEPHROLOGY', 'NEUROLOGY', 'OBSTETRICS_GYNECOLOGY', 'ONCOLOGY', 'OPHTHALMOLOGY', 'ORTHOPEDICS', 'OTOLARYNGOLOGY', 'PEDIATRICS', 'PSYCHIATRY', 'PULMONOLOGY', 'RADIOLOGY', 'RHEUMATOLOGY', 'SURGERY_GENERAL', 'SURGERY_CARDIOTHORACIC', 'SURGERY_NEUROSURGERY', 'SURGERY_ORTHOPEDIC', 'SURGERY_PLASTIC', 'SURGERY_VASCULAR', 'UROLOGY');

-- CreateTable
CREATE TABLE "Concerns" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "patientId" INTEGER NOT NULL,
    "speciality" "Speciality" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Concerns_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Concerns" ADD CONSTRAINT "Concerns_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
