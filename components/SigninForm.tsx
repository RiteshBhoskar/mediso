"use client"
import { Label } from "@radix-ui/react-label";
import { Github, Mail } from "lucide-react";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";

export default function SigninForm(){
    
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signingIn , setSigningIn] =  useState<boolean>(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async (e: React.FormEvent)=>{
        e.preventDefault();
        const signInLoadingId = toast.loading("Signing in...");
        setSigningIn(true);

        try {
        const res = await signIn("credentials",{
            email,
            password,
            redirect: false,
        })
        toast.dismiss(signInLoadingId);
        if(!res) {
          toast.error("Unexpected error occurred. Please try again.");
          setSigningIn(false);
          return;
        }
        if(res?.error){
          toast.error(res.error);
        }
        if(res?.ok){
          toast.success("Signed In");
          const session = await getSession();
          const role = session?.user.role;
          if(role === "PATIENT"){
            router.push("dashboard/patient");
            setSigningIn(false)
          }else if(role === "DOCTOR"){
            router.push("dashboard/doctor");
            setSigningIn(false)
          }else {
            toast.error("Something went wrong , please try again.");
            setSigningIn(false);
          }
        }
        } catch (error) {
          toast.error("Something went wrong , please try again.")
        } finally {
          setSigningIn(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2 m-3">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                value={email} 
                placeholder="your@email.com"
                required 
                type="email"
                onChange={(e)=> setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2 m-3">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password"
                value={password}
                required
                type="password"
                onChange={(e)=> setPassword(e.target.value)} />
            </div>
            <div className="flex items-center space-x-2 m-3">
              <input type="checkbox" id="remember"
              checked={rememberMe}
              onChange={()=> setRememberMe(!rememberMe)}
               className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
              <label htmlFor="remember" className="text-sm text-gray-600">Remember me</label>
            </div>
            <div className="m-3">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-heading" type="submit" disabled={signingIn || !email || !password} >
              {signingIn ? "Signing In ..." : "Sign in"}
            </Button>
            </div>
            <div className="relative m-3">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>
            <div className="flex m-3 space-x-2">
              <Button variant="outline" className="w-full">
                <Github className="mr-2 h-4 w-4" />
                Github
              </Button>
              <Button variant="outline" className="w-full">
                <Mail className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>
          </form>
    )
};