import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Stethoscope, Github, Mail } from "lucide-react"
import SignupForm from "./SignupForm";
import PlainHeader from "./PlainHeader";

export default function SignUpPage() {
  return (
    <div className="flex flex-col min-h-screen bg-blue-50 font-body">
      <PlainHeader />
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-satoshi tracking-tight">Sign up</CardTitle>
            <CardDescription>
              Create an account to start connecting with healthcare professionals
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">


            <SignupForm />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or sign up with</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" className="w-full">
                <Github className="mr-2 h-4 w-4" />
                Github
              </Button>
              <Button variant="outline" className="w-full">
                <Mail className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link className="underline text-blue-600 hover:text-blue-800" href="/signin">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
};