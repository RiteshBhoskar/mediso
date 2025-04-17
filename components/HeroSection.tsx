"use client"
import { MoveUpRight, Search, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger)


export default function HeroSection () {
    const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: containerRef.current,
            toggleActions: "play reverse play reverse"
        }
    });

    tl.set(".right-section", { opacity: 0, x: 100 })
      .set(".left-section", { opacity: 0, x: -100 })
      .to(".right-section", {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power1.out",
      }, "<")
      .to(".left-section", {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power1.out",
      }, "<")
  }, { scope: containerRef });

    return (
        <section ref={containerRef} className="h-auto w-full overflow-clip sm:flex justify-between">
            <div className="w-full left-section opacity-0">
                <div className="pt-16 pl-10 space-y-6 h-full">
                <div className="flex items-center w-fit space-x-2">
                    <Star className="w-5 h-5 text-[#1C274C] fill-current" />
                    <span className="text-gray-600 text-xl w-fit">4.7 | 3,460 Reviews</span>
                </div>
                <h1 className="text-[3rem] sm:text-[3.50rem] font-satoshi text-[#363636] font-medium leading-tight">
                    A modern <span className=" bg-blue-100 rounded-full p-1 size-14 inline-flex justify-center items-center top-2 text-black">
                       <MoveUpRight /> </span> safe and<br />
                    effective approach to<br />
                    <span className="inline-flex items-center">
                    <span className="bg-[#fcb494] rounded-2xl flex items-center justify-center p-1 mr-2 size-14 ">
                        <Star className="fill-current text-white size-7" />
                    </span>
                    well being
                    </span>
                </h1>
                <div className="flex space-x-4">
                    <Button className="bg-[#1C274C] hover:bg-[#324074] text-white rounded-full px-6 py-6 text-[20px]">
                    <Link href="#get-started">
                    Join Now
                    </Link>
                    </Button>
                    <Button variant="outline" className="text-[#1C274C] border-gray-400 rounded-full px-6 py-6 text-[20px]">
                        <Link href="#how-it-works">
                        Learn more
                        </Link>
                    </Button>
                </div>
                </div>
            </div>


            <div className="w-full right-section opacity-0 relative pt-5 sm:pt-0">
                <div className="w-auto hidden sm:block absolute mt-64">
                    <Card className="z-50 rounded-3xl">
                        <CardHeader className="text-[0.95rem] -m-2 -mt-4  font-mid flex justify-center">
                            Available Doctors
                        </CardHeader>
                        <CardContent className="-mt-3">
                            <div className="flex-col space-y-2 mr-2">
                            <div className="flex">
                                <img src="/jonathan.avif"
                                className="size-8 rounded-lg bg-blue-200 mr-3" alt="doctor" />
                                <div className="flex-col">
                                    <h4 className="text-[0.8rem] flex justify-center items-center">
                                        Jonathan Reed
                                    </h4>
                                    <p className="text-[0.6rem] flex justify-center items-center text-gray-400">
                                        Gastroenterologist
                                    </p>
                                </div>
                            </div>
                            <div className="flex">
                                <img src="/olivia.avif"
                                className="size-8 rounded-lg bg-blue-200 mr-3" alt="doctor" />
                                <div className="flex-col">
                                    <h4 className="text-[0.8rem] flex justify-center items-center">
                                        Olivia Bennett
                                    </h4>
                                    <p className="text-[0.6rem] flex justify-center items-center text-gray-400">
                                        Dermatologist
                                    </p>
                                </div>
                            </div>
                            </div>
                        </CardContent>
                        <CardFooter className="-my-2.5 -mx-2">
                            <div className="flex items-center text-white w-full py-1 rounded-full border border-gray-300 px-2">
                                <Search className="size-4  text-gray-400 mr-1" />
                                <div  className=" px-2 text-[0.6rem] text-gray-400">
                                Search for a Doctor
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
                <img 
                  src="/doctorImage.avif"
                  alt="doctor image"
                  className="sm:h-[532px] px-20"
                   />
            </div>
        </section>
    )
}