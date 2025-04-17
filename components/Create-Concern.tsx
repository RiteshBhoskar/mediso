"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { toast } from "sonner"



export default function CreateConcern(){
  const [title, setTitle] = useState("");
  const [description , setDescription] = useState("");
  const [speciality, setSpeciality] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  const handleSubmit = async (e: React.FormEvent)=>{
    e.preventDefault();

    if(!title){
        toast.warning("Title is required");
        return
    }
    if(!speciality){
        toast.warning("Speciality is required");
        return
    }
    if(!description){
        toast.warning("Description is required");
        return
    }

    setIsSubmitting(true);

    const concernSubmitId = toast.loading("Submitting your concern...");

    const res = await fetch("/api/create-concern",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({title, speciality , description})
    })

    toast.dismiss(concernSubmitId);

    if(!res.ok){
        toast.error("Failed to create a concern.")
        setIsSubmitting(false);
        return
    }

    const data = await res.json();

    if(data.message === "Concern Created Successfully."){
        setTitle("");
        setDescription("");
        setSpeciality(null);
        toast.success(data.message);
        setIsSubmitting(false);
    }

  };

  return (
    <div className="flex justify-center h-fit mx-3 mt-7 mb-24">
    <Card className="w-full sm:w-[400px] h-fit">
      <CardHeader>
        <CardTitle className="text-xl">Tell us your concern</CardTitle>
        <CardDescription>Write your concerns and a doctor will reach out to you soon.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="concern">Concern</Label>
              <Input 
               id="concern"
               placeholder="What problem are you facing ?"
               value={title}
               required
               onChange={(e)=>{
                setTitle(e.target.value)
               }} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="speciality">Speciality</Label>
              <Select onValueChange={setSpeciality}>
                <SelectTrigger id="speciality">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="item-aligned">
                  {Object.entries(specialityMap).map(([speciality, value]) =>(
                    <SelectItem key={value} value={value}>
                      {speciality}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
               id="description"
               value={description}
               required
               onChange={(e)=>{
                setDescription(e.target.value)
               }}
               placeholder="Describe your concern in detail" />
            </div>
          </div>
          <CardFooter className="w-full pt-4 -mb-7">
            <Button type="submit" className="w-full rounded-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
    </div>
  )
}


const specialityMap = {
  "Allergy and Immunology": "ALLERGY_IMMUNOLOGY",
  "Anesthesiology": "ANESTHESIOLOGY",
  "Cardiology": "CARDIOLOGY",
  "Dermatology": "DERMATOLOGY",
  "Endocrinology": "ENDOCRINOLOGY",
  "Gastroenterology": "GASTROENTEROLOGY",
  "Geriatrics": "GERIATRICS",
  "Hematology": "HEMATOLOGY",
  "Infectious Disease": "INFECTIOUS_DISEASE",
  "Internal Medicine": "INTERNAL_MEDICINE",
  "Nephrology": "NEPHROLOGY",
  "Neurology": "NEUROLOGY",
  "Obstetrics and Gynecology": "OBSTETRICS_GYNECOLOGY",
  "Oncology": "ONCOLOGY",
  "Ophthalmology": "OPHTHALMOLOGY",
  "Orthopedics": "ORTHOPEDICS",
  "Otolaryngology (ENT)": "OTOLARYNGOLOGY",
  "Pediatrics": "PEDIATRICS",
  "Psychiatry": "PSYCHIATRY",
  "Pulmonology": "PULMONOLOGY",
  "Radiology": "RADIOLOGY",
  "Rheumatology": "RHEUMATOLOGY",
  " General - Surgery" :"SURGERY_GENERAL",
  " Cardiothoracic - Surgery": "SURGERY_CARDIOTHORACIC",
  " Neurosurgery - Surgery": "SURGERY_NEUROSURGERY",
  " Orthopedic - Surgery": "SURGERY_ORTHOPEDIC",
  " Plastic - Surgery": "SURGERY_PLASTIC",
  " Vascular - Surgery": "SURGERY_VASCULAR",
  "Urology": "UROLOGY",
};
