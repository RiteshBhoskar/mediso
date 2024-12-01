import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import CreateConcern from "@/components/Create-Concern";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

export default async function (){
  const session = await getServerSession(authOptions);

  if(!session || session.user.role !== "PATIENT"){
    redirect("/");
  }

  return(
    <>
     <CreateConcern />
    </>
  )
}