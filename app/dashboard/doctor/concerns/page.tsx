import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import ConcernCardDoctor from "@/components/ConcernCardDoc"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";


export default async function (){

    const session = await getServerSession(authOptions);

    if(!session || session.user.role != "DOCTOR"){
        redirect("/");
    };

    return (
        <>
             <h1 className="text-3xl  mt-4 mb-2 text-center justify-center items-center font-satoshi">Patients Concerns</h1>
             <div className="w-full justify-center items-center">
             <ConcernCardDoctor />
             </div>
        </>
    )
}