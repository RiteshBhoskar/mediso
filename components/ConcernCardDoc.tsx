"use client"
import { useSession } from "next-auth/react"
import LoadingSpinner from "./LoadingSpinner";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FaSpinner, FaUserCircle } from "react-icons/fa";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";


interface Concern {
    id: number;
    title: string;
    speciality: string
    description: string;
    createdAt: Date;
    patientName: string;
}

interface ConcernResponse {
    concerns: Concern[];
}

export default  function ConcernCardDoctor(){
    const [ concerns , setConcerns ] = useState<Concern[]>([]);
    const [ date , setDate ]  = useState<Date>();
    const [ startTime , setStartTime ] = useState<string>("");
    const [ endTime , setEndTime ] = useState<string>("");
    const [isLoadingConcerns , setIsLoadingConcerns] = useState(true);
    const [isProcessing , setIsProcessing] = useState(false);
    const {data : session , status } = useSession();


    const renderLoadingState = () => {
        if (status === "loading" || isLoadingConcerns) {
          return <LoadingSpinner />;
        }
    }

    
    if ( status === "unauthenticated") {
        return (
        <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">Please log in to view concerns.</p>
        </div>
        )
    }

    useEffect(()=>{
        if(status === "authenticated"){
            const fetchConcerns = async () => {
                try {
                    setIsLoadingConcerns(true);
                    const response = await fetch("/api/concerns?role=doctor");
                    if(!response.ok){return toast.error("Failed to fetch concerns.")}
                    const data: ConcernResponse = await response.json();
                    setConcerns(data.concerns);
                } catch (error: any) {
                    toast.error("Error fetching concerns", error);
                } finally {
                    setIsLoadingConcerns(false);
                }
            }
            fetchConcerns();
        }
    }, [status]);

    const loadingState = renderLoadingState();
    if (loadingState) {
      return loadingState;
    }  

    
  const today = new Date();
  today.setHours(0,0,0,0);

    const handleAppointmentSubmit = async (concernId : number) => {

        if ( !date || !startTime || !endTime) {
            toast.warning("Please select a date and time for your appointment.");
            return;
        }

        if( startTime >= endTime) {
            toast.warning("Start time must be before the end time.");
            return;
        }
        const processingToastId = toast.loading("Creating an Appointment...");

            try {
                setIsProcessing(true);
                const response = await fetch("/api/appointments" , {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body:  JSON.stringify({
                        concernId,
                        appointmentDate: date,
                        startTime,
                        endTime
                    })
                })

                const data = await response.json();

                setIsProcessing(false);
                toast.dismiss(processingToastId);

                if(data.ok){
                    toast.success(data.message ||"Appointment scheduled successfully.");
                    setDate(today);
                    setStartTime("");
                    setEndTime("");
                } else {
                    toast.error(data.message || "Failed to send request.");
                    return;
                }
            } catch (error) {
                setIsProcessing(false);
                toast.dismiss(processingToastId);
                toast.error("An unknown error occurred");
            }
      };

    return (<div className="grid justify-center pt-3 bg-white rounded-2xl overflow-hidden font-satoshi">
        {concerns.length > 0 ? (
          concerns.map((concern) => (
            <div
              key={concern.id}
              className="sm:w-[420px] bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200 mb-4 font-satoshi"
            >
              <div className="p-4 border-b flex justify-between border-gray-100">
                <div className="grid">
                  <h2 className="text-2xl font-semibold text-black mb-2">
                    {concern.title}
                  </h2>
                  <p className="text-sm text-indigo-600 font-medium">
                    {concern.speciality}
                  </p>
                </div>
                <div>
                    <Dialog>
                        <DialogTrigger asChild>
                          <img 
                            className="h-7 w-7"
                            src="/appointment.png" 
                            alt="appointment image" />
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[420px] font-satoshi">
                            <DialogHeader>
                                <DialogTitle className="font-regular text-2xl">
                                    Schedule appointment
                                </DialogTitle>
                                <DialogDescription className="">
                                    Send an app appointment to {concern.patientName}
                                </DialogDescription>
                            </DialogHeader>
                            <div>
                                <div className="flex">
                                    <Label className="flex justify-center items-center mr-4">
                                        Pick a date:
                                    </Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="ghost" 
                                            className={cn("w-[240px] justify-start text-left font-normal py-2 px-3 border border-gray-300 rounded-md font-normal",!date && "text-muted-foreground")}>
                                                <CalendarIcon className="text-gray-700" />
                                                {date ? format(date , "PPP") : <span>Pick a date.</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                             mode="single"
                                             selected={date}
                                             onSelect={setDate}
                                             initialFocus
                                             disabled= {(date)=> date < today}
                                             />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div>
                                        <Label>Start Time:</Label>
                                        <input
                                        type="time"
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                        />
                                    </div>
                                    <div>
                                        <Label>End Time:</Label>
                                        <input
                                        type="time"
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                        />
                                </div>
                            </div>
                            <DialogFooter>
                                    <Button variant="default" 
                                    disabled= {!date || !startTime || !endTime || isProcessing}
                                    onClick={() => handleAppointmentSubmit(concern.id)}
                                    className={`w-full py-2 rounded-md transition ${isProcessing 
                                        ? " bg-blue-800 text-white  cursor-not-allowed"
                                        : "bg-blue-600 hover:bg-blue-800"
                                    }`}>
                                        {isProcessing ? (
                                            <div className="flex justify-center items-center">
                                                <span className="mr-2">
                                                Creating Appointment...
                                                </span>
                                                <FaSpinner className="animate-spin " />
                                            </div>
                                        )
                                        : ( "Send Appointment Request" )}
                                    </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
              </div>
      
              <div className="p-4 text-black">
                <p>{concern.description}</p>
              </div>
      
              <div className="p-4 bg-gray-50 flex justify-between text-gray-500 text-xs font-medium border-t border-gray-100">
                <div className="flex items-center text-gray-600">
                  <FaUserCircle className="mr-2" size={18} />
                  <span className="text-xs font-medium">
                    {`Posted by ${concern.patientName}`}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
        <div className="text-center py-6">
          <p className="text-center text-gray-600">
            No concerns available at the moment.
          </p>
        </div>
        )}
      </div>      
    )
}