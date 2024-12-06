import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ConcernsPage from "@/components/ConcernCard";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function (){
  const session = await getServerSession(authOptions);

  if (!session || session.user.role != "PATIENT") {
    redirect("/");
  }


  return (
    <>
    <div className="flex-col sm:flex sm:justify-normal">
    <Button variant="outline"  className="w-fit h-full ml-4 mt-4">
           <Link href="/dashboard/patient">
            Back
            </Link>
           </Button>
     <h1 className="text-3xl mt-4 mr-20 mb-4 flex w-full text-center justify-center items-center font-satoshi">Patients Concerns</h1>
     </div>
      <ConcernsPage />
    </>
  )
}