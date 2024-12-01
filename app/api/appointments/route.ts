import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { z } from "zod";


const appointmentDataSchema = z.object({
    concernId : z.number().nonnegative(),
    appointmentDate : z.string(),
    startTime : z.string(),
    endTime : z.string(),
})

export async function POST (req: NextRequest) {

    const session = await getServerSession(authOptions);

    if(!session || session.user.role !== "DOCTOR"){
        return NextResponse.json({ message: "Unauthorized"}, { status: 403 });
    }

    const body = await req.json();
    const  { concernId , appointmentDate , startTime , endTime } = body;

    const data = appointmentDataSchema.parse(body);

    const appointmentDateObj = new Date(appointmentDate);

    if (isNaN(appointmentDateObj.getTime())) {
        return NextResponse.json({ message: "Invalid appointment date." }, { status: 400 });
    }

    const startDateTime = new Date(`${appointmentDate.split("T")[0]}T${startTime}:00`);
    const endDateTime = new Date(`${appointmentDate.split("T")[0]}T${endTime}:00`);

    try {
        const concern = await prisma.concerns.findUnique({
            where: { id : concernId},
            select: { 
                title: true,
                user: {
                    select: {
                        patient: {
                            select: { id : true },
                        }
                    }
                }
            },
        })

        if (!concern) {
            return NextResponse.json({ message: "Invalid concern ID." }, { status: 404});
        }


        const patient = concern.user.patient;

        if (!patient) {
            return NextResponse.json({ message: "Patient not found for this concern" }, { status: 404 });
        }
    
        const patientId = patient.id;

        const doctor = await prisma.doctor.findUnique({
            where: { userId: session.user.id },
        })

        if(!doctor) {
            return NextResponse.json({ message: "Doctor not found ."}, { status: 404 })
        }

        const doctorName = session.user.name;
        if(!doctorName) {
            return NextResponse.json({
                 message: "Doctor name is not available."
                }, { status: 400 });
        }

        const appointment = await  prisma.appointment.create({
            data: {
                concernId,
                appointmentDate: appointmentDateObj.toISOString(),
                startTime: startDateTime.toISOString(),
                endTime: endDateTime.toISOString(),
                doctorId: doctor.id,
                doctorName,
                patientId,
                concernTitle: concern.title,
            },
        });


        if(!appointment) {
            return NextResponse.json({
                ok: false,
                message: "Failed to create appointment.",
            }, { status: 500 })
        }

        return NextResponse.json({
            ok: true,
            message: "Appointment created successfully.",
        }, { status: 201 });
    } catch (error) {
        if( error instanceof z.ZodError) {
            return NextResponse.json(
                { message: error.errors.map(e=> e.message).join(", ")},
                { status: 400 },
            );
        }

        console.error("Error creating appointment:", error);
        return NextResponse.json({ message: "Error creating appointment." }, { status: 500 });
    }
}