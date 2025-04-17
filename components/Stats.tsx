"use client"

import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"

gsap.registerPlugin(useGSAP)

export default function Stats(){
    const sectionRef = useRef(null);

    useGSAP(() => {
        gsap.fromTo(".main-container", {
            opacity: 0,
            y: 100,
        },{
            opacity: 1,
            y: 0,
            ease: "power2.inOut",
            duration: 2,
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 90%",
                toggleActions: "play reverse play reverse"
            }
        })
    })

    return (
        <section ref={sectionRef} className="bg-[#FAFAFA] main-container overflow-clip w-full h-full sm:w-full sm:h-fit rounded-3xl flex flex-col sm:flex-row sm:justify-evenly px-7 py-10">
            <div className="flex-col pl-5">
                <div className="text-[#1C274C] text-center text-7xl font-medium">
                    98%
                </div>
                <div className="text-[#787878] font-medium text-center text-xl pt-3 flex justify-center">
                    Statisfaction rate
                </div>
            </div>
            <div className="text-[#1C274C] text-5xl justify-center flex items-center mx-16 ">
                &middot;
            </div>
            <div className="flex-col pl-5">
                <div className="text-[#1C274C] text-center text-7xl font-medium">
                    30+
                </div>
                <div className="text-[#787878] font-medium text-center text-xl pt-3 flex justify-center">
                    Years of experience
                </div>
            </div>
            <div className="text-[#1C274C] text-5xl flex justify-center items-center mx-16 ">
                &middot;
            </div>
            <div className="flex-col pl-5">
                <div className="text-[#1C274C] text-center text-7xl font-medium">
                    1000+
                </div>
                <div className="text-[#787878] font-medium text-center text-xl pt-3 flex justify-center">
                    Patients Treated
                </div>
            </div>
            <div className="text-[#1C274C] text-5xl flex justify-center items-center mx-16 ">
                &middot;
            </div>
            <div className="flex-col pl-5">
                <div className="text-[#1C274C] text-center text-7xl font-medium">
                    80
                </div>
                <div className="text-[#787878] font-medium text-center text-xl pt-3 flex justify-center">
                    Expert Doctors
                </div>
            </div>
        </section>
    )
}