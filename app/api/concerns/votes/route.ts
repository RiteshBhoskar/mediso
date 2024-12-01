import prisma from "@/lib/prisma";
import { VoteType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { concernId, voteType, userId } = await req.json();

    if (!concernId || !voteType || !userId) {
      return NextResponse.json(
        { message: "Missing required fields: concernId, voteType, userId" },
        { status: 400 }
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      const existingVote = await tx.vote.findUnique({
        where: {
          userId_concernId: { userId, concernId },
        },
      });

      let updatedConcern;

      if (existingVote) {
        if (existingVote.type === voteType) {
          updatedConcern = await tx.concerns.update({
            where: { id: concernId },
            data: {
              upVotes: voteType === VoteType.UPVOTE ? { decrement: 1 } : undefined,
              downVotes: voteType === VoteType.DOWNVOTE ? { decrement: 1 } : undefined,
            },
          });

          await tx.vote.delete({
            where: {
              userId_concernId: { userId, concernId },
            },
          });
        } else {
          updatedConcern = await tx.concerns.update({
            where: { id: concernId },
            data: {
              upVotes: voteType === VoteType.UPVOTE ? { increment: 1 } : { decrement: 1 },
              downVotes: voteType === VoteType.DOWNVOTE ? { increment: 1 } : { decrement: 1 },
            },
          });

          await tx.vote.update({
            where: {
              userId_concernId: { userId, concernId },
            },
            data: { type: voteType },
          });
        }
      } else {
        updatedConcern = await tx.concerns.update({
          where: { id: concernId },
          data: {
            upVotes: voteType === VoteType.UPVOTE ? { increment: 1 } : undefined,
            downVotes: voteType === VoteType.DOWNVOTE ? { increment: 1 } : undefined,
          },
        });

        await tx.vote.create({
          data: { userId, concernId, type: voteType },
        });
      }

      return {
        upVotes: updatedConcern.upVotes,
        downVotes: updatedConcern.downVotes,
      };
    });

    return NextResponse.json({
      ...result,
      message: "Vote updated successfully.",
    });
  } catch (error) {
    console.error("Error updating vote:", error);
    return NextResponse.json({ message: "Error updating vote." }, { status: 500 });
  }
};