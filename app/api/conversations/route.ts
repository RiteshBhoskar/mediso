import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function GET() {
    const session = await getServerSession(authOptions);
    const userRole = session?.user.role;
    const userId = session?.user.id

    if(!session || !userRole || !userId ) {
        return { status: 401, body: { message: "Unauthorized" } };
    }

    try{
        let conversations;
        if(userRole === "DOCTOR"){
            const doctor = await prisma.doctor.findUnique({
                where: {
                    userId: userId
                },
                select: {
                    id: true
                }
            })

            if(!doctor){
                return NextResponse.json({ error: "Doctor profile not found."} , { status: 404 })
            }

            conversations = await prisma.appointment.findMany({
                where: {
                    doctorId: doctor.id
                },
                orderBy: {
                    createdAt: "desc"
                },
                select: {
                    id: true,
                    doctorName: true,
                    patient: {
                        select: {
                            user: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    },
                    messages: {
                        orderBy: { createdAt: "desc" },
                        take: 1,
                        select: {
                            content: true,
                            createdAt: true,
                            isRead: true,
                            sender: true,
                        },
                    },
                    _count: {
                        select: {
                            messages: {
                                where: {
                                    sender: "PATIENT",
                                    isRead: false,
                                }
                            }
                        }
                    }
                },
            })
        } else if (userRole === "PATIENT") {

            const patient = await prisma.patient.findUnique({
                where: {
                    userId: userId
                },
                select: {
                    id: true
                }
            })

            if(!patient) {
                return NextResponse.json({ error : "Patient profile not found." } , { status: 404 });
            }

            conversations = await prisma.appointment.findMany({
                where: {
                    patientId: patient.id
                },
                orderBy: {
                    createdAt: "desc"
                },
                select: {
                    id: true,
                    doctorName: true,
                    doctor: {
                        select: {
                            user: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    },
                    messages: {
                        orderBy: { createdAt: "desc" },
                        take: 1,
                        select: {
                            content: true,
                            createdAt: true,
                            isRead: true,
                            sender: true,
                        },
                    },
                    _count: {
                        select: {
                            messages: {
                                where: {
                                    sender: "DOCTOR",
                                    isRead: false,
                                }
                            }
                        }
                    }
                }
            })
        } else {
            return NextResponse.json({ error : "Invalid user role" }, { status: 400 });
        }
        return NextResponse.json({ conversations: conversations.map(conversation => ({
            ...conversation,
            unreadCount: conversation._count.messages
        })) }, { status: 200 });
    } catch (error) {
        console.error("Error fetching conversations:", error);
        return NextResponse.json({ error: "Error fetching conversations" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}