import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET (req: NextRequest){
    try {

        const { searchParams } = new URL(req.nextUrl);
        const userRole = searchParams.get("role");

        const concerns = await prisma.concerns.findMany({
            orderBy: { createdAt: "desc"},
            include: {
                user : { select: { name : true } },
                vote : true,
            }
        });

        const formattedConcerns = concerns.map((concern)=> {
            const upVotes = concern.vote.filter(v => v.type === "UPVOTE").length;
            const downVotes = concern.vote.filter(v => v.type === "DOWNVOTE").length;
            return { ...concern, upVotes, downVotes};
        });

        if( userRole === "doctor"){
            const doctorConcerns = formattedConcerns.map((concern)=> {
                return {
                    id: concern.id,
                    title: concern.title,
                    description: concern.description,
                    speciality: concern.speciality,
                    createdAt: concern.createdAt,
                    patientName: concern.user.name
                }
            })

            return NextResponse.json({ concerns: doctorConcerns }, { status: 201 });
        }

        return NextResponse.json({ concerns: formattedConcerns }, { status : 201});
    }catch (error) {
        console.log("Error fetching concerns", error);
        return NextResponse.json({ error : "An unknown error occurred." }, { status: 500 });
    }
}