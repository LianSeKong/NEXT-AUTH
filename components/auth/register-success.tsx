import Link from "next/link"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription } from "@/components/ui/card"
export const RegisterSuccess = () => {
    return (
        <Card className="w-[350px] space-y-4  text-center pt-4">
            <CardDescription className="font-semibold text-black text-xl">Your account has been created</CardDescription>
            <CardContent>
                <Button className="w-full">
                    <Link href="/login">Login to your account</Link>
                </Button>
            </CardContent>
        </Card>
    )
}