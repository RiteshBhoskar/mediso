import { SpinnerDotted } from "spinners-react";

export default function LoadingSpinner (){
    return (
        <div className="flex justify-center items-center h-screen">
        <SpinnerDotted size={90} thickness={100} speed={100} color="rgba(57, 169, 172, 1)" />
      </div>
    )
}