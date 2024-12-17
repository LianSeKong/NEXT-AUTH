"use server"

import { db } from "@/db/drizzle";
import { passwordResetTokens, users } from "@/db/schema";
import { passwordMatchSchema } from "@/schemas/auth"
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
export const resetPasswordAction = async ({
    password,
    passwordConfirm,
    token
}: {
    password: string;
    passwordConfirm: string;
    token: string
}) => {

    // 1. 验证
    const valid = passwordMatchSchema.safeParse({
        password,
        passwordConfirm
    })

    if (!valid.success) {
        return {
            error: true,
            message: 'Invalid fields!'
        }
    }

    //2. 验证token

    const [ resetToken ] = await db.select().from(passwordResetTokens).where(eq(
        passwordResetTokens.token, token
    ))
    if (!resetToken || !resetToken.tokenExpiry || resetToken.tokenExpiry.getTime() < Date.now()) {
        return {
            error: true,
            message: 'Invalid Token! please resend'
        }
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPW = await bcrypt.hash(password, salt); 
    await db.update(users).set({
        password: hashedPW
    })
    await db.delete(passwordResetTokens).where(eq(passwordResetTokens.id, resetToken.id))
    return {
        error: false,
        message: 'Update success!'
    }
}