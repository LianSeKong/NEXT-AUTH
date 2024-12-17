import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export const SuccessInfo = () => {
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Update Success</CardTitle>

            </CardHeader>
            <CardContent>
                <Button><Link href="/login">Login</Link></Button>
            </CardContent>
        </Card>
    )
}