"use client"

import { Button } from "@/components/ui/button"
import { logoutAction } from "./action"


export const LogoutButton = () => {
    return (
        <Button size="sm" onClick={ () => {
            logoutAction()
        } } >logout</Button>
    )
}