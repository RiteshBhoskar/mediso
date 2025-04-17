import { authOptions } from "@/lib/auth";
import ConcernCardDoctor from "@/components/ConcernCardDoc"
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth"
import Link from "next/link";
import { redirect } from "next/navigation";


export default async function (){

    const session = await getServerSession(authOptions);

    if(!session || session.user.role != "DOCTOR"){
        redirect("/");
    };

    return (
        <>
        <div className="flex-col sm:flex">
        <Button variant="outline"  className="w-fit h-full m-4 z-20">
           <Link href="/dashboard/doctor">
            Back
            </Link>
        </Button>
            <div className="flex-col sm:-mt-7">
            <h1 className="text-3xl mb-2 text-center justify-center items-center font-satoshi">Patients Concerns</h1>
             <div className="w-full justify-center items-center">
             <ConcernCardDoctor />
             </div>
             </div>
        </div>
        </>
    )
}