import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import AppointmentCard from "@/components/AppointmentCard";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth"
import Link from "next/link";
import { redirect } from "next/navigation";


export default async function () {
    
    const session = await getServerSession(authOptions);

    if(!session || session.user.role !== "PATIENT") {
        redirect("/");
        return null;
    }

    return (
        <>
        <div className="flex-col sm:flex">
        <Button variant="outline"  className="w-fit h-full ml-4 mt-4">
           <Link href="/dashboard/patient">
            Back
            </Link>
           </Button>
         <div className="grid justify-center items-center w-full">
            <h1 className="text-3xl  mt-4 mb-4 text-center justify-center items-center font-satoshi">Your Appointments</h1>
            <div className="w-full flex justify-center items-center">
                <AppointmentCard />
            </div>
         </div>
         </div>
        </>
    )
}