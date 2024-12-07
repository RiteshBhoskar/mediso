export const dynamic = "force-dynamic";
import IntroductionPage from "@/components/LandingPage";
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";


const getUserDetails = async () => {
    try{
      const  session = await getServerSession(authOptions);
      return session;
    } catch(error) {
      console.error("Error fetching session", error);
      return null;
    }
}

export default async function Home() {
  const session = await getUserDetails();

  if(session?.user){
    const destination = session.user.role === "PATIENT"? "/dashboard/patient" : "/dashboard/doctor"
    redirect(destination)
  }

  return (
    <main>
      <IntroductionPage />
    </main>
  )
}
