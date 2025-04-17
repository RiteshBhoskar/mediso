"use client"
import { Target, Zap, UserCircle, Calendar, HeartPulse, Lock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

export default function Features() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(".card", {
      opacity: 0,
      y: 100,
    } , {
      opacity: 1,
      y: 0,
      ease: "power1.out",
      stagger: 0.5,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        toggleActions: "play reverse play reverse"
      }
    })
  })

    return (
        <div ref={sectionRef} className="w-full py-7 flex overflow-clip justify-center bg-slate-50">
          <div className="container px-4 md:px-4">
            <div className="flex justify-center">
            <div className="text-[#1C274C] rounded-full px-6 bg-[#ebebfb] w-fit font-medium font-satoshi text-lg py-2">
                Features
            </div>
            </div>
            <h2 className="text-[3.30rem] flex justify-center text-center pt-7 font-satoshi px-2 sm:px-60 pb-8 leading-tight text-[#363636] font-medium card">Different types of features we have for your healthcare</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="rounded-3xl card">
                <CardHeader>
                <div className="flex-col items-center text-[#1C274C] text-[30px] font-satoshi font-medium">
                        <span className="bg-[#D7D6FF] rounded-2xl flex items-center justify-center p-1 mb-5 size-11 ">
                        <Target className="h-5 w-5" />
                        </span>
                        Tailored Matches
                      </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[20px] font-satoshi font-regular text-gray-500">Our platform ensures patients are connected with doctors who have the specific expertise to address their health concerns.</CardDescription>
                </CardContent>
              </Card>
              <Card className="rounded-3xl card">
                <CardHeader>
                <div className="flex-col items-center text-[#1C274C] text-[30px] font-satoshi font-medium">
                        <span className="bg-[#D7D6FF] rounded-2xl flex items-center justify-center p-1 mb-5 size-11 ">
                        <Zap className="h-5 w-5" />
                        </span>
                        Efficient Care
                      </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[20px] font-satoshi font-regular text-gray-500">Doctors can focus on cases where their expertise is most valuable, leading to more efficient and effective healthcare delivery.</CardDescription>
                </CardContent>
              </Card>
              <Card className="rounded-3xl card">
                <CardHeader>
                <div className="flex-col items-center text-[#1C274C] text-[30px] font-satoshi font-medium">
                        <span className="bg-[#D7D6FF] rounded-2xl flex items-center justify-center p-1 mb-5 size-11 ">
                        <UserCircle className="h-5 w-5" />
                        </span>
                        Comprehensive Profiles
                      </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[20px] font-satoshi font-regular text-gray-500">Detailed doctor profiles and patient case descriptions facilitate informed decisions and better matches.</CardDescription>
                </CardContent>
              </Card>
              <Card className="rounded-3xl card">
                <CardHeader>
                <div className="flex-col items-center text-[#1C274C] text-[30px] font-satoshi font-medium">
                        <span className="bg-[#D7D6FF] rounded-2xl flex items-center justify-center p-1 mb-5 size-11 ">
                        <Lock className="h-5 w-5" />
                        </span>
                        Secure Communication
                      </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[20px] font-satoshi font-regular text-gray-500">Our platform provides a secure environment for sharing health information and conducting virtual consultations.</CardDescription>
                </CardContent>
              </Card>
              <Card className="rounded-3xl card">
                <CardHeader>
                <div className="flex-col items-center text-[#1C274C] text-[30px] font-satoshi font-medium">
                        <span className="bg-[#D7D6FF] rounded-2xl flex items-center justify-center p-1 mb-5 size-11 ">
                        <Calendar className="h-5 w-5" />
                        </span>
                        Flexible Scheduling
                      </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[20px] font-satoshi font-regular text-gray-500">Arrange virtual or in-person appointments that suit both patient needs and doctor availability.</CardDescription>
                </CardContent>
              </Card>
              <Card className="rounded-3xl card">
                <CardHeader>
                <div className="flex-col items-center text-[#1C274C] text-[30px] font-satoshi font-medium">
                        <span className="bg-[#D7D6FF] rounded-2xl flex items-center justify-center p-1 mb-5 size-11 ">
                        <HeartPulse className="h-5 w-5" />
                        </span>
                        Continuous Support
                      </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[20px] font-satoshi font-regular text-gray-500">Facilitate ongoing care with easy follow-ups, progress tracking, and communication between doctors and patients.</CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
    )
}