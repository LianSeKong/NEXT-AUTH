"use server"

import { auth, signOut } from "@/auth"
import { db } from "@/db/drizzle"
import { users } from "@/db/schema/user"
import { changePasswordSchema } from "@/schemas/auth"
import { eq } from "drizzle-orm"
import { z } from "zod"
import bcrypt from 'bcryptjs'

export const resetPasswordAction = async ({
    password,
    currentPassword,
    passwordConfirm
}: z.infer<typeof changePasswordSchema>) => {
    const session = await auth()    
    if (!session?.user?.id) {
        return {
            error: true,
            message: 'You don\'t have permission to access this.'
        }
    }

    if (!changePasswordSchema.safeParse({
        password,
        currentPassword,
        passwordConfirm
    })) {
        return {
            error: true,
            message: 'Invalid Field!'
        }
    }
    

    try {
        const [user] = await db.select().from(users).where(eq(users.id, +session.user.id))
        if (!(await bcrypt.compare(currentPassword, user.password || ''))) {
            return {
                error: true,
                message: 'Incorrect password!'
            }
        }
        const salt = await bcrypt.genSalt(10);
        await db.update(users).set({
            password:  await bcrypt.hash(password, salt)
        })

        return {
            error: false,
            message: 'Success!'
        }
   
    } catch (error) {
        return {
            error: true,
            message: 'Unknow error!'
        }
    }



}