import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { pages } from "next/dist/build/templates/app-page";

const handler = NextAuth({
    providers: [
    ],
    secret : process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/signin",
    }
});

export const GET = handler;
export const POST = handler;