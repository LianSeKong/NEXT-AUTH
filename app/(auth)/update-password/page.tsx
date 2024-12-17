"use client"
import { useSearchParams  } from "next/navigation";
import { UpdateForm } from "./_components/update-form";

export default function Page() {
    const params = useSearchParams ()

    return (
        <UpdateForm token={params.get('token')!}/>
    )
}