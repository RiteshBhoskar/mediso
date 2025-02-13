import ChatPage from "@/components/ChatPage";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function () {
    const session = await getServerSession(authOptions);

        if(!session){
            redirect("/");
        };

    return ( 
        <div>
            <ChatPage />
        </div>
    )
}