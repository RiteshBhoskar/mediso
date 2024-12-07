import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

const signupSchema = z.object({
    name: z.string().min(3, "Name is required.").trim(),
    role: z.enum(["PATIENT", "DOCTOR"]),
    email: z.string().email().min(6, "Email is required.").trim(),
    password: z.string().min(6, "Password must be at least 6 characters long.").trim(),
    speciality: z.string().optional(),
}).refine(data => {
    if (data.role === "DOCTOR" && !data.speciality) {
        return false;
    }
    if (data.role === "DOCTOR" && data.speciality && data.speciality.length < 3) {
        return false;
    }
    return true;
}, {
    message: "Speciality must be at least 3 characters long.",
    path: ["speciality"],
});

type SignupInput = {
    name: string;
    role: "PATIENT" | "DOCTOR";
    email: string;
    password: string;
    speciality?: string;
};

export async function POST(req: NextRequest){
    const body:SignupInput = await req.json();
    try {
        const { name, role, email, password, speciality } = signupSchema.parse(body);

        const existingUser = await prisma.user.findUnique({where: {email: email}});

        if(existingUser){
            return NextResponse.json({error: "User already exists."}, {status: 400})
        };

        const saltRounds = 10;

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await prisma.user.create({
            data: {
                name,
                role: role,
                email,
                password: hashedPassword,
            }
        })
        if (role === "PATIENT") {
            await prisma.patient.create({
                data: {
                    userId: user.id, 
                },
            });
        }else if (role ==="DOCTOR"){
            await prisma.doctor.create({
                data:{
                    userId: user.id,
                    speciality: speciality as string
                }
            })
        }
        const token = await jwt.sign({ id : user.id, email : user.email, role: user.role}, process.env.JWT_SECRET as string, {
            expiresIn: "365d"
        })
        if(user){
            return NextResponse.json(
                {
                    success: true,
                    msg: "User created successfully.", 
                    user: {
                        id: user.id,
                        name: user.name,
                        role: user.role,
                        email: user.email,
                    },
                    token
                }, 
                { status: 201 }
            );
        }

    }catch(error){
        console.error("Error:", error); 
        const e = error instanceof Error ? error : new Error("An unknown error occurred");
        return NextResponse.json({ error: e.message || "something went wrong." }, { status: 500 });
    }
};
