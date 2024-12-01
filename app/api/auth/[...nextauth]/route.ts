import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import argon2 from "argon2";
import { NextResponse } from "next/server";


export const authOptions: NextAuthOptions = {
        providers: [
            CredentialsProvider({
                name: "Credentials",
                credentials: {
                    email : { label: "email" , type: "email", placeholder: "your@email.com"},
                    password : { label: "password" , type: "password", placeholder: "password"}
                },
                async authorize(credentials, req) {
                    if(!credentials) return null;

                    const user = await prisma.user.findUnique(
                        {where: {email: credentials.email}}
                    );
                    if(user && await argon2.verify(user.password, credentials.password)){
                        return { id: user.id, name: user.name , email: user.email, role: user.role };
                    }
                    return null;
                },
            })
        ],
        session: {
            maxAge: 30 * 24 * 60 * 60,
            updateAge: 24 * 60 * 60 
        },
        callbacks: {
            async jwt({ token, user}){
                if(user){
                    token.id = user.id;
                    token.name = user.name;
                    token.email = user.email ?? '';
                    token.role = user.role;
                }
                return token;
            },
            async session({session, token }){
                session.user = {
                    id: token.id as number,
                    name: token.name,
                    email : token.email ?? '',
                    role: token.role,
                }
                return session;
            }
        },
        secret: process.env.NEXTAUTH_SECRET,
        pages: {
            signIn: "/signin",
        }
    };


const handler = NextAuth(authOptions);
export const GET = handler;
export const POST = handler;