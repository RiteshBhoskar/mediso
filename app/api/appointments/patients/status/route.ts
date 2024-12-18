import { NextRequest } from "next/server";



export async function PATCH(req: NextRequest){
    const response = await req.json();

    const { appointmentId , reply } = response;
}