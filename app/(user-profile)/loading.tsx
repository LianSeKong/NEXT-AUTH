"use client"
import Image from "next/image";
export default function Loading(){
    return (
        <div className="h-full w-full flex justify-center items-center">
        <Image
            src={'/next.svg'}
            alt="Logo"
            width={120}
            height={120}
            className="animate-pulse duration-700"
        >
        </Image>
    </div>
    )
}