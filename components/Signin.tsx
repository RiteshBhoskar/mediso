import Link from "next/link"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import SigninForm from "./SigninForm"
import PlainHeader from "./PlainHeader"

export default function SignIn() {
  return (
    <div className="flex flex-col min-h-screen bg-blue-50 font-body">
      <PlainHeader />
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