import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import CreateConcern from "@/components/Create-Concern";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth"
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function (){
  const session = await getServerSession(authOptions);

  if(!session || session.user.role !== "PATIENT"){
    redirect("/");
  }

  return(
    <>
    <div className="flex-col sm:flex sm:justify-between">
      <div className="flex w-fit h-fit mt-3 ml-2">
      <Link href="/dashboard/patient">
        <Button variant="outline">
          Back
        </Button>
      </Link>
      </div>
      <div className="flex justify-center w-full items-center">
      <CreateConcern />
      </div>
     </div>
    </>
  )
}