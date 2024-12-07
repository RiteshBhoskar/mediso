import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";


export async function GET (req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id || session.user.role !== 'PATIENT') {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    } 

    const patient  = await prisma.patient.findUnique({
        where: { userId : session.user.id },
    })

    if (!patient) {
        return NextResponse.json({
            message: "No patient profile found."
        }, { status: 404 })
    }

    try {
        const appointments = await prisma.appointment.findMany({
            where: {
                patientId: patient.id,
            },
            orderBy: {
                appointmentDate: "desc"
            },
        })

        return NextResponse.json({
            ok: true,
            message: "Appointments Fetched successfully.",
            appointments
        }, { status: 200});
    } catch (error) {
        return NextResponse.json({
            message: "Error fetching appointments",
        }, { status: 500 });
    }
}