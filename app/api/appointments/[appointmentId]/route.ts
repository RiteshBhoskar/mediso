import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest , { params } : { params: { appointmentId: string } }) {
    const appointmentId  = params.appointmentId;

    if(!appointmentId || !Number(appointmentId)) {
        return NextResponse.json({ error: "Appointment ID is missing." , status: 400 });
    }

    try {
        const appointment = await prisma.appointment.findUnique({
            where: {
                id: Number(appointmentId)
            },
            select: {
                doctorName: true,
                patient: {
                    select: {
                        user: {
                            select: {
                                name: true
                            }
                        }
                    }
                },
                concernTitle: true,
            }
        })

        if(!appointment) {
            return NextResponse.json({ message: "Appointment not found" , status: 404 });
        }
        
        return NextResponse.json({ doctorName: appointment.doctorName , patientName: appointment.patient.user.name , concernTitle: appointment.concernTitle}, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch appointment." , status: 500 });
    }
}