import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, UserPlus, Stethoscope, Users, MessageSquare, CheckCircle, Target, Zap, UserCircle, Lock, Calendar, HeartPulse } from "lucide-react"
import Image from "next/image"
import Header from "./Header"

export default function IntroductionPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-body">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-blue-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-satoshi 
                font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-gray-900 font-heading">
                  Welcome to HealthConnect
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl">
                  Share your health concerns and connect with doctors who specialize in your needs. A new approach to personalized healthcare.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild size="lg" className="bg-blue-600 text-white hover:bg-blue-700 font-heading">
                  <Link href="/signup">Join Now</Link>
                </Button>
                <Button variant="outline" asChild size="lg" className="text-blue-600 border-blue-600 hover:bg-blue-50 font-heading">
                  <Link href="#how-it-works">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full bg-slate-300 py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12 text-gray-900 font-heading">How HealthConnect Works</h2>
            <Tabs defaultValue="patients" className="w-full max-w-3xl mx-auto">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="patients" className="font-heading">For Patients</TabsTrigger>
                <TabsTrigger value="doctors" className="font-heading">For Doctors</TabsTrigger>
              </TabsList>
              <TabsContent value="patients">
                <div className="grid gap-6 mt-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-blue-600 font-heading">
                        <FileText className="h-5 w-5 mr-2" />
                        Share Your Health Concern
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>Describe your symptoms or health issues in detail. Our platform ensures your privacy while connecting you with the right specialists.</CardDescription>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-blue-600 font-heading">
                        <Users className="h-5 w-5 mr-2" />
                        Get Matched with Specialists
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>Doctors specializing in your area of concern will review your case and choose to assist you based on their expertise.</CardDescription>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-blue-600 font-heading">
                        <MessageSquare className="h-5 w-5 mr-2" />
                        Receive Personalized Care
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>Connect with your chosen doctor for consultations, treatment plans, and follow-ups tailored to your specific needs.</CardDescription>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="doctors">
                <div className="grid gap-6 mt-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-blue-600 font-heading">
                        <UserPlus className="h-5 w-5 mr-2" />
                        Create Your Profile
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>Showcase your expertise, specializations, and experience to connect with patients who need your specific skills.</CardDescription>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-blue-600 font-heading">
                        <CheckCircle className="h-5 w-5 mr-2" />
                        Choose Your Patients
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>Review patient cases that match your expertise and choose those you're best equipped to help, ensuring optimal care.</CardDescription>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-blue-600 font-heading">
                        <Stethoscope className="h-5 w-5 mr-2" />
                        Provide Specialized Care
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>Offer personalized consultations, treatment plans, and follow-ups, maximizing your impact on patient health.</CardDescription>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12 text-gray-900 font-heading">Why Choose HealthConnect?</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-600 font-heading">
                    <Target className="h-5 w-5 mr-2 text-blue-600" />
                    Tailored Matches
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Our platform ensures patients are connected with doctors who have the specific expertise to address their health concerns.</CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-600 font-heading">
                    <Zap className="h-5 w-5 mr-2 text-blue-600" />
                    Efficient Care
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Doctors can focus on cases where their expertise is most valuable, leading to more efficient and effective healthcare delivery.</CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-600 font-heading">
                    <UserCircle className="h-5 w-5 mr-2 text-blue-600" />
                    Comprehensive Profiles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Detailed doctor profiles and patient case descriptions facilitate informed decisions and better matches.</CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-600 font-heading">
                    <Lock className="h-5 w-5 mr-2 text-blue-600" />
                    Secure Communication
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Our platform provides a secure environment for sharing health information and conducting virtual consultations.</CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-600 font-heading">
                    <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                    Flexible Scheduling
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Arrange virtual or in-person appointments that suit both patient needs and doctor availability.</CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-600 font-heading">
                    <HeartPulse className="h-5 w-5 mr-2 text-blue-600" />
                    Continuous Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Facilitate ongoing care with easy follow-ups, progress tracking, and communication between doctors and patients.</CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="get-started" className="w-full py-12 md:py-24 lg:py-32 bg-blue-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-heading">
                  Ready to Transform Your Healthcare Experience?
                </h2>
                <p className="mx-auto max-w-[600px] text-blue-100 md:text-xl">
                  Join HealthConnect today and experience a new way of connecting patients with the right doctors. It's quick, easy, and free to get started.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Button asChild size="lg" className="w-full bg-white text-blue-600 hover:bg-blue-50 font-heading">
                  <Link href="/signup">
                    Create Your Free Account
                  </Link>
                </Button>
                <p className="text-sm text-blue-100">
                  Already have an account?{" "}
                  <Link href="/signin" className="underline underline-offset-2 hover:text-white">
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}