import { DashboardDropdownMenu } from "@/components/DashboardDropdownMenu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Link from "next/link";

export default function DashboardHeader(){
    return (
        <header className="px-4 lg:px-6 h-20 flex items-center border-b relative justify-between">
        <Link className="flex items-center justify-center" href="/">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 12h-2.364c-.658 0-.987 0-1.278.13-.291.13-.512.374-.952.863l-1.03 1.144c-.36.401-.541.602-.77.597-.23-.005-.401-.213-.744-.63l-3.529-4.276c-.32-.388-.48-.582-.697-.595-.217-.013-.4.16-.764.507L7.37 11.172c-.43.409-.644.613-.912.72C6.19 12 5.893 12 5.3 12H3" stroke="#003588" strokeWidth="1.5" strokeLinecap="round"/><path d="m8.962 18.91.464-.588-.464.589ZM12 5.5l-.54.52a.75.75 0 0 0 1.08 0L12 5.5Zm3.038 13.41.465.59-.465-.59ZM12 20.487v-.75.75Zm-9.343-7.09a.75.75 0 0 0 1.273-.792l-1.273.792Zm3.873 2.376a.75.75 0 0 0-1.06 1.062l1.06-1.062ZM2.75 9.137c0-2.803 1.257-4.542 2.83-5.14 1.575-.6 3.771-.167 5.88 2.024l1.08-1.04C10.15 2.496 7.345 1.72 5.046 2.595 2.743 3.471 1.25 5.888 1.25 9.137h1.5ZM15.503 19.5c1.492-1.177 3.28-2.754 4.703-4.516 1.407-1.743 2.544-3.775 2.544-5.847h-1.5c0 1.551-.872 3.246-2.211 4.905-1.323 1.639-3.015 3.137-4.465 4.28l.929 1.178ZM22.75 9.137c0-3.25-1.493-5.666-3.796-6.542-2.299-.874-5.103-.1-7.494 2.385l1.08 1.04c2.109-2.19 4.305-2.622 5.88-2.023 1.573.598 2.83 2.337 2.83 5.14h1.5ZM8.497 19.5c1.275 1.004 2.153 1.736 3.503 1.736v-1.5c-.73 0-1.184-.319-2.574-1.414L8.497 19.5Zm6.077-1.178c-1.39 1.095-1.843 1.414-2.574 1.414v1.5c1.35 0 2.228-.732 3.503-1.736l-.929-1.178ZM3.93 12.604c-.746-1.199-1.18-2.373-1.18-3.467h-1.5c0 1.48.58 2.932 1.407 4.26l1.273-.793Zm5.496 5.718a33.551 33.551 0 0 1-2.896-2.55l-1.06 1.062A35.022 35.022 0 0 0 8.497 19.5l.93-1.178Z" fill="#003588"/></svg>
          <span className="ml-2 text-2xl font-satoshi font-medium text-gray-900 ">Mediso</span>
          <span className="sr-only">Mediso</span>
        </Link>
        <nav className="flex gap-4 sm:gap-6 justify-center">
          {/* <Link className="text-sm hover:underline underline-offset-4 text-black hover:text-blue-600 transition-colors font-satoshi font-medium " href="#how-it-works">
            How It Works
          </Link>
          <Link className="text-sm hover:underline underline-offset-4 text-black hover:text-blue-600 transition-colors font-satoshi" href="#features">
            Features
          </Link>
          <Link className="text-sm hover:underline underline-offset-4 text-black hover:text-blue-600 transition-colors font-satoshi" href="#get-started">
            Get Started
          </Link> */}
        </nav>
        <div className="flex">
        <Search className="w-5 h-5 text-gray-600 mt-2 mr-4" />
        <button>
            <DashboardDropdownMenu />
        </button>
        </div>
      </header>
    )
}
