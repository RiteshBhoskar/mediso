import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const userRole = session?.user?.role;
    const userId = session?.user?.id;
    const appointmentId = req.nextUrl.searchParams.get('appointmentId');
    
    if (!session || !userRole || !userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!appointmentId) {
        return NextResponse.json({ error: "Missing appointmentId" }, { status: 400 });
    }

    try {
        const appointmentIdInt = parseInt(appointmentId.toString());

        const messagesHistory = await prisma.message.findMany({
            where: {
                appointmentId: appointmentIdInt,
            },
            orderBy: {
                createdAt: 'asc',
            },
            select: {
                id: true,
                sender: true,
                content: true,
                createdAt: true,
                isRead: true,
            }
        });

        return NextResponse.json({ messages: messagesHistory }, { status: 200 });

    } catch (error) {
        console.error("Error fetching message history:", error);
        return NextResponse.json({ error: "Failed to fetch message history" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}