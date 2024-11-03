import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

export default async function Page(){
    const session = await getServerSession(authOptions);
    if(!session || session?.user.role !== "DOCTOR"){
        redirect("/")
    };

    return (
        <div>
            <h1>Welcome, {session.user.name}</h1>
        </div>
    )
}