import IntroductionPage from "@/components/LandingPage";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";


export default async function Home() {
  const session = await getServerSession(authOptions);

  if(session?.user){
    const destination = session.user.role === "PATIENT" ? "dashboard/patient" : "dashboard/doctor"
    redirect(destination)
  }

  return (
    <main>
      <IntroductionPage />
    </main>
  )
}
