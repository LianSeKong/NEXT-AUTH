import { Toaster } from "react-hot-toast";
import { ChangeForm } from "./_components/change-form";

export default async function ChangePassword() {
    await new Promise((res) => {
        setTimeout(() => {
            res(100)
        }, 3000)
    })
    return (
        <main className="flex justify-center items-start pt-32 w-full h-[calc(100%-64px)]"> 
            <ChangeForm />
            <Toaster />
        </main>
    )
}