import IntroductionPage from "@/components/LandingPage";
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";


export default async function Home() {

  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session?.user) {
    console.log("No session found, redirecting to login...");
    redirect("/signin");
  }
  
  if(session?.user){
    const destination = session.user.role === "PATIENT" ? "/dashboard/patient" : "/dashboard/doctor";
    console.log("Redirecting to:", destination);
    redirect(destination);
  }
  return (
    <main>
      {/* <IntroductionPage /> */}
      <p>
        hi there
      </p>
    </main>
  )
}
