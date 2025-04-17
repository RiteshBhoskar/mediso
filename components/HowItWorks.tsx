"use client"

import { FileText, MessageSquare, UserPlus, CheckCircle, Stethoscope, User } from "lucide-react";
import { Card, CardHeader, CardContent, CardDescription } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function HowItWorks() {
  const sectionRef = useRef(null);
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        toggleActions: "play reverse play reverse",
      },
      defaults: {
        ease: "power1.out",
        duration: 1,
      },
    });
  
    tl.fromTo(
      ".left-container",
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0 },
      0
    ).fromTo(
      ".right-container",
      { opacity: 0, x: 200 },
      { opacity: 1, x: 0 },
      0 
    );
  });
  

    return (
        <section ref={sectionRef} className="w-full h-fit bg-white overflow-clip pb-7 sm:py-10 flex justify-center">
          <div className="container left-container px-4 md:px-3 w-full flex flex-col sm:flex-row justify-between">
            <div className="flex flex-col items-center justify-center sm:items-start w-full pt-20 h-screen">
            <div className="text-[#1C274C] rounded-full px-6 bg-[#ebebfb] w-fit font-medium font-satoshi text-lg py-2 ml-3">
                Our Vision
            </div>
            <h2 className="text-[3.50rem] pt-7 pl-3 font-satoshi text-[#363636] text-center sm:text-left font-medium tracking-tight leading-normal sm:pr-20">Finding health solutions with top Experts</h2>
            <Button className="bg-[#1C274C] hover:bg-[#324074] text-white rounded-full mt-7 ml-3 px-6 py-6 text-[20px]">
                    <Link href="#features">
                    About Us
                    </Link>
                    </Button>
            </div>

            <Tabs defaultValue="patients" className="w-full right-container max-w-3xl mx-auto sm:pr-5">
              <TabsList className="grid w-full grid-cols-2 rounded-full h-auto ">
                <TabsTrigger value="patients" className="font-heading  rounded-full  text-xl">For Patients</TabsTrigger>
                <TabsTrigger value="doctors" className="font-heading text-lg rounded-full">For Doctors</TabsTrigger>
              </TabsList>


              <TabsContent value="patients">
                <div className="grid gap-6 mt-8">
                  <Card className="rounded-3xl">
                    <CardHeader>
                      <div className="flex items-center text-[#1C274C] text-[30px] font-satoshi font-medium">
                        <span className="bg-[#D7D6FF] rounded-2xl flex items-center justify-center p-1 mr-4 size-11 ">
                        <FileText className="h-4 w-4" />
                        </span>
                        Share Your Health Concern
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-[20px] font-satoshi font-regular text-gray-500">Describe your symptoms or health issues in detail. Our platform ensures your privacy while connecting you with the right specialists.</CardDescription>
                    </CardContent>
                  </Card>
                  <Card className="rounded-3xl">
                    <CardHeader>
                      <div className="flex items-center text-[#1C274C] text-[30px] font-satoshi font-medium">
                      <span className="bg-[#D7D6FF] rounded-2xl flex items-center justify-center p-1 mr-4 size-11 ">
                        <User className="h-4 w-4" />
                        </span>
                        Get Matched with Specialists
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-[20px] font-satoshi font-regular text-gray-500">Doctors specializing in your area of concern will review your case and choose to assist you based on their expertise.</CardDescription>
                    </CardContent>
                  </Card>
                  <Card className="rounded-3xl">
                    <CardHeader>
                      <div className="flex items-center text-[#1C274C] text-[30px] font-satoshi font-medium">
                      <span className="bg-[#D7D6FF] rounded-2xl flex items-center justify-center p-1 mr-4 size-11 ">
                        <MessageSquare className="h-4 w-4" />
                        </span>
                        Receive Personalized Care
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-[20px] font-satoshi font-regular text-gray-500">Connect with your chosen doctor for consultations, treatment plans, and follow-ups tailored to your specific needs.</CardDescription>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="doctors">
                <div className="grid gap-6 mt-8">
                  <Card className="rounded-3xl">
                    <CardHeader>
                      <div className="flex items-center text-[#1C274C] text-[30px] font-satoshi font-medium">
                      <span className="bg-[#D7D6FF] rounded-2xl flex items-center justify-center p-1 mr-4 size-11 ">
                        <UserPlus className="h-4 w-4" />
                        </span>
                        Create Your Profile
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-[20px] font-satoshi font-regular text-gray-500">Showcase your expertise, specializations, and experience to connect with patients who need your specific skills.</CardDescription>
                    </CardContent>
                  </Card>
                  <Card className="rounded-3xl">
                    <CardHeader>
                      <div className="flex items-center text-[#1C274C] text-[30px] font-satoshi font-medium">
                      <span className="bg-[#D7D6FF] rounded-2xl flex items-center justify-center p-1 mr-4 size-11 ">
                        <CheckCircle className="h-4 w-4" />
                        </span>
                        Choose Your Patients
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-[20px] font-satoshi font-regular text-gray-500">Review patient cases that match your expertise and choose those you're best equipped to help, ensuring optimal care.</CardDescription>
                    </CardContent>
                  </Card>
                  <Card className="rounded-3xl">
                    <CardHeader>
                      <div className="flex items-center text-[#1C274C] text-[30px] font-satoshi font-medium">
                      <span className="bg-[#D7D6FF] rounded-2xl flex items-center justify-center p-1 mr-4 size-11 ">
                        <Stethoscope className="h-4 w-4" />
                        </span>
                        Provide Specialized Care
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-[20px] font-satoshi font-regular text-gray-500">Offer personalized consultations, treatment plans, and follow-ups, maximizing your impact on patient health.</CardDescription>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
    )
}

//#D7D6FF