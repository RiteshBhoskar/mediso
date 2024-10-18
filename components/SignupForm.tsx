'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { ExternalLink } from 'lucide-react'

export default function SignupForm() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("patient");
  const [speciality, setSpeciality] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      console.error("Passwords do not match")
      return
    }
    if (!agreedToTerms) {
      console.error("You must agree to the terms")
      return
    }
    const res = await fetch('api/auth/signup', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, role: role.toUpperCase() , email, password , speciality }),
    })

    const data = await res.json()
    if (data) {
      // Log the signup event to Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        ; (window as any).gtag('event', 'sign_up', {
          'method': 'form'
        })
      }
      router.push("/dashboard")
      // console.log(data)
    } else {
      console.log("Failed to sign up, something went wrong please try again.")
    }
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
          <a href="/terms" className="underline inline-flex items-center">
            Terms of Service <ExternalLink className="w-3 h-3 ml-1" />
          </a>{" "}
          and{" "}
          <a href="/privacy" className="underline inline-flex items-center">
            Privacy Policy <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        </Label>
      </div>
      <Button
        className="w-full"
        type="submit"
      >
        Create Account
      </Button>
    </form>
  )
}