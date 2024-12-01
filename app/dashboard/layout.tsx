import DashboardHeader from "@/components/DashboardHeader";
import React, { ReactNode } from "react";

interface DashboardChildrenType {
    children?: ReactNode
}


export default function({children}: DashboardChildrenType){
    return (
        <div>
        <DashboardHeader />
        {children}
        </div>
    )
}