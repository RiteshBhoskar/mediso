import SignIn from "@/components/Signin";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function (){
        const session = await getServerSession(authOptions);
    
        if(session){
            if(session.user.role === "DOCTOR"){
                redirect("/dashboard/doctor")
            } else {
                redirect("/dashboard/patient")
            }
        }
    return (
        <SignIn />
    )
}