"use client"
import Link from "next/link";
import { Button } from "./ui/button";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP)

export default function GetStarted() {
    const sectionRef  = useRef(null);
      useGSAP(() => {
        gsap.fromTo(".get-started", {
          opacity: 0,
          y: 100,
        } , {
          opacity: 1,
          y: 0,
          ease: "power1.out",
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play reverse play reverse"
          }
        })
      })
    
    return (
        <div ref={sectionRef} className="bg-white overflow-clip w-full">
            <div className="py-16 bg-[#8585fb] get-started rounded-3xl my-7 mx-5 sm:mx-10 flex justify-center text-white">
                <div className="container px-4 md:px-6 flex flex-col items-center text-center">
                    <div className="space-y-4 max-w-2xl">
                        <div className="rounded-full text-[#1C274C] bg-[#ebebfb] px-6 py-2 w-fit mx-auto font-medium text-lg">
                            Get Started
                        </div>
                        <h2 className="text-[2.5rem] sm:text-[3.5rem] font-satoshi font-medium tracking-tight leading-tight text-white">
                            Ready to Transform Your Healthcare Experience?
                        </h2>
                        <p className="text-[#d9d9ff] text-lg px-2">
                            Join HealthConnect today and experience a new way of connecting patients with the right doctors. It's quick, easy, and free to get started.
                        </p>
                    </div>
                    <div className="flex flex-col space-y-4 mt-8 w-full max-w-sm">
                        <Button className="bg-white hover:bg-[#e0e0ff] text-[#1C274C] text-lg rounded-full py-4">
                            <Link href="/signup">
                                Create Your Free Account
                            </Link>
                        </Button>
                        <p className="text-[#d9d9ff] text-sm">
                            Already have an account?{" "}
                            <Link href="/signin" className="underline underline-offset-2 text-white hover:text-[#e0e0ff]">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
