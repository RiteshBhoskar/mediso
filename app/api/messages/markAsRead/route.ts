import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest){
    const session  = await getServerSession(authOptions);
    const userRole = session?.user.role;
    const userId = session?.user.id;

    if(!session || !userRole || !userId){
        return NextResponse.json({ message: "Unauthorized"}, { status: 401 })
    }

    try {
        const { appointmentId } = await req.json();

        if(!appointmentId){
            return NextResponse.json({ message: "Missing appointmentId" }, { status: 400 })
        }

        const appointmentIdInt = parseInt(appointmentId.toString());

        let senderTypeToMarkAsRead;
        if(userRole === "DOCTOR"){
            senderTypeToMarkAsRead = "PATIENT";
        } else if(userRole === "PATIENT"){
            senderTypeToMarkAsRead = "DOCTOR";
        } else {
            return NextResponse.json({ message: "Invalid user role" }, { status: 400 });
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
        return NextResponse.json({ message: "Failed to mark messages as read" }, { status: 500 });
    } finally {
        prisma.$disconnect();
    }
}