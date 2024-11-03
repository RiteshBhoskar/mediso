"use client"
import { signOut } from "next-auth/react"
import { DropdownMenuItem, DropdownMenuShortcut } from "./ui/dropdown-menu"
import { LogOut } from "lucide-react"

export default function LogOutButton(){
    return (
        <DropdownMenuItem>
        <LogOut />
        <span onClick={async()=> {signOut({
            callbackUrl: "/",
        })}}>Log out</span>
        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
      </DropdownMenuItem>
    )
}