export const dynamic = "force-dynamic";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function GET (req: NextRequest){
    const session = await getServerSession(authOptions);

    if(!session){
        return NextResponse.json({ error: "Unauthenticated User"} , { status: 401})
    }

    const userId = session.user.id;

    try {
        const { searchParams } = new URL(req.url);
        const userRole = searchParams.get("role");

        const concerns = await prisma.concerns.findMany({
            orderBy: { createdAt: "desc"},
            include: {
                user : { select: { name : true } },
                _count: {
                    select: {
                        vote: true
                    }
                },
                vote: {
                    where: {
                        userId: userId,
                    }
                }
            }
        });

        const formattedConcerns = concerns.map((concern)=> {
            const upVotes = concern.vote.filter((v) => v.type === "UPVOTE").length;
            const downVotes = concern.vote.filter((v) => v.type === "DOWNVOTE").length;
            const isUpVoted = concern.vote.some((v) => v.type === "UPVOTE");
            const isDownVoted = concern.vote.some((v) => v.type === "DOWNVOTE");
            return {
              id: concern.id,
              title: concern.title,
              description: concern.description,
              speciality: concern.speciality,
              createdAt: concern.createdAt,
              patientName: concern.user.name,
              upVotes: concern.upVotes || upVotes,
              downVotes: concern.downVotes || downVotes,
              isUpVoted,
              isDownVoted
            };
        });

        if( userRole === "doctor"){
            const doctorConcerns = formattedConcerns.map((concern)=> {
                return {
                    id: concern.id,
                    title: concern.title,
                    description: concern.description,
                    speciality: concern.speciality,
                    createdAt: concern.createdAt,
                    patientName: concern.patientName
                }
            })

            return NextResponse.json({ concerns: doctorConcerns }, { status: 201 });
        }
        
        return NextResponse.json({ concerns: formattedConcerns }, { status : 201});
    }catch (error) {
        console.error("Error fetching concerns", error);
        return NextResponse.json({ error : "An unknown error occurred." }, { status: 500 });
    }
}