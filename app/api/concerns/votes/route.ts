import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { VoteType } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";


const VoteSchema = z.object({
  concernId: z.number().min(1, "Concern ID is required"),
  voteType: z.enum([VoteType.UPVOTE, VoteType.DOWNVOTE]),
})

export async function PATCH(req: NextRequest) {

  const session = await getServerSession(authOptions);

  if(!session?.user.id) {
    return NextResponse.json({ error: "User is not authenticated." }, { status: 401 })
  }

  const parsedData = VoteSchema.safeParse(await req.json());

  if(!parsedData.success) {
    return NextResponse.json({ message: parsedData.error.errors.map(err => err.message).join(", ") }, { status: 400 })
  }

  const { concernId , voteType } = parsedData.data;

  try {
    const concern = await prisma.concerns.findUnique({
      where: { id: concernId },
      select: { upVotes: true, downVotes: true },
    });

    if (!concern) {
      return NextResponse.json(
        { message: "Concern not found" },
        { status: 404 }
      );
    }

    const existingVote = await prisma.vote.findUnique({
      where: {
        userId_concernId: { userId: session.user.id, concernId },
      },
    });

    await prisma.$transaction(async (tx) => {
      if (existingVote) {
        if (existingVote.type === voteType) {
          await tx.concerns.update({
            where: { id: concernId },
            data: {
              upVotes: voteType === VoteType.UPVOTE ? { increment: 1 } : undefined,
              downVotes: voteType === VoteType.DOWNVOTE ? { increment: 1 } : undefined,
            },
          });
        } else {
          await tx.concerns.update({
            where: { id: concernId },
            data: {
              upVotes: voteType === VoteType.UPVOTE ? { increment: 1 } : { decrement: 1 },
              downVotes: voteType === VoteType.DOWNVOTE ? { increment: 1 } : { decrement: 1 },
            },
          });

          await tx.vote.update({
            where: { userId_concernId: { userId: session.user.
              id, concernId } },
            data: { type: voteType },
          });
        }
      } else {
        await tx.concerns.update({
          where: { id: concernId },
          data: {
            upVotes: voteType === VoteType.UPVOTE ? { increment: 1 } : undefined,
            downVotes: voteType === VoteType.DOWNVOTE ? { increment: 1 } : undefined,
          },
        });

        await tx.vote.create({
          data: { userId: session.user.id, concernId, type: voteType },
        });
      }
    });


    const updatedConcern = await prisma.concerns.findUnique({
      where: { id: concernId },
      select: { upVotes: true, downVotes: true },
    });

    return NextResponse.json({
      upVotes: updatedConcern?.upVotes,
      downVotes: updatedConcern?.downVotes,
      message: "Vote updated successfully.",
    });
  } catch (error) {
    console.error("Error updating vote:", error);
    return NextResponse.json({ message: "Error updating vote." }, { status: 500 });
  }
};