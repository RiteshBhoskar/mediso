import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Stethoscope, Github, Mail } from "lucide-react"
import { signIn } from "next-auth/react"
import { useState } from "react"
import SigninForm from "./SigninForm"

export default function SignIn() {
  return (
    <div className="flex flex-col min-h-screen bg-blue-50 font-body">
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold tracking-tight font-heading">Sign in</CardTitle>
            <CardDescription>
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>
          <SigninForm />
          <div className="flex flex-wrap items-center m-4 space-x-4  justify-between ">
            <div className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link className="underline text-blue-600 hover:text-blue-800" href="/signup">
                Sign up
              </Link>
            </div>
            <Link className="text-sm text-blue-600 hover:text-blue-800" href="/forgot-password">
              Forgot your password?
            </Link>
          </div>
        </Card>
      </main>
      </div>
  )
}