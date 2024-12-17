"use server"
import { signIn } from "@/auth"
import { loginSchema } from "@/schemas/auth";

import { z } from "zod";

export type LoginParamsType = z.infer<typeof loginSchema>;

export const loginAction = async ({
    email,
    password
}: LoginParamsType) => {


    const valid = loginSchema.safeParse({
        email,
        password
    })

    
    if (!valid.success) {
        return {
            error: true,
            message: 'error'
        }
    }
    try {
        const data = await signIn("credentials", {
            email,
            password,
            redirect: false
        })
        return {
            error: false,
            data
        }
        
    } catch (error) {
        return {
            error: true,
            message: 'Invalid password or email'
        }
    }

}