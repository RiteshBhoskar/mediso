import IntroductionPage from "@/components/LandingPage";
import LandingPage from "@/components/LandingPage2";
import Homepage from "@/components/LandingPage2";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";


export default async function Home() {
  const session = await getServerSession(authOptions);

  if(session?.user){
    const destination = session.user.role === "PATIENT" ? "dashboard/patient" : "dashboard/doctor"
    redirect(destination)
  }

  return (
    <main>
      <IntroductionPage />
      {/* <LandingPage /> */}
    </main>
  )
}
