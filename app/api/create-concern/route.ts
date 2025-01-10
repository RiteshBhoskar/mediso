import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { authOptions } from "@/lib/auth";

const SpecialityEnum = z.enum([
  "ALLERGY_IMMUNOLOGY",
  "ANESTHESIOLOGY",
  "CARDIOLOGY",
  "DERMATOLOGY",
  "ENDOCRINOLOGY",
  "GASTROENTEROLOGY",
  "GENERAL_MEDICINE",
  "GERIATRICS",
  "HEMATOLOGY",
  "INFECTIOUS_DISEASE",
  "INTERNAL_MEDICINE",
  "NEPHROLOGY",
  "NEUROLOGY",
  "OBSTETRICS_GYNECOLOGY",
  "ONCOLOGY",
  "OPHTHALMOLOGY",
  "ORTHOPEDICS",
  "OTOLARYNGOLOGY",
  "PEDIATRICS",
  "PSYCHIATRY",
  "PULMONOLOGY",
  "RADIOLOGY",
  "RHEUMATOLOGY",
  "SURGERY_GENERAL",
  "SURGERY_CARDIOTHORACIC",
  "SURGERY_NEUROSURGERY",
  "SURGERY_ORTHOPEDIC",
  "SURGERY_PLASTIC",
  "SURGERY_VASCULAR",
  "UROLOGY"
]);

const concernSchema = z.object({
    title: z.string().min(4,"Title is required.").trim(),
    description: z.string().min(10, "Description need to be longer than 10 characters.").trim(),
    speciality: SpecialityEnum,
})


export async function POST(req: NextRequest){
    try {
    const body = await req.json();
    const { title, description, speciality } = concernSchema.parse(body);

    const session = await getServerSession(authOptions);

    if(!session?.user.id){
        return NextResponse.json({ error: "User is not authenticated."}, { status: 401})
    };

    const userId = session.user.id;

    await prisma.concerns.create({
        data: { 
        title,
        description,
        speciality,
        user : {
            connect: { id: userId}
        }
        }, 
    })

    return NextResponse.json({ success: true ,  message : "Concern Created Successfully."}, { status: 201});

  }catch (error){
    console.error(error);
    return NextResponse.json({ error: error } , { status: 500 })
  }
}