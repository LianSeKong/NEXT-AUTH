import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export const SuccessInfo = () => {
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Reset Success</CardTitle>
                <CardDescription>Plase checkout your emial</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-sm text-muted-foreground">Already reset? to <Button><Link href="/login">Login</Link></Button></div>
            </CardContent>
        </Card>
    )
}