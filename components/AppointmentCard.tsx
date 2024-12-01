"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import LoadingSpinner from "./LoadingSpinner";
import { format } from "date-fns";
import { User } from "lucide-react";

interface Appointment {
    appointmentDate: string;
    startTime: string;
    endTime : string;
    concernTitle : string;
    doctorName: string;
}

export default function AppointmentCard () {
    const { data: session , status } = useSession();
    const [ appointments , setAppointments ] = useState<Appointment[]>([]);
    const [ loading , setLoading ] = useState<boolean>(true)
    const router = useRouter();

    if(!session || session.user.role !== "PATIENT" || status !== "authenticated") {
        router.push("/");
    }

    useEffect(() => {

        if( status === "loading") {
            return;
        }

        if (status === "unauthenticated") {
            toast.error("You must be logged in to view your appointments.");
            router.push("/");
            return;
        }

        if (status === "authenticated" && session.user.role !== "PATIENT") {
            toast.error("You are not authorized t oview appointments.")
            router.push("/");
            return;
        }
            setLoading(true);
            const fetchAppointments = async () => {
                try {
                    const response = await fetch("/api/appointments/patients");
                    const data = await response.json();

                    if (response.ok) {
                        setAppointments(data.appointments);
                    } else {
                        toast.error(data.message || "Failed to fetch appointments.")
                    }
                } catch (error) {
                    toast.error("An error occurred while fetching appointments.")
                } finally {
                    setLoading(false);
                }
            };
            fetchAppointments();
    }, [ status , session , router ]);

    if(loading) {
        return <LoadingSpinner />
    }

    return (
        <div className="space-y-6">
    {appointments.length === 0 ? (
        <div className="text-2xl font-satoshi flex justify-center items-center text-center text-gray-600">
            No appointments found.
        </div>
    ) : (
        appointments.map((appointment, index) => (
            <div
                key={index}
                className="w-[420px] bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200 mb-6 transition-transform transform hover:scale-105"
            >
                <div className="p-5 flex items-center space-x-4 bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600 text-white">
                    <User className="h-7 w-7 text-white" />
                    <h2 className="text-xl font-semibold tracking-wide">Dr. {appointment.doctorName}</h2>
                </div>

                <div className="p-4 bg-gray-50">
                    <p className="text-sm text-gray-500">Concern:</p>
                    <p className="text-lg font-medium text-gray-800">{appointment.concernTitle}</p>
                </div>

                <div className="p-4 bg-gray-100">
                    <p className="text-sm text-gray-500">Date:</p>
                    <p className="text-xl font-semibold text-gray-900">{format(new Date(appointment.appointmentDate), 'MMMM dd, yyyy')}</p>
                </div>

                <div className="p-4 bg-gray-50">
                    <p className="text-sm text-gray-500">Time:</p>
                    <p className="text-lg font-medium text-gray-800">
                        {format(new Date(appointment.startTime), 'h:mm a')} - {format(new Date(appointment.endTime), 'h:mm a')}
                    </p>
                </div>
            </div>
        ))
    )}
</div>
    )
}