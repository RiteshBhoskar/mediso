import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";



export async function PATCH(req: NextRequest){
    const { appointmentId , status } = await req.json();

    if(!appointmentId || !status ) {
        return NextResponse.json({ error: "Missing appointment ID or status." }, { status: 400 });
    }

    try {
        const updatedAppointment = await prisma.appointment.update({
            where: { id: appointmentId },
            data: { status },
        });
        return NextResponse.json({ message: "Appointment status updated successfully.", updatedAppointment})
    } catch (error) {
        return NextResponse.json({ error : "Error updating appoinment status."} , { status: 500 });
    }
}