import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function GET (){
    try {
        const concerns = await prisma.concerns.findMany({
            orderBy: { createdAt: "desc"},
            include: {
                user : {
                    select: { name : true }
                }
            }
        });
        return NextResponse.json({ concerns }, { status : 201});
    }catch (error) {
        console.log("Error fetching concerns", error);
        return NextResponse.json({ error : "An unknown error occurred." }, { status: 500 });
    }
}