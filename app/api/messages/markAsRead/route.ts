import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest){
    const session  = await getServerSession(authOptions);
    const userRole = session?.user.role;
    const userId = session?.user.id;

    if(!session || !userRole || !userId){
        return { status: 401, body: { message: "Unauthorized" } };
    }

    try {
        const { appointmentId } = await req.json();

        if(!appointmentId){
            return { status: 400, body: { message: "Missing appointmentId" } };
        }

        const appointmentIdInt = parseInt(appointmentId.toString());

        let senderTypeToMarkAsRead;
        if(userRole === "DOCTOR"){
            senderTypeToMarkAsRead = "PATIENT";
        } else if(userRole === "PATIENT"){
            senderTypeToMarkAsRead = "DOCTOR";
        } else {
            return { status: 400, body: { message: "Invalid user role" } };
        }

        const updatedMessages = await prisma.message.updateMany({
            where: {
                appointmentId: appointmentIdInt,
                sender: senderTypeToMarkAsRead,
                isRead: false,
            },
            data: {
                isRead: true,
            }
        })

        return NextResponse.json({ message: "Messages marked as read." , updatedCount: updatedMessages.count }, { status: 200 });

    } catch(error) {
        console.error("Error marking messages as read:", error);
        return { status: 500, body: { message: "Failed to mark messages as read" } };
    } finally {
        prisma.$disconnect();
    }
}