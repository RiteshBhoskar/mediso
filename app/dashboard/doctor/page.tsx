import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DoctorsDashboard from "@/components/DoctorDashboard";
import DoctorSidebar from "@/components/DoctorSidebar";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

export default async function Page(){
    const session = await getServerSession(authOptions);
    if(!session || session?.user.role !== "DOCTOR"){
        redirect("/")
    };

    return (
        <div>
            <>
            <DoctorSidebar  Component={DoctorsDashboard}/>
            </>
        </div>
    )
}