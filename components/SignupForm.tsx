'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { ExternalLink } from 'lucide-react'
import { signIn, useSession } from "next-auth/react"

export default function SignupForm() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("patient");
  const [speciality, setSpeciality] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [message, setMessage ] = useState<{ text : string , success: boolean } | null>(null);
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
    setMessage(null);
    if (password !== confirmPassword) {
      setMessage({ text: "Passwords do not match" , success: false})
      return
    }
    if (!agreedToTerms) {
      setMessage({text :"You must agree to the terms", success: false})
      return
    }

    setIsSubmitting(true);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, role: role.toUpperCase() , email, password , speciality }),
    })

    const data = await res.json()
    setMessage({text : data.msg , success : true})
    // console.log(data)
    if(data.success){

      setName("");
      setRole("patient");
      setSpeciality("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setAgreedToTerms(false);

      const signInResponse = await signIn("credentials",{
        email,
        password,
        redirect: false,
      })

      if(signInResponse?.error){
        setMessage({text : signInResponse.error, success: false})
      }

    } else {
      setMessage(data.error || "Failed to sign up, something went wrong please try again.")
    }
    setIsSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-lg shadow">
    {message && <p className={message.success ? "text-green-400": "text-red-500" }>{message.text}</p>}
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
          <a className="underline inline-flex items-center">
            Terms of Service <ExternalLink className="w-3 h-3 ml-1" />
          </a>{" "}
          and{" "}
          <a className="underline inline-flex items-center">
            Privacy Policy <ExternalLink className="w-3 h-3 ml-1" />
          </a>
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