import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ConcernCard from "@/components/ConcernCard";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface Concern {
  id: number;
  title: string;
  description: string;
  speciality: string;
  createdAt: Date;
  user: { name: string };
}


export default async function (){
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/concerns`, { cache: "no-store"});

  const data = await res.json();

  if(!data.concerns){
    return <div>Error fetching concerns.</div>
  }

  const specialityMap: { [key: string]: string } = {
    ALLERGY_IMMUNOLOGY: "Allergy and Immunology",
    ANESTHESIOLOGY: "Anesthesiology",
    CARDIOLOGY: "Cardiology",
    DERMATOLOGY: "Dermatology",
    ENDOCRINOLOGY: "Endocrinology",
    GASTROENTEROLOGY: "Gastroenterology",
    GERIATRICS: "Geriatrics",
    HEMATOLOGY: "Hematology",
    INFECTIOUS_DISEASE: "Infectious Disease",
    INTERNAL_MEDICINE: "Internal Medicine",
    NEPHROLOGY: "Nephrology",
    NEUROLOGY: "Neurology",
    OBSTETRICS_GYNECOLOGY: "Obstetrics and Gynecology",
    ONCOLOGY: "Oncology",
    OPHTHALMOLOGY: "Ophthalmology",
    ORTHOPEDICS: "Orthopedics",
    OTOLARYNGOLOGY: "Otolaryngology (ENT)",
    PEDIATRICS: "Pediatrics",
    PSYCHIATRY: "Psychiatry",
    PULMONOLOGY: "Pulmonology",
    RADIOLOGY: "Radiology",
    RHEUMATOLOGY: "Rheumatology",
    SURGERY_GENERAL: "General Surgery",
    SURGERY_CARDIOTHORACIC: "Cardiothoracic Surgery",
    SURGERY_NEUROSURGERY: "Neurosurgery",
    SURGERY_ORTHOPEDIC: "Orthopedic Surgery",
    SURGERY_PLASTIC: "Plastic Surgery",
    SURGERY_VASCULAR: "Vascular Surgery",
    UROLOGY: "Urology",
  };


  return (
    <div className="grid justify-center space-y-3">
      <h1 className="text-2xl  mt-4 mb-2 text-center justify-center items-center font-satoshi">Patients Concerns</h1>
        {data.concerns.map((concern: Concern) => (
          <ConcernCard
            key={concern.id}
            title={concern.title}
            speciality={specialityMap[concern.speciality] || concern.speciality}
            description={concern.description}
            createdAt={new Date(concern.createdAt)}
            userName={concern.user.name}
             />
      ))}
    </div>
  )
}