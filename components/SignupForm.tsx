'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { ExternalLink } from 'lucide-react'
import { signIn, useSession } from "next-auth/react"
import Link from "next/link"

export default function SignupForm() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("patient");
  const [speciality, setSpeciality] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = useSession();
  const router = useRouter()

  useEffect(()=>{
    if(session?.user){
      if(session.user.role === "DOCTOR"){
        router.push("dashboard/doctor")
      }else if (session.user.role === "PATIENT"){
        router.push("dashboard/patient")
      }
    }
  },[session, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.warning("Full Name is required.");
      return;
    }
    if (!email.trim()) {
      toast.warning("Email is required.");
      return;
    }
    if (!password) {
      toast.warning("Password is required.");
      return;
    }
    if (role === "doctor" && !speciality.trim()) {
      toast.warning("Speciality is required for doctors.");
      return;
    }
    if (!confirmPassword) {
      toast.warning("Please confirm your password.");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.warning("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      toast.warning("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      toast.warning("Passwords do not match")
      return
    }
    if (!agreedToTerms) {
      toast.warning("You must agree to the terms")
      return
    }

    setIsSubmitting(true);

    const signupLoadingId = toast.loading("Signing Up...")
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, role: role.toUpperCase() , email, password , speciality }),
    })

    toast.dismiss(signupLoadingId)

    if(!res.ok){
      toast.error("Failed to sign up, please try again.");
      setIsSubmitting(false)
      return
    }

    const data = await res.json()
    toast.success(data.msg);
    if(data.success){

      setName("");
      setRole("patient");
      setSpeciality("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setAgreedToTerms(false);

      const loadingToastId = toast.loading("Signing In...");

      const signInResponse = await signIn("credentials",{
        email,
        password,
        redirect: false,
      })

      toast.dismiss(loadingToastId)

      if(signInResponse?.error){
        toast.error(signInResponse.error)
      } else {
        toast.success("Signed In Successfully.")
      }

    } else {
      toast.error(data.error || "Failed to sign up, something went wrong please try again.")
    }
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-lg shadow">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          placeholder="John Doe"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label>Role</Label>
        <RadioGroup value={role} onValueChange={setRole} className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="patient" id="patient" />
            <Label htmlFor="patient">Patient</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="doctor" id="doctor" />
            <Label htmlFor="doctor">Doctor</Label>
          </div>
        </RadioGroup>
        {role ==="doctor" && (
          <div className="space-y-2">
            <Label>Speciality</Label>
            <Input
            id="speciality"
            required
            value={speciality}
            onChange={(e)=>setSpeciality(e.target.value)} />
          </div>
        )}



      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          placeholder="whatever@gmail.com"
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <Input
          id="confirm-password"
          required
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={agreedToTerms}
          onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
          required
        />
        <Label htmlFor="terms" className="text-sm">
          I agree to the{" "}
          <Link href="#" className="underline inline-flex items-center">
            Terms of Service <ExternalLink className="w-3 h-3 ml-1" />
          </Link>{" "}
          and{" "}
          <Link href="#"className="underline inline-flex items-center">
            Privacy Policy <ExternalLink className="w-3 h-3 ml-1" />
          </Link>
        </Label>
      </div>
      <Button
        className="w-full"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating Your Account..." : "Create Account"}
      </Button>
    </form>
  )
}