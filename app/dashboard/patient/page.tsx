import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import DashboardData from "@/components/PatientDashboard";
import PatientSidebar from "@/components/PatientSidebar";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

export default async function Page(){
    const session = await getServerSession(authOptions);
    if(!session || session?.user.role !== "PATIENT"){
        redirect("/")
    }

    return (
        <div>
            <>
            <PatientSidebar  Component={DashboardData}/>
            </>
        </div>
    )
}