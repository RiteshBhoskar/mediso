import DoctorAppointments from "@/components/DoctorAppointments";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function (){
    return (
        <>
        <div className="flex-col sm:flex">
        <Button variant="outline"  className="w-fit h-full ml-4 mt-4">
           <Link href="/dashboard/doctor">
            Back
            </Link>
           </Button>
         <div className="grid justify-center items-center w-full">
            <h1 className="text-3xl  mt-4 mb-4 text-center justify-center items-center font-satoshi">Your Appointments</h1>
            <div className="w-full flex justify-center items-center">
                <DoctorAppointments />
            </div>
         </div>
         </div>
        </>
    )
}