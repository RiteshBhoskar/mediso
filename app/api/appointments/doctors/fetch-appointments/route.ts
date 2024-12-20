import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if(!session || session.user.role !== 'DOCTOR') {
        return NextResponse.json({ message: "Unauthorized" } , { status: 403} )
    }

    const userId = session.user.id;

    try {

        const doctor = await prisma.doctor.findUnique({
            where: { userId },
            select: {
                id: true
            }
        })

        if (!doctor) {
            return NextResponse.json({ message: "Doctor not found" }, { status: 404 });
        }

        const doctorId = doctor?.id;

        const appointments = await prisma.appointment.findMany({
            where: {
                doctorId
            },
            select: {
                id: true,
                appointmentDate: true,
                startTime: true,
                endTime: true,
                concernTitle: true,
                status: true,
                patient: {
                    select: {
                        user: {
                            select: {
                                name: true,
                            }
                        }
                    }
                }
            }
        });

        const formattedAppointments = appointments.map((appointment) => ({
            id: appointment.id,
            appointmentDate: appointment.appointmentDate,
            startTime: appointment.startTime,
            endTime: appointment.endTime,
            concernTitle: appointment.concernTitle,
            status: appointment.status,
            patientName: appointment.patient.user.name,
        }))

        return NextResponse.json({ appointments: formattedAppointments } , { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to fetch appointments" } , { status: 500 });
    }
}