import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    if(!session || !userId){
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try{

        const userLastSeen = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                lastSeen: new Date(),
            }
        })

        return NextResponse.json({ message: "Last seen updated" }, { status: 200 });

    } catch(error) {
        console.error("Error fetching last seen:", error);
        return NextResponse.json({ error: "Failed to fetch last seen" }, { status: 500 });
    } finally {
        prisma.$disconnect();
    }

}